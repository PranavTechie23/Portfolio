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
      className="fixed inset-0 bg-black z-[99999] flex flex-col items-center justify-center select-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex flex-col items-center justify-center gap-12">
        {/* Animated Rings and Initials */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Inner ring (Cyan, rotates clockwise) */}
          <motion.svg
            className="absolute w-28 h-28 text-cyan-400"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
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

          {/* Outer ring (Purple, rotates counter-clockwise) */}
          <motion.svg
            className="absolute w-36 h-36 text-indigo-500"
            viewBox="0 0 100 100"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
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

          {/* Center initials PO */}
          <motion.div
            className="text-white font-heading font-black text-2xl tracking-tighter uppercase"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PO
          </motion.div>
        </div>

        {/* Loading status message */}
        <div className="flex flex-col items-center gap-2">
          <motion.p
            className="text-gray-400 font-mono text-xs uppercase tracking-[0.35em] pl-[0.35em] min-w-[280px] text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            INITIALIZING PROTOCOL{dots}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
