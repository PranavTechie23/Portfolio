import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed right-5 bottom-5 sm:right-6 sm:bottom-6 z-[150] group cursor-none"
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.94 }}
        >
          {/* Soft glow behind */}
          <span className="absolute inset-0 rounded-full bg-primary/25 blur-xl scale-150 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          <span className="relative flex items-center gap-2.5 pl-4 pr-3 py-2.5 rounded-full bg-white dark:bg-slate-900 border-2 border-primary/40 dark:border-primary/50 shadow-[0_4px_24px_rgba(33,150,243,0.2)] group-hover:border-primary group-hover:shadow-[0_8px_32px_rgba(33,150,243,0.35)] transition-all duration-300">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-primary hidden sm:inline">
              Top
            </span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-[0_0_12px_rgba(33,150,243,0.5)] group-hover:shadow-[0_0_18px_rgba(33,150,243,0.7)] transition-shadow duration-300">
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={2.5} />
            </span>
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
