import { GraduationCap, Briefcase, Award, MapPin } from 'lucide-react';
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
      title="A QA who reads specs like a user would."
      description="I'm a recent BSc IT graduate and QA fresher based in Mumbai. I completed a QA internship at Bloomzen, where I tested a MEAN-stack URL Shortener across functional, API, and regression flows — and I'm now building toward automation and frontend."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <div
            key={f.label}
            className="reveal rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700"
            data-reveal-delay={String(i * 70)}
          >
            <f.icon className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            <div className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-500">
              {f.label}
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
              {f.value}
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-6 rounded-xl border border-slate-200 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/40">
        <p className="text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
          At <span className="font-semibold text-slate-900 dark:text-white">Bloomzen</span>, I
          worked on a MEAN-stack URL Shortener — writing test cases across the auth, shortening,
          redirect, analytics, and admin modules; logging bugs in Jira with clear repro steps,
          severity, and priority; and running regression passes after each fix. I'm{' '}
          <span className="font-semibold text-slate-900 dark:text-white">
            Simplilearn Software Testing
          </span>{' '}
          certified and currently expanding into Cypress automation and Flutter/Dart on the dev
          side.
        </p>
      </div>
    </Section>
  );
}
