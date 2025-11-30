'use client';

import { motion } from 'framer-motion';
import { useCallback, useMemo, useState } from 'react';
import { Project } from '../../data/projects';
import Card from '../common/Card';

interface ProjectsProps {
  projects: Project[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Projects({ projects }: ProjectsProps) {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const linkedProjects = useMemo(
    () => projects.filter((p) => p.link || (p.products && p.products.some((prod) => prod.link))),
    [projects]
  );

  const unlinkedProjects = useMemo(
    () => projects.filter((p) => !p.link && !(p.products && p.products.some((prod) => prod.link))),
    [projects]
  );

  // Derive active card from visible cards (always the topmost/lowest index)
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
    <section>
      {linkedProjects.length > 0 && (
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold mb-6 text-zinc-100"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8"
          >
            {linkedProjects.map((project, index) => (
              <motion.div key={project.name} variants={item}>
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
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold mb-6 text-zinc-100"
          >
            Other Projects
          </motion.h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-8"
          >
            {unlinkedProjects.map((project, index) => (
              <motion.div key={project.name} variants={item}>
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
