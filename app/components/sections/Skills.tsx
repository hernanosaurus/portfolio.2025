'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Skills as SkillsType } from '../../data/skills';
import { sectionContainer, sectionItem } from '../../lib/motion';

interface SkillsProps {
  skills: SkillsType;
}

type Variant = 'coding' | 'libraries' | 'tools';

const categoryVariant: Record<string, Variant> = {
  Coding: 'coding',
  'Libraries & Frameworks': 'libraries',
  Tools: 'tools',
};

const variantStyles: Record<
  Variant,
  { pill: string; hover: string; dot: string; label: string }
> = {
  coding: {
    pill: 'border-brand-orange-800/50 text-brand-orange-300',
    hover: 'hover:border-brand-orange-500 hover:text-brand-orange-200',
    dot: 'bg-brand-orange-500',
    label: 'text-brand-orange-400',
  },
  libraries: {
    pill: 'border-brand-cyan-800/50 text-brand-cyan-300',
    hover: 'hover:border-brand-cyan-400 hover:text-brand-cyan-200',
    dot: 'bg-brand-cyan-500',
    label: 'text-brand-cyan-400',
  },
  tools: {
    pill: 'border-zinc-700 text-zinc-400',
    hover: 'hover:border-brand-magenta-500 hover:text-brand-magenta-300',
    dot: 'bg-brand-magenta-500',
    label: 'text-brand-magenta-400',
  },
};

function durationForCount(count: number): number {
  return Math.max(30, Math.min(80, count * 2.5));
}

function copiesForCount(count: number): number {
  if (count >= 16) return 2;
  if (count >= 10) return 3;
  if (count >= 6) return 4;
  return 6;
}

export default function Skills({ skills }: SkillsProps) {
  const shouldReduce = useReducedMotion();
  const entries = Object.entries(skills);

  return (
    <section
      id="section-stack"
      aria-labelledby="skills-heading"
      className="w-full mt-12 md:mt-20 scroll-mt-24"
    >
      <div className="px-4 md:px-16 lg:px-24">
        <SectionHeader />
      </div>

      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="flex flex-col gap-6 md:gap-8"
      >
        {entries.map(([category, items], rowIndex) => {
          const variant = categoryVariant[category] ?? 'tools';
          const styles = variantStyles[variant];
          const reverse = rowIndex % 2 === 1;

          return (
            <motion.div
              key={category}
              variants={sectionItem}
              className="marquee-container relative"
            >
              <div className="px-4 md:px-16 lg:px-24 mb-3 flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`w-1.5 h-1.5 rounded-full ${styles.dot}`}
                />
                <h3
                  className={`text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase ${styles.label}`}
                >
                  {category}
                </h3>
                <span
                  aria-hidden="true"
                  className="ml-1 text-[10px] font-mono text-zinc-600"
                >
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>

              {shouldReduce ? (
                <ul
                  aria-label={`${category} skills`}
                  className="px-4 md:px-16 lg:px-24 flex flex-wrap gap-2"
                >
                  {items.map((skill) => (
                    <li key={skill}>
                      <SkillPill styles={styles}>{skill}</SkillPill>
                    </li>
                  ))}
                </ul>
              ) : (
                <MarqueeRow
                  category={category}
                  items={items}
                  styles={styles}
                  reverse={reverse}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function MarqueeRow({
  category,
  items,
  styles,
  reverse,
}: {
  category: string;
  items: string[];
  styles: (typeof variantStyles)[Variant];
  reverse: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const copies = copiesForCount(items.length);
  const duration = durationForCount(items.length);

  useEffect(() => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    let period = 0;
    const measure = () => {
      period = track.scrollWidth / copies;
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    if (period > 0) el.scrollLeft = period;

    let dragging = false;
    let paused = false;
    let idleTimeout: ReturnType<typeof setTimeout> | null = null;
    let startX = 0;
    let startScrollLeft = 0;
    let pointerId: number | null = null;
    let moved = false;
    let lastTs = 0;
    let raf = 0;

    const pauseAuto = (idle = false) => {
      paused = true;
      if (idle) {
        if (idleTimeout) clearTimeout(idleTimeout);
        idleTimeout = setTimeout(() => {
          if (!dragging) paused = false;
        }, 1500);
      }
    };

    const wrap = () => {
      if (period <= 0) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 1) el.scrollLeft -= period;
      else if (el.scrollLeft <= 1) el.scrollLeft += period;
    };

    const tick = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;
      if (!paused && !dragging && period > 0) {
        const pxPerMs = period / (duration * 1000);
        el.scrollLeft += (reverse ? -1 : 1) * pxPerMs * dt;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const handleWheel = () => pauseAuto(true);
    const handleFocusIn = () => pauseAuto(true);
    const handleMouseEnter = () => (paused = true);
    const handleMouseLeave = () => {
      if (!dragging) paused = false;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      if (e.pointerType === 'mouse') e.preventDefault();
      dragging = true;
      paused = true;
      moved = false;
      startX = e.clientX;
      startScrollLeft = el.scrollLeft;
      pointerId = e.pointerId;
      el.dataset.dragging = 'true';
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startScrollLeft - dx;
      wrap();
    };

    const endDrag = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      delete el.dataset.dragging;
      if (pointerId !== null) {
        try {
          el.releasePointerCapture(pointerId);
        } catch {}
        pointerId = null;
      }
      if (moved) {
        e.preventDefault();
        const swallowClick = (evt: Event) => {
          evt.stopPropagation();
          evt.preventDefault();
        };
        el.addEventListener('click', swallowClick, { capture: true, once: true });
        setTimeout(() => el.removeEventListener('click', swallowClick, { capture: true }), 0);
      }
      pauseAuto(true);
    };

    el.addEventListener('wheel', handleWheel, { passive: true });
    el.addEventListener('focusin', handleFocusIn);
    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('pointerdown', handlePointerDown);
    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      el.removeEventListener('wheel', handleWheel);
      el.removeEventListener('focusin', handleFocusIn);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('pointerdown', handlePointerDown);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerup', endDrag);
      el.removeEventListener('pointercancel', endDrag);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, [copies, duration, reverse]);

  return (
    <div
      ref={scrollRef}
      className="marquee-fade marquee-scroll"
      role="region"
      aria-label={`${category} skills, scrollable`}
      tabIndex={0}
    >
      <ul ref={trackRef} aria-label={`${category} skills`} className="marquee-track">
        {Array.from({ length: copies }).map((_, copyIndex) =>
          items.map((skill) => (
            <li
              key={`${skill}-${copyIndex}`}
              aria-hidden={copyIndex > 0 ? 'true' : undefined}
              className="px-1.5 shrink-0"
            >
              <SkillPill styles={styles}>{skill}</SkillPill>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

function SkillPill({
  children,
  styles,
}: {
  children: React.ReactNode;
  styles: (typeof variantStyles)[Variant];
}) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap font-mono text-xs md:text-sm tracking-wide border bg-zinc-950/50 rounded-full px-3.5 py-1.5 transition-colors duration-150 ${styles.pill} ${styles.hover}`}
    >
      {children}
    </span>
  );
}

function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 md:mb-8 flex items-end gap-4 md:gap-6"
    >
      <span
        id="skills-heading"
        aria-hidden="true"
        className="font-display font-bold leading-none tracking-tighter select-none outline-text"
        style={{ fontSize: 'clamp(64px, 10vw, 160px)' }}
      >
        03
      </span>
      <div className="pb-2 md:pb-4 flex flex-col gap-1">
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-none tracking-tight chrome-text">
          Stack
        </h2>
        <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500">
          Skills / Tools
        </span>
      </div>
    </motion.div>
  );
}
