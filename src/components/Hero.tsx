import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';
import BlueprintCanvas from './BlueprintCanvas';

// Custom cursor component
const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', moveCursor);

    const interactiveElements = document.querySelectorAll(
      'a, button, [data-interactive]'
    );
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [cursorX, cursorY]);

  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 300 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 300 });

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-cyan-400 pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-cyan-400 pointer-events-none z-[100]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          scale: isHovering ? 1.5 : 1,
          transition: 'scale 0.2s ease',
        }}
      />
    </>
  );
};

// Compiler Console Component
interface CompilerConsoleProps {
  logs: Array<{ text: string; type: string }>;
}

const CompilerConsole: React.FC<CompilerConsoleProps> = ({ logs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-[280px] dark:bg-[#0A0C10]/95 bg-white/95 backdrop-blur-xl border dark:border-[#00ffff]/20 border-slate-200 rounded-lg overflow-hidden shadow-2xl dark:shadow-cyan-500/10 shadow-blue-500/5"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b dark:border-[#00ffff]/15 border-slate-100 dark:bg-[#00ffff]/5 bg-slate-50">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] font-mono dark:text-[#00ffff]/70 text-slate-800 ml-2 tracking-wide">
          COMPILER.SH
        </span>
        <span className="ml-auto text-[8px] font-mono dark:text-[#00ffff]/40 text-slate-400">zsh</span>
      </div>
      <div className="p-3 space-y-1.5 font-mono text-[10px]">
        {logs.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(0.2, i * 0.05) }}
            className={`flex items-start gap-2 ${
              line.type === 'success'
                ? 'dark:text-cyan-400 text-cyan-600 font-semibold'
                : line.type === 'warning'
                ? 'dark:text-amber-400 text-amber-600 font-semibold'
                : 'dark:text-blue-400 text-blue-600'
            }`}
          >
            <span className="dark:text-[#00ffff]/40 text-slate-400 select-none">$</span>
            <span className="dark:text-slate-100 text-slate-900 break-words max-w-[240px]">{line.text}</span>
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="flex items-center gap-2 dark:text-[#00ffff]/40 text-slate-400 mt-2 pt-1 border-t dark:border-[#00ffff]/10 border-slate-100"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-[8px] dark:text-cyan-400/80 text-slate-700">system_ready</span>
          <span className="animate-blink text-[10px] dark:text-slate-100 text-slate-900">█</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Matrix Panel Component
interface MatrixPanelProps {
  coords: { x: number; y: number };
  scrollPercent: number;
  fps: number;
  coreActivity: number;
}

const MatrixPanel: React.FC<MatrixPanelProps> = ({ coords, scrollPercent, fps, coreActivity }) => {
  const metrics = [
    { label: 'MOUSE_INPUT', value: `${coords.x}% / ${coords.y}%` },
    { label: 'PAGE_SCROLL', value: `${scrollPercent}%` },
    { label: 'ENGINE_FREQ', value: `${fps} FPS` },
    { label: 'PORTFOLIO_NODE', value: 'LIVE_RUNNING' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-[260px] dark:bg-[#0A0C10]/95 bg-white/95 backdrop-blur-xl border dark:border-[#00ffff]/20 border-slate-200 rounded-lg overflow-hidden shadow-2xl dark:shadow-cyan-500/10 shadow-blue-500/5"
    >
      <div className="px-3 py-2 border-b dark:border-[#00ffff]/15 border-slate-100 dark:bg-[#00ffff]/5 bg-slate-50">
        <span className="text-[9px] font-mono dark:text-[#00ffff]/80 text-primary tracking-wider font-bold">
          SYSTEM MATRIX
        </span>
      </div>
      <div className="p-3 space-y-2">
        {metrics.map((metric, i) => (
          <div key={i} className="flex justify-between items-center font-mono text-[9px]">
            <span className="text-gray-500 tracking-wide">{metric.label}</span>
            <span
              className={`${
                metric.label === 'PORTFOLIO_NODE'
                  ? 'dark:text-cyan-400 text-cyan-700'
                  : 'dark:text-[#00ffff] text-primary'
              } font-bold`}
            >
              {metric.value}
            </span>
          </div>
        ))}
        <div className="mt-2 pt-2 border-t dark:border-[#00ffff]/10 border-slate-100">
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-mono text-gray-500">CORE ACTIVITY</span>
            <span className="text-[11px] font-mono dark:text-cyan-400 text-cyan-700 font-bold">
              {coreActivity} ms
            </span>
          </div>
          <div className="mt-1.5 h-1 dark:bg-gray-800 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(100, (coreActivity / 80) * 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Sparkline Graph Component
interface SparklineGraphProps {
  data: number[];
  memAlloc: string;
}

const SparklineGraph: React.FC<SparklineGraphProps> = ({ data, memAlloc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-[220px] dark:bg-[#0A0C10]/95 bg-white/95 backdrop-blur-xl border dark:border-[#00ffff]/20 border-slate-200 rounded-lg overflow-hidden shadow-2xl dark:shadow-cyan-500/10 shadow-blue-500/5"
    >
      <div className="px-3 py-2 border-b dark:border-[#00ffff]/15 border-slate-100 dark:bg-[#00ffff]/5 bg-slate-50 flex justify-between items-center">
        <span className="text-[9px] font-mono dark:text-[#00ffff]/80 text-primary tracking-wider font-bold">
          INPUT MATRIX
        </span>
        <span className="text-[8px] font-mono dark:text-cyan-400 text-cyan-700">LIVE</span>
      </div>
      <div className="p-3">
        <div className="h-[60px] flex items-end gap-1">
          {data.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-cyan-500/60 dark:hover:bg-cyan-400 hover:bg-primary rounded-sm transition-all"
              animate={{ height: `${h}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[8px] font-mono dark:text-gray-600 text-slate-400">
          <span>48%</span>
          <span className="dark:text-[#00ffff] text-primary">●</span>
          <span>62%</span>
        </div>
        <div className="mt-2 pt-2 border-t dark:border-[#00ffff]/10 border-slate-100 flex justify-between text-[8px] font-mono">
          <span className="text-gray-500">MEM_ALLOC:</span>
          <span className="dark:text-cyan-400 text-cyan-700">{memAlloc}</span>
        </div>
      </div>
    </motion.div>
  );
};

interface HeroProps {
  isDarkMode?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [matrixCoords, setMatrixCoords] = useState({ x: 48, y: 62 });

  // 1. Live page scroll tracker
  const [scrollPercent, setScrollPercent] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPercent(Math.round((window.scrollY / docHeight) * 100));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Real-time FPS (frame rate) tracker
  const [fps, setFps] = useState(60);
  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;
    let frameId: number;
    const calcFps = () => {
      const now = performance.now();
      frames++;
      if (now > lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }
      frameId = requestAnimationFrame(calcFps);
    };
    frameId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // 3. Simulated latency (Core activity) & Sparkline activity simulation
  const [coreActivity, setCoreActivity] = useState(14);
  const lastActivityTime = useRef(performance.now());
  const lastHoverRef = useRef('');

  const [activityData, setActivityData] = useState<number[]>([
    24, 28, 22, 25, 20, 23, 19, 21, 18, 20, 22, 25
  ]);
  const [memAlloc, setMemAlloc] = useState('42.8MB');

  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceLastActivity = performance.now() - lastActivityTime.current;
      const isActive = timeSinceLastActivity < 250;

      // Base CPU latency simulation (10-18ms baseline) plus active workflow spikes
      const baseLatency = 10 + Math.floor(Math.random() * 8);
      const activityOffset = isActive ? 15 + Math.floor(Math.random() * 25) : 0;
      setCoreActivity(baseLatency + activityOffset);

      // Fluctuate memory slightly to look alive
      setMemAlloc((42.5 + Math.random() * 1.5).toFixed(1) + 'MB');

      // Sparkline queue update
      setActivityData((prev) => {
        const nextVal = isActive
          ? 55 + Math.floor(Math.random() * 35) // High activity spike (55-90%)
          : 15 + Math.floor(Math.random() * 12); // Idle fluctuation (15-27%)
        const newData = [...prev.slice(1), nextVal];
        return newData;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Record user interactions for HUD spikes
  useEffect(() => {
    const recordActivity = () => {
      lastActivityTime.current = performance.now();
    };
    window.addEventListener('mousemove', recordActivity, { passive: true });
    window.addEventListener('scroll', recordActivity, { passive: true });
    window.addEventListener('click', recordActivity, { passive: true });
    return () => {
      window.removeEventListener('mousemove', recordActivity);
      window.removeEventListener('scroll', recordActivity);
      window.removeEventListener('click', recordActivity);
    };
  }, []);

  // 4. Interactive compiler shell logs state
  const [consoleLogs, setConsoleLogs] = useState<Array<{ text: string; type: string }>>([
    { text: 'dependencies resolved.', type: 'success' },
    { text: 'server active on port 3000', type: 'info' },
    { text: 'system state: fully functional', type: 'success' },
    { text: 'synced projects count: 18+', type: 'info' },
    { text: 'system_ready: listening...', type: 'success' }
  ]);

  const addLog = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setConsoleLogs((prev) => {
      const next = [...prev, { text, type }];
      if (next.length > 5) {
        next.shift();
      }
      return next;
    });
  };

  // Capture actual mouse hover events over interactive items and write to terminal
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-interactive], span');
      if (interactive) {
        const label = interactive.getAttribute('data-label') || 
                      interactive.textContent?.trim().substring(0, 24) || 
                      interactive.tagName.toLowerCase();
        
        const cleanLabel = label
          .replace(/[^a-zA-Z0-9_\-\s]/g, '') // remove special chars
          .trim()
          .toLowerCase();
        
        if (cleanLabel && cleanLabel !== lastHoverRef.current && cleanLabel.length > 1) {
          lastHoverRef.current = cleanLabel;
          addLog(`hover: [${cleanLabel.substring(0, 16)}]`, 'info');
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-interactive]');
      if (interactive) {
        const label = interactive.getAttribute('data-label') || 
                      interactive.textContent?.trim().substring(0, 20) || 
                      interactive.tagName.toLowerCase();
        const cleanLabel = label.replace(/[^a-zA-Z0-9_\-\s]/g, '').trim().toLowerCase();
        addLog(`invoke: click [${cleanLabel}]`, 'success');
      }
    };

    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Periodic random background messages
  useEffect(() => {
    const randomSystemMessages = [
      { text: 'gc tick: memory cleanup ok', type: 'info' },
      { text: 'db node sync: completed in 4ms', type: 'success' },
      { text: 'toolkit cache hit: 98.4%', type: 'info' },
      { text: 're-evaluating systems topology...', type: 'info' },
      { text: 'network status: optimized latency', type: 'success' },
      { text: 'watchdog: all nodes active', type: 'success' }
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        const msg = randomSystemMessages[Math.floor(Math.random() * randomSystemMessages.length)];
        addLog(msg.text, msg.type as 'info' | 'success');
      }
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 100 });

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(
        window.innerWidth < 1024 ||
          /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      );
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
      mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  useMotionValueEvent(smoothX, "change", (v) => {
    setMatrixCoords((prev) => ({ ...prev, x: Math.round(v) }));
  });

  useMotionValueEvent(smoothY, "change", (v) => {
    setMatrixCoords((prev) => ({ ...prev, y: Math.round(v) }));
  });

  // Reactive slide animation - slides from top to bottom based on scroll
  const reactiveY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const reactiveYSpring = useSpring(reactiveY, { damping: 35, stiffness: 90 });

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);


  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-gradient-to-br dark:from-[#0A0C10] dark:via-[#0F1219] dark:to-[#050608] from-[#F4F3F1] via-[#EAE9E6] to-[#E0DFDC] overflow-hidden"
    >
      {/* Live Interactive Physics Grid Background */}
      <div className="absolute inset-0 z-0 opacity-40 dark:opacity-30 pointer-events-none">
        <BlueprintCanvas isDarkMode={isDarkMode} />
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-[60] bg-gradient-to-b from-transparent via-transparent to-transparent opacity-5">
        <div className="w-full h-[2px] dark:bg-cyan-400/20 bg-blue-500/10 absolute animate-scan" />
      </div>

      {/* ENGINEER Watermark */}
      <motion.div
        className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <h1 className="text-[20vw] md:text-[22vw] font-black leading-none tracking-[-0.05em] dark:text-cyan-500/[0.04] text-blue-500/[0.08] select-none whitespace-nowrap">
          ENGINEER
        </h1>
      </motion.div>

      {/* Telemetry Panels - Fixed HUD that fades on scroll */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.45], [1, 0]) }}
        className="fixed inset-0 z-20 pointer-events-none hidden md:block"
      >
        <div className="relative w-full max-w-[1440px] h-full mx-auto">
          <motion.div
            style={{
              x: useTransform(smoothX, [0, 100], [10, -10]),
              y: useTransform(smoothY, [0, 100], [12, -12]),
            }}
            className="absolute right-6 top-6 pointer-events-auto origin-top-right transition-colors duration-300 scale-75 xl:scale-90 2xl:scale-100"
          >
            <CompilerConsole logs={consoleLogs} />
          </motion.div>
          <motion.div
            style={{
              x: useTransform(smoothX, [0, 100], [-12, 12]),
              y: useTransform(smoothY, [0, 100], [8, -8]),
            }}
            className="absolute left-6 bottom-6 pointer-events-auto origin-bottom-left transition-colors duration-300 scale-75 xl:scale-90 2xl:scale-100"
          >
            <MatrixPanel coords={matrixCoords} scrollPercent={scrollPercent} fps={fps} coreActivity={coreActivity} />
          </motion.div>
          <motion.div
            style={{
              x: useTransform(smoothX, [0, 100], [12, -12]),
              y: useTransform(smoothY, [0, 100], [-8, 8]),
            }}
            className="absolute right-6 bottom-6 pointer-events-auto origin-bottom-right transition-colors duration-300 scale-75 xl:scale-90 2xl:scale-100"
          >
            <SparklineGraph data={activityData} memAlloc={memAlloc} />
          </motion.div>
        </div>
      </motion.div>      {/* Top Left Status */}
      <div className="absolute top-24 left-6 z-30 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 dark:bg-[#0A0C10]/80 bg-white/85 dark:backdrop-blur-sm backdrop-blur-md border-l-2 dark:border-cyan-400 border-primary shadow-sm rounded-r">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[9px] font-mono dark:text-cyan-400 text-primary tracking-[0.2em] font-bold">
            ONLINE
          </span>
        </div>
        <div className="mt-2 pl-3">
          <h3 className="text-lg sm:text-xl font-black font-mono dark:text-gray-300 text-slate-700 tracking-tighter">
            LIVE FEED
          </h3>
        </div>
      </div>

      {/* Bottom Right Input Matrix Display */}
      <div className="absolute bottom-6 right-6 z-30 pointer-events-none text-right md:hidden">
        <div className="px-3 py-1.5 dark:bg-[#0A0C10]/80 bg-white/85 dark:backdrop-blur-sm backdrop-blur-md border-r-2 dark:border-cyan-400 border-primary shadow-sm rounded-l">
          <span className="text-[9px] font-mono dark:text-gray-400 text-slate-500 tracking-[0.2em]">
            INPUT MATRIX
          </span>
        </div>
        <div className="mt-2 pr-3">
          <div className="text-sm font-mono font-bold dark:text-cyan-400 text-primary">
            {matrixCoords.x}
            <span className="dark:text-gray-600 text-slate-400"> / </span>
            {matrixCoords.y}
          </div>
        </div>
      </div>

      {/* Main Nameplate - REACTIVE SLIDE FROM TOP TO BOTTOM */}
      <div className="absolute inset-0 pointer-events-none z-40 flex items-end justify-center pb-6">
        <motion.div
          className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl px-6"
          style={{
            y: reactiveYSpring,
          }}
        >
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
          {/* Top sweep line */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-transparent dark:via-cyan-400 via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />

          {/* Main Card - Floating Animation */}
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative dark:bg-[#0A0C10]/90 bg-white/90 dark:backdrop-blur-2xl backdrop-blur-2xl border dark:border-cyan-500/30 border-blue-200/80 shadow-2xl dark:shadow-cyan-500/20 shadow-blue-500/5 rounded-2xl overflow-hidden"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 dark:border-cyan-400/60 border-primary/40 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 dark:border-cyan-400/60 border-primary/40 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 dark:border-cyan-400/60 border-primary/40 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 dark:border-cyan-400/60 border-primary/40 rounded-br-2xl" />

            <div className="p-4 sm:p-6 md:p-8 lg:p-10 text-center">
              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black font-heading tracking-tighter leading-tight"
              >
                <span className="dark:text-gray-200 text-slate-800">PRANAV SANJAY </span>
                <span className="dark:text-cyan-400 text-primary relative">
                  OSWAL
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 dark:bg-cyan-400/50 bg-primary/40" />
                </span>
              </motion.h1>

              {/* Role Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-3"
              >
                {['SYSTEMS ARCHITECT', 'FULL-STACK DEVELOPER', 'AI ENGINEER'].map(
                  (role, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] dark:text-cyan-400 text-primary border dark:border-cyan-500/30 border-blue-200/80 rounded dark:bg-cyan-500/5 bg-primary/5"
                    >
                      {role}
                    </span>
                  )
                )}
              </motion.div>

              {/* Divider */}
              <div className="my-3 flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent dark:to-cyan-500 to-primary" />
                <div className="w-1.5 h-1.5 rounded-full dark:bg-cyan-400 bg-primary" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent dark:to-cyan-500 to-primary" />
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pointer-events-auto"
              >
                <a
                  href="#about"
                  data-interactive="true"
                  className="group relative inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] sm:text-[11px] font-black font-mono tracking-[0.22em] uppercase rounded-lg overflow-hidden shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center gap-2">
                    ENTER EXPERIENCE
                    <svg
                      className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 12 12"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        d="M2 6h8M6 2l4 4-4 4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom sweep line */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent dark:via-cyan-500/50 via-primary/30 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, -40],
              opacity: [0.3, 0.6, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Custom Cursor (Desktop only) */}
      {!isMobile && <CustomCursor />}

      {/* Add keyframes animation for scanline */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        .animate-blink {
          animation: blink 1.2s step-end infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default Hero;