import { useEffect } from 'react';
import './portfolio-theme-plus.css';

const commands = [
  ['01', 'HOME', 'Go to hero', '#home'],
  ['02', 'PROJECTS', 'View selected work', '#projects'],
  ['03', 'CASE STUDIES', 'See testing approach', '#deep-dive'],
  ['04', 'QA CHALLENGE', 'Run the interactive test', '#qa-challenge'],
  ['05', 'SKILLS', 'Open skill map', '#skills-lab'],
  ['06', 'CONTACT', 'Start a conversation', '#contact'],
];

export default function PortfolioThemePlus() {
  useEffect(() => {
    const root = document.querySelector('.editorial-site');
    if (!root || document.querySelector('[data-theme-plus]')) return;

    const shell = document.createElement('div');
    shell.className = 'theme-plus-shell';
    shell.dataset.themePlus = 'true';
    shell.innerHTML = `
      <button class="theme-plus-toggle" type="button" aria-controls="theme-plus-command" aria-expanded="false">⌘ K / COMMAND</button>
      <div class="theme-plus-command" id="theme-plus-command" hidden>
        <div class="theme-plus-dialog" role="dialog" aria-modal="true" aria-label="Portfolio command palette">
          <div class="theme-plus-top"><span>MKQ / NAVIGATOR</span><input class="theme-plus-input" aria-label="Search portfolio" placeholder="Search sections…" autocomplete="off" /><span>ESC</span></div>
          <div class="theme-plus-list"></div>
          <div class="theme-plus-shortcut"><span class="theme-plus-kbd">↑</span><span class="theme-plus-kbd">↓</span> navigate <span class="theme-plus-kbd">ENTER</span> open</div>
        </div>
      </div>
      <section class="theme-plus-proof" data-theme-plus-section id="proof">
        <div class="section-kicker">PORTFOLIO SIGNAL / WHAT THIS SITE PROVES</div>
        <div class="theme-plus-proof-grid">
          <article class="theme-plus-proof-card"><span>01 / PROJECTS</span><strong>04</strong><p>Featured products and experiences with a build + QA perspective.</p></article>
          <article class="theme-plus-proof-card"><span>02 / QA</span><strong>05</strong><p>Core QA service areas presented as practical testing capabilities.</p></article>
          <article class="theme-plus-proof-card"><span>03 / FLOW</span><strong>06</strong><p>Discover, plan, test, report, verify and ship as a repeatable workflow.</p></article>
          <article class="theme-plus-proof-card"><span>04 / FOCUS</span><strong>QA</strong><p>Built around software quality, product thinking and clear communication.</p></article>
        </div>
        <div class="theme-plus-availability"><i class="theme-plus-pulse"></i><span>QA / SOFTWARE FOCUS</span></div>
      </section>
    `;
    root.appendChild(shell);

    const overlay = shell.querySelector<HTMLElement>('.theme-plus-command')!;
    const toggle = shell.querySelector<HTMLButtonElement>('.theme-plus-toggle')!;
    const input = shell.querySelector<HTMLInputElement>('.theme-plus-input')!;
    const list = shell.querySelector<HTMLElement>('.theme-plus-list')!;
    const proof = shell.querySelector<HTMLElement>('#proof')!;

    const render = (query = '') => {
      const filtered = commands.filter(([, title, desc]) => `${title} ${desc}`.toLowerCase().includes(query.toLowerCase()));
      list.innerHTML = filtered.map(([num, title, desc, href], i) => `<button class="theme-plus-item${i === 0 ? ' is-active' : ''}" data-href="${href}"><span>${num}</span><strong>${title}</strong><small>${desc}</small></button>`).join('');
      list.querySelectorAll<HTMLButtonElement>('.theme-plus-item').forEach(item => item.addEventListener('click', () => {
        const href = item.dataset.href;
        close();
        document.querySelector(href || '#home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }));
    };
    const open = () => { overlay.hidden = false; toggle.setAttribute('aria-expanded', 'true'); render(input.value); requestAnimationFrame(() => input.focus()); };
    const close = () => { overlay.hidden = true; toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); };
    toggle.addEventListener('click', () => overlay.hidden ? open() : close());
    input.addEventListener('input', () => render(input.value));

    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); overlay.hidden ? open() : close(); return; }
      if (event.key === 'Escape' && !overlay.hidden) { event.preventDefault(); close(); return; }
      if (overlay.hidden) return;
      const items = [...list.querySelectorAll<HTMLButtonElement>('.theme-plus-item')];
      const active = items.findIndex(item => item.classList.contains('is-active'));
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!items.length) return;
        const next = event.key === 'ArrowDown' ? (active + 1) % items.length : (active - 1 + items.length) % items.length;
        items.forEach(item => item.classList.remove('is-active'));
        items[next].classList.add('is-active');
      }
      if (event.key === 'Enter') document.querySelector<HTMLButtonElement>('.theme-plus-item.is-active')?.click();
    };
    window.addEventListener('keydown', keydown);

    const observer = new IntersectionObserver(([entry]) => proof.classList.toggle('is-visible', entry.isIntersecting), { threshold: .1 });
    observer.observe(proof);

    return () => {
      window.removeEventListener('keydown', keydown);
      observer.disconnect();
      shell.remove();
    };
  }, []);

  return null;
}
