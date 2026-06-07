import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CountUpProps {
  to: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ 
  to, 
  decimals = 0, 
  duration = 1.5, 
  prefix = "", 
  suffix = "", 
  className = "" 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  // Adjusted trigger margin to -5% to prevent clipping issues on card edges
  const isInView = useInView(ref, { once: false, margin: "-5%" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setValue(0);
      return;
    }

    const start = 0;
    const end = to;
    const startTime = performance.now();
    const durationMs = duration * 1000;
    let animationFrameId: number;

    const updateCount = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      // Custom cubic-bezier ease-out curve (quintic ease-out: 1 - (1-x)^5)
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      const current = start + easeProgress * (end - start);

      setValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix + value.toFixed(decimals) + suffix}
    </span>
  );
};

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({ 
  text, 
  speed = 60, 
  maxIterations = 8, 
  className = "" 
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [displayText, setDisplayText] = useState(text);
  // Calm, minimal glyph set — only uppercase letters, no symbols
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (!isInView) {
      // Reset to scrambled placeholder so re-entry animates again
      setDisplayText(
        text.split("").map((c) => (c === " " ? " " : glyphs[Math.floor(Math.random() * glyphs.length)])).join("")
      );
      return;
    }

    let isMounted = true;
    const textLength = text.length;
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startDecryption = () => {
      interval = setInterval(() => {
        if (!isMounted) return;

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            // If the letter is resolved
            if (index < iteration) {
              return text[index];
            }
            
            // Show a random glyph
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join("");

        setDisplayText(scrambled);

        if (iteration >= textLength) {
          clearInterval(interval);
          setDisplayText(text); // ensure final clean state
        }

        iteration += 1 / maxIterations;
      }, speed);
    };

    startDecryption();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isInView, text, speed, maxIterations]);

  return <span ref={ref} className={className}>{displayText}</span>;
};

interface RevealWordsProps {
  text: string;
  className?: string;
  delay?: number;
}

export const RevealWords: React.FC<RevealWordsProps> = ({ text, className = '', delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden"
          initial={{ y: '110%', opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};
