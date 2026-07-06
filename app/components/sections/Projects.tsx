'use client';

import { motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { Project } from '../../data/projects';
import Card from '../common/Card';
import { sectionContainer, sectionItem } from '../../lib/motion';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const linkedProjects = useMemo(
    () => projects.filter((p) => p.link || (p.products && p.products.some((prod) => prod.link))),
    [projects],
  );

  const unlinkedProjects = useMemo(
    () => projects.filter((p) => !p.link && !(p.products && p.products.some((prod) => prod.link))),
    [projects],
  );

  const activeCardIndex = useMemo(() => {
    if (visibleCards.size === 0) return null;
    return Math.min(...visibleCards);
  }, [visibleCards]);

  const handleCardVisibility = useCallback((index: number, isVisible: boolean) => {
    setVisibleCards((prev) => {
      const newSet = new Set(prev);
      if (isVisible) {
        newSet.add(index);
      } else {
        newSet.delete(index);
      }
      return newSet;
    });
  }, []);

  return (
    <section className="w-full mt-12 md:mt-20 px-4 md:px-16 lg:px-24">
      {linkedProjects.length > 0 && (
        <div id="section-work" className="mb-14 scroll-mt-24">
          <SectionHeader number="01" label="Work" sublabel="Featured Projects" />
          <motion.div
            variants={sectionContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start auto-rows-min"
          >
            {linkedProjects.map((project, index) => (
              <motion.div
                key={project.name}
                variants={sectionItem}
                className={featuredSpanClass(index)}
              >
                <Card
                  project={project}
                  isActive={activeCardIndex === index}
                  onInView={(isInView) => handleCardVisibility(index, isInView)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
      {unlinkedProjects.length > 0 && (
        <div id="section-archive" className="scroll-mt-24">
          <SectionHeader number="02" label="Archive" sublabel="More Work" />
          <motion.div
            variants={sectionContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="archive-columns"
          >
            {unlinkedProjects.map((project, index) => (
              <motion.div key={project.name} variants={sectionItem}>
                <Card
                  project={project}
                  isActive={activeCardIndex === linkedProjects.length + index}
                  onInView={(isInView) => {
                    const cardIndex = linkedProjects.length + index;
                    handleCardVisibility(cardIndex, isInView);
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}

function featuredSpanClass(index: number): string {
  const pattern = index % 4;
  if (pattern === 0) return 'md:col-span-7';
  if (pattern === 1) return 'md:col-span-5';
  if (pattern === 2) return 'md:col-span-5';
  return 'md:col-span-7';
}

function SectionHeader({
  number,
  label,
  sublabel,
}: {
  number: string;
  label: string;
  sublabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-6 md:mb-8 flex items-end gap-4 md:gap-6"
    >
      <span
        aria-hidden="true"
        className="font-display font-bold leading-none tracking-tighter select-none outline-text"
        style={{ fontSize: 'clamp(64px, 10vw, 160px)' }}
      >
        {number}
      </span>
      <div className="pb-2 md:pb-4 flex flex-col gap-1">
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-none tracking-tight chrome-text">
          {label}
        </h2>
        <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-zinc-500">
          {sublabel}
        </span>
      </div>
    </motion.div>
  );
}
