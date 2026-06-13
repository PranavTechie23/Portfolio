import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { easeOutExpo } from '../utils/motion';

import { ArrowUpRight } from 'lucide-react';

const GITHUB_LOGO = (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LINKEDIN_LOGO = (
  <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

// Live activity bars reflecting the current progression of the year
const ActivityBars: React.FC<{ color: string }> = ({ color }) => {
  const bars = React.useMemo(() => {
    const numBars = 40;
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    
    // Calculate how much of the year has passed
    const percentPassed = (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
    const activeBarsCount = Math.ceil(percentPassed * numBars);
    
    return Array.from({ length: numBars }).map((_, i) => {
      if (i < activeBarsCount) {
        // Active past/present days get varied heights (3 to 10)
        return Math.floor(Math.random() * 8) + 3;
      }
      // Future days get a flat minimal height
      return 1;
    });
  }, []);

  return (
    <div className="flex items-end gap-[2px] h-10 w-full mt-2">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className={`flex-1 rounded-sm ${h > 1 ? 'opacity-70' : 'opacity-20'}`}
          style={{ backgroundColor: color, height: `${h * 4}px` }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4, delay: i * 0.03, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

const BuildInPublic: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isInView = useInView(ref, { once: true, margin: isMobile ? '-4%' : '-15%' });
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: isMobile ? '-8%' : '-15%' });

  const TiltCard = ({
    title, icon: BrandLogo, type, url, handle, purpose, stats,
  }: {
    title: string;
    icon: React.ReactNode;
    type: 'github' | 'linkedin';
    url: string;
    handle: string;
    purpose: string;
    stats: { label: string; value: string }[];
  }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const smoothRotateX = useSpring(rotateX, springConfig);
    const smoothRotateY = useSpring(rotateY, springConfig);

    const isGithub = type === 'github';
    const accentColor = isGithub ? '#374151' : '#0A66C2';
    const glowColor = isGithub ? 'rgba(55,65,81,0.12)' : 'rgba(10,102,194,0.15)';
    const iconBg = isGithub ? 'bg-gray-800 dark:bg-slate-700' : 'bg-[#0A66C2]';
    const badgeBg = isGithub
      ? 'bg-gray-100 text-gray-600 dark:bg-slate-700/60 dark:text-slate-300'
      : 'bg-[#0A66C2]/10 text-[#0A66C2] dark:bg-[#0A66C2]/20 dark:text-[#5ba4f5]';
    const borderHover = isGithub
      ? 'hover:border-gray-400 dark:hover:border-slate-500'
      : 'hover:border-[#0A66C2]/60';
    const statColor = isGithub
      ? 'text-gray-900 dark:text-slate-100'
      : 'text-[#0A66C2] dark:text-[#5ba4f5]';

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8;
      const y = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 8;
      setRotateY(x);
      setRotateX(y);
    };

    const handleMouseLeave = () => {
      if (isMobile) return;
      setRotateX(0);
      setRotateY(0);
    };

    return (
      <motion.a
        ref={cardRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col p-6 sm:p-8 md:p-10 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 ${borderHover} rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl`}
        initial={isMobile
          ? { opacity: 0, y: 44, scale: 0.90, filter: 'blur(8px)' }
          : { opacity: 0, y: 40 }
        }
        animate={cardsInView
          ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
          : isMobile
            ? { opacity: 0, y: 44, scale: 0.90, filter: 'blur(8px)' }
            : { opacity: 0, y: 40 }
        }
        transition={{ duration: isMobile ? 0.72 : 0.6, ease: easeOutExpo }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.97 }}
        style={isMobile ? {} : {
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: glowColor }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 flex flex-col h-full gap-6" style={isMobile ? {} : { transform: 'translateZ(30px)' }}>
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className={`w-14 h-14 p-3.5 rounded-2xl ${iconBg} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
              {BrandLogo}
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest ${badgeBg}`}>
                Live
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
          </div>

          {/* Title + handle */}
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black font-heading text-gray-950 dark:text-slate-100 uppercase tracking-tight leading-none group-hover:text-primary dark:group-hover:text-white transition-colors">
              {title}
            </h3>
            <p className="text-[11px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-[0.25em]">{handle}</p>
          </div>

          {/* Purpose */}
          <p className="text-sm font-medium text-gray-500 dark:text-slate-400 leading-relaxed italic flex-grow">
            {purpose}
          </p>

          {/* Activity bars */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-gray-400 dark:text-slate-600 uppercase tracking-widest">Activity</span>
            <ActivityBars color={accentColor} />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
            {stats.map((s, i) => (
              <div key={i} className="space-y-0.5">
                <p className={`text-lg font-black font-heading ${statColor} leading-none`}>{s.value}</p>
                <p className="text-[10px] font-mono text-gray-400 dark:text-slate-500 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-gray-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-slate-300 transition-colors">
              Follow Build
            </span>
            <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 dark:group-hover:border-slate-400 dark:group-hover:bg-slate-700 transition-all">
              <ArrowUpRight className="w-4 h-4 text-gray-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-slate-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        </div>
      </motion.a>
    );
  };

  return (
    <div ref={ref} className="w-full flex flex-col space-y-16">
      {/* Section header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: isMobile ? 0.6 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 dark:text-slate-400 uppercase">
              Build In Public
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none">
            I Ship{' '}
            <span className="text-primary italic">
              In Public
            </span>
          </h2>
        </div>

        <p className="text-sm font-medium text-gray-500 dark:text-slate-400 leading-relaxed max-w-xs">
          Every commit, post, and experiment — logged and shared openly as I build.
        </p>
      </motion.div>

      {/* Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <TiltCard
          title="GitHub"
          handle="@PranavTechie23"
          purpose="Open source projects, ML experiments, and full-stack tools — all shipped and committed in the open."
          icon={GITHUB_LOGO}
          type="github"
          url="https://github.com/PranavTechie23"
          stats={[
            { label: 'Repos', value: '20+' },
            { label: 'Commits', value: '500+' },
            { label: 'Stars', value: '12' },
          ]}
        />
        <TiltCard
          title="LinkedIn"
          handle="pranavoswal23"
          purpose="Engineering milestones, project breakdowns, and AI/ML insights from my daily learning loop."
          icon={LINKEDIN_LOGO}
          type="linkedin"
          url="https://www.linkedin.com/in/pranavoswal23"
          stats={[
            { label: 'Followers', value: '1650+' },
            { label: 'Network', value: '500+' },
            { label: 'Reach', value: '10K+' },
          ]}
        />
      </div>
    </div>
  );
};

export default BuildInPublic;
