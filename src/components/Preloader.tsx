import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    const timeout = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center w-screen h-[100dvh] overflow-hidden bg-black select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center justify-center gap-10 w-full px-6">
        {/* Ring container — flex-centred children so rotate anim never fights translate */}
        <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
          <div className="absolute flex items-center justify-center w-28 h-28">
            <motion.svg
              className="w-full h-full text-cyan-400"
              viewBox="0 0 100 100"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              style={{ transformOrigin: '50% 50%' }}
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray="180 360"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>

          <div className="absolute flex items-center justify-center w-36 h-36">
            <motion.svg
              className="w-full h-full text-indigo-500"
              viewBox="0 0 100 100"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
              style={{ transformOrigin: '50% 50%' }}
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="110 360"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>

          <motion.span
            className="relative z-10 text-white font-heading font-black text-2xl tracking-tighter uppercase"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PO
          </motion.span>
        </div>

        <motion.p
          className="text-gray-400 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          INITIALIZING PROTOCOL{dots}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
