import { Section } from '@/data';

type SkillGroup = {
  name: string;
  icon: string;
  status?: string;
  items: { label: string; level: 'core' | 'working' | 'learning' }[];
};

const groups: SkillGroup[] = [
  {
    name: 'Manual Testing',
    icon: 'clipboard',
    items: [
      { label: 'Test case design', level: 'core' },
      { label: 'Bug reporting', level: 'core' },
      { label: 'STLC', level: 'core' },
      { label: 'Defect lifecycle', level: 'core' },
      { label: 'Smoke / Sanity / Regression', level: 'core' },
    ],
  },
  {
    name: 'Automation',
    icon: 'zap',
    status: 'In progress',
    items: [{ label: 'Cypress', level: 'learning' }],
  },
  {
    name: 'API Testing',
    icon: 'plug',
    items: [{ label: 'Postman', level: 'working' }],
  },
  {
    name: 'Tools',
    icon: 'wrench',
    items: [
      { label: 'Jira', level: 'working' },
      { label: 'Git / GitHub', level: 'working' },
    ],
  },
  {
    name: 'Dev-adjacent',
    icon: 'code',
    status: 'Learning',
    items: [
      { label: 'HTML / CSS / JS basics', level: 'learning' },
      { label: 'Flutter / Dart', level: 'learning' },
    ],
  },
];

const levelStyles: Record<string, string> = {
  core: 'bg-accent-100 text-accent-700 dark:bg-accent-900/40 dark:text-accent-300',
  working: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
  learning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

const icons: Record<string, string> = {
  clipboard: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  zap: 'M13 10V3L4 14h7v7l9-11h-7z',
  plug: 'M12 22v-5M9 8V2M15 8V2M5 8h14v3a7 7 0 01-14 0V8z',
  wrench: 'M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.1 2.1-2.8-2.8 2.1-2.1z',
  code: 'M16 18l6-6-6-6M8 6l-6 6 6 6',
};

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I test with, and what I'm learning."
      description="Grouped by discipline. Core skills are ones I've shipped in real projects; working skills are in active professional use; learning skills are in progress."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((g, i) => (
          <div
            key={g.name}
            className="reveal rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
            data-reveal-delay={String(i * 70)}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400">
                  <svg
                    className="h-4.5 w-4.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icons[g.icon]} />
                  </svg>
                </span>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  {g.name}
                </h3>
              </div>
              {g.status && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  {g.status}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s.label}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium ${levelStyles[s.level]}`}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-accent-500" /> Core
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-sky-500" /> Working
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded bg-amber-500" /> Learning
        </span>
      </div>
    </Section>
  );
}
