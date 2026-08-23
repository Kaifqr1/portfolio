import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll hook. Adds `is-visible` to elements with the `reveal` class
 * when they enter the viewport. One-shot (unobserves after first reveal).
 */
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
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.revealDelay;
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add('is-visible');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Adds a restrained depth response to marked content while it moves through the
 * viewport. Desktop-only and disabled for reduced motion so reading remains the
 * priority on small screens and for motion-sensitive visitors.
 */
export function useScrollDepth() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-depth]'));
    if (elements.length === 0) return;

    let frame = 0;
    const reset = () => {
      elements.forEach((element) => {
        element.style.removeProperty('--scroll-rotate-x');
        element.style.removeProperty('--scroll-rotate-y');
        element.style.removeProperty('--scroll-translate-z');
        element.style.removeProperty('--scroll-shadow-strength');
      });
    };

    const update = () => {
      frame = 0;
      if (reducedMotion.matches || !desktop.matches) {
        reset();
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.max(-1, Math.min(1, (elementCenter - viewportCenter) / (window.innerHeight * 0.72)));
        const focus = 1 - Math.min(1, Math.abs(distance));
        const depth = Number(element.dataset.scrollDepth ?? '1');
        const direction = index % 2 === 0 ? 1 : -1;

        element.style.setProperty('--scroll-rotate-x', `${(-distance * 4.5 * depth).toFixed(2)}deg`);
        element.style.setProperty('--scroll-rotate-y', `${(distance * direction * 2.2 * depth).toFixed(2)}deg`);
        element.style.setProperty('--scroll-translate-z', `${(focus * 18 * depth).toFixed(1)}px`);
        element.style.setProperty('--scroll-shadow-strength', `${(0.06 + focus * 0.1).toFixed(2)}`);
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    reducedMotion.addEventListener('change', requestUpdate);
    desktop.addEventListener('change', requestUpdate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      reducedMotion.removeEventListener('change', requestUpdate);
      desktop.removeEventListener('change', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
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
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((s): s is HTMLElement => Boolean(s));
    if (sections.length === 0) return;

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, [ids]);

  return active;
}
