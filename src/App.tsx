import { useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Menu, X } from 'lucide-react';
import { SITE } from '@/data';
import './editorial-motion.css';
import './hero-portrait.css';
import './space-tight.css';

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
      if (entry.isIntersecting) entry.target.classList.add('is-in');
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
      document.documentElement.style.setProperty('--page-progress', String(max > 0 ? window.scrollY / max : 0));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', onScroll, { passive: true });
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

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  useReveal(); useScrollMotion();

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 36;
      const y = (event.clientY / window.innerHeight - 0.5) * 36;
      heroRef.current?.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current?.style.setProperty('--mouse-y', `${y}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return <div className="editorial-site">
    <div className="page-progress" />
    <header className="editorial-nav">
      <a href="#home" className="brand-mark">MKQ<span>®</span></a>
      <div className="nav-status">QA ENGINEER <b>/</b> MUMBAI</div>
      <button className="menu-button" onClick={() => setMenuOpen(v => !v)} aria-label="Open navigation">{menuOpen ? <X /> : <Menu />}</button>
    </header>
    {menuOpen && <div className="menu-panel">{['home', 'services', 'about', 'projects', 'case-studies', 'qa-lab', 'contact'].map((id, i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{id.toUpperCase()}<ArrowUpRight /></a>)}</div>}

    <main>
      <section id="home" ref={heroRef} className="editorial-hero">
        <div className="hero-planet" aria-hidden="true"><div className="planet-ring" /><div className="planet-core" /><div className="planet-glint" /></div>
        <div className="hero-meta" data-reveal><span>04.0</span><span>QUALITY / NO ASSUMPTIONS</span></div>
        <div className="hero-name" data-reveal><p>QUALITY, THROUGH EVERY FLOW</p><h1>MOHAMMED<br /><em>KAIF</em><br />QURESHI</h1></div>
        <div className="hero-copy" data-reveal><p>I help teams ship dependable digital experiences through thoughtful testing, clear defect reporting and a user-first QA mindset.</p><a href="#projects">EXPLORE WORK <ArrowDownRight /></a></div>
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
        <div className="project-stack">{projects.map(project => <a className="project-card" href={project.href} target={project.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" key={project.number} data-reveal><VisualMark accent={project.accent} /><div className="project-info"><span>{project.number} / {project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map(tag => <b key={tag}>{tag}</b>)}</div></div><ArrowUpRight className="project-arrow" /></a>)}</div>
      </section>

      <section id="case-studies" className="case-section"><div className="case-copy" data-reveal><div className="section-kicker">HOW I THINK / HOW I TEST</div><h2>QUALITY IS<br /><em>NOT</em> A FINAL STEP.</h2><p>I look at a product as a system of user journeys. Understand the requirement, explore the edges, validate the API where useful, document the defect clearly and verify the fix.</p><a href="#qa-lab">SEE QA LAB <ArrowUpRight /></a></div><div className="case-grid" data-reveal><div><span>01</span><strong>UNDERSTAND</strong><p>Requirements, acceptance criteria and risk.</p></div><div><span>02</span><strong>EXPLORE</strong><p>Happy paths, edge cases and unexpected behaviour.</p></div><div><span>03</span><strong>REPORT</strong><p>Evidence, reproduction steps and impact.</p></div><div><span>04</span><strong>VERIFY</strong><p>Retest the fix and protect it with regression thinking.</p></div></div></section>

      <section id="qa-lab" className="lab-section dark-section"><div className="section-kicker" data-reveal>QA LAB / EVIDENCE OVER ASSUMPTIONS</div><div className="lab-grid"><div data-reveal><h2>TEST.<br /><em>BREAK.</em><br />VERIFY.</h2></div><div data-reveal><p>My QA Lab turns learning into visible evidence: test scenarios, API collections, bug reports, regression checks and small automation experiments.</p><div className="lab-terminal"><span>qa-workflow</span><p>01&nbsp; define → test requirements</p><p>02&nbsp; explore → probe edge cases</p><p>03&nbsp; report → reproduce defects</p><p>04&nbsp; verify → regress the fix</p><i>QUALITY GATE / READY TO TEST</i></div></div></div></section>

      <section className="quote-section"><p data-reveal>LET'S BUILD A <em>RELIABLE</em><br />DIGITAL EXPERIENCE <span>TOGETHER.</span></p></section>

      <section id="contact" className="contact-section dark-section"><div className="section-kicker" data-reveal>YOU DREAM IT / I TEST IT</div><h2 data-reveal>CONTACT</h2><p className="contact-intro" data-reveal>GOT A QUESTION, A PROJECT IDEA OR A QA OPPORTUNITY? I'D LOVE TO HEAR FROM YOU AND DISCUSS FURTHER.</p><div className="contact-links" data-reveal><a href={`mailto:${SITE.email}`}><span>E-MAIL</span>{SITE.email}<ArrowUpRight /></a><a href={SITE.links.linkedin} target="_blank" rel="noreferrer"><span>LINKEDIN</span>PROFILE<Linkedin /></a><a href={SITE.links.github} target="_blank" rel="noreferrer"><span>GITHUB</span>CODE & PROJECTS<Github /></a></div></section>
    </main>
    <footer className="editorial-footer"><span>© {new Date().getFullYear()} {SITE.name}</span><span>QUALITY / SOFTWARE / PEOPLE</span><a href="#home">BACK TO TOP ↑</a></footer>
    <Analytics />
  </div>;
}
