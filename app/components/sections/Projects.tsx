'use client';

import { motion } from 'framer-motion';
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
  const linkedProjects = projects.filter(
    (p) => p.link || (p.products && p.products.some((prod) => prod.link)),
  );
  const unlinkedProjects = projects.filter(
    (p) => !p.link && !(p.products && p.products.some((prod) => prod.link)),
  );

  return (
    <section>
      {linkedProjects.length > 0 && (
        <div className="mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-semibold mb-6 text-orange-700 dark:text-orange-400"
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
            {linkedProjects.map((project) => (
              <motion.div key={project.name} variants={item}>
                <Card project={project} />
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
            className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-zinc-100"
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
            {unlinkedProjects.map((project) => (
              <motion.div key={project.name} variants={item}>
                <Card project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
}
