import React, { useRef, useState } from 'react';
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

  const spring = { damping: 22, stiffness: 180, mass: 0.4 };
  const smoothX = useSpring(rotateX, spring);
  const smoothY = useSpring(rotateY, spring);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * intensity;
    const y = -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * intensity;
    setRotateY(x);
    setRotateX(y);
  };

  const handleLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const MotionTag = as === 'a' ? motion.a : motion.div;
  const linkProps = as === 'a' ? { href, target, rel } : {};

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <MotionTag
        ref={ref as React.Ref<HTMLDivElement & HTMLAnchorElement>}
        {...linkProps}
        onClick={onClick}
        aria-label={ariaLabel}
        className={className}
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </MotionTag>
    </div>
  );
};

export default TiltCard;
