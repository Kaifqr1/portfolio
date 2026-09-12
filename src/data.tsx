import { type ReactNode } from 'react';

export const SITE = {
  name: 'Mohammed Kaif Qureshi',
  role: 'QA Engineer | Manual & API Testing',
  valueProp:
    'I build, test, and break web experiences with a QA-first mindset — focused on reliable user flows, clear bug reports, API validation, and growing Selenium automation skills.',
  location: 'Mumbai, India',
  email: 'kaif.qr1@gmail.com',
  phone: '7039081439',
  links: {
    github: 'https://github.com/Kaifqr1',
    linkedin: 'https://www.linkedin.com/in/mohammed-kaif-qureshi/',
    resume: '/resume.pdf',
    postman: 'https://www.postman.com/mkaif-qureshhi/workspace/qa-portfolio',
  },
};

export const SECTIONS: { id: string; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'case-studies', label: 'Case Studies' },
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
    <section id={id} className={`scene-section scroll-mt-28 px-6 ${className}`}>
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || description) && (
          <div className="scene-heading reveal scroll-depth mb-12 max-w-3xl sm:mb-14" data-scroll-depth="0.35">
            {eyebrow && (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-200/70 bg-accent-50/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-accent-700 shadow-sm backdrop-blur dark:border-accent-900/50 dark:bg-accent-950/30 dark:text-accent-300">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-500 shadow-[0_0_12px_rgb(99_102_241_/_0.65)]" />
                {eyebrow}
              </div>
            )}
            {title && <h2 className="text-balance text-3xl font-black tracking-[-0.035em] text-slate-950 dark:text-white sm:text-5xl">{title}</h2>}
            {description && <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">{description}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
