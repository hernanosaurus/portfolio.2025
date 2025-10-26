'use client';

import { motion } from 'framer-motion';
import { Project } from '../../data/projects';
import Tag from './Tag';
import Link from './Link';

interface CardProps {
  project: Project;
}

export default function Card({ project }: CardProps) {
  return (
    <motion.article
      className="rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 md:p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-orange-400"
      aria-label={`Project: ${project.name}`}
    >
      <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-1.5">
        {project.link ? (
          <Link 
            href={project.link} 
            ariaLabel={`Visit project: ${project.name}`}
            className="text-orange-400 underline underline-offset-2 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors"
          >
            <span className="flex items-center gap-1 align-middle">
              {project.name}
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
                  <Link 
                    href={prod.link} 
                    ariaLabel={`Visit product: ${prod.name}`}
                    className="text-orange-400 underline underline-offset-2 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors"
                  > 
                    <span className="flex items-center gap-1 align-middle">
                      {prod.name}
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
              {prod.related && prod.related.length > 0 && (
                <div className="mt-2 ml-2 border-l-2 border-dashed border-zinc-700 pl-3">
                  <div className="text-xs md:text-sm text-zinc-400 mb-1 font-semibold">Related:</div>
                  {prod.related.map((rel) => (
                    <div key={rel.name} className="mb-2">
                      {rel.link ? (
                        <Link 
                          href={rel.link} 
                          ariaLabel={`Visit related product: ${rel.name}`}
                          className="text-orange-400 underline underline-offset-2 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors group text-base md:text-lg font-semibold"
                        >
                          <span className="flex items-center gap-1 align-middle">
                            {rel.name}
                          </span>
                        </Link>
                      ) : (
                        <span className="text-zinc-100 text-base md:text-lg font-semibold">{rel.name}</span>
                      )}
                      <div className="text-zinc-400 text-xs md:text-sm mt-0.5">{rel.description}</div>
                    </div>
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
