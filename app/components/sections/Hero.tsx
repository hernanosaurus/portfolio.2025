'use client';

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import Download from '../common/Download';
import CoffeeEasterEgg from '../common/CoffeeEasterEgg';
import { motionProps } from '../../lib/motion';

const IDLE_WEIGHT = 500;
const IDLE_WIDTH = 100;

const SOCIALS = [
  { label: 'GITHUB', href: 'https://github.com/hernanosaurus', external: true },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/hernan-terania/', external: true },
  { label: 'EMAIL', href: 'mailto:hterania.dev@gmail.com', external: false },
] as const;

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const weight = useMotionValue(IDLE_WEIGHT);
  const width = useMotionValue(IDLE_WIDTH);
  const smoothWeight = useSpring(weight, { stiffness: 120, damping: 20 });
  const smoothWidth = useSpring(width, { stiffness: 120, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const rawScrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const rawScrollY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const rawScrollOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const scrollScale = useSpring(rawScrollScale, { stiffness: 100, damping: 30 });
  const scrollY = useSpring(rawScrollY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (shouldReduce) return;
    if (typeof window === 'undefined') return;

    const el = nameRef.current;
    const section = sectionRef.current;
    if (!el || !section) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    let raf = 0;
    let idleT = 0;
    let inView = true;
    let pendingClientX = 0;
    let pendingClientY = 0;
    let pointerRafScheduled = false;

    function tick() {
      idleT += 0.02;
      const idleWeight = IDLE_WEIGHT + Math.sin(idleT) * 40;
      weight.set(idleWeight);
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (raf) return;
      raf = requestAnimationFrame(tick);
    }

    function stop() {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function applyProximity() {
      pointerRafScheduled = false;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = pendingClientX - cx;
      const dy = pendingClientY - cy;
      const dist = Math.hypot(dx, dy);
      const maxDist = 600;
      const proximity = Math.max(0, 1 - dist / maxDist);
      weight.set(IDLE_WEIGHT + proximity * 200);
      width.set(IDLE_WIDTH + proximity * 15);
    }

    function handleMove(e: MouseEvent) {
      pendingClientX = e.clientX;
      pendingClientY = e.clientY;
      if (!pointerRafScheduled) {
        pointerRafScheduled = true;
        requestAnimationFrame(applyProximity);
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    observer.observe(section);
    start();

    if (finePointer) {
      window.addEventListener('mousemove', handleMove, { passive: true });
    }

    return () => {
      stop();
      observer.disconnect();
      if (finePointer) window.removeEventListener('mousemove', handleMove);
    };
  }, [shouldReduce, weight, width]);

  return (
    <section
      ref={sectionRef}
      id="section-hero"
      aria-label="Hero"
      className="relative w-full px-4 md:px-16 lg:px-24 pt-12 md:pt-16 pb-10 md:pb-14 flex flex-col overflow-hidden"
    >
      <span
        aria-hidden="true"
        className="scanlines pointer-events-none absolute inset-0 z-0"
      />
      <SocialRail />

      <motion.div
        style={
          shouldReduce
            ? undefined
            : { scale: scrollScale, y: scrollY, opacity: rawScrollOpacity, transformOrigin: 'left top' }
        }
        className="relative z-10 flex flex-col gap-4 w-full max-w-5xl"
      >
        <motion.p
          {...motionProps(0, 400, shouldReduce ?? false)}
          className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500"
        >
          <span className="text-brand-cyan-400">◆</span> Portfolio · MMXXVI
        </motion.p>

        <motion.h1
          ref={nameRef}
          {...motionProps(80, 500, shouldReduce ?? false)}
          className="font-display chrome-text leading-[0.85] tracking-tight select-none"
          style={{ fontSize: 'clamp(80px, 14vw, 220px)' }}
        >
          {shouldReduce ? (
            <span
              style={{
                fontVariationSettings: `'wght' ${IDLE_WEIGHT}, 'wdth' ${IDLE_WIDTH}`,
              }}
            >
              Nani
            </span>
          ) : (
            <KineticName smoothWeight={smoothWeight} smoothWidth={smoothWidth} />
          )}
        </motion.h1>

        <motion.p
          {...motionProps(160, 400, shouldReduce ?? false)}
          className="font-display text-lg md:text-2xl tracking-tight text-zinc-300 mt-2"
        >
          Frontend Engineer <span className="text-zinc-600">/</span>{' '}
          <span className="chrome-text-cool">Creative Developer</span>
        </motion.p>

        <motion.p
          {...motionProps(220, 400, shouldReduce ?? false)}
          className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500 flex flex-wrap items-center gap-x-3 gap-y-1 mt-1"
        >
          <span className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="w-1.5 h-1.5 rounded-full bg-brand-cyan-400 animate-pulse"
            />
            <span className="text-brand-cyan-400">Online</span>
          </span>
          <span aria-hidden="true" className="text-zinc-700">
            {'//'}
          </span>
          <span>Remote / Earth</span>
          <span aria-hidden="true" className="text-zinc-700">
            {'//'}
          </span>
          <span className="text-brand-magenta-400">Open to work</span>
        </motion.p>

        <motion.div
          {...motionProps(300, 400, shouldReduce ?? false)}
          className="relative inline-flex mt-4 self-start"
        >
          <span
            aria-hidden="true"
            className={`absolute -inset-1.5 rounded-full chrome-bg-conic opacity-70 blur-[2px] ${
              shouldReduce ? '' : 'animate-[spin_6s_linear_infinite]'
            }`}
          />
          <span className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black border border-zinc-800 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-100">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-magenta-500 animate-pulse" />
            keyboard for hire
          </span>
        </motion.div>

        <motion.p
          {...motionProps(400, 450, shouldReduce ?? false)}
          className="max-w-2xl text-base md:text-xl leading-relaxed text-zinc-300 mt-6 font-sans"
        >
          I build the front half of ambitious web things — clean, fast, and alive. Based remotely,
          running on <CoffeeEasterEgg>coffee</CoffeeEasterEgg> and strong opinions about component
          architecture.
        </motion.p>

        <motion.div
          {...motionProps(500, 500, shouldReduce ?? false, true)}
          className="mt-6 self-start"
        >
          <Download
            href="/hTerania.resume.2026.pdf"
            ariaLabel="Download Nani's resume as a PDF"
            className="chrome-button group inline-flex items-center gap-3 pl-4 pr-5 py-3 rounded-full font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan-400"
          >
            <FloppyIcon />
            <span className="font-semibold">Download Resume</span>
            <span aria-hidden="true" className="text-zinc-900/70 tracking-normal">
              .pdf
            </span>
          </Download>
        </motion.div>
      </motion.div>

      <SocialRow />
    </section>
  );
}

function SocialRail() {
  return (
    <nav
      aria-label="Social links"
      className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-40 pointer-events-none"
    >
      <ul className="flex flex-col items-center gap-6 pl-4 pr-2 pointer-events-auto">
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a
              href={s.href}
              target={s.external ? '_blank' : undefined}
              rel={s.external ? 'noopener noreferrer' : undefined}
              aria-label={`Visit ${s.label.toLowerCase()}`}
              className="group inline-flex items-center gap-2 py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan-400 rounded-xs"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              <span
                aria-hidden="true"
                className="w-px h-6 bg-zinc-700 group-hover:h-10 group-hover:bg-brand-cyan-400 transition-all duration-200"
              />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-zinc-500 group-hover:text-brand-cyan-400 transition-colors">
                {s.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SocialRow() {
  return (
    <nav
      aria-label="Social links"
      className="lg:hidden mt-12 pt-6 border-t border-zinc-800/60 flex flex-wrap items-center gap-x-5 gap-y-2"
    >
      {SOCIALS.map((s, i) => (
        <span key={s.label} className="inline-flex items-center">
          <a
            href={s.href}
            target={s.external ? '_blank' : undefined}
            rel={s.external ? 'noopener noreferrer' : undefined}
            aria-label={`Visit ${s.label.toLowerCase()}`}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-zinc-400 hover:text-brand-cyan-400 transition-colors py-2 -my-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan-400 rounded-xs"
          >
            {s.label}
          </a>
          {i < SOCIALS.length - 1 && (
            <span aria-hidden="true" className="ml-5 text-zinc-700">
              {'//'}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

function FloppyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-4 h-4 md:w-[18px] md:h-[18px] shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M4 4h13l3 3v13H4z" />
      <path d="M8 4v5h8V4" fill="currentColor" />
      <rect x="8" y="13" width="8" height="7" fill="currentColor" stroke="none" />
      <line x1="10" y1="15" x2="14" y2="15" stroke="rgba(255,255,255,0.55)" />
      <line x1="10" y1="17" x2="14" y2="17" stroke="rgba(255,255,255,0.55)" />
    </svg>
  );
}

function KineticName({
  smoothWeight,
  smoothWidth,
}: {
  smoothWeight: ReturnType<typeof useSpring>;
  smoothWidth: ReturnType<typeof useSpring>;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unsubW = smoothWeight.on('change', (v) => {
      const wd = smoothWidth.get();
      el.style.fontVariationSettings = `'wght' ${v.toFixed(0)}, 'wdth' ${wd.toFixed(0)}`;
    });
    const unsubWd = smoothWidth.on('change', (v) => {
      const w = smoothWeight.get();
      el.style.fontVariationSettings = `'wght' ${w.toFixed(0)}, 'wdth' ${v.toFixed(0)}`;
    });
    return () => {
      unsubW();
      unsubWd();
    };
  }, [smoothWeight, smoothWidth]);

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-block',
        fontVariationSettings: `'wght' ${IDLE_WEIGHT}, 'wdth' ${IDLE_WIDTH}`,
      }}
    >
      Nani
    </span>
  );
}
