'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface CoffeeEasterEggProps {
  children: React.ReactNode;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const STORAGE_KEY = 'nani:coffee-count';
const MILESTONES_KEY = 'nani:coffee-milestones';
const TOOLTIP_HOLD_MS = 2000;
const CURSOR_HOLD_MS = 600;
const STEAM_DURATION_MS = 800;

const MILESTONES = [1, 3, 5, 10, 20, 50, 100] as const;

const CURSOR_DATA_URL =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><text y='16' font-size='14'>☕</text></svg>";

function copyForCount(n: number): string {
  if (n === 1) return '1 cup ☕';
  if (n === 3) return '3 cups, no shame';
  if (n === 5) return "5 cups — we're debugging something";
  if (n === 10) return '10 cups — legally wired';
  if (n === 20) return "20 cups — you're not testing me, you're testing yourself";
  if (n === 50) return '50 cups — ok you need water';
  if (n === 100) return '100 cups — nani would be proud';
  if (n > 100) return `${n} cups — help`;
  return `${n} cups`;
}

function windowCopyForCount(n: number): { title: string; body: string; footer: string } {
  if (n === 1)
    return {
      title: 'FIRST SIP',
      body: 'You found the coffee. Warm reception, keep clicking.',
      footer: '☕ Beverage detected · 1 cup logged',
    };
  if (n === 3)
    return {
      title: 'PACING YOURSELF',
      body: "Three cups. Reasonable. You're just getting started.",
      footer: '☕ 3 cups · vitals normal',
    };
  if (n === 5)
    return {
      title: 'CAFFEINATED',
      body: "5 cups — we're debugging something. Solidarity.",
      footer: '☕ 5 cups · buffer full',
    };
  if (n === 10)
    return {
      title: 'LEGALLY WIRED',
      body: '10 cups. Your heart rate is a feature, not a bug.',
      footer: '☕ 10 cups · systems nominal',
    };
  if (n === 20)
    return {
      title: 'ENDURANCE MODE',
      body: "20 cups. You're not testing me, you're testing yourself.",
      footer: '☕ 20 cups · sensors twitchy',
    };
  if (n === 50)
    return {
      title: 'HYDRATION WARNING',
      body: '50 cups — ok you need water. This is a friendly intervention.',
      footer: '⚠ 50 cups · drink a glass of water',
    };
  if (n === 100)
    return {
      title: '☕ CENTURY CLUB',
      body: '100 cups. Nani would be proud. Framed and hung on the wall.',
      footer: '☕ 100 cups · welcome to the roster',
    };
  return {
    title: `${n} CUPS`,
    body: `${n} cups logged this session. Help.`,
    footer: `☕ ${n} cups · uncharted territory`,
  };
}

function loadShownMilestones(): Set<number> {
  if (typeof window === 'undefined') return new Set();
  const raw = window.sessionStorage.getItem(MILESTONES_KEY);
  if (!raw) return new Set();
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set(parsed.filter((n) => typeof n === 'number'));
  } catch {
    // ignore
  }
  return new Set();
}

export default function CoffeeEasterEgg({ children }: CoffeeEasterEggProps) {
  const shouldReduce = useReducedMotion();
  const [count, setCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    const parsed = parseInt(stored, 10);
    return !isNaN(parsed) && parsed > 0 ? parsed : 0;
  });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [steamKey, setSteamKey] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const [liveText, setLiveText] = useState('');
  const [pointerFine] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  );
  const [windowMilestone, setWindowMilestone] = useState<number | null>(null);
  const shownMilestonesRef = useRef<Set<number>>(loadShownMilestones());

  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const liveClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      if (cursorTimerRef.current) clearTimeout(cursorTimerRef.current);
      if (liveClearTimerRef.current) clearTimeout(liveClearTimerRef.current);
    };
  }, []);

  const wisps = useMemo(() => {
    const rand = seededRandom(663);
    return [0, 1, 2].map((i) => {
      const jitter1 = (rand() - 0.5) * 3;
      const jitter2 = (rand() - 0.5) * 3;
      const startX = [5, 3, 7][i];
      const midX = [4 + jitter1, 0 + jitter1, 10 + jitter1][i];
      const endX = [5 + jitter2, 2 + jitter2, 8 + jitter2][i];
      return {
        id: i,
        d: `M ${startX} 0 C ${midX} -6, ${startX + (i === 1 ? -1 : i === 2 ? 1 : 0)} -12, ${endX} -20`,
        delay: i * 0.08,
      };
    });
  }, []);

  const persistShownMilestones = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(
      MILESTONES_KEY,
      JSON.stringify([...shownMilestonesRef.current]),
    );
  }, []);

  function handleClick() {
    const next = count + 1;
    setCount(next);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, String(next));
    }
    const text = copyForCount(next);
    setLiveText(text);
    if (liveClearTimerRef.current) clearTimeout(liveClearTimerRef.current);
    liveClearTimerRef.current = setTimeout(() => setLiveText(''), TOOLTIP_HOLD_MS + 400);

    const isMilestone = (MILESTONES as readonly number[]).includes(next);
    const alreadyShown = shownMilestonesRef.current.has(next);
    const shouldOpenWindow = isMilestone && !alreadyShown;

    if (shouldOpenWindow) {
      shownMilestonesRef.current.add(next);
      persistShownMilestones();
      setWindowMilestone(next);
    } else {
      setTooltipVisible(true);
      if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = setTimeout(() => setTooltipVisible(false), TOOLTIP_HOLD_MS);
    }

    if (!shouldReduce) {
      setSteamKey((k) => k + 1);
    }

    if (!shouldReduce && pointerFine) {
      setCursorActive(true);
      if (cursorTimerRef.current) clearTimeout(cursorTimerRef.current);
      cursorTimerRef.current = setTimeout(() => setCursorActive(false), CURSOR_HOLD_MS);
    }
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        data-easter-egg="coffee"
        onClick={handleClick}
        aria-label="click to count coffee cups"
        style={cursorActive ? { cursor: `url("${CURSOR_DATA_URL}") 8 8, help` } : undefined}
        className="relative inline cursor-help underline decoration-dotted decoration-zinc-500/30 underline-offset-[3px] hover:decoration-zinc-400/60 transition-[text-decoration-color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-400 focus-visible:rounded-xs"
      >
        {children}
      </button>

      {!shouldReduce && (
        <span
          aria-hidden="true"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none"
        >
          <AnimatePresence>
            {steamKey > 0 && (
              <motion.svg
                key={steamKey}
                width="16"
                height="24"
                viewBox="0 0 16 24"
                style={{ overflow: 'visible' }}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {wisps.map((w) => (
                  <motion.path
                    key={w.id}
                    d={w.d}
                    stroke="rgb(212 212 216)"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0, y: 20 }}
                    animate={{ pathLength: 1, opacity: [0, 0.7, 0], y: 0 }}
                    transition={{ duration: STEAM_DURATION_MS / 1000, delay: w.delay, ease: 'easeOut' }}
                    onAnimationComplete={w.id === 2 ? () => setSteamKey(0) : undefined}
                    style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                  />
                ))}
              </motion.svg>
            )}
          </AnimatePresence>
        </span>
      )}

      <AnimatePresence>
        {tooltipVisible && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0, y: shouldReduce ? 0 : 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : 2 }}
            transition={{ duration: shouldReduce ? 0 : 0.15, ease: 'easeOut' }}
            className="absolute bottom-full left-0 mb-2 px-2.5 py-1 rounded-md bg-zinc-800/95 border border-zinc-700/60 text-zinc-100 text-[10px] font-mono tracking-widest uppercase whitespace-nowrap pointer-events-none z-50"
          >
            {copyForCount(count)}
          </motion.span>
        )}
      </AnimatePresence>

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {liveText}
      </span>

      <CoffeeConsole
        milestone={windowMilestone}
        count={count}
        onClose={() => setWindowMilestone(null)}
      />
    </span>
  );
}

interface CoffeeConsoleProps {
  milestone: number | null;
  count: number;
  onClose: () => void;
}

function CoffeeConsole({ milestone, count, onClose }: CoffeeConsoleProps) {
  const shouldReduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<Element | null>(null);

  useEffect(() => {
    if (milestone === null) return;
    lastFocusRef.current = document.activeElement;
    closeRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previousOverflow;
      const last = lastFocusRef.current;
      if (last instanceof HTMLElement) last.focus();
    };
  }, [milestone, onClose]);

  const copy = milestone !== null ? windowCopyForCount(milestone) : null;

  return (
    <AnimatePresence>
      {milestone !== null && copy && (
        <motion.div
          key="coffee-console-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="coffee-console-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduce ? 0 : 0.15 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 bg-black/70 backdrop-blur-sm"
        >
          <motion.div
            key="coffee-console-window"
            initial={{ opacity: 0, scale: shouldReduce ? 1 : 0.9, y: shouldReduce ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduce ? 1 : 0.95, y: shouldReduce ? 0 : 6 }}
            transition={{
              duration: shouldReduce ? 0 : 0.22,
              ease: 'easeOut',
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm chrome-border rounded-lg bg-zinc-950 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] overflow-hidden font-mono"
          >
            <div className="flex items-center justify-between px-3 py-2 chrome-bg text-[10px] uppercase tracking-[0.25em] text-zinc-950">
              <div className="flex items-center gap-2 font-semibold">
                <span aria-hidden="true">☕</span>
                <span>coffee.console — v1.0</span>
              </div>
              <div className="flex items-center gap-1">
                <span aria-hidden="true" className="w-3 h-3 rounded-sm bg-zinc-950/70" />
                <span aria-hidden="true" className="w-3 h-3 rounded-sm bg-zinc-950/70" />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close coffee console"
                  className="w-4 h-4 rounded-sm bg-zinc-950 text-zinc-100 text-[10px] leading-none flex items-center justify-center hover:bg-brand-magenta-500 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan-400"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="px-5 py-6">
              <p className="text-[10px] tracking-[0.3em] uppercase text-brand-cyan-400">
                &gt; Milestone log
              </p>
              <h2
                id="coffee-console-title"
                className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight chrome-text leading-tight"
              >
                {copy.title}
              </h2>
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-sans">{copy.body}</p>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-baseline justify-between gap-3 text-[10px] tracking-[0.25em] uppercase">
                <span className="text-zinc-500">Session count</span>
                <span className="text-brand-magenta-400 text-sm">
                  {String(count).padStart(3, '0')} cups
                </span>
              </div>

              <p className="mt-4 text-[10px] tracking-[0.2em] uppercase text-zinc-600">
                {copy.footer}
              </p>
            </div>

            <div className="px-5 py-2.5 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-zinc-500">
              <span>[Esc] · [×] to close</span>
              <span className="text-zinc-700">nani.dev</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
