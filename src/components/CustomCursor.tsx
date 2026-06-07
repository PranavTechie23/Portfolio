import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch-only devices (no fine pointer / stylus)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return; // Don't track mouse on touch devices

    let animationFrameId: number;

    const updateMousePosition = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        const target = e.target as HTMLElement;
        if (target.closest('a, button, [role="button"], input, textarea')) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body * { cursor: none !important; }
        }
      `}</style>
      
      {/* Main tiny dot (black for high contrast on light bg) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-gray-950 dark:bg-slate-100 rounded-full pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 800,
          damping: 35,
          mass: 0.5,
        }}
      />
      
      {/* Outer glow ring (Blue primary accent) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-primary/40 bg-primary/10 rounded-full blur-[1px] pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'tween',
          ease: 'easeOut',
          duration: 0.1,
        }}
      />
    </>
  );
};

export default CustomCursor;
