'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SectionMarkerProps {
  sections: { id: string; number: string; label: string }[];
}

export default function SectionMarker({ sections }: SectionMarkerProps) {
  const shouldReduce = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const targets: HTMLElement[] = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        setActiveId(bestRatio > 0.05 ? bestId : null);
      },
      {
        threshold: [0, 0.05, 0.2, 0.5, 0.8, 1],
        rootMargin: '-15% 0px -50% 0px',
      },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [sections]);

  const active = sections.find((s) => s.id === activeId) ?? null;

  return (
    <div
      aria-hidden="true"
      className="hidden md:flex fixed top-6 right-6 lg:top-8 lg:right-10 z-40 pointer-events-none items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase"
    >
      <AnimatePresence mode="wait">
        {active && (
          <motion.span
            key={active.id}
            initial={{ opacity: 0, y: shouldReduce ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduce ? 0 : -4 }}
            transition={{ duration: shouldReduce ? 0 : 0.25, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 border border-zinc-800/70 backdrop-blur-sm"
          >
            <span className="text-brand-cyan-400">{active.number}</span>
            <span aria-hidden="true" className="text-zinc-700">
              {'//'}
            </span>
            <span className="text-zinc-300">{active.label}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
