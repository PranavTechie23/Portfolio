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
import ScrollToTop from './components/ScrollToTop';
import TechMarquee from './components/motion/TechMarquee';
import { motion, useScroll } from 'framer-motion';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize directly from storage/system preference.
  // We also apply the class immediately inside the initializer so there's
  // zero flash between first paint and the useEffect running.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = window.localStorage.getItem('portfolio-theme');
    let dark: boolean;
    if (saved === 'dark') dark = true;
    else if (saved === 'light') dark = false;
    else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Apply immediately — no waiting for effects
    document.documentElement.classList.toggle('dark', dark);
    return dark;
  });

  const { scrollYProgress } = useScroll();

  // Keep DOM class and localStorage in sync on every toggle
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
        <motion.div
          style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-[9999] shadow-[0_0_12px_rgba(33,150,243,0.8)]"
        />
        <BackgroundSystem />
        <CustomCursor />
        <ScrollToTop />
        
        <Navbar activeSection={activeSection} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((prev) => !prev)} />

        <main>
          <section id="hero" className="w-full h-screen relative">
            <Hero isDarkMode={isDarkMode} />
          </section>

          <TechMarquee />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 space-y-20 sm:space-y-28 lg:space-y-32 py-16 sm:py-24 lg:py-32">
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

            <section id="build" className="scroll-mt-32">
              <BuildInPublic />
            </section>

            <section id="platforms" className="scroll-mt-32">
              <Platforms />
            </section>

            <section id="journey" className="scroll-mt-32">
              <Journey />
            </section>

            <section id="contact" className="scroll-mt-[100px]">
              <Contact />
            </section>
          </div>

          <motion.footer
            className="py-20 border-t border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-900/40 transition-colors duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
               <p className="text-gray-400 dark:text-slate-400 font-mono text-sm uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} / Built with intention</p>
               <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-gray-950 dark:text-slate-100 tracking-tighter italic uppercase">PRANAV SANJAY OSWAL</h3>
               <motion.div
                 className="h-1.5 bg-primary mx-auto"
                 initial={{ width: 0 }}
                 whileInView={{ width: 64 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               />
            </div>
          </motion.footer>
        </main>
      </div>
    </ReactLenis>
  );
};

export default App;
