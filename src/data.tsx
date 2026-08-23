import { type ReactNode } from 'react';

export const SITE = {
  name: 'Mohammed Kaif Qureshi',
  role: 'QA Engineer | Aspiring Frontend Developer',
  valueProp:
    'I break software so users never have to. Manual & API testing today, automation and frontend tomorrow.',
  location: 'Mumbai, India',
  email: 'kaif.qr1@gmail.com',
  phone: '7039081439',
  links: {
    github: 'https://github.com/Kaifqr1',
    linkedin: 'https://www.linkedin.com/in/mohammed-kaif-qureshi/',
    resume: '/resume.pdf',
    postman: 'https://www.postman.com/mkaif-qureshi/workspace/qa-portfolio',
  },
};

export const SECTIONS: { id: string; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'qa-lab', label: 'QA Lab' },
  { id: 'bug-hunt', label: 'Bug Hunt' },
  { id: 'contact', label: 'Contact' },
];

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-6 ${className}`}>
      <div className="mx-auto max-w-5xl">
        {(eyebrow || title || description) && (
          <div className="reveal scroll-depth mb-12 max-w-2xl" data-scroll-depth="0.35">
            {eyebrow && (
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-600 dark:text-accent-400">
                <span className="h-px w-6 bg-accent-500/60" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
