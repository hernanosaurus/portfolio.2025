import type { TargetAndTransition, Transition, Variants } from 'framer-motion';

export const DURATION = {
  fast: 300,
  base: 500,
  slow: 700,
} as const;

export const EASE = {
  out: 'easeOut' as const,
  inOut: 'easeInOut' as const,
} as const;

export const SPRING = {
  snappy: { type: 'spring' as const, stiffness: 120, damping: 20 } as const,
  tight: { type: 'spring' as const, stiffness: 300, damping: 22 } as const,
} as const;

export const sectionContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export const sectionItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base / 1000, ease: EASE.out } },
};

export function motionProps(
  delayMs: number,
  durationMs: number,
  shouldReduce: boolean,
  spring = false,
): { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition } {
  return {
    initial: { opacity: 0, y: shouldReduce ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduce
      ? { duration: durationMs / 1000 }
      : spring
        ? { delay: delayMs / 1000, ...SPRING.snappy }
        : { delay: delayMs / 1000, duration: durationMs / 1000, ease: EASE.out },
  };
}
