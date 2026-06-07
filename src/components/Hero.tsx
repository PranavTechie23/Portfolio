import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import BlueprintCanvas from './BlueprintCanvas';
import { CompilerConsole, MatrixPanel, SparklineGraph } from './TelemetryCards';

interface HeroProps {
  isDarkMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const hudRotateClockwise = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const hudRotateCounterClockwise = useTransform(scrollYProgress, [0, 1], [0, -360]);

  const [isHovered, setIsHovered] = useState(false);

  // Motion values for raw mouse coordinates (0-100)
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  // Springs for smooth movement
  const springConfig = { damping: 40, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Mask specific springs (slightly more lag for fluid feel)
  const maskSpringConfig = { damping: 25, stiffness: 60 };
  const maskX = useSpring(mouseX, maskSpringConfig);
  const maskY = useSpring(mouseY, maskSpringConfig);

  // Radius spring to handle isHovered transition smoothly and prevent "stuck" feeling
  const hoverValue = useMotionValue(0);
  const radiusSpring = useSpring(hoverValue, { damping: 20, stiffness: 100 });
  const radiusMain = useTransform(radiusSpring, [0, 1], ["0vw", "11vw"]);

  // Update hover state and motion value
  React.useEffect(() => {
    hoverValue.set(isHovered ? 1 : 0);
  }, [isHovered, hoverValue]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Normalize to percentage (0-100)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    mouseX.set(x);
    mouseY.set(y);
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Mobile Orientation Logic
  const [hasSensorPermission, setHasSensorPermission] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const requestSensorPermission = async () => {
    // @ts-ignore - DeviceOrientationEvent.requestPermission is specific to iOS/WebKit
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        // @ts-ignore
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === 'granted') {
          setHasSensorPermission(true);
        }
      } catch (err) {
        console.error("Sensor permission denied:", err);
      }
    } else {
      setHasSensorPermission(true);
    }
  };

  useEffect(() => {
    if (!hasSensorPermission) return;

    // Use motion values directly to avoid dependency updates
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;

      // beta: -180 to 180 (front/back), gamma: -90 to 90 (left/right)
      // Wider mapping for more natural tilt range
      const beta = e.beta;
      const gamma = e.gamma;

      // Center around common holding angles: gamma center = 0, beta center = 45-60
      const targetX = Math.max(0, Math.min(100, ((gamma + 40) / 80) * 100));
      const targetY = Math.max(0, Math.min(100, ((beta - 20) / 70) * 100));

      mouseX.set(targetX);
      mouseY.set(targetY);

      // Ensure hover is active when sensing
      if (!hoverValue.get()) {
        setIsHovered(true);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [hasSensorPermission, mouseX, mouseY, hoverValue]);

  const maskCx = useTransform(maskX, (v) => v + "%");
  const maskCy = useTransform(maskY, (v) => v + "%");

  return (
    <motion.div
      ref={containerRef}
      className={`relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-slate-950 ${isMobile ? '' : 'cursor-none'}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={(e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = ((touch.clientX - rect.left) / rect.width) * 100;
        const y = ((touch.clientY - rect.top) / rect.height) * 100;
        mouseX.set(x);
        mouseY.set(y);
        if (!isHovered) setIsHovered(true);
      }}
    >
      <motion.div className="absolute inset-0 z-[-1]" style={{ y: yBg }}>
        {/* Typo Background can go here if we want it to shift */}
      </motion.div>
      {/* Huge Background Typography - ENGINEER (Z-0) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none px-4"
        style={{
          opacity: opacityText,
          x: useTransform(smoothX, [0, 100], [-30, 30]),
          y: useTransform(smoothY, [0, 100], [-30, 30])
        }}
      >
        <h1 className="text-[22vw] md:text-[24vw] font-black leading-none tracking-[-0.05em] text-gray-950/10 dark:text-slate-100/5 select-none font-heading uppercase whitespace-nowrap">
          ENGINEER
        </h1>
      </motion.div>

      {/* Interactive 2D Blueprint Canvas (z-0) */}
      <BlueprintCanvas isDarkMode={isDarkMode} />

      {/* Central Rotating HUD Blueprint SVG (z-10) */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div
          style={{
            x: useTransform(smoothX, [0, 100], [-15, 15]),
            y: useTransform(smoothY, [0, 100], [-15, 15])
          }}
          className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[460px] md:h-[460px] relative flex items-center justify-center bg-white dark:bg-slate-950 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200 dark:border-slate-850/80 scale-90 sm:scale-100"
        >
          {/* Inner circle - rotates clockwise on scroll */}
          <motion.svg
            style={{ rotate: hudRotateClockwise }}
            viewBox="0 0 500 500"
            className="w-full h-full absolute text-slate-400 dark:text-slate-700"
          >
            {/* Compass degree ticks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const x1 = 250 + Math.cos(angle) * 165;
              const y1 = 250 + Math.sin(angle) * 165;
              const x2 = 250 + Math.cos(angle) * 178;
              const y2 = 250 + Math.sin(angle) * 178;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className="stroke-slate-300 dark:stroke-slate-800"
                  strokeWidth="1.0"
                />
              );
            })}

            {/* Concentric detail rings */}
            <circle cx="250" cy="250" r="178" fill="none" className="stroke-slate-200 dark:stroke-slate-900" strokeWidth="1.0" />
            <circle cx="250" cy="250" r="140" fill="none" className="stroke-slate-300 dark:stroke-slate-800" strokeWidth="0.8" strokeDasharray="3 9" />
            
            {/* Degree tags */}
            <text x="250" y="58" textAnchor="middle" className="text-[10px] font-mono fill-slate-500 dark:fill-slate-500 font-black">000°</text>
            <text x="440" y="253" className="text-[10px] font-mono fill-slate-500 dark:fill-slate-500 font-black">090°</text>
            <text x="250" y="450" textAnchor="middle" className="text-[10px] font-mono fill-slate-500 dark:fill-slate-500 font-black">180°</text>
            <text x="55" y="253" className="text-[10px] font-mono fill-slate-500 dark:fill-slate-500 font-black">270°</text>
          </motion.svg>

          {/* Outer Ring - rotates counter-clockwise on scroll */}
          <motion.svg
            style={{ rotate: hudRotateCounterClockwise }}
            viewBox="0 0 500 500"
            className="w-full h-full absolute"
          >
            {/* Outer dashed dashboard compass */}
            <circle cx="250" cy="250" r="215" fill="none" className="stroke-slate-300 dark:stroke-slate-900" strokeWidth="1.5" strokeDasharray="6 14" />
            
            {/* Outer ticks */}
            {Array.from({ length: 18 }).map((_, i) => {
              const angle = (i * 20 * Math.PI) / 180;
              const x1 = 250 + Math.cos(angle) * 215;
              const y1 = 250 + Math.sin(angle) * 215;
              const x2 = 250 + Math.cos(angle) * 228;
              const y2 = 250 + Math.sin(angle) * 228;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className="stroke-slate-300 dark:stroke-slate-800"
                  strokeWidth="1.0"
                />
              );
            })}
          </motion.svg>

          {/* Central Circuit Core with animated pulse data flows */}
          <svg viewBox="0 0 500 500" className="w-full h-full absolute">
            {/* CPU Chip core */}
            <motion.rect
              x="235"
              y="235"
              width="30"
              height="30"
              rx="4"
              className="fill-white dark:fill-slate-950 stroke-primary"
              strokeWidth="2.0"
              animate={{
                scale: [0.97, 1.03, 0.97],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            <rect x="242" y="242" width="16" height="16" rx="2" className="fill-primary/15 dark:fill-primary/20 stroke-primary" strokeWidth="1.0" />

            {/* Circuit Branches with flow signals */}
            {/* Top-Left */}
            <path d="M235,245 L200,210 L140,210" fill="none" className="stroke-slate-200 dark:stroke-slate-850" strokeWidth="1.5" />
            <motion.path
              d="M235,245 L200,210 L140,210"
              fill="none"
              className="stroke-primary"
              strokeWidth="1.5"
              strokeDasharray="6 20"
              animate={{ strokeDashoffset: [0, -26] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 1.8 }}
            />
            <circle cx="140" cy="210" r="3.0" className="fill-white dark:fill-slate-950 stroke-primary" strokeWidth="1.5" />

            {/* Bottom-Left */}
            <path d="M235,255 L190,300 L110,300" fill="none" className="stroke-slate-200 dark:stroke-slate-850" strokeWidth="1.5" />
            <motion.path
              d="M235,255 L190,300 L110,300"
              fill="none"
              className="stroke-primary"
              strokeWidth="1.5"
              strokeDasharray="6 20"
              animate={{ strokeDashoffset: [0, -26] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 2.2 }}
            />
            <circle cx="110" cy="300" r="3.0" className="fill-white dark:fill-slate-950 stroke-primary" strokeWidth="1.5" />

            {/* Top-Right */}
            <path d="M265,245 L300,210 L370,210 L370,170" fill="none" className="stroke-slate-200 dark:stroke-slate-850" strokeWidth="1.5" />
            <motion.path
              d="M265,245 L300,210 L370,210 L370,170"
              fill="none"
              className="stroke-primary"
              strokeWidth="1.5"
              strokeDasharray="6 25"
              animate={{ strokeDashoffset: [0, -31] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 2.0 }}
            />
            <circle cx="370" cy="170" r="3.0" className="fill-white dark:fill-slate-950 stroke-primary" strokeWidth="1.5" />

            {/* Bottom-Right */}
            <path d="M265,255 L310,300 L390,300" fill="none" className="stroke-slate-200 dark:stroke-slate-850" strokeWidth="1.5" />
            <motion.path
              d="M265,255 L310,300 L390,300"
              fill="none"
              className="stroke-primary"
              strokeWidth="1.5"
              strokeDasharray="6 20"
              animate={{ strokeDashoffset: [0, -26] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
            />
            <circle cx="390" cy="300" r="3.0" className="fill-white dark:fill-slate-950 stroke-primary" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </div>

      {/* Floating Glassmorphic Telemetry Cards (z-20) - Hidden on mobile for clutter control */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block overflow-hidden">
        {/* Compiler Terminal - Top Right */}
        <motion.div
          style={{
            x: useTransform(smoothX, [0, 100], [10, -10]),
            y: useTransform(smoothY, [0, 100], [15, -15])
          }}
          className="absolute right-[8%] top-[16%] pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CompilerConsole />
        </motion.div>

        {/* Matrix Panel - Mid Left */}
        <motion.div
          style={{
            x: useTransform(smoothX, [0, 100], [-15, 15]),
            y: useTransform(smoothY, [0, 100], [10, -10])
          }}
          className="absolute left-[8%] top-[25%] pointer-events-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <MatrixPanel smoothX={smoothX} smoothY={smoothY} scrollYProgress={scrollYProgress} />
        </motion.div>

        {/* Sparkline Core activity - Bottom Right */}
        <motion.div
          style={{
            x: useTransform(smoothX, [0, 100], [15, -15]),
            y: useTransform(smoothY, [0, 100], [-10, 10])
          }}
          className="absolute right-[12%] bottom-[16%] pointer-events-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SparklineGraph />
        </motion.div>
      </div>

      {/* Interactive Racing Widgets - Z-INDEX 30 */}
      <div className="absolute inset-x-8 inset-y-12 pointer-events-none z-30">
        <div className="absolute top-10 md:top-0 left-0 flex flex-col gap-1 border-l-2 border-primary pl-4 py-2 bg-white/70 dark:bg-slate-900/20 backdrop-blur-md">
          <div className="text-[10px] font-mono text-gray-500 dark:text-slate-400 uppercase tracking-widest font-bold">Status</div>
          <div className="text-xl font-heading font-black text-gray-950 dark:text-slate-100 uppercase italic tracking-tighter">Live Feed</div>
        </div>

        <div className="absolute bottom-0 right-0 text-right flex flex-col gap-1 border-r-2 border-primary pr-4 py-2 bg-white/70 dark:bg-slate-900/20 backdrop-blur-md">
          <div className="text-[10px] font-mono text-gray-500 dark:text-slate-400 uppercase tracking-widest font-bold">Input Matrix</div>
          <motion.div className="text-lg font-mono font-bold text-gray-950 dark:text-slate-100">
            {Math.round(maskX.get())} / {Math.round(maskY.get())}
          </motion.div>
        </div>
      </div>

      {/* Nameplate - Z-INDEX 40 */}
      <motion.div
        className="absolute bottom-8 left-8 z-40 flex flex-col items-start pointer-events-none"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-5 border-b-4 border-primary shadow-2xl skew-x-[-4deg]">
          <h2 className="text-3xl md:text-5xl font-black font-heading text-gray-950 dark:text-slate-100 tracking-tighter leading-none uppercase italic">
            PRANAV SANJAY <span className="text-primary italic">OSWAL</span>
          </h2>

          <div className="mt-6 pointer-events-auto">
            <a
              href="#projects"
              className="px-6 py-3 bg-gray-950 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-black font-heading tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all duration-300 shadow-lg inline-block"
            >
              Enter Experience
            </a>

            {isMobile && !hasSensorPermission && (
              <button
                onClick={requestSensorPermission}
                className="ml-4 px-4 py-3 bg-primary text-white text-[10px] font-black font-heading tracking-[0.2em] uppercase hover:bg-gray-950 transition-all duration-300 shadow-lg inline-flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Sync Sensors
              </button>
            )}
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
};

export default Hero;
