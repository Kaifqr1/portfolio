import { ArrowRight, Download, Github, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { SITE } from '@/data';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.35fr_.65fr]">
        <div>
          <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Open to QA opportunities
          </div>

          <p className="reveal mb-3 font-mono text-sm font-semibold text-accent-600 dark:text-accent-400" data-reveal-delay="30">
            QA ENGINEER · MUMBAI, INDIA
          </p>
          <h1 className="reveal max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight text-slate-950 dark:text-white sm:text-7xl" data-reveal-delay="60">
            {SITE.name}
          </h1>
          <p className="reveal mt-5 max-w-2xl text-xl font-semibold text-slate-700 dark:text-slate-200 sm:text-2xl" data-reveal-delay="120">
            {SITE.role}
          </p>
          <p className="reveal mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl" data-reveal-delay="180">
            {SITE.valueProp}
          </p>

          <div className="reveal mt-5 flex flex-wrap gap-2.5 text-xs font-medium text-slate-600 dark:text-slate-400" data-reveal-delay="220">
            {['Manual Testing', 'API Testing', 'Jira', 'Git / GitHub', 'Selenium — learning'].map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900/70">
                {item}
              </span>
            ))}
          </div>

          <div className="reveal mt-8 flex flex-wrap items-center gap-3" data-reveal-delay="280">
            <a href={SITE.links.resume} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-600/20 transition-all hover:-translate-y-0.5 hover:bg-accent-700">
              <Download className="h-4 w-4" />
              View Resume
            </a>
            <a href="#projects" className="group inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800">
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={SITE.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800">
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>

          <div className="reveal mt-6 flex flex-wrap gap-5 text-sm text-slate-500 dark:text-slate-500" data-reveal-delay="320">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{SITE.location}</span>
            <a className="inline-flex items-center gap-1.5 hover:text-accent-600 dark:hover:text-accent-400" href={`mailto:${SITE.email}`}><Mail className="h-4 w-4" />{SITE.email}</a>
          </div>
        </div>

        <div className="reveal hidden lg:block" data-reveal-delay="180">
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">QA mindset</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Quality through evidence</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 font-mono text-xs text-slate-600 dark:text-slate-400">
              <p><span className="text-accent-600 dark:text-accent-400">01</span> define → test the requirement</p>
              <p><span className="text-accent-600 dark:text-accent-400">02</span> explore → probe edge cases</p>
              <p><span className="text-accent-600 dark:text-accent-400">03</span> report → reproduce clearly</p>
              <p><span className="text-accent-600 dark:text-accent-400">04</span> verify → regress the fix</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
