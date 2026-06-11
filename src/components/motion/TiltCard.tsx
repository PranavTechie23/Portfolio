import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  as?: 'div' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  'aria-label'?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  intensity = 10,
  as = 'div',
  href,
  target,
  rel,
  onClick,
  'aria-label': ariaLabel,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px), (pointer: coarse)').matches);
  }, []);

  const spring = { damping: 22, stiffness: 180, mass: 0.4 };
  const smoothX = useSpring(rotateX, spring);
  const smoothY = useSpring(rotateY, spring);

  const handleMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * intensity;
    const y = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * intensity;
    setRotateY(x);
    setRotateX(y);
  };

  const handleLeave = () => {
    if (isMobile) return;
    setRotateX(0);
    setRotateY(0);
  };

  const MotionTag = as === 'a' ? motion.a : motion.div;
  const linkProps = as === 'a' ? { href, target, rel } : {};

  return (
    <div style={isMobile ? {} : { perspective: 1200 }} className="h-full">
      <MotionTag
        ref={ref as React.Ref<HTMLDivElement & HTMLAnchorElement>}
        {...linkProps}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        style={isMobile ? {} : {
          rotateX: smoothX,
          rotateY: smoothY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={isMobile ? {} : { scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </MotionTag>
    </div>
  );
};

export default TiltCard;
