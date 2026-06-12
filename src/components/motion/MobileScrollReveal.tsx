import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';

type AnimationVariant =
  | 'fadeUp'
  | 'fadeDown'
  | 'fadeLeft'
  | 'fadeRight'
  | 'scaleFade'
  | 'clipReveal'
  | 'blur';

interface MobileScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  /** Trigger even on desktop (default: mobile-only) */
  alwaysAnimate?: boolean;
  /** Margin before viewport intersection fires */
  margin?: string;
  /** For stagger containers — wrap children in stagger context */
  stagger?: boolean;
  staggerDelay?: number;
}

const getVariants = (variant: AnimationVariant) => {
  const ease = [0.16, 1, 0.3, 1] as const;
  switch (variant) {
    case 'fadeUp':
      return {
        hidden: { opacity: 0, y: 48 },
        visible: { opacity: 1, y: 0 },
        ease,
      };
    case 'fadeDown':
      return {
        hidden: { opacity: 0, y: -32 },
        visible: { opacity: 1, y: 0 },
        ease,
      };
    case 'fadeLeft':
      return {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
        ease,
      };
    case 'fadeRight':
      return {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
        ease,
      };
    case 'scaleFade':
      return {
        hidden: { opacity: 0, scale: 0.88, y: 24 },
        visible: { opacity: 1, scale: 1, y: 0 },
        ease,
      };
    case 'clipReveal':
      return {
        hidden: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
        visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
        ease: [0.77, 0, 0.175, 1] as const,
      };
    case 'blur':
      return {
        hidden: { opacity: 0, scale: 0.98 },
        visible: { opacity: 1, scale: 1 },
        ease,
      };
    default:
      return {
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0 },
        ease,
      };
  }
};

/**
 * MobileScrollReveal – scroll-triggered entrance animation.
 * By default animates on all screen sizes (alwaysAnimate=true for sections).
 * Set alwaysAnimate=false to restrict to mobile only.
 */
export const MobileScrollReveal: React.FC<MobileScrollRevealProps> = ({
  children,
  className = '',
  variant = 'fadeUp' as AnimationVariant,
  delay = 0,
  duration = 0.65,
  alwaysAnimate = false,
  margin = '-6%',
  stagger = false,
  staggerDelay = 0.1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // All hooks must be called unconditionally
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isInView = useInView(ref, {
    once: true,
    margin: margin as any,
  });

  const { hidden, visible, ease } = getVariants(variant);
  const shouldAnimate = !prefersReducedMotion && (alwaysAnimate || isMobile);

  if (!shouldAnimate) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: staggerDelay, delayChildren: delay } },
        }}
      >
        {React.Children.map(children, (child) => (
          <motion.div
            variants={{
              hidden,
              visible: {
                ...visible,
                transition: { duration, ease: ease as [number, number, number, number] },
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{
        duration,
        delay,
        ease: ease as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   MobileParallax – vertical parallax scroll effect tuned for mobile.
   The wrapper div is position:relative so Framer Motion's useScroll target
   can correctly calculate the scroll offset.
   ────────────────────────────────────────────────────────────────────────── */
interface MobileParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Pixel range to drift. Defaults to 30px. */
  range?: number;
  direction?: 'up' | 'down';
}

export const MobileParallax: React.FC<MobileParallaxProps> = ({
  children,
  className = '',
  range = 30,
  direction = 'up',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // useScroll target requires the ref element to have a non-static position.
  // We enforce this via the inline style below.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const multiplier = direction === 'up' ? -1 : 1;
  const shouldParallax = !prefersReducedMotion && isMobile;

  const yTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [
      shouldParallax ? multiplier * range : 0,
      shouldParallax ? multiplier * -range : 0,
    ]
  );
  const y = useSpring(yTransform, { damping: 30, stiffness: 80, mass: 0.5 });

  return (
    // position:relative is required for Framer Motion's useScroll with target
    <motion.div
      ref={ref}
      style={{ y, willChange: 'transform', position: 'relative' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ──────────────────────────────────────────────────────────────────────────
   useScrollRevealVariant – returns framer-motion props for inline use
   ────────────────────────────────────────────────────────────────────────── */
export const useScrollRevealVariant = (
  variant: AnimationVariant,
  isInView: boolean,
  delay = 0,
  duration = 0.65
) => {
  const prefersReducedMotion = useReducedMotion();
  const { hidden, visible, ease } = getVariants(variant);
  if (prefersReducedMotion) return {};
  return {
    initial: hidden,
    animate: isInView ? visible : hidden,
    transition: { duration, delay, ease },
  };
};
