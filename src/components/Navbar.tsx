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
        if (lenis) {
          // Compensate for main navbar (64px) + sub-nav (40px) + margin
          lenis.scrollTo(target, { offset: -112, duration: 1.2 });
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY - 112;
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
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
          isScrolled 
            ? "py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.05)]" 
            : "py-6 bg-transparent lg:py-6 lg:bg-transparent py-4 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 lg:border-b-0 lg:shadow-none"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 flex items-center justify-start gap-12">
          
          {/* Logo with dynamic breadcrumb locator */}
          <div className="flex items-center gap-4">
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="relative group flex items-center gap-2"
            >
              <span className="font-heading font-black text-2xl tracking-tighter text-gray-950 dark:text-slate-100 uppercase flex items-center gap-1.5">
                <span>HOME</span>
                <AnimatePresence mode="wait">
                  {activeSection !== 'hero' && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="text-primary text-[10px] font-mono font-black tracking-widest hidden sm:inline"
                    >
                      // {activeSection === 'achievements' ? 'EDUCATION' :
                          activeSection === 'skills' ? 'TOOLKIT' :
                          activeSection === 'build' ? 'PUBLIC' :
                          activeSection === 'journey' ? 'JOURNEY' :
                          activeSection.toUpperCase()}
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <div className="w-2.5 h-2.5 bg-primary group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(33,150,243,0.5)] transition-all duration-300" />
            </a>
          </div>

          {/* Desktop Nav & Toggle Group */}
          <div className="hidden lg:flex items-center gap-8 lg:ml-36">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-sm font-bold tracking-wide transition-colors duration-300 hover:text-primary group py-2 uppercase font-heading"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <span className={clsx(
                    "relative z-10 transition-colors duration-300",
                    isActive ? "text-gray-950 dark:text-slate-100" : "text-gray-500 dark:text-slate-400"
                  )}>
                    {item.name}
                  </span>
                  
                  {/* Hover Underline */}
                  <span className="absolute bottom-1 left-0 w-0 h-[3px] bg-primary group-hover:w-full transition-all duration-300 ease-out opacity-0 group-hover:opacity-100" />
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.span 
                      layoutId="activeNav"
                      className="absolute bottom-1 left-0 w-full h-[3px] bg-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}

            {/* Desktop Toggle (Placed directly after the last nav item) */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-gray-600 dark:text-slate-300 hover:text-primary transition-colors ml-2"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>

          {/* Mobile Triggers Container */}
          <div className="flex items-center gap-4 lg:hidden ml-auto">
            {/* Mobile Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 text-gray-600 dark:text-slate-300 hover:text-primary transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            {/* Mobile Menu Toggle */}
            <button 
              className="p-2 text-gray-600 dark:text-slate-300 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sub-Navigation Bar (Horizontal Scrolling Tabs) */}
      <div className="lg:hidden fixed top-[64px] left-0 right-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 py-2.5 overflow-x-auto scrollbar-none transition-all duration-300">
        <div className="flex gap-6 px-6 min-w-max">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={clsx(
                  "relative text-xs font-mono font-black uppercase tracking-wider transition-colors duration-300 py-1",
                  isActive ? "text-primary" : "text-gray-400 dark:text-slate-500 hover:text-primary"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="activeSubNavMobile"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button 
              className="absolute top-6 right-6 p-4 text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={40} />
            </button>

            <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={clsx(
                      "text-4xl font-heading font-black transition-colors relative group uppercase tracking-tighter",
                      isActive ? "text-primary" : "text-gray-800 dark:text-slate-200 hover:text-primary"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavMobile"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-[4px] bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
