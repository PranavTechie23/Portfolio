import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import BlueprintCanvas from './BlueprintCanvas';

interface HeroProps {
  isDarkMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < 1024 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prefersReducedMotion = useReducedMotion();

  // Mouse parallax on portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 120 });

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 14);
      mouseY.set((e.clientY / innerHeight - 0.5) * 14);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, mouseX, mouseY]);

  // Scroll parallax exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  // Scroll-left parallax: portrait drifts left as user scrolls (like neelshingavi.in)
  const portraitX = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br dark:from-[#0A0C10] dark:via-[#0D1117] dark:to-[#050608] from-[#F0F4FF] via-[#F1F3F5] to-[#E8EDF7] text-slate-900 dark:text-slate-100 transition-colors duration-500 pt-16 sm:pt-20 lg:pt-16 pb-6"
    >
      {/* Blueprint Grid Background: Canvas on Desktop, Static Grid on Mobile */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30 pointer-events-none">
        {isMobile ? (
          <div
            className="w-full h-full hero-mobile-grid"
          />
        ) : (
          <BlueprintCanvas isDarkMode={isDarkMode} />
        )}
      </div>

      {/* Floating Particle Dots — decorative ambient animation */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
          {[
            { w: 3, h: 3, top: '18%', left: '12%', delay: '0s', dur: '7s' },
            { w: 2, h: 2, top: '72%', left: '8%',  delay: '1.5s', dur: '9s' },
            { w: 4, h: 4, top: '34%', left: '22%', delay: '3s',   dur: '6s' },
            { w: 2, h: 2, top: '58%', left: '40%', delay: '0.8s', dur: '11s' },
            { w: 3, h: 3, top: '80%', left: '55%', delay: '2s',   dur: '8s' },
            { w: 2, h: 2, top: '25%', left: '68%', delay: '4s',   dur: '10s' },
            { w: 3, h: 3, top: '62%', left: '78%', delay: '1s',   dur: '7.5s' },
            { w: 2, h: 2, top: '45%', left: '88%', delay: '2.5s', dur: '9.5s' },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full dark:bg-cyan-400/50 bg-primary/40"
              style={{
                width: p.w, height: p.h,
                top: p.top, left: p.left,
                animation: `heroParticleFade ${p.dur} ease-in-out ${p.delay} infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Cybernetic Ambient Light Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Cyan Ambient Aura behind the portrait */}
        <div className="absolute top-1/4 right-1/12 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full dark:bg-cyan-500/15 bg-blue-400/10 blur-3xl pointer-events-none" />
        {/* Purple tint accent top-left */}
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full dark:bg-violet-600/8 bg-indigo-400/8 blur-3xl pointer-events-none" />
        {/* Blue Ambient Glow in bottom-left */}
        <div className="absolute bottom-1/6 left-1/12 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] rounded-full dark:bg-blue-600/12 bg-sky-400/8 blur-3xl pointer-events-none" />

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none z-[5] opacity-5">
          <div className="w-full h-[2px] dark:bg-cyan-400/20 bg-blue-500/10 absolute animate-scan" />
        </div>
      </div>

      {/* Subtle "ENGINEER" Watermark in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none select-none overflow-hidden opacity-[0.18] dark:opacity-[0.12]">
        <span
          className="text-[18vw] font-black font-heading leading-none tracking-[-0.05em] select-none text-transparent hero-engineer-watermark"
        >
          ENGINEER
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-8 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100dvh-130px)]">
          
          {/* Left Column: Hero Narrative, Name & Actions */}
          <motion.div
            style={prefersReducedMotion ? {} : { y: contentY, opacity }}
            className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 lg:space-y-6 z-20"
          >
            {/* Location & Role Status Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full dark:bg-cyan-500/10 bg-primary/8 border dark:border-cyan-500/20 border-primary/15 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.2em] dark:text-cyan-400 text-primary uppercase">
                  Pune, India
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full dark:bg-slate-800/60 bg-white/70 border dark:border-slate-700/50 border-gray-200/80 backdrop-blur-sm">
                <svg className="w-3 h-3 dark:text-slate-400 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                
              </div>
            </motion.div>

            {/* Name Headline (Space Grotesk - Our Theme Font) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.4rem] font-black font-heading tracking-tighter uppercase leading-[0.94] text-gray-950 dark:text-slate-100 select-none">
                PRANAV SANJAY <br />
                <span className="relative inline-block">
                  <span
                    className="bg-clip-text text-transparent animate-name-shimmer"
                    style={{
                      backgroundImage: isDarkMode
                        ? 'linear-gradient(90deg, #22d3ee 0%, #60a5fa 35%, #a78bfa 55%, #22d3ee 75%, #60a5fa 100%)'
                        : 'linear-gradient(90deg, #2196F3 0%, #0ea5e9 35%, #3b82f6 55%, #2196F3 75%, #0ea5e9 100%)',
                      backgroundSize: '250% auto',
                    }}
                  >OSWAL</span>
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] sm:h-1 rounded-full overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 animate-gradient-x" />
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Role Pills with staggered entrance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-2 pt-0.5"
            >
              {[
                { label: 'PROBLEM SOLVER', icon: '⚡' },
                { label: 'FULL-STACK DEV', icon: '{ }' },
                { label: 'AI SYSTEMS', icon: '◈' },
              ].map((role, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                  className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.14em] dark:text-cyan-400 text-primary border dark:border-cyan-500/30 border-primary/20 rounded-md dark:bg-cyan-500/5 bg-primary/5 uppercase flex items-center gap-1.5"
                >
                  <span className="opacity-70">{role.icon}</span>
                  {role.label}
                </motion.span>
              ))}
            </motion.div>

            {/* Summary Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-sm sm:text-base md:text-base lg:text-[1.05rem] text-gray-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl"
            >
              Computer Engineering student specializing in building high-performance web applications,
              distributed systems, and AI-driven architectures. Proficient across C++, Python,
              TypeScript, React, and PostgreSQL, with strong foundations in Data Structures and Algorithms.
            </motion.p>

            {/* Actions & Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              {/* Primary: Enter Experience / Explore */}
              <div className="relative inline-block rounded-lg">
                {/* Spinning conic-gradient border — dark mode only */}
                <div className="absolute -inset-[2px] rounded-[10px] overflow-hidden hero-explore-spin-ring pointer-events-none">
                  <div className="hero-explore-spin-inner" />
                </div>
                {/* Outer diffuse glow */}
                <div className="absolute -inset-1 rounded-xl dark:bg-cyan-500/20 bg-primary/10 blur-md pointer-events-none hero-explore-glow-pulse" />
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById('projects');
                    if (target) {
                      const offset = window.innerWidth < 768 ? -72 : -96;
                      const top = target.getBoundingClientRect().top + window.scrollY + offset;
                      window.scrollTo({ top, behavior: 'smooth' });
                    }
                  }}
                  className="group relative z-10 px-6 sm:px-7 py-3 sm:py-3.5 text-white font-mono font-bold text-xs uppercase tracking-[0.18em] rounded-lg transition-all duration-300 hover:-translate-y-0.5 inline-flex items-center gap-2 overflow-hidden hero-explore-btn"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    EXPLORE WORK
                    <svg
                      className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 14 14"
                      stroke="currentColor"
                      strokeWidth={2.2}
                    >
                      <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>


              {/* Secondary: LinkedIn Connect */}
              <a
                href="https://www.linkedin.com/in/pranav-oswal"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 sm:px-7 py-3 sm:py-3.5 border dark:border-cyan-400/40 border-primary/40 dark:hover:border-cyan-400 hover:border-primary dark:bg-[#0A0C10]/60 bg-white/70 hover:bg-primary/5 dark:hover:bg-cyan-500/10 text-gray-900 dark:text-cyan-300 font-mono font-bold text-xs uppercase tracking-[0.18em] rounded-lg transition-all duration-300 backdrop-blur-md inline-flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
              >
                {/* LinkedIn logo icon */}
                <svg
                  className="w-4 h-4 text-[#0A66C2] dark:text-[#38bdf8] flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>CONNECT</span>
                {/* Animated arrow */}
                <svg
                  className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 14 14"
                  strokeWidth={2.2}
                >
                  <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>

            {/* Quick Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="pt-4 sm:pt-5 border-t border-gray-200 dark:border-slate-800 max-w-lg"
            >
              <div className="grid grid-cols-3 gap-0 divide-x divide-gray-200 dark:divide-slate-800">
                {[
                  { value: '9.03', label: 'CGPA', sub: 'Current', color: 'text-emerald-500 dark:text-emerald-400' },
                  { value: '1000+', label: 'Problem Solved', sub: 'LeetCode', color: 'text-primary dark:text-cyan-400' },
                  { value: '10+',  label: 'Projects', sub: 'Shipped', color: 'text-violet-500 dark:text-violet-400' },
                ].map((m, i) => (
                  <div key={i} className={`${i === 0 ? 'pr-4' : i === 1 ? 'px-4' : 'pl-4'} group`}>
                    <div className={`text-2xl sm:text-3xl font-black font-heading ${m.color} tabular-nums transition-transform duration-200 group-hover:scale-105 origin-left`}>{m.value}</div>
                    <div className="text-[11px] font-mono font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider mt-0.5">{m.label}</div>
                    <div className="text-[9px] font-mono text-gray-400 dark:text-slate-500 uppercase tracking-wider">{m.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Executive Professional Portrait for HR & Tech Recruiters */}
          <motion.div
            style={prefersReducedMotion ? {} : { y: portraitY, x: portraitX, opacity }}
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
          >
            {/* Portrait Wrapper with Subtle Mouse Parallax */}
            <motion.div
              style={prefersReducedMotion ? {} : { x: springX, y: springY }}
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[470px] xl:max-w-[490px] flex flex-col items-center"
            >
              {/* Soft Ambient Glow Halo behind card */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full blur-3xl pointer-events-none -z-10 hero-portrait-glow"
              />

              {/* Executive Bento Portrait Card */}
              <div
                className="relative w-full max-w-[300px] sm:max-w-[370px] lg:max-w-[460px] rounded-3xl overflow-hidden shadow-2xl border transition-all duration-300 hero-portrait-card"
              >
                {/* Subtle top rim highlight line */}
                <div
                  className="absolute top-0 inset-x-0 h-[1px] z-20 hero-portrait-rimlight"
                />

                {/* Soft inner studio spotlight behind head */}
                <div
                  className="absolute top-[20%] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-2xl pointer-events-none hero-portrait-spotlight"
                />

                {/* Subject Portrait Image - Contained naturally */}
                <div className="relative w-full h-[340px] sm:h-[430px] lg:h-[500px] xl:h-[520px] flex items-end justify-center pt-6">
                  <img
                    src="/PranavOswal_Pic_nobg.webp"
                    alt="Pranav Sanjay Oswal - Software Engineer"
                    className="relative z-10 w-auto h-full max-h-[500px] object-contain object-bottom select-none pointer-events-none hero-portrait-img"
                    loading="eager"
                  />
                </div>

                {/* Integrated Executive Footer Strip for Recruiters */}
                <div
                  className="relative z-20 px-4 py-3 flex items-center justify-between border-t backdrop-blur-md hero-portrait-footer"
                >
                  <div className="flex flex-col">
                    <span className="text-[12px] font-mono font-bold tracking-tight dark:text-slate-100 text-slate-900">
                      Pranav Sanjay Oswal
                    </span>
                    <span className="text-[10px] font-mono font-medium dark:text-cyan-400 text-primary">
                      Software Engineer • Pune, IN
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full dark:bg-emerald-500/10 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-200">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  
                  </div>
                </div>
              </div>

              {/* Sub-card role tag */}
              
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll-down cue */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20 pointer-events-none"
        >
          <span className="text-[9px] font-mono tracking-[0.3em] dark:text-slate-500 text-gray-400 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8 dark:bg-gradient-to-b dark:from-cyan-400/60 dark:to-transparent bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      )}

      {/* Keyframe Styles */}
      <style>{`
        @keyframes scan {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        @keyframes pulse-ring {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        .animate-pulse-ring {
          animation: pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spinSlow 32s linear infinite;
        }
        @keyframes nameShinmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-name-shimmer {
          animation: nameShinmer 4s linear infinite;
        }
        @keyframes gradientX {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradientX 3s ease infinite;
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(34,211,238,0.15), inset 0 0 12px rgba(34,211,238,0.06); }
          50%       { box-shadow: 0 0 28px rgba(34,211,238,0.28), inset 0 0 18px rgba(34,211,238,0.10); }
        }
        .animate-border-glow {
          animation: borderGlow 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;