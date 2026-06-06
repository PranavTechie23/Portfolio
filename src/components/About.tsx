import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CountUp } from './AnimatedText';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start"
      >
        {/* Left Column: Visual & Header */}
        <div className="lg:col-span-5 space-y-12">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-8 bg-primary" />
              <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 uppercase">About Me</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black font-heading text-gray-950 dark:text-slate-100 tracking-tighter leading-none uppercase italic">
              Solving complex problems <br />
              <span className="text-primary italic">through structured approaches.</span>
            </h2>
          </motion.div>
 
          {/* Impact Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { to: 9.1, decimals: 1, suffix: '', label: 'CGPA (Current)' },
              { to: 10, decimals: 0, suffix: '+', label: 'Major Projects' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="p-6 md:p-8 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:border-primary/30 transition-colors duration-500 relative overflow-hidden group"
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(33,150,243,0.12)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-2xl md:text-4xl font-black text-gray-950 dark:text-slate-100 mb-1">
                  <CountUp to={stat.to} decimals={stat.decimals} suffix={stat.suffix} />
                </div>
                <div className="relative text-[10px] font-mono font-bold text-primary uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column: Narrative Content */}
        <div className="lg:col-span-7 pt-4 space-y-10">
          <motion.p variants={itemVariants} className="text-2xl md:text-3xl text-gray-700 dark:text-slate-300 leading-tight font-medium">
            I’m a <span className="text-gray-950 dark:text-slate-100 font-bold border-b-2 border-primary/20">Computer Engineering</span> student with strong foundations in Data Structures, Algorithms, and Object-Oriented Programming.
          </motion.p>

          <motion.p variants={itemVariants} className="text-xl text-gray-500 dark:text-slate-400 leading-relaxed">
            I specialize in building scalable full-stack and AI-driven applications. My interest lies in designing efficient backend systems and improving software quality through automation.
          </motion.p>

          <motion.div variants={itemVariants} className="h-[1px] w-full bg-gray-100 dark:bg-slate-800" />

          <motion.p variants={itemVariants} className="text-xl text-gray-500 dark:text-slate-400 leading-relaxed italic">
            Whether it's matching candidates to opportunities or applying machine learning for clinical decision support, I enjoy tackling challenges that demand robust, well-architected solutions.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Building in Public // Learning from Feedback</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
