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
                  className="absolute left-[-6px] top-4 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(33,150,243,0.8)] ring-4 ring-white dark:ring-slate-900"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                  whileHover={{ scale: 1.6, boxShadow: '0 0 20px rgba(33,150,243,0.8)' }}
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tight">
                    {item.title}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest italic border self-start ${
                    item.status === 'Learning' ? 'bg-primary/5 border-primary/20 text-primary' :
                    item.status === 'Exploring' ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-600' :
                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <p className="text-base sm:text-lg text-gray-500 dark:text-slate-400 leading-relaxed font-normal max-w-2xl">
                  {item.description}
                </p>
              </>
            );

            if (isMobile) {
              return (
                <ScrollProgressReveal key={idx} offset={["start end", "center center"]} className={`relative pl-10 group ${idx < journeyItems.length - 1 ? 'pb-14' : 'pb-0'}`}>
                  {itemContent}
                </ScrollProgressReveal>
              );
            }

            return (
              <motion.div 
                key={idx} 
                className={`relative pl-10 group ${idx < journeyItems.length - 1 ? 'pb-14' : 'pb-0'}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: easeOutExpo }}
                whileHover={{ x: 6 }}
              >
                {itemContent}
              </motion.div>
            );
          })}
        </div>

        {/* Right column: Resume Card */}
        <div ref={resumeRef} className="lg:col-span-5 w-full">
          {(() => {
            const certifications = [
              {
                title: 'Machine Learning Specialization',
                issuer: 'DeepLearning.AI × Coursera',
                year: '2024',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                ),
                color: 'text-violet-500 dark:text-violet-400',
                bg: 'bg-violet-500/5 border-violet-500/15',
              },
              {
                title: 'Full Stack Web Development',
                issuer: 'Udemy — Industry Certification',
                year: '2023',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ),
                color: 'text-primary dark:text-cyan-400',
                bg: 'bg-primary/5 border-primary/15',
              },
              {
                title: 'Java Programming',
                issuer: 'NPTEL — IIT Certification',
                year: '2023',
                icon: (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
                  </svg>
                ),
                color: 'text-orange-500 dark:text-orange-400',
                bg: 'bg-orange-500/5 border-orange-500/15',
              },
            ];

            const cardContent = (
              <>
                {/* Background Glow Accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-500" />

                <div className="space-y-3 relative z-10">
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary uppercase font-mono font-black text-[10px] tracking-widest italic inline-block">
                    Credentials // Certified
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tighter leading-tight">
                    My <br />
                    <span className="text-primary italic">Certifications</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
                    Industry-recognised credentials in AI, full-stack engineering, and computer science.
                  </p>
                </div>

                <div className="h-px bg-gray-100 dark:bg-slate-800 relative z-10" />

                {/* Certification Cards */}
                <div className="relative z-10 flex flex-col gap-3">
                  {certifications.map((cert, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border ${cert.bg} transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
                    >
                      <div className={`flex-shrink-0 mt-0.5 ${cert.color}`}>
                        {cert.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold font-heading text-gray-900 dark:text-slate-100 tracking-tight leading-tight truncate">
                          {cert.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-slate-400 font-mono mt-0.5 truncate">
                          {cert.issuer}
                        </div>
                      </div>
                      <div className={`flex-shrink-0 text-[10px] font-mono font-black ${cert.color} opacity-70`}>
                        {cert.year}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gray-100 dark:bg-slate-800 relative z-10" />

                <div className="relative z-10">
                  <a
                    href="/resume/ResumeUpdated.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3.5 bg-gray-950 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-black font-heading tracking-[0.2em] uppercase hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2 rounded-xl"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
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
