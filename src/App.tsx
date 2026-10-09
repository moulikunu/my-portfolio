import { useState, useEffect } from 'react';
import { CursorProvider } from './hooks/useCursor';
import { Cursor } from './components/Cursor';
import { Particles } from './components/Particles';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certificates } from './components/Certificates';
import { About } from './components/About';
import { Contact } from './components/Contact';

export function AppContent() {
  const [activeSection, setActiveSection] = useState('hero');

  // IntersectionObserver threshold: 0.12 as one unit for sections
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.12,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0909] text-[#F2EDE6] font-mono selection:bg-[#C9A84C]/30 selection:text-[#E8DCC8]">
      {/* 1. Dual-Layer Custom Interactive Cursor (Shows Shades Portrait Card on Name Hover) */}
      <Cursor />

      {/* 2. Fixed Floating 55-Particle Background Canvas */}
      <Particles />

      {/* 3. Fixed Navbar with Anti-Gravity Links & Scroll-Reactive Logo */}
      <Navbar activeSection={activeSection} />

      {/* 4. Main Portfolio Content */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Section 1: Hero (Split 55%/45% Side-by-Side Layout) */}
        <Hero />

        {/* Section 2: About (Profile, Vision, Experience, Education) */}
        <About />

        {/* Section 3: Projects */}
        <Projects />

        {/* Section 4: Skills */}
        <Skills />

        {/* Section 5: Certificates & Credentials */}
        <Certificates />

        {/* Section 6: Contact */}
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <CursorProvider>
      <AppContent />
    </CursorProvider>
  );
}
