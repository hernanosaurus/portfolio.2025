'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Project } from '../../data/projects';
import Tag from './Tag';
import Link from './Link';
import PlatformIcon from './PlatformIcon';

interface CardProps {
  project: Project;
  isActive?: boolean;
  onInView?: (isInView: boolean) => void;
}

export default function Card({ project, isActive = false, onInView }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onInView(entry.isIntersecting);
      },
      {
        threshold: 0.3, // Trigger when 30% of the card is visible
        rootMargin: '0px', // No margin - detect all cards equally
      }
    );

    const currentCard = cardRef.current;
    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, [onInView]);

  return (
    <motion.article
      ref={cardRef}
      className={`rounded-lg border bg-gradient-to-br from-zinc-900 to-zinc-800 p-4 md:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-orange-400 ${
        isActive ? 'border-orange-400 shadow-lg' : 'border-zinc-800'
      }`}
    >
      <div className="flex items-start sm:items-center justify-between gap-3 mb-2">
        <h3 className="text-lg md:text-xl font-bold">
          {project.link ? (
            <Link
              href={project.link}
              ariaLabel={`Visit project: ${project.name}`}
              className="text-orange-400 underline underline-offset-2 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors"
            >
              {project.name}
            </Link>
          ) : (
            <span className="text-zinc-100">{project.name}</span>
          )}
        </h3>
        {project.platform && (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-800/50 border border-zinc-700 text-zinc-400 text-xs whitespace-nowrap flex-shrink-0">
            <PlatformIcon platform={project.platform} className="text-zinc-400" />
          </span>
        )}
      </div>
      <p className="mb-2 text-zinc-300 text-sm md:text-base">{project.description}</p>
      {project.products && (
        <div className="mb-2 pl-4 border-l border-zinc-700">
          {project.products.map((prod) => (
            <div key={prod.name} className="mb-4">
              <div className="flex items-start sm:items-center justify-between gap-3 mb-2">
                <h4 className="text-base md:text-lg font-semibold">
                  {prod.link ? (
                    <Link
                      href={prod.link}
                      ariaLabel={`Visit product: ${prod.name}`}
                      className="text-orange-400 underline underline-offset-2 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors"
                    >
                      {prod.name}
                    </Link>
                  ) : (
                    <span className="text-zinc-100">{prod.name}</span>
                  )}
                </h4>
                {prod.platform && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-800/50 border border-zinc-700 text-zinc-400 text-xs whitespace-nowrap flex-shrink-0">
                    <PlatformIcon platform={prod.platform} className="text-zinc-400" />
                  </span>
                )}
              </div>
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
                      <div className="flex items-start sm:items-center justify-between gap-3 mb-1">
                        <div>
                          {rel.link ? (
                            <Link
                              href={rel.link}
                              ariaLabel={`Visit related product: ${rel.name}`}
                              className="text-orange-400 underline underline-offset-2 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors group text-base md:text-lg font-semibold"
                            >
                              {rel.name}
                            </Link>
                          ) : (
                            <span className="text-zinc-100 text-base md:text-lg font-semibold">{rel.name}</span>
                          )}
                        </div>
                        {rel.platform && (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-800/50 border border-zinc-700 text-zinc-400 text-xs whitespace-nowrap flex-shrink-0">
                            <PlatformIcon platform={rel.platform} className="text-zinc-400" />
                          </span>
                        )}
                      </div>
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
