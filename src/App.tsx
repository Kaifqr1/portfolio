import { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react';
import { SITE } from '@/data';
import './editorial-motion.css';
import './creative-scroll.css';
import './hero-portrait.css';
import './space-tight.css';
import './premium-motion.css';
import './responsive-fit.css';

const services = [
  ['01', 'Manual QA', 'Requirement checks, test cases, functional testing, regression and usability validation.'],
  ['02', 'API Testing', 'Request validation, status codes, payload checks, negative cases and Postman workflows.'],
  ['03', 'Exploratory Testing', 'Structured testing that pushes real user flows and edge cases beyond happy paths.'],
  ['04', 'Bug Reporting', 'Clear reproduction steps, expected vs actual results, severity and evidence developers can act on.'],
  ['05', 'Selenium', 'Practical browser automation skills focused on stable, maintainable test flows.'],
];

const projects = [
  { number: '01', title: 'QRServe', type: 'PRODUCT / QA CASE STUDY', description: 'A no-app digital menu platform for independent restaurants — from owner setup to live QR menu journeys.', tags: ['Web App', 'CRUD', 'QR', 'QA'], accent: 'lime', href: 'https://qr-serve-three.vercel.app/' },
  { number: '02', title: 'GNG — Grill & Glow', type: 'RESTAURANT WEB EXPERIENCE', description: 'A premium restaurant experience with responsive UI, branded QR access, analytics and motion-focused presentation.', tags: ['React', 'Vercel', 'Analytics', 'UX'], accent: 'orange', href: 'https://bnb-mumbai.vercel.app/' },
  { number: '03', title: 'Code Roast Smell', type: 'DEVELOPER TOOL', description: 'A web tool for inspecting code quality signals and turning technical findings into useful feedback.', tags: ['React', 'API', 'GitHub', 'Testing'], accent: 'blue', href: 'https://code-roast-smell-code-roast.vercel.app/' },
  { number: '04', title: 'ShopCraft', type: 'E-COMMERCE WEB APP', description: 'A practical shopping experience concept focused on product discovery, browsing flows and a clean customer journey.', tags: ['Web App', 'E-Commerce', 'UX', 'Testing'], accent: 'purple', href: '#contact' },
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('is-in', entry.isIntersecting);
    }), { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function useScrollMotion() {
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty('--page-progress', String(progress));
      document.documentElement.style.setProperty('--planet-scroll', `${Math.min(window.scrollY * -0.08, 90)}px`);
      document.documentElement.style.setProperty('--hero-lift', `${Math.min(window.scrollY * -0.035, 42)}px`);
      document.documentElement.style.setProperty('--hero-copy-lift', `${Math.min(window.scrollY * -0.02, 24)}px`);
      document.documentElement.style.setProperty('--rail-shift', `${Math.min(window.scrollY * 0.12, 90)}px`);
      document.documentElement.style.setProperty('--rail-y', `${Math.min(window.scrollY * 0.08, 80)}px`);
      document.documentElement.style.setProperty('--copy-drift', `${Math.min(window.scrollY * -0.05, 45)}px`);
      document.documentElement.style.setProperty('--name-drift', `${Math.min(window.scrollY * 0.04, 35)}px`);
      document.documentElement.style.setProperty('--bottom-drift', `${Math.min(window.scrollY * -0.04, 25)}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
}

function VisualMark({ accent }: { accent: string }) {
  const title = accent === 'orange' ? 'GNG' : accent === 'red' ? 'LIFEBLOOD' : accent === 'blue' ? 'CODE / ROAST' : accent === 'purple' ? 'SHOPCRAFT' : 'QRSERVE';
  return <div className={`project-visual project-visual-${accent}`} aria-hidden="true">
    <div className="visual-noise" /><div className="visual-window"><div className="visual-window-bar"><i /><i /><i /></div>
      <div className="visual-window-content"><span>QUALITY / DIGITAL</span><strong>{title}</strong><div className="visual-lines"><i /><i /><i /><i /></div></div>
    </div><div className="visual-orbit" /><div className="visual-dot" />
  </div>;
}

const Char = ({ children, space = false }: { children?: string; space?: boolean }) => <span className={`hero-char${space ? ' hero-space' : ''}`} aria-hidden="true">{space ? '\u00a0' : children}</span>;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  useReveal(); useScrollMotion();

  useEffect(() => {
    const start = performance.now();
    const duration = 1150;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setLoadProgress(progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
      else window.setTimeout(() => setLoading(false), 180);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 36;
      const y = (event.clientY / window.innerHeight - 0.5) * 36;
      heroRef.current?.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current?.style.setProperty('--mouse-y', `${y}px`);
      if (!isTouch) {
        document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
        document.querySelector<HTMLElement>('.cursor-dot')?.style.setProperty('transform', `translate3d(${event.clientX}px,${event.clientY}px,0)`);
        document.querySelector<HTMLElement>('.cursor-ring')?.style.setProperty('transform', `translate3d(${event.clientX}px,${event.clientY}px,0)`);
        document.body.classList.add('cursor-ready');
      }
    };
    const onOver = (event: MouseEvent) => { if ((event.target as HTMLElement)?.closest('a,button,.project-card')) document.body.classList.add('cursor-hover'); };
    const onOut = (event: MouseEvent) => { if ((event.target as HTMLElement)?.closest('a,button,.project-card')) document.body.classList.remove('cursor-hover'); };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    window.addEventListener('mouseout', onOut, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mouseout', onOut);
      document.body.classList.remove('cursor-ready', 'cursor-hover');
    };
  }, []);

  const handleProjectMove = (event: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -5;
    event.currentTarget.style.setProperty('--tilt-x', `${x}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${y}deg`);
  };
  const resetProjectTilt = (event: React.MouseEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return <div className="editorial-site">
    <div className={`site-loader${loading ? '' : ' is-done'}`} aria-hidden={!loading}>
      <div className="loader-inner">
        <div className="loader-top"><span>MKQ / 2026</span><span>{Math.round(loadProgress * 100)}%</span></div>
        <h1 className="loader-name">MOHAMMED<br />KAIF QU.</h1>
        <div className="loader-bar"><i style={{ '--loader-progress': loadProgress } as React.CSSProperties} /></div>
      </div>
    </div>
    <div className="cursor-dot" aria-hidden="true" /><div className="cursor-ring" aria-hidden="true" />
    <div className="page-progress" />
    <header className="editorial-nav">
      <a href="#home" className="brand-mark magnetic">MKQ<span>®</span></a>
      <div className="nav-status">QA ENGINEER <b>/</b> MUMBAI</div>
      <button className="menu-button magnetic" onClick={() => setMenuOpen(v => !v)} aria-label="Open navigation">{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {menuOpen && <div className="menu-panel">{['home', 'services', 'about', 'projects', 'case-studies', 'qa-lab', 'contact'].map((id, i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{id.toUpperCase()}<ArrowUpRight /></a>)}</div>}

    <main>
      <section id="home" ref={heroRef} className="editorial-hero">
        <div className="hero-stage" aria-hidden="true"><div className="hero-grid-depth" /><div className="hero-orb-small" /></div>
        <div className="hero-planet" aria-hidden="true"><div className="planet-ring" /><div className="planet-core" /><div className="planet-glint" /></div>
        <div className="hero-meta" data-reveal><span>04.0</span><span>QUALITY / NO ASSUMPTIONS</span></div>
        <div className="hero-name" data-reveal>
          <p>QUALITY, THROUGH EVERY FLOW</p>
          <h1>
            <span className="hero-line"><Char>M</Char><Char>O</Char><Char>H</Char><Char>A</Char><Char>M</Char><Char>M</Char><Char>E</Char><Char>D</Char></span><br />
            <span className="hero-line"><em><Char>K</Char><Char>A</Char><Char>I</Char><Char>F</Char></em></span><br />
            <span className="hero-line"><Char>Q</Char><Char>U</Char><Char>R</Char><Char>E</Char><Char>S</Char><Char>H</Char><Char>I</Char></span>
          </h1>
        </div>
        <div className="hero-copy" data-reveal><p>I help teams ship dependable digital experiences through thoughtful testing, clear defect reporting and a user-first QA mindset.</p><a className="magnetic" href="#projects">EXPLORE WORK <ArrowDownRight /></a></div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span>↓</span></div>
      </section>

      <section id="services" className="dark-section services-section">
        <div className="section-kicker" data-reveal>BEHIND THE TEST / BEYOND THE SCREEN</div>
        <div className="section-title-row" data-reveal><h2>SERVICES</h2><span>05</span></div>
        <p className="section-intro" data-reveal>BASED ON MY BACKGROUND IN SOFTWARE DEVELOPMENT AND QUALITY ASSURANCE, HERE'S WHAT I'M COMFORTABLE TACKLING.</p>
        <div className="service-list">{services.map(([num, title, desc]) => <article className="service-row" key={num} data-reveal><span>{num}</span><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight /></article>)}</div>
      </section>

      <section id="about" className="about-section">
        <div className="section-kicker" data-reveal>INNOVATING WITH CODE / GROWING WITH QUALITY</div>
        <div className="section-title-row" data-reveal><h2>ABOUT</h2><span>01</span></div>
        <div className="about-grid"><div className="about-portrait" data-reveal><div className="portrait-grid" /><div className="portrait-orbit" /><strong>MKQ</strong><span>QA / 2026</span></div>
          <div className="about-text" data-reveal><p className="lead">PASSIONATE ABOUT CLEANER DIGITAL EXPERIENCES. I BUILD, BREAK AND VALIDATE FLOWS FROM PROTOTYPE TO PRODUCTION.</p><p>I'm a B.Sc. IT graduate focused on QA engineering, manual testing, API validation and practical automation. I like understanding how a product works, then asking the questions that expose where it might fail.</p><p>My workflow combines exploratory thinking with structured test cases, reproducible bug reports and continuous learning around Selenium automation.</p><ul><li>↳ Web application testing</li><li>↳ API & integration validation</li><li>↳ Regression & exploratory testing</li><li>↳ Git / GitHub workflows</li></ul></div>
        </div>
      </section>

      <section id="projects" className="projects-section dark-section">
        <div className="section-kicker" data-reveal>SELECTED WORK / BUILT TO BE TESTED</div><div className="section-title-row" data-reveal><h2>PROJECTS</h2><span>04</span></div>
        <p className="section-intro" data-reveal>PRODUCTS AND EXPERIENCES WHERE I CAN SHOW BOTH SIDES OF THE WORK — BUILDING THE FLOW AND THINKING ABOUT HOW IT BREAKS.</p>
        <div className="project-stack">{projects.map(project => <a className="project-card" href={project.href} target={project.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={project.number} data-reveal onMouseMove={handleProjectMove} onMouseLeave={resetProjectTilt}><VisualMark accent={project.accent} /><div className="project-info"><span>{project.number} / {project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map(tag => <b key={tag}>{tag}</b>)}</div></div><ArrowUpRight className="project-arrow" /></a>)}</div>
      </section>

      <section id="case-studies" className="case-section"><div className="case-copy" data-reveal><div className="section-kicker">HOW I THINK / HOW I TEST</div><h2>QUALITY IS<br /><em>NOT</em> A FINAL STEP.</h2><p>I look at a product as a system of user journeys. Understand the requirement, explore the edges, validate the API where useful, document the defect clearly and verify the fix.</p><a className="magnetic" href="#qa-lab">SEE QA LAB <ArrowUpRight /></a></div><div className="case-grid" data-reveal><div><span>01</span><strong>UNDERSTAND</strong><p>Requirements, acceptance criteria and risk.</p></div><div><span>02</span><strong>EXPLORE</strong><p>Happy paths, edge cases and unexpected behaviour.</p></div><div><span>03</span><strong>REPORT</strong><p>Evidence, reproduction steps and impact.</p></div><div><span>04</span><strong>VERIFY</strong><p>Retest the fix and protect it with regression thinking.</p></div></div></section>

      <section id="qa-lab" className="dark-section lab-section">
        <div className="section-kicker" data-reveal>TESTING, MADE VISIBLE</div><div className="section-title-row" data-reveal><h2>QA LAB</h2><span>02</span></div>
        <div className="lab-grid"><div data-reveal><h2>TEST.<br /><em>BREAK.</em><br />REPORT.</h2></div><div data-reveal><p>I use the lab as a space to show the thinking behind a QA workflow — not just the final result.</p><div className="lab-terminal"><div>01&nbsp; <b>→</b> OPEN FLOW</div><div>02&nbsp; <b>→</b> CHANGE INPUT</div><div>03&nbsp; <b>→</b> WATCH FAILURE</div><div>04&nbsp; <b>→</b> REPORT CLEARLY</div></div></div></div>
      </section>

      <section id="quote" className="quote-section"><div className="quote-mark">“</div><blockquote data-reveal>GOOD QA IS NOT ABOUT FINDING MORE BUGS.<br /><em>IT'S ABOUT FINDING THE RIGHT RISKS.</em></blockquote><div className="quote-credit">— MOHAMMED KAIF QURESHI / QA ENGINEER</div></section>

      <section id="contact" className="contact-section dark-section"><div className="section-kicker" data-reveal>LET'S TALK / BUILD WITH INTENT</div><h2 data-reveal>CONTACT</h2><div className="contact-grid" data-reveal><p>Have a product that needs a careful QA pass or a team looking for someone who can think like a builder and tester?</p><div className="contact-links"><a className="magnetic" href={`mailto:${SITE.email}`}>EMAIL <ArrowUpRight /></a><a className="magnetic" href={SITE.github} target="_blank" rel="noreferrer"><Github /> GITHUB <ArrowUpRight /></a><a className="magnetic" href={SITE.linkedin} target="_blank" rel="noreferrer"><Linkedin /> LINKEDIN <ArrowUpRight /></a></div></div></section>
    </main>
    <footer className="editorial-footer"><div><strong>MKQ</strong><span>QUALITY / 2026</span></div><span>DESIGNED, BUILT & TESTED WITH INTENT.</span></footer>
    <Analytics />
  </div>;
}
