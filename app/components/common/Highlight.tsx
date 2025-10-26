import { motion } from 'framer-motion';
import React, { useState, useMemo, useRef, useLayoutEffect, useState as useReactState, useEffect } from 'react';

interface HighlightProps {
  children: React.ReactNode;
  className?: string;
}

const FLAMES = 18;
const flameColors = [
  // Yelow at base, more orange height, darker yellow at tip
  'linear-gradient(180deg, #ff6d00 0%, #ff9800 60%, #ffb300 90%, #ffe066 97%, transparent 100%)',
  'linear-gradient(180deg, #ff6d00 0%, #ff9800 65%, #ffb800 92%, #ffe066 99%, transparent 100%)',
  'linear-gradient(180deg, #ff3d00 0%, #ff9800 70%, #ffb300 94%, #ffe066 100%, transparent 100%)',
  'linear-gradient(180deg, #ff3d00 0%, #ff9100 68%, #ffb800 95%, #ffe066 100%, transparent 100%)',
];

function getFlameProps(i: number, textWidth: number) {
  // Distribute flames along the width of the text, with a left offset
  const leftOffset = -textWidth * 0.08; // shift flames left
  const baseX = (textWidth / (FLAMES - 1)) * i + leftOffset;
  const x = baseX + (Math.random() - 0.5) * (textWidth / FLAMES * 0.5);
  const width = 16 + Math.random() * 10;
  const height = 18 + Math.random() * 14; // shorter flames
  const color = flameColors[i % flameColors.length];
  // Animation randomness
  const opacity1 = 0.32 + Math.random() * 0.18;
  const opacity2 = 0.48 + Math.random() * 0.22;
  const opacity3 = 0.38 + Math.random() * 0.18;
  const scaleY1 = 0.3; // start from bottom
  const scaleY2 = 1.2 + Math.random() * 0.2;
  const scaleY3 = 0.8 + Math.random() * 0.2;
  const scaleX2 = 1.1 + Math.random() * 0.1;
  const duration = 1.2 + Math.random() * 0.7;
  const arc = (Math.random() - 0.5) * 18; // arc angle
  return { x, width, height, color, opacity1, opacity2, opacity3, scaleY1, scaleY2, scaleY3, scaleX2, duration, arc };
}

export default function Highlight({ children, className = '' }: HighlightProps) {
  const [isActive, setIsActive] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useReactState(0);
  // Remove flames state, compute flames with useMemo
  const flames = useMemo(
    () =>
      textWidth > 0
        ? Array.from({ length: FLAMES }).map((_, i) => getFlameProps(i, textWidth))
        : [],
    [textWidth]
  );

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [children]);

  // Detect touch device
  const [isTouch, setIsTouch] = useReactState(false);
  useEffect(() => {
    const checkTouch = () => setIsTouch(('ontouchstart' in window) || navigator.maxTouchPoints > 0);
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Toggle handler for mobile
  const handleToggle = () => {
    if (isTouch) setIsActive((v) => !v);
  };

  return (
    <span
      className={`relative inline-block z-30 overflow-visible ${className}`}
      onMouseEnter={() => { if (!isTouch) setIsActive(true); }}
      onMouseLeave={() => { if (!isTouch) setIsActive(false); }}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={handleToggle}
      tabIndex={0}
      style={{ minWidth: 40 }}
    >
      {/* Flickering flame aura distributed along text width */}
      <span className="absolute left-0 bottom-0 w-full h-full pointer-events-none z-0">
        {flames.map((flame, i) => (
          <motion.span
            key={i}
            className="absolute origin-bottom pointer-events-none"
            style={{
              left: `${flame.x}px`,
              bottom: 0,
              width: `${flame.width}px`,
              height: `${flame.height}px`,
              borderRadius: '40% 40% 100% 100%/60% 60% 0% 100%', // more pointy top
              background: flame.color,
              opacity: isActive ? flame.opacity1 : 0,
              filter: 'blur(6px) brightness(1.2)',
              transform: `rotate(${flame.arc}deg)`
            }}
            initial={{ opacity: 0, scaleY: 0.1 }}
            animate={isActive ? {
              opacity: [0, flame.opacity1, flame.opacity2, flame.opacity3],
              scaleY: [0.1, flame.scaleY2, flame.scaleY3], // grow up from bottom
              scaleX: [1, flame.scaleX2, 1],
            } : { opacity: 0, scaleY: 0.1 }}
            transition={isActive ? {
              duration: flame.duration + 0.3, // slightly longer for fade in
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: i * 0.04,
            } : { duration: 0.3, ease: 'easeOut' }}
            aria-hidden="true"
          />
        ))}
      </span>
      <span ref={textRef} className="relative z-20 inline-block align-middle">
        <span
          className="font-bold block relative"
          style={{
            color: '#fb923c',
            fontWeight: 'bold',
            fontSize: 'inherit',
            lineHeight: 'inherit',
          }}
        >
          {children}
          {/* Black wipe overlay */}
          <motion.span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              color: '#111',
              fontWeight: 'bold',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              pointerEvents: 'none',
              overflow: 'hidden',
              display: 'inline-block',
              zIndex: 2,
              WebkitTextFillColor: 'currentcolor',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
            initial={{ width: '0%' }}
            animate={isActive ? { width: '100%' } : { width: '0%' }}
            transition={isActive
              ? { duration: 1.2, ease: 'easeInOut' }
              : { duration: 0.4, ease: 'easeInOut' }
            }
          >
            <span style={{ color: '#111', fontWeight: 'bold', fontSize: 'inherit', lineHeight: 'inherit' }}>{children}</span>
          </motion.span>
        </span>
      </span>
    </span>
  );
}
