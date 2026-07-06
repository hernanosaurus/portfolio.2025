'use client';

import { motion, useReducedMotion } from 'framer-motion';
import React, { useMemo, useRef, useLayoutEffect, useState } from 'react';

interface KeyAccentProps {
  children: React.ReactNode;
  className?: string;
}

const ACCENT_IDLE = '#fb923c';
const ACCENT_PRESSED = '#fdba74';

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function KeyAccent({ children, className = '' }: KeyAccentProps) {
  const shouldReduce = useReducedMotion();
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLSpanElement>(null);

  const seed = useMemo(() => {
    const s = typeof children === 'string' ? children : String(children);
    return s.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  }, [children]);

  useLayoutEffect(() => {
    if (!textRef.current) return;
    const measure = () => {
      if (textRef.current) setTextWidth(textRef.current.offsetWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(textRef.current);
    return () => observer.disconnect();
  }, [children]);

  const underlinePath = useMemo(() => {
    if (textWidth === 0) return '';
    const rng = (o: number) => seededRandom(seed + o);
    const w = textWidth;
    const y1 = 3 + rng(0) * 1.2;
    const cx1 = w * 0.3;
    const cy1 = y1 + (rng(1) - 0.5) * 2.4;
    const cx2 = w * 0.7;
    const cy2 = y1 + (rng(2) - 0.5) * 2.4;
    const y2 = 3 + rng(3) * 1.2;
    return `M 0 ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${w} ${y2}`;
  }, [textWidth, seed]);

  if (shouldReduce) {
    return (
      <span
        aria-hidden="true"
        className={`relative inline-block focus-visible:outline-2 focus-visible:outline-[#fb923c] focus-visible:outline-offset-4 rounded-[2px] ${className}`}
      >
        <span
          ref={textRef}
          className="relative inline-block"
          style={{
            color: ACCENT_IDLE,
            fontWeight: 700,
            display: 'inline-block',
            textShadow: '0 0 8px rgba(251, 146, 60, 0.15)',
          }}
        >
          {children}
        </span>
        {textWidth > 0 && underlinePath && (
          <svg
            aria-hidden="true"
            width={textWidth}
            height="8"
            viewBox={`0 0 ${textWidth} 8`}
            className="absolute left-0 pointer-events-none"
            style={{ bottom: -4, overflow: 'visible' }}
          >
            <path
              d={underlinePath}
              fill="none"
              stroke={ACCENT_IDLE}
              strokeWidth={2}
              strokeLinecap="round"
              opacity={0.7}
            />
          </svg>
        )}
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      className={`relative inline-block focus-visible:outline-2 focus-visible:outline-[#fb923c] focus-visible:outline-offset-4 rounded-[2px] ${className}`}
      style={{
        color: ACCENT_IDLE,
        fontWeight: 700,
        display: 'inline-block',
        transformOrigin: 'center bottom',
        textShadow: '0 0 8px rgba(251, 146, 60, 0.15)',
        transition: 'text-shadow 150ms ease-out, color 150ms ease-out',
      }}
      whileHover={{ textShadow: '0 0 14px rgba(251, 146, 60, 0.35)' }}
      whileFocus={{ textShadow: '0 0 14px rgba(251, 146, 60, 0.35)' }}
      whileTap={{
        y: [0, 2, 2, 0],
        scaleY: [1, 0.96, 0.96, 1],
        color: [ACCENT_IDLE, ACCENT_PRESSED, ACCENT_PRESSED, ACCENT_IDLE],
      }}
      transition={{ duration: 0.42, times: [0, 0.19, 0.36, 1], ease: 'easeInOut' }}
    >
      <span ref={textRef} className="relative inline-block">
        {children}
      </span>
      {textWidth > 0 && underlinePath && (
        <svg
          aria-hidden="true"
          width={textWidth}
          height="8"
          viewBox={`0 0 ${textWidth} 8`}
          className="absolute left-0 pointer-events-none"
          style={{ bottom: -4, overflow: 'visible' }}
        >
          <motion.path
            d={underlinePath}
            fill="none"
            stroke={ACCENT_IDLE}
            strokeWidth={2}
            strokeLinecap="round"
            initial={{ pathLength: 1, opacity: 0.6 }}
            whileHover={{ strokeWidth: 2.5, opacity: 1 }}
            whileTap={{ strokeWidth: 3.5, stroke: ACCENT_PRESSED, opacity: [1, 0.4, 1] }}
          />
        </svg>
      )}
    </motion.span>
  );
}
