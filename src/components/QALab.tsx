import { useState } from 'react';
import { ExternalLink, FolderTree, FileCode, MousePointerClick, CheckCircle2 } from 'lucide-react';
import { Section, SITE } from '@/data';

type Tab = 'testcases' | 'bugs';

const testCases = [
  {
    id: 'TC-AUTH-01',
    title: 'Login with valid credentials',
    steps: '1. Open /login\n2. Enter valid email\n3. Enter valid password\n4. Click Sign in',
    expected: 'User redirected to /dashboard, avatar visible in header',
    actual: 'As expected',
    status: 'Pass',
  },
  {
    id: 'TC-AUTH-02',
    title: 'Login with wrong password',
    steps: '1. Open /login\n2. Enter valid email\n3. Enter wrong password\n4. Click Sign in',
    expected: 'Error "Invalid email or password", stay on /login',
    actual: 'As expected',
    status: 'Pass',
  },
  {
    id: 'TC-CART-01',
    title: 'Add out-of-stock item to cart',
    steps: '1. Open product with stock=0\n2. Click Add to cart',
    expected: 'Button disabled, tooltip "Out of stock"',
    actual: 'Item added to cart; checkout later fails with 500',
    status: 'Fail',
  },
  {
    id: 'TC-CHK-01',
    title: 'Checkout with expired session',
    steps: '1. Add item to cart\n2. Wait 30+ min (session expiry)\n3. Click Checkout',
    expected: 'Redirect to /login, cart preserved after re-auth',
    actual: 'Cart cleared on re-login; no toast shown',
    status: 'Fail',
  },
  {
    id: 'TC-PROD-01',
    title: 'Filter products by price range',
    steps: '1. Open /products\n2. Set min=₹500, max=₹2000\n3. Apply',
    expected: 'Only products within range shown, count updates',
    actual: 'As expected',
    status: 'Pass',
  },
];

const bugs = [
  {
    id: 'BG-01',
    title: 'Out-of-stock item can be added to cart',
    severity: 'Major',
    priority: 'High',
    status: 'Open',
    repro: '1. Open a product with stock = 0\n2. Click "Add to cart"\n→ Item is added; checkout later throws 500',
  },
  {
    id: 'BG-02',
    title: 'Cart cleared after session expiry on checkout',
    severity: 'Critical',
    priority: 'High',
    status: 'Open',
    repro: '1. Add item to cart\n2. Wait 30+ min\n3. Click Checkout → redirected to /login\n4. Re-login → cart is empty',
  },
  {
    id: 'BG-03',
    title: 'Promo code error toast shows raw API message',
    severity: 'Minor',
    priority: 'Low',
    status: 'Fixed',
    repro: '1. At checkout, enter invalid promo "XYZ"\n2. Toast displays "ERR_PROMO_INVALID_422" instead of friendly copy',
  },
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
      title="Artifacts from real testing work."
      description="Sample test cases, bug reports, a public Postman collection, and the Cypress automation suite for ShopCraft — the kind of artifacts a QA actually produces day to day."
    >
      {/* Tabs */}
      <div className="reveal mb-6 inline-flex rounded-lg border border-slate-200 bg-slate-100/60 p-1 dark:border-slate-800 dark:bg-slate-900/60">
        <button
          onClick={() => setTab('testcases')}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            tab === 'testcases'
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Test Cases
        </button>
        <button
          onClick={() => setTab('bugs')}
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
            tab === 'bugs'
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Bug Reports
        </button>
      </div>

      {tab === 'testcases' ? (
        <div className="reveal overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50/60 text-xs uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">ID</th>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Steps</th>
                  <th className="px-4 py-3 font-semibold">Expected</th>
                  <th className="px-4 py-3 font-semibold">Actual</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {testCases.map((tc) => (
                  <tr
                    key={tc.id}
                    className="transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/30"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-accent-600 dark:text-accent-400">
                      {tc.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{tc.title}</td>
                    <td className="px-4 py-3">
                      <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {tc.steps}
                      </pre>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{tc.expected}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{tc.actual}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${statusStyles[tc.status]}`}>
                        {tc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="reveal grid gap-4 md:grid-cols-3">
          {bugs.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-accent-600 dark:text-accent-400">
                  {b.id}
                </span>
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${statusStyles[b.status]}`}>
                  {b.status}
                </span>
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{b.title}</h3>
              <div className="mt-3 flex gap-2">
                <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${sevStyles[b.severity]}`}>
                  Sev: {b.severity}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  Pri: {b.priority}
                </span>
              </div>
              <div className="mt-3">
                <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Steps to reproduce
                </div>
                <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {b.repro}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Postman + Cypress cards */}
      <div className="reveal mt-6 grid gap-4 md:grid-cols-2">
        <a
          href={SITE.links.postman}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700"
        >
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
              <ExternalLink className="h-4 w-4 text-accent-600 dark:text-accent-400" />
              Postman API Testing Collection
            </div>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              ShopCraft API — auth, products, cart, checkout. 15+ requests covering 2xx/4xx/5xx.
            </p>
          </div>
          <ExternalLink className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
        </a>

        <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
            <FolderTree className="h-4 w-4 text-accent-600 dark:text-accent-400" />
            shopcraft-automation (Cypress)
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Spec structure, selectors, and coverage.
          </p>
          <div className="mt-3 rounded-lg bg-slate-950 p-3 font-mono text-[11px] leading-relaxed text-slate-300">
            <div>cypress/</div>
            <div className="pl-3">e2e/</div>
            <div className="pl-6 text-accent-300">auth.cy.js</div>
            <div className="pl-6 text-accent-300">cart.cy.js</div>
            <div className="pl-6 text-accent-300">checkout.cy.js</div>
            <div className="pl-3">support/</div>
            <div className="pl-6">selectors.js <span className="text-slate-500"># centralized</span></div>
            <div className="pl-6">commands.js</div>
          </div>
          <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-start gap-2">
              <FileCode className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
              <span>Selectors centralized in <code className="font-mono">selectors.js</code> — no brittle inline queries.</span>
            </div>
            <div className="flex items-start gap-2">
              <MousePointerClick className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-500" />
              <span>Covers login, cart add/remove, and checkout happy path.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
              <span>Runs against the ShopCraft staging env via <code className="font-mono">cypress run</code>.</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
