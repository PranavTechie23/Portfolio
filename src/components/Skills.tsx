import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { mobileStaggerContainer, mobileViewport, desktopViewport, easeOutExpo } from '../utils/motion';
import { ScrollProgressReveal } from './motion/MobileScrollReveal';

const skillCategories = [
  {
    title: "Programming",
    label: "Core Languages",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    accent: "#2196F3",
    skills: [
      { name: "Python", level: 90 },
      { name: "C++", level: 95 },
      { name: "Java", level: 72 },
      { name: "C", level: 65 },
    ],
  },
  {
    title: "Web Dev",
    label: "Frontend & Backend",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
      </svg>
    ),
    accent: "#7C3AED",
    skills: [
      { name: "React", level: 85 },
      { name: "TypeScript", level: 78 },
      { name: "HTML / CSS", level: 92 },
      { name: "Node.js", level: 70 },
    ],
  },
  {
    title: "ML / AI",
    label: "Machine Learning",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
      </svg>
    ),
    accent: "#059669",
    skills: [
      { name: "scikit-learn", level: 82 },
      { name: "Pandas", level: 88 },
      { name: "NumPy", level: 85 },
      { name: "LangChain", level: 65 },
    ],
  },
  {
    title: "Tools",
    label: "Platforms & DSA",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: "#F59E0B",
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "Data Structures", level: 80 },
      { name: "Algorithms", level: 75 },
      { name: "REST APIs", level: 78 },
    ],
  },
];

const Skills: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isInView = useInView(ref, { once: true, margin: isMobile ? '-4%' : '-15%' });
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: isMobile ? '-8%' : '-15%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const prefersReducedMotion = useReducedMotion();

  const yEvenTransform = useTransform(scrollYProgress, (v) => {
    if (prefersReducedMotion) return 0;
    const range = isMobile ? 32 : 60;
    return (v - 0.5) * 2 * range;
  });

  const yOddTransform = useTransform(scrollYProgress, (v) => {
    if (prefersReducedMotion) return 0;
    const range = isMobile ? 32 : 60;
    return (0.5 - v) * 2 * range;
  });

  const yEven = useSpring(yEvenTransform, { damping: 22, stiffness: 100 });
  const yOdd  = useSpring(yOddTransform,  { damping: 22, stiffness: 100 });

  return (
    <div ref={ref} className="relative w-full">
      {/* Header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: isMobile ? 0.6 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 dark:text-slate-400 uppercase">Toolkit</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none">
            Technical <span className="text-primary italic">Arsenal</span>
          </h2>
        </div>
      </motion.div>

      {/* Cards */}
      <div 
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        style={{ perspective: "1000px" }}
      >
        {skillCategories.map((category, idx) => {
          const yDrift = idx % 2 === 0 ? yEven : yOdd;
          
          const cardContent = (
            <div
                className="group relative flex flex-col p-7 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl cursor-default"
                style={{ '--accent': category.accent } as React.CSSProperties}
              >
                {/* Accent glow top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, ${category.accent}, transparent)` }}
                />

                {/* Entrance shine sweep effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 dark:via-white/5 to-transparent -skew-x-12 -left-full pointer-events-none"
                  animate={cardsInView ? { left: ["-100%", "200%"] } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + idx * 0.14, ease: "easeInOut" }}
                />

                {/* Background glow blob */}
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundColor: category.accent }}
                />

                {/* Index number */}
                <span className="absolute top-5 right-6 text-[11px] font-mono font-black text-gray-200 dark:text-slate-700 group-hover:text-gray-300 dark:group-hover:text-slate-600 transition-colors">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                {/* Icon + label */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                    style={{ backgroundColor: category.accent }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tight leading-none">
                      {category.title}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                      {category.label}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gray-100 dark:bg-slate-800 mb-5" />

                {/* Skills with animated progress bars */}
                <ul className="space-y-4 flex-grow">
                  {category.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-gray-600 dark:text-slate-400 uppercase tracking-widest group-hover:text-gray-800 dark:group-hover:text-slate-200 transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span
                          className="text-[10px] font-mono font-black opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ color: category.accent }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      {/* Progress bar */}
                      <div className="h-[3px] w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: category.accent }}
                          initial={{ width: 0 }}
                          animate={cardsInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: isMobile ? 0.8 : 1.0, delay: (isMobile ? 0.25 : 0.3) + idx * (isMobile ? 0.1 : 0.12) + sIdx * (isMobile ? 0.05 : 0.08), ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer badge */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <span
                    className="text-[9px] font-mono font-black uppercase tracking-[0.25em] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ color: category.accent }}
                  >
                    {category.skills.length} skills
                  </span>
                </div>
              </div>
            );

            if (isMobile) {
              return (
                <motion.div
                  key={`mobile-${idx}`}
                  style={{ y: yDrift, willChange: 'transform' }}
                  className="w-full"
                >
                  <ScrollProgressReveal offset={["start end", "center center"]}>
                    {cardContent}
                  </ScrollProgressReveal>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={idx}
                style={{ y: yDrift, willChange: 'transform' }}
                className="w-full"
              >
              <motion.div
                initial={{ opacity: 0, y: 55, scale: 0.96, rotateX: 8 }}
                animate={cardsInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0, filter: 'blur(0px)' } : { opacity: 0, y: 55, scale: 0.96, rotateX: 8 }}
                transition={{ duration: 0.65, delay: idx * 0.14, ease: easeOutExpo }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                {cardContent}
              </motion.div>
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;
