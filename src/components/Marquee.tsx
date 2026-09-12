import { ArrowUpRight } from 'lucide-react';

const items = [
  'MANUAL QA',
  'API TESTING',
  'EXPLORATORY TESTING',
  'BUG REPORTING',
  'SELENIUM',
  'QUALITY FIRST',
];

export function Marquee({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  const content = [...items, ...items];

  return (
    <section className={`marquee-section ${variant === 'secondary' ? 'marquee-section-secondary' : ''}`} aria-label="Core QA capabilities">
      <div className="marquee-track" aria-hidden="true">
        {content.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item}
            <ArrowUpRight className="marquee-icon" />
          </span>
        ))}
      </div>
    </section>
  );
}
