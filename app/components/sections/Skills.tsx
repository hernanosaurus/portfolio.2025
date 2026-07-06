'use client';

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

function durationForCount(count: number): string {
  return `${Math.max(30, Math.min(80, count * 2.5))}s`;
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
                <div className="marquee-fade overflow-hidden">
                  <ul
                    aria-label={`${category} skills`}
                    className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}
                    style={
                      {
                        '--marquee-duration': durationForCount(items.length),
                      } as React.CSSProperties
                    }
                  >
                    {items.map((skill) => (
                      <li key={skill} className="px-1.5 shrink-0">
                        <SkillPill styles={styles}>{skill}</SkillPill>
                      </li>
                    ))}
                    {items.map((skill) => (
                      <li key={`${skill}-dup`} aria-hidden="true" className="px-1.5 shrink-0">
                        <SkillPill styles={styles}>{skill}</SkillPill>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
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
