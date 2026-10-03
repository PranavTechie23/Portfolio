import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Moon, Sun, X } from 'lucide-react';
import clsx from 'clsx';
import { useLenis } from 'lenis/react';

interface NavbarProps {
  activeSection: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#achievements' },
  { name: 'Toolkit', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Presence', href: '#platforms' },
  { name: 'Contact', href: '#contact' }
];

const Navbar: React.FC<NavbarProps> = ({ activeSection, isDarkMode, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // Give a tiny timeout so body scroll lock releases before navigation triggers
    setTimeout(() => {
      const target = document.querySelector(href) as HTMLElement | null;
      if (target) {
        const offset = window.innerWidth < 768 ? -72 : -96;
        if (lenis) {
          lenis.scrollTo(target, { offset, duration: 1.2 });
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    }, 50);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 pt-safe",
          isScrolled ? "py-3 sm:py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.05)]" : "py-4 sm:py-6 bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Brand: Avatar + Title */}
          <div className="flex items-center gap-3">
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm group-hover:border-primary dark:group-hover:border-cyan-400 transition-colors flex-shrink-0">
                <img
                  src="/PranavOswal_Pic_nobg.webp"
                  alt="Pranav Oswal"
                  className="w-full h-full object-cover object-top scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-sm tracking-tight text-gray-900 dark:text-slate-100 uppercase group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                  PRANAV OSWAL
                </span>
                <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500 tracking-wider">
                  FULL STACK & AI
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-xs font-mono font-bold tracking-widest transition-colors duration-300 hover:text-primary dark:hover:text-cyan-400 group py-1.5 uppercase"
                  whileHover={{ y: -1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <span className={clsx(
                    "relative z-10 transition-colors duration-300",
                    isActive ? "text-gray-950 dark:text-white font-bold" : "text-gray-500 dark:text-slate-400"
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Hover Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary dark:bg-cyan-400 group-hover:w-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" />
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary dark:bg-cyan-400"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Right Action Group: Resume Button + Theme Toggle */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/resume/ResumeUpdated.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-600 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>

            <button
              onClick={onToggleTheme}
              className="p-2 text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-cyan-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Triggers Container */}
          <div className="flex items-center gap-3 lg:hidden ml-auto">
            <a
              href="/resume/ResumeUpdated.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-mono font-bold text-[11px] uppercase tracking-wider rounded-md transition-all shadow-sm flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>

            <button
              onClick={onToggleTheme}
              className="touch-target p-2 text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-cyan-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              className="touch-target p-2 text-gray-500 dark:text-slate-400 hover:text-primary dark:hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center pt-safe pb-safe overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button 
              className="touch-target absolute top-4 right-4 sm:top-6 sm:right-6 p-3 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={32} />
            </button>

            <div className="flex flex-col items-center gap-6 sm:gap-8 w-full max-w-sm px-6 py-16">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-3xl sm:text-4xl font-heading font-black text-gray-800 dark:text-slate-200 hover:text-primary transition-colors relative group uppercase tracking-tighter py-2 min-h-[44px] flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[4px] bg-primary group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;