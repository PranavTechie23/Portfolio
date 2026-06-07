import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronsUp } from 'lucide-react';
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
          className="fixed right-5 bottom-5 sm:right-6 sm:bottom-6 z-[150] group flex items-center justify-center w-12 h-12 rounded-full bg-slate-200/90 hover:bg-slate-300/95 text-slate-500 hover:text-slate-800 dark:bg-slate-800/80 dark:hover:bg-slate-700/95 dark:text-slate-400 dark:hover:text-slate-250 transition-all duration-300 shadow-lg"
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          whileTap={{ scale: 0.94 }}
        >
          <ChevronsUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
