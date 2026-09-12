import { ArrowDownRight, ArrowRight, Download, Github, Mail, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { SITE } from '@/data';

export function Hero() {
  return (
    <section id="home" className="hero-cinematic relative isolate min-h-[92vh] overflow-hidden px-6 pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="absolute inset-0 -z-20 bg-grid" />
      <div className="hero-scanline pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-orbit hero-orbit-a" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-b" aria-hidden="true" />
      <div className="absolute left-[18%] top-20 -z-10 h-72 w-72 rounded-full bg-accent-500/15 blur-[110px]" />
      <div className="absolute right-[8%] top-40 -z-10 h-64 w-64 rounded-full bg-sky-400/10 blur-[100px]" />
      <div className="portfolio-noise pointer-events-none absolute inset-0 -z-10 opacity-30" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div className="hero-copy">
            <div className="reveal mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/75 px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-900/65 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for QA opportunities
            </div>

            <p className="reveal mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-600 dark:text-accent-400" data-reveal-delay="30">
              QA ENGINEER <span className="text-slate-300 dark:text-slate-700">/</span> MUMBAI, INDIA
            </p>
            <h1 className="reveal hero-title text-balance max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 dark:text-white sm:text-7xl lg:text-[5.2rem]" data-reveal-delay="60">
              {SITE.name}
            </h1>
            <p className="reveal mt-6 max-w-2xl text-xl font-semibold leading-snug tracking-tight text-slate-800 dark:text-slate-200 sm:text-2xl" data-reveal-delay="120">
              {SITE.role}
            </p>
            <p className="reveal mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg" data-reveal-delay="180">
              {SITE.valueProp}
            </p>

            <div className="reveal mt-6 flex flex-wrap gap-2" data-reveal-delay="220">
              {['Manual QA', 'API Testing', 'Jira', 'Git / GitHub', 'Selenium — learning'].map((item, index) => (
                <span key={item} className={`rounded-full border px-3 py-1.5 text-[11px] font-bold ${index === 0 ? 'border-accent-200 bg-accent-50 text-accent-700 dark:border-accent-900/60 dark:bg-accent-950/40 dark:text-accent-300' : 'border-slate-200 bg-white/65 text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400'}`}>
                  {item}
                </span>
              ))}
            </div>

            <div className="reveal mt-8 flex flex-wrap items-center gap-3" data-reveal-delay="280">
              <a href={SITE.links.resume} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-900/15 transition-all hover:-translate-y-1 hover:shadow-2xl dark:bg-white dark:text-slate-950">
                <Download className="h-4 w-4" />
                View Resume
              </a>
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3.5 text-sm font-bold text-slate-800 shadow-sm backdrop-blur transition-all hover:-translate-y-1 hover:border-slate-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-slate-600">
                Explore work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="reveal mt-6 flex flex-wrap gap-5 text-xs font-medium text-slate-500 dark:text-slate-500" data-reveal-delay="320">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{SITE.location}</span>
              <a className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-600 dark:hover:text-accent-400" href={`mailto:${SITE.email}`}><Mail className="h-3.5 w-3.5" />{SITE.email}</a>
            </div>
          </div>

          <div className="reveal scroll-depth relative lg:block" data-reveal-delay="180" data-scroll-depth="1.25">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-accent-500/10 via-transparent to-sky-400/10 blur-2xl" />
            <div className="glass-panel cinematic-card relative overflow-hidden rounded-[1.75rem] p-5 sm:p-6">
              <div className="hero-card-glow absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-500/20 blur-3xl" />
              <div className="flex items-center justify-between border-b border-slate-200/70 pb-4 dark:border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg dark:bg-white dark:text-slate-950">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-slate-950 dark:text-white">QA control room</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Evidence over assumptions</p>
                  </div>
                </div>
                <Sparkles className="h-4 w-4 animate-pulse text-accent-500" />
              </div>

              <div className="mt-5 rounded-2xl bg-slate-950 p-5 font-mono text-xs text-slate-300 shadow-inner dark:bg-black/35">
                <div className="mb-4 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/80" />
                  <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
                  <span className="ml-2 text-[10px] text-slate-500">qa-workflow</span>
                </div>
                <p><span className="text-accent-400">01</span> define <span className="text-slate-600">→</span> test requirements</p>
                <p className="mt-3"><span className="text-accent-400">02</span> explore <span className="text-slate-600">→</span> probe edge cases</p>
                <p className="mt-3"><span className="text-accent-400">03</span> report <span className="text-slate-600">→</span> reproduce defects</p>
                <p className="mt-3"><span className="text-accent-400">04</span> verify <span className="text-slate-600">→</span> regress the fix</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-wider text-slate-500">
                  <span>quality gate</span><span className="text-emerald-400">ready to test</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <a href={SITE.links.github} target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-200 bg-white/60 p-4 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
                  <Github className="h-4 w-4 text-slate-500 transition-colors group-hover:text-accent-500" />
                  <p className="mt-3 text-xs font-bold text-slate-900 dark:text-white">GitHub</p>
                  <p className="mt-1 text-[10px] text-slate-500">Code & evidence</p>
                </a>
                <a href="#qa-lab" className="group rounded-2xl border border-slate-200 bg-white/60 p-4 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-slate-700">
                  <ArrowDownRight className="h-4 w-4 text-accent-500 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                  <p className="mt-3 text-xs font-bold text-slate-900 dark:text-white">QA Lab</p>
                  <p className="mt-1 text-[10px] text-slate-500">Test evidence</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        <a href="#about" className="reveal mt-16 hidden items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-accent-500 sm:inline-flex" data-reveal-delay="360">
          Scroll to explore <ArrowDownRight className="h-3.5 w-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
