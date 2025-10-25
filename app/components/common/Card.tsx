'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Project } from '../../data/projects';
import Tag from './Tag';
import Link from './Link';

interface CardProps {
  project: Project;
}

export default function Card({ project }: CardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 600,
        mass: 0.2
      }}
      className="rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 md:p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-orange-400"
      aria-label={`Project: ${project.name}`}
    >
      <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-1.5">
        {project.link ? (
          <Link href={project.link} ariaLabel={`Visit ${project.name} project`}>
            <span className="flex items-center gap-1 align-middle text-orange-400">
              {project.name}
              <ExternalLink className="w-4 h-4 hidden sm:inline-block align-middle" />
            </span>
          </Link>
        ) : (
          <span className="text-zinc-100">{project.name}</span>
        )}
      </h3>
      <p className="mb-2 text-zinc-300 text-sm md:text-base">{project.description}</p>
      {project.products && (
        <div className="mb-2 pl-4 border-l border-zinc-700">
          {project.products.map((prod) => (
            <div key={prod.name} className="mb-4">
              <h4 className="text-base md:text-lg font-semibold flex items-center gap-1.5">
                {prod.link ? (
                  <Link href={prod.link} ariaLabel={`Visit ${prod.name}`}> 
                    <span className="flex items-center gap-1 align-middle text-orange-400">
                      {prod.name}
                      <ExternalLink className="w-4 h-4 hidden sm:inline-block align-middle" />
                    </span>
                  </Link>
                ) : (
                  <span className="text-zinc-100">{prod.name}</span>
                )}
              </h4>
              <p className="text-zinc-400 text-xs md:text-sm mb-2">{prod.description}</p>
              {prod.tech && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {prod.tech.map((tech) => (
                    <Tag key={tech} className="text-xs sm:text-sm px-1.5 py-1">{tech}</Tag>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {project.tech && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Tag key={tech} className="text-xs sm:text-sm px-1.5 py-1">{tech}</Tag>
          ))}
        </div>
      )}
    </motion.article>
  );
}
