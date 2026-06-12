import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RevealWords } from './AnimatedText';
import Magnetic from './motion/Magnetic';
import { easeOutExpo } from '../utils/motion';


const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isInView = useInView(ref, { once: true, margin: isMobile ? '-4%' : '-20%' });

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center relative py-16 sm:py-20 px-8 sm:px-12 bg-white/50 dark:bg-slate-900/40 backdrop-blur-xl border border-gray-200/60 dark:border-slate-800/60 shadow-2xl rounded-[2.5rem]">
      
      {/* Background glowing blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-primary/20 rounded-full blur-[80px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div 
        className="text-center space-y-6 max-w-2xl w-full"
        initial={isMobile
          ? { opacity: 0, y: 44, scale: 0.92, filter: 'blur(10px)' }
          : { opacity: 0, y: 30 }
        }
        animate={isInView
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : isMobile
            ? { opacity: 0, y: 44, scale: 0.92, filter: 'blur(10px)' }
            : { opacity: 0, y: 30 }
        }
        transition={{ duration: isMobile ? 0.8 : 0.6, ease: easeOutExpo }}
      >
        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="h-[2px] w-6 bg-primary" />
          <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 dark:text-slate-400 uppercase">Signal Check</span>
          <div className="h-[2px] w-6 bg-primary" />
        </div>
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-heading tracking-tighter leading-none text-gray-950 dark:text-slate-100 uppercase selection:bg-primary selection:text-white">
          <RevealWords text="LET'S CONNECT" />
        </h2>

        <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 font-medium max-w-lg mx-auto leading-relaxed">
          Currently open to freelance and full-time opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="pt-6 flex justify-center">
          <Magnetic strength={0.25}>
          <motion.a 
            href="mailto:pranavoswal21@gmail.com"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-white dark:bg-slate-950 border border-gray-900 dark:border-slate-700 overflow-hidden transition-all duration-300 hover:shadow-[6px_6px_0_rgba(33,150,243,1)] rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-x-0 bottom-0 h-0 bg-primary transition-all duration-300 ease-out group-hover:h-full z-0" />
            
            <span className="relative z-10 text-sm sm:text-base font-bold font-heading uppercase text-gray-900 dark:text-slate-100 group-hover:text-white transition-colors tracking-wide">Initiate Comms</span>
            <div className="relative z-10 w-8 h-8 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all rounded-lg">
              <ArrowRight className="w-4 h-4 text-gray-900 dark:text-slate-100 group-hover:-rotate-45 transition-all" />
            </div>
            
          </motion.a>
          </Magnetic>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
