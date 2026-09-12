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
 * Drives the cinematic layer: page progress, soft section parallax, floating
 * ambient orbs, and restrained 3D depth. Everything is requestAnimationFrame
 * throttled and automatically respects reduced-motion preferences.
 */
export function useScrollDepth() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop = window.matchMedia('(min-width: 768px)');
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-depth]'));
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.scene-section'));
    const root = document.documentElement;
    let frame = 0;

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

      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      root.style.setProperty('--scroll-progress', progress.toFixed(4));

      if (desktop.matches) {
        root.style.setProperty('--orb-x', `${(Math.sin(progress * Math.PI * 2) * 34).toFixed(1)}px`);
        root.style.setProperty('--orb-y', `${(Math.cos(progress * Math.PI * 2) * 22).toFixed(1)}px`);

        const viewportCenter = window.innerHeight / 2;
        elements.forEach((element, index) => {
          const rect = element.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.max(-1, Math.min(1, (elementCenter - viewportCenter) / (window.innerHeight * 0.78)));
          const focus = 1 - Math.min(1, Math.abs(distance));
          const depth = Number(element.dataset.scrollDepth ?? '1');
          const direction = index % 2 === 0 ? 1 : -1;

          element.style.setProperty('--scroll-rotate-x', `${(-distance * 5.2 * depth).toFixed(2)}deg`);
          element.style.setProperty('--scroll-rotate-y', `${(distance * direction * 2.8 * depth).toFixed(2)}deg`);
          element.style.setProperty('--scroll-translate-z', `${(focus * 24 * depth).toFixed(1)}px`);
          element.style.setProperty('--scroll-lift', `${(-distance * 7 * depth).toFixed(1)}px`);
          element.style.setProperty('--scroll-scale', `${(0.985 + focus * 0.015).toFixed(4)}`);
          element.style.setProperty('--scroll-shadow-strength', `${(0.04 + focus * 0.11).toFixed(2)}`);
        });

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - viewportCenter) / (window.innerHeight * 1.1)));
          section.style.setProperty('--section-shift', `${(-distance * 70).toFixed(1)}px`);
        });
      } else {
        elements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const distance = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - window.innerHeight / 2) / (window.innerHeight * 0.9)));
          element.style.setProperty('--scroll-lift', `${(-distance * 3).toFixed(1)}px`);
        });
      }
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
