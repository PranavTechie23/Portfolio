import React, { useEffect, useState } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

// --- COMPILER CONSOLE COMPONENT ---
export const CompilerConsole: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((b) => !b);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Loader sequence (0% to 100% in 1.5 seconds)
  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 12) + 6;
      if (currentPercent >= 100) {
        currentPercent = 100;
        clearInterval(interval);
        setIsLoaded(true);
      }
      setPercent(currentPercent);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Log sequence after loading is complete
  useEffect(() => {
    if (!isLoaded) return;

    const postLoadLogs = [
      'compiling production bundles...',
      'optimizing code chunks: devMode',
      'synced projects count: 10+',
      'linked platforms: github / linkedin',
      'active widgets: Status feed online',
      'system state: fully functional',
      'welcome to pranav\'s portfolio.'
    ];

    let idx = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, postLoadLogs[idx]];
        if (next.length > 4) next.shift(); // keep 4 post-load lines max
        return next;
      });
      idx = (idx + 1) % postLoadLogs.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [isLoaded]);

  // Construct current logs display
  const getLogsDisplay = () => {
    if (!isLoaded) {
      const barLength = Math.floor(percent / 6.25); // 16 segments max
      const filledBar = '█'.repeat(barLength);
      const emptyBar = '░'.repeat(16 - barLength);
      return [
        'npm run dev:portfolio',
        'initializing sandbox core...',
        `resolving dependencies... [${percent}%]`,
        `loading: [${filledBar}${emptyBar}]`
      ];
    }

    return [
      'dependencies resolved.',
      'server active on port 5173',
      ...logs
    ];
  };

  const displayLines = getLogsDisplay();

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 border-2 border-slate-350 dark:border-slate-800 p-5 rounded-xl shadow-2xl font-mono text-xs w-80 h-52 flex flex-col justify-between select-none transition-all duration-300 border-l-[6px] border-l-primary">
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-black">compiler.sh</div>
      </div>
      <div className="flex-1 flex flex-col gap-1.5 text-slate-700 dark:text-slate-300 font-medium leading-normal">
        {displayLines.map((log, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span className="text-primary font-bold text-[13px]">➜</span>
            <span className="truncate text-[11px] sm:text-xs font-semibold">{log}</span>
          </div>
        ))}
        {!isLoaded && (
          <div className="flex gap-2 items-center">
            <span className="text-primary font-bold text-[13px]">➜</span>
            <span className="text-[11px] sm:text-xs text-primary dark:text-sky-400 font-black animate-pulse">BOOTING COMPILER...</span>
          </div>
        )}
        {isLoaded && (
          <div className="flex gap-2 items-center">
            <span className="text-primary font-bold text-[13px]">➜</span>
            <span className="w-2 h-4 bg-primary dark:bg-sky-400" style={{ opacity: blink ? 1 : 0 }} />
          </div>
        )}
      </div>
    </div>
  );
};

// --- MATRIX PANEL COMPONENT ---
interface MatrixPanelProps {
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export const MatrixPanel: React.FC<MatrixPanelProps> = ({ smoothX, smoothY, scrollYProgress }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [mCoords, setMCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribeScroll = scrollYProgress.on('change', (v) => {
      setScrollPercent(Math.round(v * 100));
    });

    const unsubscribeX = smoothX.on('change', (v) => {
      setMCoords((prev) => ({ ...prev, x: Math.round(v) }));
    });

    const unsubscribeY = smoothY.on('change', (v) => {
      setMCoords((prev) => ({ ...prev, y: Math.round(v) }));
    });

    return () => {
      unsubscribeScroll();
      unsubscribeX();
      unsubscribeY();
    };
  }, [scrollYProgress, smoothX, smoothY]);

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 border-2 border-slate-350 dark:border-slate-800 p-5 rounded-xl shadow-2xl font-mono text-xs w-72 select-none transition-all duration-300 border-l-[6px] border-l-primary">
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-2 mb-3">
        <span className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight text-xs sm:text-sm">System Matrix</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-black">SYNC_OK</span>
        </div>
      </div>
      <div className="space-y-2.5 text-slate-600 dark:text-slate-400">
        <div className="flex justify-between items-center">
          <span className="font-bold text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">MOUSE_INPUT</span>
          <span className="font-black text-xs sm:text-[13px] text-slate-900 dark:text-slate-100">
            {mCoords.x}% / {mCoords.y}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">PAGE_SCROLL</span>
          <span className="font-black text-xs sm:text-[13px] text-slate-900 dark:text-slate-100">
            {scrollPercent}%
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">ENGINE_FREQ</span>
          <span className="font-black text-xs sm:text-[13px] text-slate-900 dark:text-slate-100">60 FPS</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-bold text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">PORTFOLIO_NODE</span>
          <span className="font-black text-xs sm:text-[13px] text-primary dark:text-sky-400 tracking-wide uppercase">LIVE_RUNNING</span>
        </div>
      </div>
    </div>
  );
};

// --- SPARKLINE COMPONENT ---
export const SparklineGraph: React.FC = () => {
  const [data, setData] = useState<number[]>([20, 22, 18, 15, 25, 22, 28, 30, 27, 25, 32, 28, 26, 35, 30]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const lastVal = prev[prev.length - 1];
        const diff = (Math.random() - 0.5) * 12;
        let newVal = Math.round(lastVal + diff);
        if (newVal < 10) newVal = 10;
        if (newVal > 45) newVal = 45;

        const next = [...prev, newVal];
        if (next.length > 18) next.shift();
        return next;
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * 160;
    const y = 50 - val;
    return `${x},${y}`;
  }).join(' ');

  const currentVal = data[data.length - 1];

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 border-2 border-slate-350 dark:border-slate-800 p-5 rounded-xl shadow-2xl font-mono text-xs w-64 select-none flex flex-col justify-between transition-all duration-300 border-l-[6px] border-l-primary">
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-2 mb-2">
        <span className="font-black text-slate-800 dark:text-slate-200 uppercase tracking-tight text-xs sm:text-sm">Core Activity</span>
        <span className="font-black text-xs sm:text-[13px] text-primary dark:text-sky-400">{currentVal} ms</span>
      </div>
      <div className="w-full flex items-center justify-center py-2">
        <svg className="w-full h-14" viewBox="0 0 160 50">
          <defs>
            <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2196F3" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2196F3" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Gradient area */}
          <path
            d={`M 0 50 L ${points} L 160 50 Z`}
            fill="url(#sparkline-grad)"
          />
          
          {/* Main stroke line - thicker for visibility */}
          <polyline
            fill="none"
            stroke="#2196F3"
            strokeWidth="2.5"
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Glowing pulse dot at the end */}
          {data.length > 0 && (
            <circle
              cx={160}
              cy={50 - data[data.length - 1]}
              r="3.5"
              fill="#2196F3"
              className="animate-pulse"
            />
          )}
        </svg>
      </div>
      <div className="flex justify-between items-center text-[9px] text-slate-500 dark:text-slate-400 font-bold pt-1.5">
        <span>MEM_ALLOC: 42.8MB</span>
        <span>TEMP: 38.5°C</span>
      </div>
    </div>
  );
};
