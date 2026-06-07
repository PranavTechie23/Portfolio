import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RevealWords } from './AnimatedText';
import Magnetic from './motion/Magnetic';


const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });

  return (
    <div ref={ref} className="w-full flex flex-col items-center justify-center min-h-[50vh] relative pt-4 pb-16 sm:pb-20 px-4 bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-700 shadow-[8px_8px_0_rgba(0,0,0,0.05)]">
      
      {/* Background glowing blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10 mix-blend-multiply dark:mix-blend-screen"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div 
        className="text-center space-y-12 max-w-4xl w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[2px] w-8 bg-primary" />
          <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 dark:text-slate-400 uppercase">Signal Check</span>
          <div className="h-[2px] w-8 bg-primary" />
        </div>
        
        <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[120px] font-black font-heading tracking-tighter leading-none text-gray-950 dark:text-slate-100 uppercase selection:bg-primary selection:text-white">
          <RevealWords text="LET'S CONNECT" />
        </h2>

        <p className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
          Currently open to freelance and full-time opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="pt-12 flex justify-center">
          <Magnetic strength={0.25}>
          <motion.a 
            href="mailto:pranavoswal21@gmail.com"
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white dark:bg-slate-950 border-2 border-gray-900 dark:border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-[8px_8px_0_rgba(33,150,243,1)] block"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-x-0 bottom-0 h-0 bg-primary transition-all duration-300 ease-out group-hover:h-full z-0" />
            
            <span className="relative z-10 text-xl font-bold font-heading uppercase text-gray-900 dark:text-slate-100 group-hover:text-white transition-colors tracking-wide">Initiate Comms</span>
            <div className="relative z-10 w-10 h-10 bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
              <ArrowRight className="w-5 h-5 text-gray-900 dark:text-slate-100 group-hover:-rotate-45 transition-all" />
            </div>
            
          </motion.a>
          </Magnetic>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
