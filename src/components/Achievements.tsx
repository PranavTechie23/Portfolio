import React, { useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { CountUp } from './AnimatedText';
import { easeOutExpo } from '../utils/motion';

const education = [
  {
    school: "Pune Institute of Computer Technology",
    degree: "B.Tech in Computer Engineering",
    period: "Aug 2022 – Jun 2028",
    badge: "Current",
    score: 9.1,
    scoreLabel: "CGPA",
    countUpProps: { to: 9.1, decimals: 1 },
    description:
      "Pursuing Bachelor of Technology with a focus on core computer science, data structures, algorithms, and advanced software engineering principles.",
    highlight:
      "Built multiple full-stack and ML-based web applications, leading technical architectures in complex academic and extracurricular projects.",
  },
  {
    school: "S.M. Choksey Junior College",
    degree: "HSC (Higher Secondary Certificate) · Science",
    period: "Jul 2022 – Jun 2024",
    badge: "HSC",
    score: "93.17%",
    scoreLabel: "2nd Rank",
    countUpProps: { to: 93.17, decimals: 2, suffix: "%" },
    description:
      "Completed higher secondary education with a science specialization, building a strong foundation in mathematics, physics, and computer science fundamentals.",
    highlight: "Achieved 2nd rank overall, demonstrating high academic rigor and discipline.",
  },
  {
    school: "Acharya Shree Vijay Vallabh School",
    degree: "SSC (Secondary School Certificate)",
    period: "Jun 2020 – Jun 2022",
    badge: "SSC",
    score: "97.20%",
    scoreLabel: "1st Rank",
    countUpProps: { to: 97.20, decimals: 2, suffix: "%" },
    description: "Completed secondary education with top honors, ranked 1st in the school.",
    highlight: "Achieved 1st rank overall, demonstrating consistent academic excellence from an early stage.",
  },
];

const Achievements: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  // Reactive mobile check instead of a one-shot at render
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isInView = useInView(ref, { once: true, margin: isMobile ? '-4%' : '-10%' });
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: isMobile ? '-8%' : '-15%' });
  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });
  const scrollLineProgress = useSpring(lineProgress, { damping: 20, stiffness: 100 });
  const prefersReducedMotion = useReducedMotion();
  const scaleY = prefersReducedMotion ? 1 : scrollLineProgress;

  const dur = isMobile ? 0.65 : 0.7;

  return (
    <div ref={ref} className="relative w-full">
      {/* Header */}
      <motion.div
        className="mb-16 space-y-3"
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-8 bg-primary" />
          <span className="text-[11px] font-mono font-bold tracking-[0.4em] text-gray-400 uppercase">
            Background
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase leading-none">
          <span className="text-primary italic">Academic</span>{' '}
          <span className="italic">Excellence</span>
        </h2>
      </motion.div>
 
      {/* Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Background track vertical line */}
        <div className="absolute left-[11px] top-8 bottom-8 w-px bg-gray-200 dark:bg-slate-700" />
        {/* Animated scroll progress vertical line */}
        <motion.div
          style={{
            scaleY,
            transformOrigin: 'top',
          }}
          className="absolute left-[11px] top-8 bottom-8 w-0.5 bg-primary"
        />
 
        <div className="flex flex-col gap-0">
          {education.map((item, i) => (
            <motion.div
              key={i}
              className="relative flex gap-6"
              initial={isMobile
                ? { opacity: 0, x: -40, filter: 'blur(6px)' }
                : { opacity: 0, x: -32 }
              }
              animate={timelineInView
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : {}
              }
              transition={{ duration: dur, delay: i * (isMobile ? 0.1 : 0.15), ease: easeOutExpo }}
            >
              {/* Dot */}
              <div className="flex flex-col items-center pt-7 flex-shrink-0">
                <div className="w-[10px] h-[10px] rounded-full bg-primary ring-2 ring-white dark:ring-slate-900 ring-offset-1 ring-offset-primary/30 z-10" />
              </div>

              {/* Card */}
              <div className="flex-1 mb-5 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-xl p-5 sm:p-7 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300">
                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono font-bold text-[10px] tracking-wider uppercase">
                        {item.period}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-400 font-mono font-bold text-[10px] tracking-wider uppercase">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-950 dark:text-slate-100">
                      {item.school}
                    </h3>
                    <p className="text-[11px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-[0.25em]">
                      {item.degree}
                    </p>
                  </div>

                  {/* Score chip */}
                  <div className="flex-shrink-0 flex flex-col items-end px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700">
                    <span className="text-2xl font-black text-primary tabular-nums leading-none">
                      <CountUp {...item.countUpProps} />
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
                      {item.scoreLabel}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-gray-100 dark:bg-slate-800 mb-4" />

                <p className="text-sm sm:text-base text-gray-500 dark:text-slate-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlight */}
                <div className="flex gap-3 p-3.5 bg-gray-50 dark:bg-slate-800/80 rounded-lg border-l-[3px] border-primary">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mt-1.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                    {item.highlight}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;