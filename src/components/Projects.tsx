import { ArrowUpRight, Bug, CheckCircle2, Github, ShieldCheck, Star } from 'lucide-react';
import { Section } from '@/data';

type Project = {
  name: string;
  tagline: string;
  problem: string;
  approach: string;
  qaFocus: string;
  tools: string[];
  github?: string;
  demo?: string;
  caseStudy?: string;
};

const projects: Project[] = [
  {
    name: 'QRServe',
    tagline: 'Digital menus, QR table cards, and managed restaurant updates',
    problem: 'Independent restaurants need a simple digital menu that can be updated without rebuilding the guest experience.',
    approach: 'Built a responsive React/TypeScript product with an operator workspace, venue and menu management, branded QR table cards, and a fast public menu experience.',
    qaFocus: 'Validated authentication, authorization, menu validation, guest order-list behaviour, QR destination handling, storage safeguards, and responsive flows.',
    tools: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js', 'Express', 'tRPC', 'TiDB', 'Cloudinary', 'Vercel', 'Vitest'],
    github: 'https://github.com/Kaifqr1/QR_Serve',
    demo: 'https://qr-serve-three.vercel.app',
    caseStudy: '#case-studies',
  },
  {
    name: 'ShopCraft',
    tagline: 'E-commerce application used as a QA practice target',
    problem: 'A realistic e-commerce flow is useful for practising functional, negative, regression, and API testing beyond simple demo forms.',
    approach: 'Used an e-commerce application as a structured testing target across authentication, catalogue, cart, checkout, and admin-oriented flows.',
    qaFocus: 'Test-case design, boundary and negative scenarios, defect reporting, regression thinking, and API checks. Selenium is the automation direction shown elsewhere in this portfolio; no Cypress claims are made here.',
    tools: ['HTML/CSS/JS', 'Node.js', 'MongoDB', 'Postman', 'Jira', 'Git', 'Selenium — learning'],
    caseStudy: '#qa-lab',
  },
  {
    name: 'Local Business Site Templates',
    tagline: 'Reusable React template for service businesses',
    problem: 'Small businesses often need a polished web presence without starting a site from scratch.',
    approach: 'Built a reusable React and Tailwind template with responsive layouts and a deployment-ready structure.',
    qaFocus: 'Responsive behaviour, form flows, navigation, image handling, accessibility basics, and production build checks.',
    tools: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Vercel'],
    github: 'https://github.com/Kaifqr1/velocity-portfolio',
    demo: 'https://velocity-portfolio.vercel.app',
  },
  {
    name: 'Code Roast & Smell Test',
    tagline: 'AI-assisted code-quality feedback tool',
    problem: 'Developers can benefit from quick, approachable feedback on code quality and common code smells.',
    approach: 'Built a web app that accepts code and returns an AI-generated review with a quality rating and improvement guidance.',
    qaFocus: 'API contract checks, validation and error states, large inputs, rate-limit behaviour, and adversarial input testing.',
    tools: ['React', 'TypeScript', 'AI API', 'Tailwind', 'Postman', 'Git'],
    github: 'https://github.com/Kaifqr1/code-roast',
    demo: 'https://code-roast-smell-code-roast.vercel.app/',
    caseStudy: '#case-studies',
  },
];

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`group relative overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white/85 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-200 hover:shadow-[0_28px_80px_rgba(15,23,42,0.11)] dark:border-slate-800/80 dark:bg-slate-900/70 dark:shadow-black/20 dark:hover:border-accent-900/60 ${featured ? 'lg:col-span-2' : ''}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-70" />
      <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-accent-500/5 blur-3xl transition-all duration-500 group-hover:bg-accent-500/10" />

      <div className={`relative grid gap-7 p-6 sm:p-8 ${featured ? 'lg:grid-cols-[1.15fr_.85fr] lg:p-9' : ''}`}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              {featured && (
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-accent-200 bg-accent-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent-700 dark:border-accent-900/60 dark:bg-accent-950/40 dark:text-accent-300">
                  <Star className="h-3 w-3 fill-current" /> Flagship project
                </span>
              )}
              <h3 className={`${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'} font-black tracking-[-0.03em] text-slate-950 dark:text-white`}>{project.name}</h3>
              <p className="mt-2 max-w-xl text-sm font-semibold leading-6 text-accent-600 dark:text-accent-400">{project.tagline}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-white"><Github className="h-4 w-4" /></a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-600 transition-all hover:-translate-y-0.5 hover:border-accent-300 hover:text-accent-600 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:border-accent-800 dark:hover:text-accent-300"><ArrowUpRight className="h-4 w-4" /></a>}
            </div>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400"><Bug className="h-3.5 w-3.5" /> Problem</p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{project.problem}</p>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400"><CheckCircle2 className="h-3.5 w-3.5" /> Approach</p>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{project.approach}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/55">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-accent-500/10 blur-3xl" />
          <div className="relative">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-accent-600 dark:text-accent-400"><ShieldCheck className="h-3.5 w-3.5" /> QA focus</p>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">{project.qaFocus}</p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.tools.map((tool) => <span key={tool} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">{tool}</span>)}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-200/80 pt-4 text-xs font-extrabold dark:border-slate-800">
              {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-600 transition-colors hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"><Github className="h-3.5 w-3.5" /> Source</a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-600 transition-colors hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"><ArrowUpRight className="h-3.5 w-3.5" /> Live demo</a>}
              {project.caseStudy && <a href={project.caseStudy} className="inline-flex items-center gap-1.5 text-slate-600 transition-colors hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400"><ShieldCheck className="h-3.5 w-3.5" /> Case study</a>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title="Built to be used. Tested to be trusted."
      description="A focused collection of work showing product thinking, implementation, testing, and quality — without the noise of unfinished demos."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {projects.map((project, index) => <ProjectCard key={project.name} project={project} featured={index === 0} />)}
      </div>
    </Section>
  );
}
