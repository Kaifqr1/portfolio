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
      <section class="enhancer-qa-section" data-enhancer-section id="bug-hunt">
        <div class="section-kicker">BUG HUNT / FIND THE FAILURE</div>
        <div class="bug-hunt-shell">
          <div class="bug-hunt-head">
            <div><span class="bug-hunt-label">QA MINI GAME / 01</span><h2>HUNT THE<br /><em>BUG.</em></h2><p>Read the product screen like a tester. Find the UI clue that breaks the intended flow, then flag it before the timer runs out.</p></div>
            <div class="bug-hunt-stats"><span>TIME <b data-bug-time>20</b></span><span>SCORE <b data-bug-score>0</b></span><span>ROUND <b data-bug-round>01</b></span></div>
          </div>
          <div class="bug-hunt-game" data-bug-game aria-label="Bug hunting mini game">
            <div class="bug-hunt-toolbar"><span>checkout-flow / build 2.6.4</span><span data-bug-status>READY</span></div>
            <div class="bug-hunt-browser">
              <div class="bug-hunt-browser-top"><i></i><i></i><i></i><span>app.local / checkout</span></div>
              <div class="bug-hunt-layout">
                <div class="bug-hunt-summary"><small>ORDER SUMMARY</small><strong>Grilled Paneer Wrap</strong><span>Qty 01</span><b>₹249</b><div class="bug-hunt-line"></div><span>Delivery</span><b>₹40</b><div class="bug-hunt-line"></div><strong>Total</strong><b>₹289</b></div>
                <div class="bug-hunt-form">
                  <small>CONTACT DETAILS</small>
                  <label>Email<input value="kaif@example.com" readonly /></label>
                  <label>Phone<input value="98765 43210" readonly /></label>
                  <div class="bug-hunt-choice"><button type="button" data-bug-target="wrong-focus">UPI</button><button type="button">Card</button><button type="button">Cash</button></div>
                  <button class="bug-hunt-cta" type="button" data-bug-target="cta">PLACE ORDER</button>
                  <span class="bug-hunt-toast" data-bug-toast>Payment method required</span>
                </div>
              </div>
            </div>
            <div class="bug-hunt-hints"><span>TIP</span><p>One interaction is misleading. One element gives the wrong feedback.</p><button type="button" data-bug-hint>REVEAL CLUE</button></div>
          </div>
          <div class="bug-hunt-result" data-bug-result hidden></div>
          <button class="bug-hunt-start" type="button" data-bug-start>START BUG HUNT ↗</button>
        </div>
      </section>
    `);

    injectAfter('#bug-hunt', `
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

    const game = document.querySelector<HTMLElement>('[data-bug-game]');
    const startButton = document.querySelector<HTMLButtonElement>('[data-bug-start]');
    const time = document.querySelector<HTMLElement>('[data-bug-time]');
    const score = document.querySelector<HTMLElement>('[data-bug-score]');
    const status = document.querySelector<HTMLElement>('[data-bug-status]');
    const result = document.querySelector<HTMLElement>('[data-bug-result]');
    const hint = document.querySelector<HTMLButtonElement>('[data-bug-hint]');
    const cta = document.querySelector<HTMLButtonElement>('[data-bug-target="cta"]');
    const focus = document.querySelector<HTMLButtonElement>('[data-bug-target="wrong-focus"]');
    const toast = document.querySelector<HTMLElement>('[data-bug-toast]');
    let countdown = 20;
    let currentScore = 0;
    let timer = 0;
    let started = false;
    let found = new Set<string>();

    const endGame = () => {
      window.clearInterval(timer);
      started = false;
      if (status) status.textContent = 'COMPLETE';
      if (game) game.classList.add('is-complete');
      if (result) {
        result.hidden = false;
        result.innerHTML = `<span>ROUND COMPLETE</span><strong>${currentScore >= 2 ? 'BUGS FOUND.' : 'KEEP HUNTING.'}</strong><p>${currentScore}/2 issues identified. A tester should catch both before release.</p>`;
      }
      if (startButton) startButton.textContent = 'RUN AGAIN ↗';
    };

    const markBug = (id: string) => {
      if (!started || found.has(id)) return;
      found.add(id);
      currentScore += 1;
      if (score) score.textContent = String(currentScore);
      const el = id === 'cta' ? cta : focus;
      el?.classList.add('is-found');
      if (id === 'cta' && toast) toast.textContent = 'BUG FOUND: order submits without a valid payment state';
      if (id === 'wrong-focus' && toast) toast.textContent = 'BUG FOUND: selected UPI state is visually unclear';
      if (found.size === 2) window.setTimeout(endGame, 350);
    };

    const startGame = () => {
      window.clearInterval(timer);
      countdown = 20;
      currentScore = 0;
      found = new Set<string>();
      started = true;
      if (time) time.textContent = String(countdown);
      if (score) score.textContent = '0';
      if (status) status.textContent = 'HUNTING';
      if (result) result.hidden = true;
      if (game) game.classList.remove('is-complete');
      [cta, focus].forEach(el => el?.classList.remove('is-found'));
      if (toast) toast.textContent = 'Payment method required';
      if (startButton) startButton.textContent = 'RESTART HUNT ↗';
      timer = window.setInterval(() => {
        countdown -= 1;
        if (time) time.textContent = String(countdown);
        if (countdown <= 0) endGame();
      }, 1000);
    };

    startButton?.addEventListener('click', startGame);
    const handleCta = () => markBug('cta');
    const handleFocus = () => markBug('wrong-focus');
    const handleHint = () => {
      if (!started) return;
      if (hint) hint.textContent = 'CLUE: CHECK THE PAYMENT STATE';
      if (toast) toast.textContent = 'Look closely: selection feedback and action state disagree.';
    };
    cta?.addEventListener('click', handleCta);
    focus?.addEventListener('click', handleFocus);
    hint?.addEventListener('click', handleHint);

    return () => {
      window.clearInterval(timer);
      recruiterButton?.removeEventListener('click', toggleRecruiter);
      startButton?.removeEventListener('click', startGame);
      cta?.removeEventListener('click', handleCta);
      focus?.removeEventListener('click', handleFocus);
      hint?.removeEventListener('click', handleHint);
      document.querySelectorAll('[data-enhancer-section]').forEach(node => node.remove());
      nav?.querySelector('.enhancer-nav-actions')?.remove();
    };
  }, []);

  return null;
}
