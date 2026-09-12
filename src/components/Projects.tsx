import { ArrowUpRight, Bug, CheckCircle2, Github, ShieldCheck } from 'lucide-react';
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
};

const projects: Project[] = [
  {
    name: 'QRServe',
    tagline: 'Digital menus, QR table cards, and managed restaurant updates',
    problem: 'Independent restaurants need a simple digital menu that can be updated without rebuilding the guest experience.',
    approach: 'Built a responsive React/TypeScript product with an operator workspace, venue and menu management, branded QR table cards, and a fast public menu experience.',
    qaFocus: 'Validated authentication, authorization, menu validation, guest order-list behaviour, QR destination handling, storage safeguards, and responsive flows.',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Node.js', 'Express', 'tRPC', 'TiDB', 'Cloudinary', 'Vercel', 'Vitest'],
    github: 'https://github.com/Kaifqr1/QR_Serve',
    demo: 'https://qr-serve-three.vercel.app',
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
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel'],
    github: 'https://github.com/Kaifqr1/velocity-portfolio',
    demo: 'https://velocity-portfolio.vercel.app',
  },
  {
    name: 'Code Roast & Smell Test',
    tagline: 'AI-assisted code-quality feedback tool',
    problem: 'Developers can benefit from quick, approachable feedback on code quality and common code smells.',
    approach: 'Built a web app that accepts code and returns an AI-generated review with a quality rating and improvement guidance.',
    qaFocus: 'API contract checks, validation and error states, large inputs, rate-limit behaviour, and adversarial input testing.',
    tools: ['React', 'TypeScript', 'AI API', 'Tailwind CSS', 'Postman', 'Git'],
    github: 'https://github.com/Kaifqr1/code-roast',
    demo: 'https://code-roast-smell-code-roast.vercel.app/',
  },
];

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 ${featured ? 'lg:col-span-2' : ''}`}>
      <div className="h-1 w-full bg-gradient-to-r from-accent-500 via-sky-500 to-transparent" />
      <div className={`grid gap-8 p-6 sm:p-7 ${featured ? 'lg:grid-cols-[1.15fr_.85fr]' : ''}`}>
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              {featured && <span className="mb-2 inline-flex rounded-full bg-accent-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-700 dark:bg-accent-900/40 dark:text-accent-300">Flagship project</span>}
              <h3 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{project.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent-600 dark:text-accent-400">{project.tagline}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {project.github && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"><Github className="h-4 w-4" /></a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.name} live demo`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"><ArrowUpRight className="h-4 w-4" /></a>}
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400"><Bug className="h-3.5 w-3.5" /> Problem</p>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{project.problem}</p>
            </div>
            <div>
              <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400"><CheckCircle2 className="h-3.5 w-3.5" /> Approach</p>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{project.approach}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-950/40">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent-600 dark:text-accent-400"><ShieldCheck className="h-3.5 w-3.5" /> QA focus</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{project.qaFocus}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tools.map((tool) => <span key={tool} className="rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800">{tool}</span>)}
          </div>
          <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-200 pt-4 text-sm font-semibold dark:border-slate-800">
            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-700 hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"><Github className="h-4 w-4" /> Source</a>}
            {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-700 hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"><ArrowUpRight className="h-4 w-4" /> Live</a>}
            {project.caseStudy && <a href={project.caseStudy} className="inline-flex items-center gap-1.5 text-slate-700 hover:text-accent-600 dark:text-slate-300 dark:hover:text-accent-400"><ShieldCheck className="h-4 w-4" /> QA Lab</a>}
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
      description="A small set of projects chosen to show how I approach product thinking, implementation, testing, and quality — rather than a long list of unfinished demos."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => <ProjectCard key={project.name} project={project} featured={index === 0} />)}
      </div>
    </Section>
  );
}
