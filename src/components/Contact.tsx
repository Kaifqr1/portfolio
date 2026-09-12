import { useEffect, useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, MapPin } from 'lucide-react';
import { Section, SITE } from '@/data';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
      setSent(true);
      window.history.replaceState({}, document.title, `${window.location.pathname}#contact`);
      const timer = window.setTimeout(() => setSent(false), 6000);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError('');
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    if (!name || !email || !message) {
      e.preventDefault();
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.preventDefault();
      setError('Please enter a valid email address.');
      return;
    }

    // Let the browser submit the form directly to FormSubmit. This avoids
    // mailto URL encoding issues and works reliably on mobile browsers.
    setForm({ name, email, message });
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk — QA roles, frontend-adjacent, or a code review."
      description="Based in Mumbai, open to remote and on-site. Drop a message below or reach out directly."
    >
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <form
          onSubmit={onSubmit}
          action="https://formsubmit.co/kaif.qr1@gmail.com"
          method="POST"
          className="reveal rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <input type="hidden" name="_subject" value="New portfolio enquiry" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_next" value="https://portfolio-2026.vercel.app/?sent=1#contact" />
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">Name</label>
              <input id="contact-name" name="name" type="text" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">Email</label>
              <input id="contact-email" name="email" type="email" required maxLength={254} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </div>
            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">Message</label>
              <textarea id="contact-message" name="message" required maxLength={5000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="What would you like to discuss?" rows={5} className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
            </div>

            {error && <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
            {sent && (
              <div role="status" className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Message sent successfully. Thanks for reaching out!
              </div>
            )}

            <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent-600/30 transition-all hover:bg-accent-700 hover:shadow-md">
              <Send className="h-4 w-4" /> Send message
            </button>
          </div>
        </form>

        <div className="reveal space-y-3">
          <a href={`mailto:${SITE.email}`} className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400"><Mail className="h-5 w-5" /></span>
            <div><div className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</div><div className="text-sm font-semibold text-slate-900 dark:text-white">{SITE.email}</div></div>
          </a>
          <a href={SITE.links.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400"><Linkedin className="h-5 w-5" /></span>
            <div><div className="text-xs font-medium uppercase tracking-wider text-slate-500">LinkedIn</div><div className="text-sm font-semibold text-slate-900 dark:text-white">/in/mohammed-kaif-qureshi</div></div>
          </a>
          <a href={SITE.links.github} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400"><Github className="h-5 w-5" /></span>
            <div><div className="text-xs font-medium uppercase tracking-wider text-slate-500">GitHub</div><div className="text-sm font-semibold text-slate-900 dark:text-white">@Kaifqr1</div></div>
          </a>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400"><MapPin className="h-5 w-5" /></span>
            <div><div className="text-xs font-medium uppercase tracking-wider text-slate-500">Location</div><div className="text-sm font-semibold text-slate-900 dark:text-white">{SITE.location}</div></div>
          </div>
        </div>
      </div>
    </Section>
  );
}
