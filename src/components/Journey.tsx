import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { easeOutExpo } from '../utils/motion';
import { ScrollProgressReveal } from './motion/MobileScrollReveal';


const journeyItems = [
  {
    title: 'Machine Learning Specialization',
    status: 'DeepLearning.AI',
    description: 'Explored advanced machine learning techniques, fundamentals, and model architectures.'
  },
  {
    title: 'Full Stack Web Development',
    status: 'Completed',
    description: 'Built scalable and responsive web applications with modern frontend and backend technologies.'
  },
  {
    title: 'Java Programming',
    status: 'Completed',
    description: 'Mastered Object-Oriented Programming and advanced data structures using Java.'
  }
];

const Journey: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isInView = useInView(ref, { once: true, margin: isMobile ? '-4%' : '-10%' });
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: isMobile ? '-8%' : '-15%' });
  const resumeRef = useRef<HTMLDivElement>(null);
  const resumeInView = useInView(resumeRef, { once: true, margin: isMobile ? '-8%' : '-15%' });
  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const scrollLineProgress = useSpring(lineProgress, { damping: 20, stiffness: 100 });
  const prefersReducedMotion = useReducedMotion();
  const scaleY = prefersReducedMotion ? 1 : scrollLineProgress;

  return (
    <div ref={ref} className="relative w-full">
      <motion.div 
        className="mb-20 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: isMobile ? 0.6 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-8 bg-primary" />
          <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 uppercase">Momentum</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none">
          Continuous <span className="text-primary italic">Growth</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
        {/* Left column: Timeline */}
        <div ref={timelineRef} className="lg:col-span-7 relative">
          {/* Background track vertical line */}
          <div className="absolute left-0 top-6 bottom-6 w-px bg-gray-200 dark:bg-slate-800" />
          {/* Animated scroll progress vertical line */}
          <motion.div
            style={{
              scaleY,
              transformOrigin: 'top',
            }}
            className="absolute left-0 top-6 bottom-6 w-0.5 bg-primary"
          />
          {journeyItems.map((item, idx) => {
            const itemContent = (
              <>
                <motion.div
                  className="absolute left-[-5px] top-4 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(33,150,243,0.3)]"
                  initial={{ scale: 0 }}
                  animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: (isMobile ? 0.15 : 0.3) + idx * (isMobile ? 0.08 : 0.15) }}
                  whileHover={{ scale: 1.6, boxShadow: '0 0 20px rgba(33,150,243,0.6)' }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                  <h4 className="text-xl sm:text-3xl font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tighter">
                    {item.title}
                  </h4>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-mono font-black uppercase tracking-widest italic border ${
                    item.status === 'Learning' ? 'bg-primary/5 border-primary/20 text-primary' :
                    item.status === 'Exploring' ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-600' :
                    'bg-orange-500/5 border-orange-500/20 text-orange-600'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <p className="text-base sm:text-xl text-gray-500 dark:text-slate-400 leading-relaxed font-medium max-w-2xl italic">
                  {item.description}
                </p>
              </>
            );

            if (isMobile) {
              return (
                <ScrollProgressReveal key={idx} offset={["start end", "center center"]} className={`relative pl-12 group ${idx < journeyItems.length - 1 ? 'pb-16' : 'pb-0'}`}>
                  {itemContent}
                </ScrollProgressReveal>
              );
            }

            return (
              <motion.div 
                key={idx} 
                className={`relative pl-12 group ${idx < journeyItems.length - 1 ? 'pb-16' : 'pb-0'}`}
                initial={{ opacity: 0, x: -40 }}
                animate={timelineInView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -40 }}
                transition={{ duration: 0.7, delay: 0.2 + idx * 0.15, ease: easeOutExpo }}
                whileHover={{ x: 8 }}
              >
                {itemContent}
              </motion.div>
            );
          })}
        </div>

        {/* Right column: Resume Card */}
        <div ref={resumeRef} className="lg:col-span-5 w-full">
          {(() => {
            const cardContent = (
              <>
                {/* Background Glow Accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
                
                <div className="space-y-4 relative z-10">
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary uppercase font-mono font-black text-[10px] tracking-widest italic font-heading">
                    Credentials // CV
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tighter leading-tight">
                    Curriculum <br />
                    <span className="text-primary italic">Vitae</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
                    Detailed view of academic projects, credentials, and software engineering capabilities. Grab a PDF copy.
                  </p>
                </div>

                <div className="h-px bg-gray-100 dark:bg-slate-800 relative z-10" />

                <div className="relative z-10 flex flex-col gap-3">
                  <a
                    href="https://drive.google.com/drive/u/0/folders/16Hda7UxTbH9JNndZKd_bfvm-vgM6a9S_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 bg-gray-950 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-black font-heading tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2 rounded-xl"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Access Resume
                  </a>
                </div>
              </>
            );

            if (isMobile) {
              return (
                <ScrollProgressReveal offset={["start end", "center center"]}>
                  <div className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 sm:p-10 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/40 flex flex-col gap-6">
                    {cardContent}
                  </div>
                </ScrollProgressReveal>
              );
            }

            return (
              <motion.div
                className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 sm:p-10 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-2xl flex flex-col gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={resumeInView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
              >
                {cardContent}
              </motion.div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Journey;
