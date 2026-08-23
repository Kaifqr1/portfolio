import { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, MapPin } from 'lucide-react';
import { Section, SITE } from '@/data';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSending(true);
    try {
      const mailto = new URL(`mailto:${SITE.email}`);
      mailto.searchParams.set('subject', `Portfolio enquiry from ${form.name.trim()}`);
      mailto.searchParams.set(
        'body',
        `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`,
      );
      window.location.href = mailto.toString();
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : 'Something went wrong. Please try again or email me directly.');
    } finally {
      setSending(false);
    }
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
          className="reveal rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-600 dark:text-slate-400">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What would you like to discuss?"
                rows={5}
                className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {error && <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
            {sent && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Thanks! Message recorded — I'll get back to you soon.
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent-600/30 transition-all hover:bg-accent-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" /> {sending ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>

        <div className="reveal space-y-3">
          <a
            href={`mailto:${SITE.email}`}
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Email</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{SITE.email}</div>
            </div>
          </a>
          <a
            href={SITE.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400">
              <Linkedin className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500">LinkedIn</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">/in/mohammed-kaif-qureshi</div>
            </div>
          </a>
          <a
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-accent-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-accent-700"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400">
              <Github className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500">GitHub</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">@Kaifqr1</div>
            </div>
          </a>
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-accent-600 dark:bg-slate-800 dark:text-accent-400">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-slate-500">Location</div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">{SITE.location}</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
