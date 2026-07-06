'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState, useSyncExternalStore } from 'react';

function subscribePointerFine(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia('(pointer: fine)');
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getPointerFineSnapshot() {
  return window.matchMedia('(pointer: fine)').matches;
}

function getPointerFineServerSnapshot() {
  return false;
}

export default function CursorBlob() {
  const shouldReduce = useReducedMotion();
  const enabled = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot,
  );
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const smoothY = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (shouldReduce || !enabled) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [shouldReduce, enabled, x, y]);

  if (!enabled || shouldReduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[5] rounded-full"
      style={{
        x: smoothX,
        y: smoothY,
        width: 360,
        height: 360,
        marginLeft: -180,
        marginTop: -180,
        background:
          'radial-gradient(circle at center, rgba(255,46,159,0.10) 0%, rgba(0,229,255,0.06) 40%, transparent 70%)',
        mixBlendMode: 'screen',
        opacity: visible ? 1 : 0,
        transition: 'opacity 300ms ease-out',
        filter: 'blur(28px)',
      }}
    />
  );
}
