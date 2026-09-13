import { useEffect } from 'react';
import './portfolio-enhancer.css';
import './bug-hunt.css';

const injectAfter = (selector: string, html: string) => {
  const anchor = document.querySelector(selector);
  if (!anchor || document.querySelector('[data-enhancer-section]')) return;
  anchor.insertAdjacentHTML('afterend', html);
};

export default function PortfolioEnhancer() {
  useEffect(() => {
    document.querySelectorAll('.cursor-dot,.cursor-ring').forEach(node => node.remove());
    document.body.classList.remove('cursor-ready', 'cursor-hover');

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
      <section class="bug-hunt" data-enhancer-section id="bug-hunt">
        <div class="bug-hunt-head">
          <div>
            <div class="section-kicker">BUG HUNT / FIND THE FAILURE</div>
            <h2>HUNT THE <em>BUG.</em></h2>
          </div>
          <div class="bug-hunt-meta">QA MINI GAME / FIND 2 ISSUES<br />20 SECOND ROUND</div>
        </div>
        <div class="bug-hunt-wrap">
          <div class="bug-hunt-board">
            <div class="bug-hunt-top"><span>QA LAB / CHECKOUT-FLOW</span><span data-bug-status>READY</span></div>
            <div class="bug-window">
              <div class="bug-window-bar"><i></i><i></i><i></i><span>checkout / release-2.6.4</span></div>
              <div class="bug-content">
                <div class="bug-line"><span class="bug-title">Grilled Paneer Wrap</span><span class="bug-price">₹249</span></div>
                <div class="bug-card"><div class="bug-thumb"></div><div class="bug-info"><strong>Combo Meal</strong><small>Wrap + fries + drink</small><div class="bug-qty"><button type="button">−</button><span>01</span><button type="button">+</button></div></div></div>
                <div class="bug-checkout"><strong>TOTAL ₹289</strong><button type="button" data-bug-target="cta">PLACE ORDER</button></div>
              </div>
              <button class="bug-target one" type="button" data-bug-target="wrong-focus" aria-label="Potential bug">UPI</button>
              <button class="bug-target two" type="button" data-bug-target="toast">!</button>
            </div>
          </div>
          <aside class="bug-hunt-side">
            <h3>READ.<br />TEST.<br /><em>REPORT.</em></h3>
            <p>Find the two intentional defects hidden in the checkout flow. Click the suspicious UI elements to flag them.</p>
            <div class="bug-hunt-stats"><div class="bug-stat"><span>TIME</span><strong data-bug-time>20</strong></div><div class="bug-stat"><span>SCORE</span><strong data-bug-score>0</strong></div></div>
            <button class="bug-start" type="button" data-bug-start>START BUG HUNT ↗</button>
            <button class="bug-reset" type="button" data-bug-hint>REVEAL CLUE</button>
            <div class="bug-status" data-bug-result hidden></div>
          </aside>
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

    const startButton = document.querySelector<HTMLButtonElement>('[data-bug-start]');
    const time = document.querySelector<HTMLElement>('[data-bug-time]');
    const score = document.querySelector<HTMLElement>('[data-bug-score]');
    const status = document.querySelector<HTMLElement>('[data-bug-status]');
    const result = document.querySelector<HTMLElement>('[data-bug-result]');
    const hint = document.querySelector<HTMLButtonElement>('[data-bug-hint]');
    const targets = document.querySelectorAll<HTMLButtonElement>('[data-bug-target]');
    let countdown = 20;
    let currentScore = 0;
    let timer = 0;
    let started = false;
    let found = new Set<string>();

    const endGame = () => {
      window.clearInterval(timer);
      started = false;
      if (status) status.textContent = 'COMPLETE';
      if (result) {
        result.hidden = false;
        result.textContent = currentScore === 2 ? '2/2 BUGS FOUND — GREAT HUNT.' : `${currentScore}/2 BUGS FOUND — RUN IT AGAIN.`;
      }
      if (startButton) startButton.textContent = 'RUN AGAIN ↗';
    };

    const markBug = (id: string, element: HTMLElement) => {
      if (!started || found.has(id)) return;
      found.add(id);
      currentScore += 1;
      element.classList.add('bug-found');
      if (score) score.textContent = String(currentScore);
      if (found.size === 2) window.setTimeout(endGame, 350);
    };

    const startGame = () => {
      window.clearInterval(timer);
      countdown = 20;
      currentScore = 0;
      found = new Set<string>();
      started = true;
      if (time) time.textContent = '20';
      if (score) score.textContent = '0';
      if (status) status.textContent = 'HUNTING';
      if (result) result.hidden = true;
      targets.forEach(target => target.classList.remove('bug-found'));
      if (startButton) startButton.textContent = 'RESTART HUNT ↗';
      timer = window.setInterval(() => {
        countdown -= 1;
        if (time) time.textContent = String(countdown);
        if (countdown <= 0) endGame();
      }, 1000);
    };

    const targetHandlers: Array<[HTMLButtonElement, () => void]> = [];
    targets.forEach(target => {
      const handler = () => markBug(target.dataset.bugTarget || 'bug', target);
      targetHandlers.push([target, handler]);
      target.addEventListener('click', handler);
    });

    const handleHint = () => {
      if (!started) return;
      if (hint) hint.textContent = 'CLUE: CHECK THE CTA + PAYMENT STATE';
    };

    startButton?.addEventListener('click', startGame);
    hint?.addEventListener('click', handleHint);

    return () => {
      window.clearInterval(timer);
      startButton?.removeEventListener('click', startGame);
      hint?.removeEventListener('click', handleHint);
      targetHandlers.forEach(([target, handler]) => target.removeEventListener('click', handler));
      document.querySelectorAll('[data-enhancer-section]').forEach(node => node.remove());
    };
  }, []);

  return null;
}
