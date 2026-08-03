import { useState } from 'react';
import { ArrowUpRight, Github, Link2, Bug, Wrench, Lightbulb } from 'lucide-react';
import { Section } from '@/data';

type Project = {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  tools: string[];
  github: string;
  demo: string;
  testingNotes: string;
  accent: string;
};

const projects: Project[] = [
  {
    name: 'ShopCraft',
    tagline: 'E-commerce app — my QA testing anchor',
    problem:
      'I needed a realistic, full-featured app to practice end-to-end QA on — not a toy demo, but something with auth, cart, checkout, and admin flows worth breaking.',
    solution:
      'I self-built ShopCraft, an e-commerce app, and then turned it into my primary testing target: designing test cases module-by-module, logging real bugs, and (in progress) automating the happy paths with Cypress.',
    tools: ['HTML/CSS/JS', 'Node.js', 'MongoDB', 'Cypress', 'Postman', 'Jira', 'Git'],
    github: '#',
    demo: 'https://shop-hub--kaifqr1.replit.app/',
    testingNotes:
      '30+ test cases across 5 modules: Auth, Product Catalog, Cart, Checkout, and Admin. Covered positive paths, boundary values, and negative scenarios (expired session mid-checkout, invalid promo codes, out-of-stock edge cases). Logged 12+ bugs with severity/priority in Jira.',
    accent: 'from-accent-500/15 to-sky-500/10',
  },
  {
    name: 'Code Roast & Smell Test',
    tagline: 'LLM-powered web app — paste code, get roasted',
    problem:
      "Developers rarely get fast, low-stakes feedback on code quality. I wanted something that made reviewing 'code smells' feel approachable — even fun — instead of a dry lint report.",
    solution:
      'Built a web app where users paste a code snippet and get an AI-generated roast, a code-smell rating (1–10), and one concrete improvement tip. Tested the API contract, error states, and prompt-stability manually and via Postman.',
    tools: ['React', 'TypeScript', 'OpenAI API', 'Tailwind', 'Postman', 'Git'],
    github: 'https://github.com/Kaifqr1/code-roast',
    demo: 'https://code-roast-smell--kaifqr1.replit.app/',
    testingNotes:
      'Tested API rate-limit handling, empty/malformed input, very large snippets, and prompt-injection-style inputs. Wrote 15+ Postman requests covering success, 4xx, and 5xx paths; verified rating consistency across re-submissions.',
    accent: 'from-rose-500/15 to-amber-500/10',
  },
];

function Card({ p, index }: { p: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article
      className="reveal group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-black/30"
      data-reveal-delay={String(index * 100)}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${p.accent}`} />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{p.tagline}</p>
          </div>
          <div className="flex gap-1.5">
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} GitHub`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} live demo`}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
              <Bug className="h-3.5 w-3.5" /> Problem
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{p.problem}</p>
          </div>
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
              <Lightbulb className="h-3.5 w-3.5" /> Solution / Approach
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{p.solution}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-500">
            <Wrench className="h-3.5 w-3.5" /> Tools Used
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.tools.map((t) => (
              <span
                key={t}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/60 p-3 dark:border-slate-800 dark:bg-slate-800/30">
          <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400">
            <Bug className="h-3.5 w-3.5" /> Testing Notes
          </div>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {expanded || p.testingNotes.length <= 160
              ? p.testingNotes
              : `${p.testingNotes.slice(0, 160)}…`}
          </p>
          {p.testingNotes.length > 160 && (
            <button
              onClick={() => setExpanded((e) => !e)}
              className="mt-2 text-xs font-semibold text-accent-600 hover:text-accent-700 dark:text-accent-400"
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        <div className="mt-5 flex items-center gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"
          >
            <Github className="h-4 w-4" /> Code
          </a>
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 transition-colors hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"
          >
            <Link2 className="h-4 w-4" /> Live Demo
          </a>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Featured Projects"
      title="Things I've built — and then tried to break."
      description="Each project is both a build and a QA exercise. I ship the app, then design test cases, log bugs, and (where it makes sense) automate the regression paths."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => (
          <Card key={p.name} p={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
