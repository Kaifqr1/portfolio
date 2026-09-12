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
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Lightweight RAF-driven cinematic motion. Reads layout only on resize,
 * writes transforms only during animation frames, and completely disables
 * expensive 3D work on touch devices.
 */
export function useScrollDepth() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-depth]'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.scene-section'));
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.cinematic-card'));
    const root = document.documentElement;
    let frame = 0;
    let pointerFrame = 0;
    let pointerX = -1;
    let pointerY = -1;
    let bounds: { element: HTMLElement; top: number; height: number; depth: number; direction: number }[] = [];
    let sectionBounds: { element: HTMLElement; top: number; height: number }[] = [];

    const measure = () => {
      const scrollY = window.scrollY;
      bounds = elements.map((element, index) => {
        const rect = element.getBoundingClientRect();
        return { element, top: rect.top + scrollY, height: rect.height, depth: Number(element.dataset.scrollDepth ?? '1'), direction: index % 2 === 0 ? 1 : -1 };
      });
      sectionBounds = sections.map((element) => {
        const rect = element.getBoundingClientRect();
        return { element, top: rect.top + scrollY, height: rect.height };
      });
    };

    const reset = () => {
      root.style.setProperty('--scroll-progress', '0');
      root.style.setProperty('--orb-x', '0px');
      root.style.setProperty('--orb-y', '0px');
      elements.forEach((element) => {
        element.style.removeProperty('--scroll-rotate-x');
        element.style.removeProperty('--scroll-rotate-y');
        element.style.removeProperty('--scroll-translate-z');
        element.style.removeProperty('--scroll-lift');
        element.style.removeProperty('--scroll-scale');
        element.style.removeProperty('--scroll-shadow-strength');
      });
      sections.forEach((section) => section.style.removeProperty('--section-shift'));
    };

    const update = () => {
      frame = 0;
      if (reducedMotion.matches) {
        reset();
        return;
      }

      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
      root.style.setProperty('--scroll-progress', progress.toFixed(4));

      if (!desktop.matches) return;

      root.style.setProperty('--orb-x', `${(Math.sin(progress * Math.PI * 2) * 28).toFixed(1)}px`);
      root.style.setProperty('--orb-y', `${(Math.cos(progress * Math.PI * 2) * 18).toFixed(1)}px`);

      const viewportCenter = scrollY + window.innerHeight / 2;
      bounds.forEach(({ element, top, height, depth, direction }) => {
        const distance = Math.max(-1, Math.min(1, (top + height / 2 - viewportCenter) / (window.innerHeight * 0.9)));
        const focus = 1 - Math.abs(distance);
        element.style.setProperty('--scroll-rotate-x', `${(-distance * 3.2 * depth).toFixed(2)}deg`);
        element.style.setProperty('--scroll-rotate-y', `${(distance * direction * 1.8 * depth).toFixed(2)}deg`);
        element.style.setProperty('--scroll-translate-z', `${(focus * 14 * depth).toFixed(1)}px`);
        element.style.setProperty('--scroll-lift', `${(-distance * 5 * depth).toFixed(1)}px`);
        element.style.setProperty('--scroll-scale', `${(0.992 + focus * 0.008).toFixed(4)}`);
        element.style.setProperty('--scroll-shadow-strength', `${(0.04 + focus * 0.07).toFixed(2)}`);
      });

      sectionBounds.forEach(({ element, top, height }) => {
        const distance = Math.max(-1, Math.min(1, (top + height / 2 - viewportCenter) / (window.innerHeight * 1.2)));
        element.style.setProperty('--section-shift', `${(-distance * 42).toFixed(1)}px`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const requestPointerUpdate = () => {
      if (pointerFrame || pointerX < 0 || !desktop.matches) return;
      pointerFrame = window.requestAnimationFrame(() => {
        pointerFrame = 0;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const x = Math.max(0, Math.min(rect.width, pointerX - rect.left));
          const y = Math.max(0, Math.min(rect.height, pointerY - rect.top));
          card.style.setProperty('--pointer-x', `${x}px`);
          card.style.setProperty('--pointer-y', `${y}px`);
        });
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!desktop.matches || reducedMotion.matches) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      requestPointerUpdate();
    };

    const handlePointerLeave = () => {
      pointerX = -1;
      pointerY = -1;
    };

    measure();
    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', () => { measure(); requestUpdate(); }, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    reducedMotion.addEventListener('change', requestUpdate);
    desktop.addEventListener('change', () => { measure(); requestUpdate(); });

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      if (frame) window.cancelAnimationFrame(frame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      reset();
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
