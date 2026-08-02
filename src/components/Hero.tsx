import { ArrowRight, Github, MapPin, Mail } from 'lucide-react';
import { SITE } from '@/data';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute left-1/2 top-0 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl">
        <div className="reveal mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Open to QA & frontend-adjacent roles
        </div>

        <h1
          className="reveal text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-7xl"
          data-reveal-delay="60"
        >
          {SITE.name}
        </h1>
        <p
          className="reveal mt-4 font-mono text-base font-medium text-accent-600 dark:text-accent-400 sm:text-lg"
          data-reveal-delay="120"
        >
          {SITE.role}
        </p>
        <p
          className="reveal mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl"
          data-reveal-delay="180"
        >
          {SITE.valueProp}
        </p>

        <div
          className="reveal mt-5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500"
          data-reveal-delay="220"
        >
          <MapPin className="h-4 w-4" />
          {SITE.location}
        </div>

        <div
          className="reveal mt-8 flex flex-wrap items-center gap-3"
          data-reveal-delay="280"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent-600/30 transition-all hover:bg-accent-700 hover:shadow-md hover:shadow-accent-600/40"
          >
            <Mail className="h-4 w-4" />
            Get in touch
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            Contact
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition-all hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
