import React, { useState, useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Projects from './components/Projects';
import BuildInPublic from './components/BuildInPublic';
import Platforms from './components/Platforms';
import Journey from './components/Journey';
import Contact from './components/Contact';
import BackgroundSystem from './components/BackgroundSystem';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      return;
    }

    if (!savedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'achievements', 'skills', 'projects', 'build', 'platforms', 'journey', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ReactLenis root>
      <div className="selection:bg-blue-500/30 selection:text-blue-200 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
        <BackgroundSystem />
        <CustomCursor />
        
        <Navbar activeSection={activeSection} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((prev) => !prev)} />

        <main>
          <section id="hero" className="w-full h-screen relative">
            <Hero />
          </section>

          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 space-y-32 py-32">
            <section id="about" className="scroll-mt-32">
              <About />
            </section>

            <section id="achievements" className="scroll-mt-32">
              <Achievements />
            </section>

            <section id="skills" className="scroll-mt-32">
              <Skills />
            </section>

            <section id="projects" className="scroll-mt-32">
              <Projects />
            </section>


            <section id="platforms" className="scroll-mt-6">
              <Platforms />
            </section>

            <section id="journey" className="scroll-mt-32">
              <Journey />
            </section>

            <section id="contact" className="scroll-mt-[100px]">
              <Contact />
            </section>
          </div>

          <footer className="py-20 border-t border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-900/40 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
               <p className="text-gray-400 dark:text-slate-400 font-mono text-sm uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} / Built with intention</p>
               <h3 className="text-4xl font-black font-heading text-gray-950 dark:text-slate-100 tracking-tighter italic uppercase">PRANAV SANJAY OSWAL</h3>
               <div className="h-1.5 w-16 bg-primary mx-auto" stroke-width="2" />
            </div>
          </footer>
        </main>
      </div>
    </ReactLenis>
  );
};

export default App;
