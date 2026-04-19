import React, { useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import clsx from 'clsx';

const GITHUB_LOGO = (
  <svg className="w-full h-full" fill="white" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LINKEDIN_LOGO = (
  <svg className="w-full h-full" fill="white" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const BuildInPublic: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20%' });

  const TiltCard = ({ 
    title, icon: BrandLogo, type, url, followers, handle, purpose 
  }: { 
    title: string; icon: React.ReactNode; type: 'github' | 'linkedin'; url: string; followers: string; handle: string; purpose: string;
  }) => {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const smoothRotateX = useSpring(rotateX, springConfig);
    const smoothRotateY = useSpring(rotateY, springConfig);

    const gradientClass = type === 'github' 
      ? 'from-gray-700 via-gray-900 to-black'
      : 'from-blue-500 via-blue-600 to-blue-700';

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // ... same logic
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const sensitivity = 10;
      const x = ((e.clientX - centerX) / (rect.width / 2)) * sensitivity;
      const y = -((e.clientY - centerY) / (rect.height / 2)) * sensitivity;

      setRotateY(x);
      setRotateX(y);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    return (
      <motion.a
        ref={cardRef}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex flex-col items-center justify-center p-12 md:p-16 border-2 border-gray-200 bg-white overflow-hidden group perspective-[1000px] h-[400px] transition-all duration-300 hover:border-black shadow-sm hover:shadow-[12px_12px_0_rgba(0,0,0,1)]`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Fill Expand */}
        <div className={clsx(
            "absolute bottom-0 left-0 w-full h-0 transition-all duration-500 group-hover:h-full z-0 opacity-10 bg-gradient-to-br",
            gradientClass
        )} />

        <div className="relative z-10 flex flex-col items-center gap-6" style={{ transform: "translateZ(50px)" }}>
          <div className={clsx(
              "w-24 h-24 md:w-32 md:h-32 p-7 md:p-9 rounded-2xl text-white shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center bg-gradient-to-br",
              gradientClass
          )}>
            {BrandLogo}
          </div>
          
          <div className="text-center space-y-3">
            <div className="flex flex-col items-center gap-1">
              <h3 className="text-3xl md:text-4xl font-black font-heading tracking-tighter text-gray-950 uppercase leading-none">{title}</h3>
              <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">{handle}</span>
            </div>
            <p className="text-sm font-medium text-gray-600 leading-relaxed italic max-w-[240px]">
              {purpose}
            </p>
            <div className="pt-2">
               <span className="px-4 py-1.5 bg-gray-950 text-white text-[10px] font-black font-heading tracking-[0.2em] uppercase">Follow Build</span>
            </div>
          </div>
        </div>

      </motion.a>
    );
  };

  return (
    <div ref={ref} className="w-full flex flex-col space-y-16">
      <motion.div 
        className="space-y-4 text-center md:text-left flex flex-col items-center md:items-start"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center gap-4">
          <div className="h-[2px] w-8 bg-primary" />
          <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 uppercase">Build In Public</span>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-[72px] font-black tracking-tighter text-gray-950 uppercase italic leading-[0.9]">
           I Share <br />
           <span className="text-primary italic">Everything</span> I Make.
        </h2>
        <div className="h-2 w-16 bg-primary" />
        <p className="text-gray-600 max-w-xl text-lg font-medium mt-6">Log my engineering journey, failures, and daily prototyping experiments for the world to see.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <TiltCard 
          title="GitHub"
          handle="@PranavTechie23"
          purpose="Open source projects, ML experiments, and full-stack builds — all shipped in public."
          icon={GITHUB_LOGO}
          type="github"
          url="https://github.com/PranavTechie23"
          followers="View Projects"
        />
        <TiltCard 
          title="LinkedIn"
          handle="Pranav"
          purpose="Professional journey, project milestones, and insights on AI, ML, and software engineering."
          icon={LINKEDIN_LOGO}
          type="linkedin"
          url="https://www.linkedin.com/in/"
          followers="Connect"
        />
      </div>
    </div>
  );
};

export default BuildInPublic;
