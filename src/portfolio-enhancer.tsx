import { useEffect } from 'react';
import './portfolio-enhancer.css';

const injectAfter = (selector: string, html: string) => {
  const anchor = document.querySelector(selector);
  if (!anchor || document.querySelector('[data-enhancer-section]')) return;
  anchor.insertAdjacentHTML('afterend', html);
};

export default function PortfolioEnhancer() {
  useEffect(() => {
    document.querySelectorAll('.cursor-dot,.cursor-ring').forEach(node => node.remove());
    document.body.classList.remove('cursor-ready', 'cursor-hover');

    const nav = document.querySelector('.editorial-nav');
    if (nav && !nav.querySelector('[data-recruiter-toggle]')) {
      const wrap = document.createElement('div');
      wrap.className = 'enhancer-nav-actions';
      wrap.innerHTML = `<button class="enhancer-recruiter" data-recruiter-toggle type="button" aria-pressed="false">RECRUITER MODE</button>`;
      const menu = nav.querySelector('.menu-button');
      if (menu) nav.insertBefore(wrap, menu);
      else nav.appendChild(wrap);
    }

    injectAfter('#projects', `
      <section class="enhancer-case-section" data-enhancer-section id="deep-dive">
        <div class="section-kicker">CASE STUDIES / FROM IDEA TO EVIDENCE</div>
        <div class="enhancer-case-grid">
          <article class="enhancer-case-card"><span>01 / QRServe</span><h3>OWNER → MENU → GUEST</h3><p>Map the restaurant setup flow, validate CRUD behaviour, then test the public QR journey on desktop and mobile.</p><div><b>Risk</b><small>Broken menu data, stale content, mobile UX</small></div></article>
          <article class="enhancer-case-card"><span>02 / GNG</span><h3>BRAND → RESPONSIVE EXPERIENCE</h3><p>Check visual hierarchy, navigation, QR access, responsive breakpoints and production analytics without losing the branded feel.</p><div><b>Risk</b><small>Viewport clipping, CTA visibility, slow visual layers</small></div></article>
          <article class="enhancer-case-card"><span>03 / CODE ROAST</span><h3>INPUT → API → FEEDBACK</h3><p>Think across input validation, network failures, API responses and useful feedback instead of treating the UI as the whole product.</p><div><b>Risk</b><small>Malformed input, API errors, unclear states</small></div></article>
        </div>
      </section>
    `);

    injectAfter('#qa-lab', `
      <section class="enhancer-qa-section" data-enhancer-section id="qa-challenge">
        <div class="section-kicker">QA CHALLENGE / BREAK THE FLOW</div>
        <div class="enhancer-qa-grid">
          <div class="enhancer-qa-copy"><h2>RUN A<br><em>TEST.</em></h2><p>This is a simulated portfolio QA run, designed to show how I communicate findings rather than pretending these are production metrics.</p><button class="enhancer-run" type="button">RUN QA TEST <span>↗</span></button></div>
          <div class="enhancer-terminal">
            <div class="enhancer-terminal-top"><span>qa-checklist</span><span data-run-state>READY</span></div>
            <div class="enhancer-check" data-check="01"><span>01</span><strong>Navigation</strong><b>READY</b></div>
            <div class="enhancer-check" data-check="02"><span>02</span><strong>Responsive layout</strong><b>READY</b></div>
            <div class="enhancer-check" data-check="03"><span>03</span><strong>CTA contrast</strong><b>READY</b></div>
            <div class="enhancer-check" data-check="04"><span>04</span><strong>Mobile spacing</strong><b>READY</b></div>
            <p class="enhancer-result" data-run-result>Awaiting test run…</p>
          </div>
        </div>
      </section>
    `);

    injectAfter('#qa-challenge', `
      <section class="enhancer-skills-section" data-enhancer-section id="skills-lab">
        <div class="section-kicker">SKILL MAP / WHAT I USE</div>
        <div class="enhancer-skills-grid">
          <div class="enhancer-skill-list">
            <div><span>Manual QA</span><i><em style="width:92%"></em></i><b>92</b></div>
            <div><span>API Testing</span><i><em style="width:82%"></em></i><b>82</b></div>
            <div><span>Bug Reporting</span><i><em style="width:90%"></em></i><b>90</b></div>
            <div><span>Exploratory Testing</span><i><em style="width:88%"></em></i><b>88</b></div>
            <div><span>React</span><i><em style="width:76%"></em></i><b>76</b></div>
            <div><span>Git / GitHub</span><i><em style="width:78%"></em></i><b>78</b></div>
            <div><span>Selenium</span><i><em style="width:64%"></em></i><b>64</b></div>
          </div>
          <div class="enhancer-workflow"><span>WORKFLOW</span><div>01 <b>DISCOVER</b></div><div>02 <b>PLAN</b></div><div>03 <b>TEST</b></div><div>04 <b>REPORT</b></div><div>05 <b>VERIFY</b></div><div>06 <b>SHIP</b></div></div>
        </div>
      </section>
    `);

    const recruiterButton = document.querySelector<HTMLButtonElement>('[data-recruiter-toggle]');
    const root = document.querySelector('.editorial-site');
    const applyRecruiter = (active: boolean) => {
      root?.classList.toggle('recruiter-mode', active);
      recruiterButton?.setAttribute('aria-pressed', String(active));
      if (recruiterButton) recruiterButton.textContent = active ? 'FULL MODE' : 'RECRUITER MODE';
    };
    const toggleRecruiter = () => applyRecruiter(!root?.classList.contains('recruiter-mode'));
    recruiterButton?.addEventListener('click', toggleRecruiter);

    const runButton = document.querySelector<HTMLButtonElement>('.enhancer-run');
    const state = document.querySelector<HTMLElement>('[data-run-state]');
    const result = document.querySelector<HTMLElement>('[data-run-result]');
    let runTimer = 0;
    const runQa = () => {
      window.clearTimeout(runTimer);
      if (runButton) { runButton.disabled = true; runButton.textContent = 'RUNNING…'; }
      if (state) state.textContent = 'RUNNING';
      document.querySelectorAll<HTMLElement>('.enhancer-check').forEach((row, index) => {
        row.classList.remove('is-run');
        const badge = row.querySelector('b');
        if (badge) badge.textContent = 'CHECKING';
        window.setTimeout(() => row.classList.add('is-run'), index * 220);
      });
      runTimer = window.setTimeout(() => {
        ['01','02'].forEach(id => { const badge = document.querySelector(`[data-check="${id}"] b`); if (badge) badge.textContent = 'PASS'; });
        ['03','04'].forEach(id => { const badge = document.querySelector(`[data-check="${id}"] b`); if (badge) badge.textContent = 'REVIEW'; });
        if (state) state.textContent = 'COMPLETE';
        if (result) result.textContent = '2 PASS · 2 REVIEW · NEXT: DOCUMENT & VERIFY';
        if (runButton) { runButton.disabled = false; runButton.textContent = 'RUN AGAIN ↗'; }
      }, 1250);
    };
    runButton?.addEventListener('click', runQa);

    return () => {
      window.clearTimeout(runTimer);
      recruiterButton?.removeEventListener('click', toggleRecruiter);
      runButton?.removeEventListener('click', runQa);
      document.querySelectorAll('[data-enhancer-section]').forEach(node => node.remove());
      nav?.querySelector('.enhancer-nav-actions')?.remove();
    };
  }, []);

  return null;
}
