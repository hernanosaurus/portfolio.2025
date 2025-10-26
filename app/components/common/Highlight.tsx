import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

const chakraGlowFrames = [
  '0 0 8px #ff9800, 0 0 16px #fb5607',
  '0 0 12px #ff9800, 0 0 24px #fb5607, 0 0 32px #ff1744',
  '0 0 16px #ff9800, 0 0 32px #fb5607, 0 0 48px #ff1744',
  '0 0 12px #ff9800, 0 0 24px #fb5607, 0 0 32px #ff1744',
  '0 0 8px #ff9800, 0 0 16px #fb5607',
];
const flameX = [0, 2, -3, 4, -2, 3, -1, 0];
const flameY = [0, -1, 2, -2, 1, -1, 2, 0];

export default function Highlight({ children, className = '' }: HighlightProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <span
      className={`relative inline-block align-middle ${className}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
    >
      <motion.span
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0"
        initial={{ opacity: 0, filter: 'blur(0px)', x: 0, y: 0, boxShadow: '0 0 0px #ff9800' }}
        animate={isActive ? {
          opacity: 1,
          filter: 'blur(6px)',
          x: flameX,
          y: flameY,
          boxShadow: chakraGlowFrames,
          transition: {
            x: { duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
            y: { duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
            boxShadow: { duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' },
          },
        } : {
          opacity: 0,
          filter: 'blur(0px)',
          x: 0,
          y: 0,
          boxShadow: '0 0 0px #ff9800',
          transition: { duration: 0.2 },
        }}
        aria-hidden="true"
      >
        <span className="block w-full h-full" style={{ background: 'radial-gradient(circle, #ff9800 40%, #fb5607 60%, #ff1744 100%)', opacity: 0.7 }} />
      </motion.span>
      <span className="font-bold text-yellow-300 relative z-10">
        {children}
      </span>
    </span>
  );
}
