import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { CountUp } from './AnimatedText';
import { mobileCardReveal, mobileStaggerContainer, mobileViewport, desktopViewport, easeOutExpo } from '../utils/motion';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const viewport = isMobile ? mobileViewport : desktopViewport;
  const isInView = useInView(containerRef, { once: true, margin: isMobile ? '-4%' : '-10%' });

  // Scroll-driven parallax for the stat cards on mobile
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yLeft = useTransform(scrollYProgress, (v) =>
    prefersReducedMotion ? 0 : isMobile ? (v - 0.5) * 2 * 18 : 0
  );
  const yRight = useTransform(scrollYProgress, (v) =>
    prefersReducedMotion ? 0 : isMobile ? (0.5 - v) * 2 * 18 : 0
  );
  const yLeftSpring  = useSpring(yLeft,  { damping: 30, stiffness: 90 });
  const yRightSpring = useSpring(yRight, { damping: 30, stiffness: 90 });

  /* ── Container + item variants ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.15,
        delayChildren: isMobile ? 0.05 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: isMobile
      ? { opacity: 0, y: 36, filter: 'blur(5px)' }
      : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: isMobile ? 0.75 : 0.8,
        ease: easeOutExpo,
      },
    },
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start"
      >
        {/* Left Column: Visual & Header */}
        <div className="lg:col-span-5 space-y-12">
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-4">
              <motion.div
                className="h-[2px] bg-primary origin-left"
                initial={{ width: 0 }}
                animate={isInView ? { width: 32 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
              />
              <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 uppercase">About Me</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-gray-950 dark:text-slate-100 tracking-tighter leading-none uppercase italic">
              Solving complex problems <br />
              <span className="text-primary italic">through structured approaches.</span>
            </h2>
          </motion.div>

          {/* Impact Stats — with scroll-parallax drift on mobile */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { to: 9.1, decimals: 1, suffix: '', label: 'CGPA (Current)', ySpring: yLeftSpring },
              { to: 10, decimals: 0, suffix: '+', label: 'Major Projects', ySpring: yRightSpring },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                style={{ y: isMobile && !prefersReducedMotion ? stat.ySpring : 0, willChange: 'transform' }}
                initial={isMobile ? { opacity: 0, scale: 0.88, y: 28 } : {}}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.12, ease: easeOutExpo }}
                className="p-6 md:p-8 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl hover:border-primary/30 transition-colors duration-500 relative overflow-hidden group"
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(33,150,243,0.12)' }}
                whileTap={isMobile ? { scale: 0.97 } : {}}
              >
                {/* Animated gradient sweep on mobile scroll-in */}
                {isMobile && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                  />
                )}
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
          <motion.p variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-slate-300 leading-tight font-medium">
            I'm a <span className="text-gray-950 dark:text-slate-100 font-bold border-b-2 border-primary/20">Computer Engineering</span> student with strong foundations in Data Structures, Algorithms, and Object-Oriented Programming.
          </motion.p>

          <motion.p variants={itemVariants} className="text-base sm:text-xl text-gray-500 dark:text-slate-400 leading-relaxed">
            I specialize in building scalable full-stack and AI-driven applications. My interest lies in designing efficient backend systems and improving software quality through automation.
          </motion.p>

          <motion.div variants={itemVariants} className="h-[1px] w-full bg-gray-100 dark:bg-slate-800" />

          <motion.p variants={itemVariants} className="text-base sm:text-xl text-gray-500 dark:text-slate-400 leading-relaxed italic">
            Whether it's matching candidates to opportunities or applying machine learning for clinical decision support, I enjoy tackling challenges that demand robust, well-architected solutions.
          </motion.p>

          <motion.div variants={itemVariants} className="flex items-center gap-4">
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
