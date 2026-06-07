import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CountUp } from './AnimatedText';

const education = [
  {
    title: "Pune Institute of Computer Technology",
    category: "B.Tech in Computer Engineering",
    meta: "Aug 2024 - June 2028",
    prize: "CGPA: 9.1",
    description: "Pursuing Bachelor of Technology with a focus on core computer science subjects, data structures, algorithms, and advanced software engineering principles.",
    outcome: "Built multiple full-stack and ML-based web applications, leading technical architectures in complex academic and extracurricular projects."
  },
  {
    title: "S.M. Choksey Junior College",
    category: "HSC (Higher Secondary Certificate)",
    meta: "July 2022 - June 2024",
    prize: "93.17% | 2nd Rank",
    description: "Completed higher secondary education with a science specialization, building a strong foundation in mathematics, physics, and computer science fundamentals.",
    outcome: "Achieved 2nd rank overall, demonstrating high academic rigor and discipline."
  },
  {
    title: "Acharya Shree Vijay Vallabh School",
    category: "SSC (Secondary School Certificate)",
    meta: "June 2020 - June 2022",
    prize: "97.20% | 1st Rank",
    description: "Completed secondary education with top honors.",
    outcome: "Achieved 1st rank overall."
  }
];

const Achievements: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });

  return (
    <div ref={ref} className="w-full">
      <motion.div 
        className="mb-20 space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-8 bg-primary" />
          <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 uppercase">Background</span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none">
          Education &amp; <br />
          <span className="text-primary italic">Academic Excellence</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 gap-12">
        {education.map((item, index) => (
          <motion.div
            key={index}
            className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 sm:p-8 md:p-12 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl overflow-hidden"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4 }}
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
            
            <div className="flex flex-col lg:flex-row gap-12 relative z-10">
              {/* Left Side: Meta */}
              <div className="lg:w-1/3 space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary uppercase font-mono font-black text-[10px] tracking-widest italic font-heading">
                    {item.meta}
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 uppercase font-mono font-black text-[10px] tracking-widest italic font-heading">
                    {index === 0 && <CountUp to={9.1} decimals={1} prefix="CGPA: " />}
                    {index === 1 && <CountUp to={93.17} decimals={2} suffix="% | 2nd Rank" />}
                    {index === 2 && <CountUp to={97.20} decimals={2} suffix="% | 1st Rank" />}
                  </span>
                </div>
                <div className="space-y-1">
                   <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-gray-950 dark:text-slate-100 tracking-tighter uppercase">{item.title}</h3>
                   <p className="text-xs font-mono font-bold text-gray-400 dark:text-slate-400 uppercase tracking-[0.3em]">{item.category}</p>
                </div>
              </div>

              {/* Right Side: Content */}
              <div className="lg:w-2/3 space-y-8">
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-slate-300 leading-relaxed font-medium">
                  {item.description}
                </p>
                
                <div className="p-6 bg-gray-50/80 dark:bg-slate-800/80 border-l-4 border-primary rounded-r-xl">
                   <h4 className="text-xs font-mono font-bold text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                     Highlights
                   </h4>
                   <p className="text-gray-700 dark:text-slate-300 font-medium leading-relaxed">
                     {item.outcome}
                   </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
