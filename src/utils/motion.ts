export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeSwift    = [0.77, 0, 0.175, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: easeOutExpo },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.06, ease: easeOutExpo },
  }),
};

export const slideFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: easeOutExpo },
  }),
};

export const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: easeOutExpo },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const viewportOnce = { once: true, margin: '-12%' as const };

/* ── Mobile-specific scroll animation variants ── */

/** Cards pop in with scale + blur — best for grid items */
export const mobileCardReveal = {
  hidden: { opacity: 0, y: 44, scale: 0.93, filter: 'blur(6px)' },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: easeOutExpo,
    },
  }),
};

/** Timeline entries slide in from left edge */
export const mobileTimelineItem = {
  hidden: { opacity: 0, x: -36, filter: 'blur(3px)' },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: 0.1 + i * 0.12,
      ease: easeOutExpo,
    },
  }),
};

/** Text reveals with a slight upward clip */
export const mobileTextReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: easeSwift,
    },
  }),
};

/** Stagger container for mobile lists */
export const mobileStaggerContainer = (delayChildren = 0.1, staggerChildren = 0.09) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

/** Viewport config for mobile-first sections */
export const mobileViewport = { once: true, margin: '-5%' as const };
export const desktopViewport = { once: true, margin: '-12%' as const };
