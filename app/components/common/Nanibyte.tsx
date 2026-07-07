'use client';

import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const IDLE_DELAY_MS = 1200;
const PET_SIZE = 40;
const CURSOR_OFFSET_X = 24;
const CURSOR_OFFSET_Y = 24;

type Mouth = 'neutral' | 'smile' | 'yawn' | 'oh';
type Eyes = 'open' | 'closed' | 'left' | 'right';
type Slider = 'closed' | 'open';

type Behavior =
  | 'breathe'
  | 'blink'
  | 'smile'
  | 'look'
  | 'yawn'
  | 'hop'
  | 'dance'
  | 'spin'
  | 'sparkle';

const BEHAVIORS: { name: Behavior; weight: number }[] = [
  { name: 'breathe', weight: 24 },
  { name: 'blink', weight: 14 },
  { name: 'smile', weight: 10 },
  { name: 'look', weight: 10 },
  { name: 'yawn', weight: 8 },
  { name: 'hop', weight: 10 },
  { name: 'dance', weight: 8 },
  { name: 'spin', weight: 10 },
  { name: 'sparkle', weight: 6 },
];

function pickBehavior(): Behavior {
  const total = BEHAVIORS.reduce((s, b) => s + b.weight, 0);
  let n = Math.random() * total;
  for (const b of BEHAVIORS) {
    n -= b.weight;
    if (n <= 0) return b.name;
  }
  return 'breathe';
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

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

export default function Nanibyte() {
  const shouldReduce = useReducedMotion();
  const enabled = useSyncExternalStore(
    subscribePointerFine,
    getPointerFineSnapshot,
    getPointerFineServerSnapshot,
  );

  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [mouth, setMouth] = useState<Mouth>('smile');
  const [eyes, setEyes] = useState<Eyes>('open');
  const [slider, setSlider] = useState<Slider>('closed');
  const [sparkle, setSparkle] = useState(false);

  const cursorRef = useRef({ x: -500, y: -500 });
  const firstShowRef = useRef(true);
  const bodyControls = useAnimationControls();

  useEffect(() => {
    if (!enabled || shouldReduce) return;

    let idleTimer: number | undefined;
    const showPet = () => {
      setPos({
        x: cursorRef.current.x + CURSOR_OFFSET_X,
        y: cursorRef.current.y + CURSOR_OFFSET_Y,
      });
      setMouth('smile');
      setEyes('open');
      setSlider('closed');
      setVisible(true);
    };

    const armIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(showPet, IDLE_DELAY_MS);
    };

    const handleMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      if (visible) setVisible(false);
      armIdle();
    };

    const handleLeave = () => {
      window.clearTimeout(idleTimer);
      setVisible(false);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(idleTimer);
        setVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [enabled, shouldReduce, visible]);

  useEffect(() => {
    if (!visible || shouldReduce) {
      bodyControls.stop();
      bodyControls.set({ scale: 1, rotate: 0, y: 0, scaleX: 1, scaleY: 1 });
      return;
    }

    let cancelled = false;

    const entrance = async () => {
      if (!firstShowRef.current) return;
      firstShowRef.current = false;
      await bodyControls.start({
        rotate: [180, 0],
        scale: [0.4, 1.1, 1],
        transition: { duration: 0.55, ease: 'easeOut' },
      });
    };

    const runBehavior = async (b: Behavior) => {
      if (cancelled) return;
      switch (b) {
        case 'breathe':
          await bodyControls.start({
            scale: [1, 1.05, 1],
            transition: { duration: 2.4, ease: 'easeInOut' },
          });
          return;
        case 'blink':
          setEyes('closed');
          await wait(120);
          if (cancelled) return;
          setEyes('open');
          return;
        case 'smile':
          setMouth('smile');
          await bodyControls.start({
            scale: [1, 1.05, 1],
            transition: { duration: 0.8, ease: 'easeOut' },
          });
          await wait(600);
          if (cancelled) return;
          setMouth('neutral');
          return;
        case 'look':
          setEyes('left');
          await wait(500);
          if (cancelled) return;
          setEyes('right');
          await wait(500);
          if (cancelled) return;
          setEyes('open');
          return;
        case 'yawn':
          setSlider('open');
          setMouth('yawn');
          await bodyControls.start({
            scaleY: [1, 1.18, 1.08, 1],
            scaleX: [1, 0.95, 1.02, 1],
            transition: { duration: 1.1, ease: 'easeInOut' },
          });
          if (cancelled) return;
          setSlider('closed');
          setMouth('neutral');
          return;
        case 'hop':
          await bodyControls.start({
            y: [0, 4, -18, 0],
            scaleY: [1, 0.85, 1.08, 1],
            scaleX: [1, 1.15, 0.94, 1],
            transition: { duration: 0.6, ease: 'easeOut' },
          });
          return;
        case 'dance':
          await bodyControls.start({
            rotate: [0, -15, 15, -15, 15, 0],
            y: [0, -3, -3, -3, -3, 0],
            transition: { duration: 1.4, ease: 'easeInOut' },
          });
          return;
        case 'spin':
          setMouth('oh');
          await bodyControls.start({
            rotate: [0, 360],
            transition: { duration: 0.9, ease: 'easeInOut' },
          });
          if (cancelled) return;
          setMouth('neutral');
          return;
        case 'sparkle':
          setSparkle(true);
          setMouth('smile');
          await bodyControls.start({
            scale: [1, 1.12, 1],
            transition: { duration: 0.7, ease: 'easeOut' },
          });
          if (cancelled) return;
          setSparkle(false);
          setMouth('neutral');
          return;
      }
    };

    const loop = async () => {
      await entrance();
      await wait(300);
      while (!cancelled) {
        const b = pickBehavior();
        await runBehavior(b);
        if (cancelled) return;
        await wait(500 + Math.random() * 700);
      }
    };

    loop();

    return () => {
      cancelled = true;
      bodyControls.stop();
      setSparkle(false);
    };
  }, [visible, shouldReduce, bodyControls]);

  if (!enabled || shouldReduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[75]"
      style={{
        width: PET_SIZE,
        height: PET_SIZE,
        marginLeft: -PET_SIZE / 2,
        marginTop: -PET_SIZE / 2,
        x: pos.x,
        y: pos.y,
      }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.4 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      <motion.div className="relative w-full h-full" animate={bodyControls}>
        <NanibyteFloppy mouth={mouth} eyes={eyes} slider={slider} />
        {sparkle && <Sparkle />}
      </motion.div>
    </motion.div>
  );
}

function NanibyteFloppy({
  mouth,
  eyes,
  slider,
}: {
  mouth: Mouth;
  eyes: Eyes;
  slider: Slider;
}) {
  const eyeOffsetX = eyes === 'left' ? -1.2 : eyes === 'right' ? 1.2 : 0;
  const eyeHeight = eyes === 'closed' ? 0.35 : 1.6;
  const sliderShift = slider === 'open' ? 4 : 0;

  let mouthPath = 'M 17 30 Q 20 30 23 30';
  if (mouth === 'smile') mouthPath = 'M 16 29 Q 20 32 24 29';
  else if (mouth === 'yawn') mouthPath = 'M 17 29 Q 20 34 23 29';
  else if (mouth === 'oh') mouthPath = 'M 18 29 Q 20 32 22 29';

  return (
    <svg
      viewBox="0 0 40 40"
      width="100%"
      height="100%"
      style={{
        filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))',
        overflow: 'visible',
      }}
    >
      {/* Body: floppy shape with clipped top-right corner */}
      <path
        d="M 5 6 L 32 6 L 35 9 L 35 35 Q 35 36 34 36 L 6 36 Q 5 36 5 35 Z"
        fill="var(--color-brand-orange-500)"
        stroke="#18181b"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Metal slider */}
      <g transform={`translate(${sliderShift} 0)`}>
        <rect
          x={10}
          y={8}
          width={18}
          height={6}
          rx={0.6}
          fill="#27272a"
          stroke="#18181b"
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        {/* Slider notch */}
        <rect x={17.5} y={9.5} width={3} height={3} rx={0.3} fill="var(--color-brand-orange-500)" />
      </g>

      {/* Write-protect tab (bottom-left) */}
      <rect
        x={7}
        y={32}
        width={2.5}
        height={2.5}
        fill="#18181b"
        stroke="#18181b"
        strokeWidth={0.6}
      />

      {/* Label — the face lives here */}
      <rect
        x={9}
        y={17}
        width={22}
        height={16}
        rx={0.5}
        fill="#f4f4f5"
        stroke="#18181b"
        strokeWidth={1.4}
        strokeLinejoin="round"
      />
      {/* Label header stripe */}
      <rect x={9.7} y={17.7} width={20.6} height={2.4} fill="#18181b" />
      {/* Micro-branding */}
      <text
        x={20}
        y={22}
        textAnchor="middle"
        fontSize={2}
        fill="#18181b"
        fontFamily="ui-monospace, monospace"
        style={{ letterSpacing: '0.05em' }}
      >
        NANIBYTE
      </text>

      {/* Eyes */}
      <ellipse cx={16 + eyeOffsetX} cy={26.5} rx={1.2} ry={eyeHeight} fill="#18181b" />
      <ellipse cx={24 + eyeOffsetX} cy={26.5} rx={1.2} ry={eyeHeight} fill="#18181b" />
      {eyes !== 'closed' && (
        <>
          <circle cx={16.35 + eyeOffsetX} cy={26.1} r={0.4} fill="#fff" />
          <circle cx={24.35 + eyeOffsetX} cy={26.1} r={0.4} fill="#fff" />
        </>
      )}

      {/* Mouth */}
      <path
        d={mouthPath}
        stroke="#18181b"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={mouth === 'yawn' || mouth === 'oh' ? '#18181b' : 'none'}
      />
    </svg>
  );
}

function Sparkle() {
  return (
    <motion.svg
      viewBox="0 0 12 12"
      width="14"
      height="14"
      className="absolute pointer-events-none"
      style={{ top: -6, right: -8 }}
      initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
      animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.8], rotate: 180 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <path
        d="M 6 0 L 7 5 L 12 6 L 7 7 L 6 12 L 5 7 L 0 6 L 5 5 Z"
        fill="var(--color-brand-magenta-400)"
      />
    </motion.svg>
  );
}
