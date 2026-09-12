import { GraduationCap, Briefcase, Award, MapPin, ArrowRight } from 'lucide-react';
import { Section } from '@/data';

const facts = [
  { icon: GraduationCap, label: 'Education', value: 'BSc IT graduate' },
  { icon: Briefcase, label: 'Experience', value: 'QA Intern @ Bloomzen' },
  { icon: Award, label: 'Certification', value: 'Simplilearn Software Testing' },
  { icon: MapPin, label: 'Based in', value: 'Mumbai, India' },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A QA mindset with a builder's curiosity."
      description="I'm a recent BSc IT graduate and QA fresher based in Mumbai. My focus is practical software quality: understanding requirements, exploring edge cases, writing clear defects, validating APIs, and steadily moving into automation."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div key={f.label} className="reveal rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700" data-reveal-delay={String(i * 70)}>
            <f.icon className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            <div className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500">{f.label}</div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{f.value}</div>
          </div>
        ))}
      </div>

      <div className="reveal mt-6 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-900/50 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
            During my QA internship at <span className="font-semibold text-slate-950 dark:text-white">Bloomzen</span>, I worked with a MEAN-stack URL Shortener and focused on functional, API, and regression flows. I also use personal projects such as QRServe to practise testing against applications I can inspect, change, and retest.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Current direction: <span className="font-semibold text-slate-900 dark:text-white">Selenium automation</span> and stronger frontend fundamentals — while keeping QA as the primary career focus.
          </p>
        </div>
        <a href="#qa-lab" className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400">
          See QA evidence <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}
