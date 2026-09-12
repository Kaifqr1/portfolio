import { useEffect, useRef, useState } from 'react';

/** Reveal elements as they enter the viewport. */
export function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window) || reducedMotion || els.length === 0) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = el.dataset.revealDelay;
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add('is-visible');
          io.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Performance-first cinematic motion.
 * Mobile keeps native scrolling and only uses the progress indicator.
 * Desktop adds a very subtle transform-only depth effect.
 */
export function useScrollDepth() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-depth]'));
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.cinematic-card'));
    const root = document.documentElement;

    let scrollFrame = 0;
    let pointerFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let activeCard: HTMLElement | null = null;
    let bounds: Array<{ element: HTMLElement; top: number; height: number; depth: number; direction: number }> = [];

    const measure = () => {
      const scrollY = window.scrollY;
      bounds = elements.map((element, index) => {
        const rect = element.getBoundingClientRect();
        return {
          element,
          top: rect.top + scrollY,
          height: rect.height,
          depth: Math.min(1.2, Math.max(0.35, Number(element.dataset.scrollDepth ?? '1'))),
          direction: index % 2 === 0 ? 1 : -1,
        };
      });
    };

    const clearElementMotion = () => {
      elements.forEach((element) => {
        element.style.removeProperty('--scroll-rotate-x');
        element.style.removeProperty('--scroll-rotate-y');
        element.style.removeProperty('--scroll-translate-z');
        element.style.removeProperty('--scroll-lift');
        element.style.removeProperty('--scroll-scale');
      });
      cards.forEach((card) => {
        card.style.removeProperty('--pointer-x');
        card.style.removeProperty('--pointer-y');
      });
    };

    const update = () => {
      scrollFrame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      root.style.setProperty('--scroll-progress', progress.toFixed(4));

      if (reducedMotion.matches || !desktop.matches) {
        if (reducedMotion.matches) clearElementMotion();
        return;
      }

      const viewportTop = window.scrollY;
      const viewportBottom = viewportTop + window.innerHeight;
      const viewportCenter = viewportTop + window.innerHeight * 0.52;

      for (const { element, top, height, depth, direction } of bounds) {
        // Skip far-away elements so long pages stay cheap to scroll.
        if (top + height < viewportTop - window.innerHeight * 0.35 || top > viewportBottom + window.innerHeight * 0.35) continue;

        const distance = Math.max(-1, Math.min(1, (top + height * 0.5 - viewportCenter) / (window.innerHeight * 0.95)));
        const focus = 1 - Math.abs(distance);

        element.style.setProperty('--scroll-rotate-x', `${(-distance * 1.35 * depth).toFixed(2)}deg`);
        element.style.setProperty('--scroll-rotate-y', `${(distance * direction * 0.8 * depth).toFixed(2)}deg`);
        element.style.setProperty('--scroll-translate-z', `${(focus * 7 * depth).toFixed(1)}px`);
        element.style.setProperty('--scroll-lift', `${(-distance * 3 * depth).toFixed(1)}px`);
        element.style.setProperty('--scroll-scale', `${(0.997 + focus * 0.003).toFixed(4)}`);
      }
    };

    const requestScrollUpdate = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(update);
    };

    const handleResize = () => {
      measure();
      requestScrollUpdate();
    };

    const handleReducedMotionChange = () => {
      clearElementMotion();
      requestScrollUpdate();
    };

    const handleDesktopChange = () => {
      measure();
      clearElementMotion();
      requestScrollUpdate();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!desktop.matches || reducedMotion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        const target = document.elementFromPoint(pointerX, pointerY) as HTMLElement | null;
        const nextCard = target?.closest('.cinematic-card') as HTMLElement | null;

        if (activeCard && activeCard !== nextCard) {
          activeCard.style.removeProperty('--pointer-x');
          activeCard.style.removeProperty('--pointer-y');
        }

        activeCard = nextCard;
        if (!activeCard) return;

        const rect = activeCard.getBoundingClientRect();
        activeCard.style.setProperty('--pointer-x', `${Math.max(0, Math.min(rect.width, pointerX - rect.left))}px`);
        activeCard.style.setProperty('--pointer-y', `${Math.max(0, Math.min(rect.height, pointerY - rect.top))}px`);
      });
    };

    const handlePointerLeave = () => {
      if (activeCard) {
        activeCard.style.removeProperty('--pointer-x');
        activeCard.style.removeProperty('--pointer-y');
      }
      activeCard = null;
    };

    const resizeObserver = 'ResizeObserver' in window
      ? new ResizeObserver(() => handleResize())
      : null;
    if (resizeObserver) resizeObserver.observe(document.body);

    measure();
    update();
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    reducedMotion.addEventListener('change', handleReducedMotionChange);
    desktop.addEventListener('change', handleDesktopChange);

    return () => {
      window.removeEventListener('scroll', requestScrollUpdate);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      reducedMotion.removeEventListener('change', handleReducedMotionChange);
      desktop.removeEventListener('change', handleDesktopChange);
      resizeObserver?.disconnect();
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      root.style.setProperty('--scroll-progress', '0');
      clearElementMotion();
    };
  }, []);
}

/** Persisted dark-mode toggle. Applies `dark` class on <html>. */
export function useDarkMode() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}

/** Tracks the active section id based on scroll position. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter((s): s is HTMLElement => Boolean(s));
    if (sections.length === 0) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, [ids]);

  return active;
}
