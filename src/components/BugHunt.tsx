import { useState } from 'react';
import { Bug, RotateCcw, Trophy, Eye, EyeOff } from 'lucide-react';
import { Section } from '@/data';

type BugInfo = {
  id: string;
  field: 'email' | 'password' | 'submit' | 'toggle';
  severity: 'Critical' | 'Major' | 'Minor';
  status: 'Open' | 'Fixed';
  title: string;
  desc: string;
};

const BUGS: BugInfo[] = [
  {
    id: 'BH-01',
    field: 'email',
    severity: 'Minor',
    status: 'Open',
    title: 'No client-side email validation',
    desc: 'Typing "not-an-email" passes through to the server with no inline error. Only a generic 400 returns.',
  },
  {
    id: 'BH-02',
    field: 'password',
    severity: 'Major',
    status: 'Open',
    title: 'No minimum-length check',
    desc: 'A 1-character password is accepted by the client. Server rejects, but the error is a raw stack trace.',
  },
  {
    id: 'BH-03',
    field: 'toggle',
    severity: 'Minor',
    status: 'Fixed',
    title: 'Show/hide password toggle has no accessible label',
    desc: 'Screen readers announce "button" with no state. Added aria-label + aria-pressed in fix.',
  },
  {
    id: 'BH-04',
    field: 'submit',
    severity: 'Critical',
    status: 'Open',
    title: 'Submit button not disabled during request',
    desc: 'Double-clicking Sign in fires two POST /login calls and can create duplicate sessions.',
  },
];

const sevStyles: Record<string, string> = {
  Critical: 'bg-rose-500 text-white',
  Major: 'bg-amber-500 text-white',
  Minor: 'bg-sky-500 text-white',
};
const sevRing: Record<string, string> = {
  email: 'ring-rose-400/70',
  password: 'ring-amber-400/70',
  submit: 'ring-rose-500/80',
  toggle: 'ring-sky-400/70',
};

export function BugHunt() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reveal = (id: string) => setRevealed((s) => new Set(s).add(id));
  const allFound = revealed.size === BUGS.length;

  const reset = () => {
    setRevealed(new Set());
    setEmail('');
    setPw('');
    setShowPw(false);
    setSubmitting(false);
  };

  return (
    <Section
      id="bug-hunt"
      eyebrow="Bug Hunt Demo"
      title="Find the bugs in this login form."
      description="This is a deliberately buggy login form. Hover or interact with each field to reveal the bugs I'd log — tagged with severity and status. Think of it as a mini test session."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Buggy form */}
        <div className="reveal rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Sign in to ShopCraft</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Demo only — no real auth.</p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div
              onMouseEnter={() => reveal('BH-01')}
              onFocus={() => reveal('BH-01')}
              className={`group relative rounded-lg transition-all ${
                revealed.has('BH-01') ? `ring-2 ${sevRing.email}` : 'ring-1 ring-slate-200 dark:ring-slate-700'
              }`}
            >
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border-0 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
              />
              {revealed.has('BH-01') && <BugTag bug={BUGS[0]} />}
            </div>

            {/* Password */}
            <div
              onMouseEnter={() => reveal('BH-02')}
              onFocus={() => reveal('BH-02')}
              className={`group relative rounded-lg transition-all ${
                revealed.has('BH-02') ? `ring-2 ${sevRing.password}` : 'ring-1 ring-slate-200 dark:ring-slate-700'
              }`}
            >
              <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Password
              </label>
              <div className="flex items-center gap-2">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border-0 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white"
                />
                <button
                  onClick={() => {
                    setShowPw((s) => !s);
                    reveal('BH-03');
                  }}
                  aria-label="Show password"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {revealed.has('BH-02') && <BugTag bug={BUGS[1]} />}
              {revealed.has('BH-03') && !revealed.has('BH-02') && <BugTag bug={BUGS[2]} />}
            </div>

            {/* Submit */}
            <button
              onClick={() => {
                setSubmitting(true);
                reveal('BH-04');
                setTimeout(() => setSubmitting(false), 1200);
              }}
              onMouseEnter={() => reveal('BH-04')}
              className={`group relative w-full rounded-lg bg-accent-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-accent-700 ${
                revealed.has('BH-04') ? `ring-2 ${sevRing.submit}` : ''
              }`}
            >
              {submitting ? 'Signing in…' : 'Sign in'}
              {revealed.has('BH-04') && <BugTag bug={BUGS[3]} />}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {revealed.size} / {BUGS.length} bugs found
            </span>
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Findings panel */}
        <div className="reveal rounded-2xl border border-slate-200 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/40">
          <div className="mb-4 flex items-center gap-2">
            <Bug className="h-4 w-4 text-accent-600 dark:text-accent-400" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Findings</h3>
          </div>

          {allFound && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
              <Trophy className="h-4 w-4" />
              All bugs found — nice test session!
            </div>
          )}

          <div className="space-y-3">
            {BUGS.map((b) => {
              const found = revealed.has(b.id);
              return (
                <div
                  key={b.id}
                  className={`rounded-lg border p-3 transition-all ${
                    found
                      ? 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900'
                      : 'border-dashed border-slate-300 bg-transparent dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-semibold ${found ? 'text-accent-600 dark:text-accent-400' : 'text-slate-400'}`}>
                      {found ? b.id : '???'}
                    </span>
                    {found ? (
                      <div className="flex gap-1.5">
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${sevStyles[b.severity]}`}>
                          {b.severity}
                        </span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                            b.status === 'Fixed'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                              : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">Interact to reveal</span>
                    )}
                  </div>
                  {found ? (
                    <>
                      <div className="mt-1.5 text-sm font-medium text-slate-900 dark:text-white">{b.title}</div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{b.desc}</p>
                    </>
                  ) : (
                    <div className="mt-1.5 text-sm text-slate-400">Hidden finding</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

function BugTag({ bug }: { bug: BugInfo }) {
  return (
    <div className="absolute -right-2 -top-2 z-10 flex translate-x-full items-center gap-1.5 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-semibold text-white shadow-lg dark:bg-black">
      <span className={`rounded px-1 py-0.5 ${sevStyles[bug.severity]}`}>{bug.severity}</span>
      <span className="text-slate-300">{bug.id}</span>
    </div>
  );
}
