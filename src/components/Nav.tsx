import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { SECTIONS, SITE } from '@/data';

export function Nav({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (s): s is HTMLElement => Boolean(s),
    );
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive((visible[0].target as HTMLElement).id);
      },
      { rootMargin: '-42% 0px -52% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 sm:px-5 ${scrolled ? 'pt-2' : ''}`}>
      <nav className={`mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl border px-2.5 pl-3 shadow-lg backdrop-blur-2xl transition-all duration-300 sm:pl-4 ${scrolled ? 'border-slate-200/80 bg-white/80 shadow-slate-900/10 dark:border-slate-800/80 dark:bg-slate-950/75' : 'border-slate-200/60 bg-white/65 dark:border-slate-800/60 dark:bg-slate-950/55'}`}>
        <a href="#home" className="group flex items-center gap-2.5 rounded-xl px-1.5 py-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 font-mono text-xs font-bold tracking-tight text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/10 transition-transform group-hover:scale-105 dark:bg-white dark:text-slate-950">MKQ</span>
          <span className="hidden max-w-[180px] truncate text-sm font-bold tracking-tight text-slate-900 dark:text-white sm:block">{SITE.name}</span>
        </a>

        <div className="hidden items-center gap-0.5 rounded-xl bg-slate-100/70 p-1 dark:bg-slate-900/70 md:flex">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={`relative rounded-lg px-2.5 py-2 text-[12px] font-semibold transition-all ${active === s.id ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>
              {active === s.id && <span className="absolute inset-x-2 bottom-0.5 h-px bg-accent-500" />}
              {s.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <a href="#contact" className="hidden rounded-xl bg-accent-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-accent-600/20 transition-all hover:-translate-y-0.5 hover:bg-accent-700 sm:inline-flex">Let's talk</a>
          <button onClick={onToggleDark} aria-label="Toggle dark mode" className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition-all hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-600 transition-all hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden">
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/95 md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${active === s.id ? 'bg-accent-50 text-accent-700 dark:bg-accent-950/50 dark:text-accent-300' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
