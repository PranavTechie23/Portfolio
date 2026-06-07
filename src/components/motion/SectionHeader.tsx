import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { easeOutExpo, viewportOnce } from '../../utils/motion';

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewportOnce);

  return (
    <div
      ref={ref}
      className={`${align === 'center' ? 'text-center items-center' : ''} flex flex-col gap-4 mb-16 ${className}`}
    >
      <motion.div
        className={`flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
      >
        <motion.div
          className="h-[2px] bg-primary origin-left"
          initial={{ width: 0 }}
          animate={isInView ? { width: 32 } : { width: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
        />
        <span className="text-xs font-mono font-bold tracking-[0.4em] text-gray-400 dark:text-slate-400 uppercase">
          {label}
        </span>
      </motion.div>

      <motion.h2
        className="text-5xl md:text-7xl font-black tracking-tighter text-gray-950 dark:text-slate-100 uppercase italic leading-none"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.35, ease: easeOutExpo }}
          className={align === 'center' ? 'max-w-2xl' : 'max-w-xs'}
        >
          {subtitle}
        </motion.div>
      )}
    </div>
  );
};

export default SectionHeader;
