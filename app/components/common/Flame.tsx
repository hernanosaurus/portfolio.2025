import { motion } from 'framer-motion';
import React, { useState, useMemo, useRef, useLayoutEffect, useEffect } from 'react';

interface FlameProps {
  children: React.ReactNode;
  className?: string;
}

// Configuration constants
const FLAME_COUNT = 18;
const FLAME_CONFIG = {
  leftOffsetRatio: -0.08,
  baseWidth: { min: 16, max: 26 },
  baseHeight: { min: 18, max: 32 },
  opacity: {
    initial: { min: 0.32, max: 0.50 },
    peak: { min: 0.48, max: 0.70 },
    final: { min: 0.38, max: 0.56 },
  },
  scale: {
    yInitial: 0.3,
    yPeak: { min: 1.2, max: 1.4 },
    yFinal: { min: 0.8, max: 1.0 },
    xPeak: { min: 1.1, max: 1.2 },
  },
  duration: { min: 1.2, max: 1.9 },
  arcAngle: 18,
} as const;

const FLAME_GRADIENTS = [
  'linear-gradient(180deg, #ff6d00 0%, #ff9800 60%, #ffb300 90%, #ffe066 97%, transparent 100%)',
  'linear-gradient(180deg, #ff6d00 0%, #ff9800 65%, #ffb800 92%, #ffe066 99%, transparent 100%)',
  'linear-gradient(180deg, #ff3d00 0%, #ff9800 70%, #ffb300 94%, #ffe066 100%, transparent 100%)',
  'linear-gradient(180deg, #ff3d00 0%, #ff9100 68%, #ffb800 95%, #ffe066 100%, transparent 100%)',
] as const;

const ANIMATION_TIMING = {
  wipeIn: 1.2,
  wipeOut: 0.4,
  flameDelay: 0.04,
  flameFadeExtra: 0.3,
} as const;

interface FlameProperties {
  x: number;
  width: number;
  height: number;
  color: string;
  opacity1: number;
  opacity2: number;
  opacity3: number;
  scaleY1: number;
  scaleY2: number;
  scaleY3: number;
  scaleX2: number;
  duration: number;
  arc: number;
}

// Seeded random number generator for consistent flame properties
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getFlameProps(index: number, textWidth: number, seed: number): FlameProperties {
  // Use seeded random for consistency across re-renders
  const rng = (offset: number) => seededRandom(seed + index * 7 + offset);

  const leftOffset = textWidth * FLAME_CONFIG.leftOffsetRatio;
  const baseX = (textWidth / (FLAME_COUNT - 1)) * index + leftOffset;
  const x = baseX + (rng(0) - 0.5) * (textWidth / FLAME_COUNT * 0.5);

  const width = FLAME_CONFIG.baseWidth.min + rng(1) * (FLAME_CONFIG.baseWidth.max - FLAME_CONFIG.baseWidth.min);
  const height = FLAME_CONFIG.baseHeight.min + rng(2) * (FLAME_CONFIG.baseHeight.max - FLAME_CONFIG.baseHeight.min);
  const color = FLAME_GRADIENTS[index % FLAME_GRADIENTS.length];

  const opacity1 = FLAME_CONFIG.opacity.initial.min + rng(3) * (FLAME_CONFIG.opacity.initial.max - FLAME_CONFIG.opacity.initial.min);
  const opacity2 = FLAME_CONFIG.opacity.peak.min + rng(4) * (FLAME_CONFIG.opacity.peak.max - FLAME_CONFIG.opacity.peak.min);
  const opacity3 = FLAME_CONFIG.opacity.final.min + rng(5) * (FLAME_CONFIG.opacity.final.max - FLAME_CONFIG.opacity.final.min);

  const scaleY1 = FLAME_CONFIG.scale.yInitial;
  const scaleY2 = FLAME_CONFIG.scale.yPeak.min + rng(6) * (FLAME_CONFIG.scale.yPeak.max - FLAME_CONFIG.scale.yPeak.min);
  const scaleY3 = FLAME_CONFIG.scale.yFinal.min + rng(7) * (FLAME_CONFIG.scale.yFinal.max - FLAME_CONFIG.scale.yFinal.min);
  const scaleX2 = FLAME_CONFIG.scale.xPeak.min + rng(8) * (FLAME_CONFIG.scale.xPeak.max - FLAME_CONFIG.scale.xPeak.min);

  const duration = FLAME_CONFIG.duration.min + rng(9) * (FLAME_CONFIG.duration.max - FLAME_CONFIG.duration.min);
  const arc = (rng(10) - 0.5) * FLAME_CONFIG.arcAngle;

  return { x, width, height, color, opacity1, opacity2, opacity3, scaleY1, scaleY2, scaleY3, scaleX2, duration, arc };
}

export default function Flame({ children, className = '' }: FlameProps) {
  const [isActive, setIsActive] = useState(false);
  const [textWidth, setTextWidth] = useState(0);
  const [isTouch, setIsTouch] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  // Generate consistent seed based on text content
  const seed = useMemo(() => {
    const childrenString = typeof children === 'string' ? children : String(children);
    return childrenString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }, [children]);

  // Memoize flame properties for consistency
  const flames = useMemo(
    () =>
      textWidth > 0
        ? Array.from({ length: FLAME_COUNT }, (_, i) => getFlameProps(i, textWidth, seed))
        : [],
    [textWidth, seed]
  );

  // Measure text width on mount and when children change
  useLayoutEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [children]);

  // Detect touch device once on mount
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(isTouchDevice);
  }, []);

  // Event handlers
  const handleMouseEnter = () => {
    if (!isTouch) setIsActive(true);
  };

  const handleMouseLeave = () => {
    if (!isTouch) setIsActive(false);
  };

  const handleClick = () => {
    if (isTouch) setIsActive(prev => !prev);
  };

  return (
    <span
      className={`relative inline-block z-30 overflow-visible ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={handleClick}
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
              scaleY: [0.1, flame.scaleY2, flame.scaleY3],
              scaleX: [1, flame.scaleX2, 1],
            } : { opacity: 0, scaleY: 0.1 }}
            transition={isActive ? {
              duration: flame.duration + ANIMATION_TIMING.flameFadeExtra,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              delay: i * ANIMATION_TIMING.flameDelay,
            } : { duration: ANIMATION_TIMING.wipeOut, ease: 'easeOut' }}
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
            transition={{
              duration: isActive ? ANIMATION_TIMING.wipeIn : ANIMATION_TIMING.wipeOut,
              ease: 'easeInOut'
            }}
          >
            <span style={{ color: '#111', fontWeight: 'bold', fontSize: 'inherit', lineHeight: 'inherit' }}>{children}</span>
          </motion.span>
        </span>
      </span>
    </span>
  );
}
