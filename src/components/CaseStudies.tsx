import { ArrowRight, Bug, CheckCircle2, Code2, ShieldCheck } from 'lucide-react';
import { Section } from '@/data';

const studies = [
  {
    title: 'QRServe',
    label: 'Product + QA case study',
    context: 'A digital-menu product for independent restaurants.',
    role: 'Builder and QA-focused project owner',
    stack: 'React, TypeScript, Tailwind, Node.js, Express, tRPC, TiDB, Cloudinary, Vercel, Vitest',
    problem: 'Restaurant teams need a menu experience that stays easy to update while guests get a fast, mobile-first experience.',
    approach: [
      'Model the operator, venue, menu, and public-menu flows before testing them.',
      'Check authentication and authorization boundaries around private management areas.',
      'Validate menu data, QR destinations, guest order-list behaviour, and responsive UI paths.',
      'Use automated checks where repeatable validation provides value, while keeping exploratory testing in the workflow.',
    ],
    evidence: 'Source code and live demo are linked from the Projects section.',
  },
  {
    title: 'Bloomzen URL Shortener',
    label: 'Internship QA case study',
    context: 'MEAN-stack URL Shortener tested during a QA internship.',
    role: 'QA intern',
    stack: 'MEAN stack, API testing, Jira, regression testing',
    problem: 'URL-shortening products combine authentication, input validation, redirects, analytics, and admin workflows, so regressions can cross module boundaries.',
    approach: [
      'Created and executed test cases across authentication, shortening, redirect, analytics, and admin flows.',
      'Reported defects with reproducible steps plus severity and priority.',
      'Re-ran regression checks after fixes instead of validating only the changed screen.',
      'Used API-focused validation alongside functional UI checks.',
    ],
    evidence: 'This case study is a concise summary of the internship experience represented on the portfolio.',
  },
  {
    title: 'Code Roast & Smell Test',
    label: 'API + AI QA case study',
    context: 'A small web app that turns pasted code into AI-assisted quality feedback.',
    role: 'Builder and tester',
    stack: 'React, TypeScript, AI API, Tailwind CSS, Postman',
    problem: 'AI-backed interfaces need validation beyond the happy path because inputs, API failures, limits, and generated responses can vary.',
    approach: [
      'Check empty, malformed, and unusually large inputs.',
      'Exercise success and error responses through API requests.',
      'Probe rate-limit and adversarial-input scenarios.',
      'Keep the UI understandable when the underlying service returns an error.',
    ],
    evidence: 'The live demo and source repository are linked from the Projects section.',
  },
];

export function CaseStudies() {
  return (
    <Section
      id="case-studies"
      eyebrow="Case Studies"
      title="How I approach a feature from requirement to regression."
      description="Short, interview-friendly breakdowns of context, responsibility, testing approach, and evidence. No inflated metrics or invented outcomes."
    >
      <div className="space-y-5">
        {studies.map((study, index) => (
          <article key={study.title} className="reveal overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900" data-reveal-delay={String(index * 80)}>
            <div className="grid lg:grid-cols-[.8fr_1.2fr]">
              <div className="border-b border-slate-200 p-6 dark:border-slate-800 lg:border-b-0 lg:border-r sm:p-7">
                <span className="inline-flex rounded-full bg-accent-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">{study.label}</span>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{study.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{study.context}</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Role</dt><dd className="mt-1 font-medium text-slate-800 dark:text-slate-200">{study.role}</dd></div>
                  <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Stack</dt><dd className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">{study.stack}</dd></div>
                </dl>
              </div>
              <div className="p-6 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400"><Bug className="h-3.5 w-3.5" /> Problem</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{study.problem}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400"><ShieldCheck className="h-3.5 w-3.5" /> Approach</p>
                    <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {study.approach.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />{item}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400"><Code2 className="h-3.5 w-3.5" /> {study.evidence}</div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <a href="#contact" className="reveal mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400">Want to discuss a project? Get in touch <ArrowRight className="h-4 w-4" /></a>
    </Section>
  );
}
