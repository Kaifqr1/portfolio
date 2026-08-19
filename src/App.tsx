import { Analytics } from '@vercel/analytics/react';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { QALab } from '@/components/QALab';
import { BugHunt } from '@/components/BugHunt';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useDarkMode, useScrollReveal } from '@/hooks';

function App() {
  const { dark, toggle } = useDarkMode();
  useScrollReveal();

  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors dark:bg-slate-950 dark:text-white">
      <Nav dark={dark} onToggleDark={toggle} />
      <main>
        <Hero />
        <div className="space-y-24 pb-24 sm:space-y-32 sm:pb-32">
          <About />
          <Skills />
          <Projects />
          <QALab />
          <BugHunt />
          <Contact />
        </div>
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
