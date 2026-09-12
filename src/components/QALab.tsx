import { useState } from 'react';
import { ExternalLink, Gauge, CheckCircle2, Code2 } from 'lucide-react';
import { Section, SITE } from '@/data';

type Tab = 'testcases' | 'bugs';

const testCases = [
  { id: 'TC-AUTH-01', title: 'Login with valid credentials', steps: '1. Open login\n2. Enter valid credentials\n3. Submit', expected: 'User reaches the authenticated area', actual: 'Pass', status: 'Pass' },
  { id: 'TC-AUTH-02', title: 'Login with wrong password', steps: '1. Open login\n2. Enter valid email\n3. Enter invalid password', expected: 'Clear validation error; user stays on login', actual: 'Pass', status: 'Pass' },
  { id: 'TC-CART-01', title: 'Out-of-stock item handling', steps: '1. Open an out-of-stock product\n2. Attempt to add it to cart', expected: 'User cannot proceed with an unavailable item', actual: 'Fail — defect candidate', status: 'Fail' },
  { id: 'TC-CHK-01', title: 'Session expiry during checkout', steps: '1. Add an item\n2. Let the session expire\n3. Continue to checkout', expected: 'User is prompted to authenticate without losing valid cart state', actual: 'Fail — defect candidate', status: 'Fail' },
  { id: 'TC-PROD-01', title: 'Filter products by price range', steps: '1. Open products\n2. Set minimum and maximum\n3. Apply filter', expected: 'Only matching products are displayed', actual: 'Pass', status: 'Pass' },
];

const bugs = [
  { id: 'BG-01', title: 'Out-of-stock item can be added to cart', severity: 'Major', priority: 'High', status: 'Open', repro: '1. Open an out-of-stock product\n2. Click Add to cart\n3. Observe that the item is accepted' },
  { id: 'BG-02', title: 'Cart state is not preserved after session expiry', severity: 'Critical', priority: 'High', status: 'Open', repro: '1. Add an item\n2. Expire the session\n3. Re-authenticate\n4. Check the cart' },
  { id: 'BG-03', title: 'Technical validation text should be user-friendly', severity: 'Minor', priority: 'Low', status: 'Fixed', repro: '1. Trigger an invalid input path\n2. Observe the raw technical error\n3. Replace it with actionable user-facing copy' },
];

const sevStyles: Record<string, string> = {
  Critical: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Major: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  Minor: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
};
const statusStyles: Record<string, string> = {
  Pass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Fail: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Open: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  Fixed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
};

export function QALab() {
  const [tab, setTab] = useState<Tab>('testcases');
  return (
    <Section
      id="qa-lab"
      eyebrow="QA Lab"
      title="Evidence of how I think about quality."
      description="Portfolio testing artifacts covering test-case design, defect reporting, API testing, and the next step in my automation journey."
    >
      <div className="reveal mb-6 inline-flex rounded-lg border border-slate-200 bg-slate-100/60 p-1 dark:border-slate-800 dark:bg-slate-900/60">
        {(['testcases', 'bugs'] as Tab[]).map((item) => (
          <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-md px-4 py-1.5 text-sm font-medium capitalize transition-colors ${tab === item ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}>
            {item === 'testcases' ? 'Test Cases' : 'Bug Reports'}
          </button>
        ))}
      </div>

      {/* Do not put .reveal on tab-switched content. The global reveal observer runs once
          on mount, so newly mounted tab content would otherwise stay opacity: 0. */}
      {tab === 'testcases' ? (
        <div key="testcases" className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/60 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
                <tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Scenario</th><th className="px-4 py-3">Steps</th><th className="px-4 py-3">Expected</th><th className="px-4 py-3">Result</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {testCases.map((tc) => (
                  <tr key={tc.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-accent-600 dark:text-accent-400">{tc.id}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{tc.title}</td>
                    <td className="px-4 py-3"><pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">{tc.steps}</pre></td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{tc.expected}</td>
                    <td className="px-4 py-3"><span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${statusStyles[tc.status]}`}>{tc.actual}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div key="bugs" className="grid gap-4 md:grid-cols-3">
          {bugs.map((b) => (
            <article key={b.id} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between"><span className="font-mono text-xs font-semibold text-accent-600 dark:text-accent-400">{b.id}</span><span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${statusStyles[b.status]}`}>{b.status}</span></div>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{b.title}</h3>
              <div className="mt-3 flex gap-2"><span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${sevStyles[b.severity]}`}>Sev: {b.severity}</span><span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">Pri: {b.priority}</span></div>
              <div className="mt-3"><div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">Reproduction</div><pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">{b.repro}</pre></div>
            </article>
          ))}
        </div>
      )}

      <div className="reveal mt-6 grid gap-4 md:grid-cols-2">
        <a href={SITE.links.postman} target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700">
          <div><div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"><ExternalLink className="h-4 w-4 text-accent-600 dark:text-accent-400" /> Postman API Testing Collection</div><p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Public workspace for practising request, response, status-code, and negative-path validation.</p></div>
          <ExternalLink className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
        </a>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white"><Code2 className="h-4 w-4 text-accent-600 dark:text-accent-400" /> Selenium automation roadmap</div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Automation is intentionally marked as learning rather than overstated as production experience.</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {[['01', 'WebDriver basics'], ['02', 'Stable selectors'], ['03', 'Regression flows']].map(([n, label]) => <div key={n} className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950/60"><div className="font-mono text-[10px] font-bold text-accent-600 dark:text-accent-400">{n}</div><div className="mt-1 text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</div></div>)}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><Gauge className="h-3.5 w-3.5" /> Next: turn stable manual regression cases into maintainable Selenium tests.</div>
        </div>
      </div>

      <div className="reveal mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> The portfolio labels learning areas honestly instead of presenting them as completed professional experience.</div>
    </Section>
  );
}
