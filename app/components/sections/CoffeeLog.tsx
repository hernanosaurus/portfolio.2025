'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useCoffee } from '../../lib/coffee';

function statusForCount(n: number): string {
  if (n === 0) return 'awaiting input';
  if (n < 3) return 'warming up';
  if (n < 6) return 'wired but ok';
  if (n < 11) return 'fully caffeinated';
  if (n < 21) return 'jittery';
  if (n < 50) return 'concerning';
  if (n < 100) return 'transcendent';
  return 'help';
}

function formatRelative(ms: number): string {
  if (ms < 1000) return 'just now';
  const s = Math.floor(ms / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

export default function CoffeeLog() {
  const shouldReduce = useReducedMotion();
  const { count, lastClickAt } = useCoffee();
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    if (!lastClickAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [lastClickAt]);

  const isLive = count > 0;
  const relative = lastClickAt ? formatRelative(now - lastClickAt) : '——';
  const status = statusForCount(count);
  const countLabel = String(count).padStart(3, '0');

  return (
    <aside
      aria-label="Coffee log"
      className="hidden lg:block absolute top-16 right-16 xl:right-24 z-20 w-72 xl:w-80 font-mono select-none pointer-events-none"
    >
      <div
        className={`rounded-md border transition-colors duration-500 ${
          isLive
            ? 'border-zinc-700/80 bg-zinc-950/60 backdrop-blur-sm'
            : 'border-zinc-800/60 bg-zinc-950/30'
        }`}
      >
        <div
          className={`flex items-center justify-between px-3 py-1.5 border-b transition-colors duration-500 ${
            isLive ? 'border-zinc-700/80' : 'border-zinc-800/60'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase">
            <span aria-hidden="true" className={isLive ? 'text-brand-magenta-400' : 'text-zinc-600'}>
              ☕
            </span>
            <span className={isLive ? 'chrome-text font-semibold' : 'text-zinc-500'}>
              coffee.log
            </span>
          </div>
          <span className="flex items-center gap-1.5 text-[9px] tracking-[0.25em] uppercase">
            <span
              aria-hidden="true"
              className={`w-1.5 h-1.5 rounded-full ${
                isLive
                  ? `bg-brand-magenta-500 ${shouldReduce ? '' : 'animate-pulse'}`
                  : 'bg-zinc-700'
              }`}
            />
            <span className={isLive ? 'text-brand-magenta-400' : 'text-zinc-600'}>
              {isLive ? 'live' : 'idle'}
            </span>
          </span>
        </div>

        <div className="px-3 py-2.5 space-y-1 text-[10px] tracking-[0.15em] uppercase">
          <LogRow label="cups" value={
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={countLabel}
                initial={shouldReduce ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className={`inline-block tabular-nums ${
                  isLive ? 'text-brand-cyan-400' : 'text-zinc-600'
                }`}
              >
                {countLabel}
              </motion.span>
            </AnimatePresence>
          } />
          <LogRow label="last sip" value={
            <span className={isLive ? 'text-zinc-200' : 'text-zinc-600'}>{relative}</span>
          } />
          <LogRow label="status" value={
            <span className={isLive ? 'text-zinc-200' : 'text-zinc-600'}>{status}</span>
          } />
          <LogRow label="next milestone" value={
            <span className={isLive ? 'text-brand-magenta-400' : 'text-zinc-600'}>???</span>
          } />
        </div>

        <div
          className={`px-3 py-1.5 border-t text-[9px] tracking-[0.25em] uppercase transition-colors duration-500 ${
            isLive
              ? 'border-zinc-700/80 text-zinc-500'
              : 'border-zinc-800/60 text-zinc-600'
          }`}
        >
          {isLive ? '> logging enabled' : '> click coffee to start'}
        </div>
      </div>
    </aside>
  );
}

function LogRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-zinc-600">{'>'}</span>
      <span className="text-zinc-500 shrink-0">{label}</span>
      <span
        aria-hidden="true"
        className="flex-1 border-b border-dotted border-zinc-800 translate-y-[-2px]"
      />
      <span className="shrink-0">{value}</span>
    </div>
  );
}
