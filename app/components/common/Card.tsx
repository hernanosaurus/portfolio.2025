'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MobilePlatform, Project } from '../../data/projects';
import Link from './Link';
import PlatformIcon from './PlatformIcon';
import Tag from './Tag';

interface CardProps {
  project: Project;
  isActive?: boolean;
  onInView?: (isInView: boolean) => void;
}

function tagVariant(tech: string): 'default' | 'mobile-os' {
  return tech === MobilePlatform.Android || tech === MobilePlatform.iOS ? 'mobile-os' : 'default';
}

export default function Card({ project, isActive = false, onInView }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const hasProducts = Boolean(project.products && project.products.length > 0);
  const [isOpen, setIsOpen] = useState(hasProducts ? (project.products!.length < 4) : false);

  const productsId = 'products-' + project.name.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    if (!onInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onInView(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px',
      },
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
      className={`group relative rounded-xl border bg-zinc-900/80 p-4 md:p-5 shadow-none transition-all duration-300 hover:bg-zinc-900 ${
        isActive
          ? 'chrome-border shadow-[0_0_20px_-4px_rgba(255,46,159,0.35)]'
          : 'border-zinc-800 hover:border-zinc-600'
      }`}
    >
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 w-4 h-4 rounded-tr-xl"
          style={{
            background:
              'linear-gradient(225deg, var(--color-brand-magenta-500) 0%, transparent 60%)',
          }}
        />
      )}
      {!hasProducts ? (
        <>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg md:text-xl font-bold">
              {project.link ? (
                <Link
                  href={project.link}
                  ariaLabel={`Visit project: ${project.name}`}
                >
                  {project.name}
                </Link>
              ) : (
                <span className="text-zinc-100">{project.name}</span>
              )}
            </h3>
            {project.platform && <PlatformIcon platform={project.platform} />}
          </div>
          <p className="mt-1 text-sm md:text-base text-zinc-300 leading-relaxed">{project.description}</p>
          {project.tech && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Tag key={tech} variant={tagVariant(tech)}>{tech}</Tag>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls={productsId}
            className="w-full text-left min-h-11 flex items-start justify-between gap-3 focus-visible:outline-2 focus-visible:outline-brand-magenta-500 rounded"
          >
            <h3 className="text-lg md:text-xl font-bold">
              {project.link ? (
                <span onClick={(e) => e.stopPropagation()}>
                  <Link
                    href={project.link}
                    ariaLabel={`Visit project: ${project.name}`}
                  >
                    {project.name}
                  </Link>
                </span>
              ) : (
                <span className="text-zinc-100">{project.name}</span>
              )}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              {project.platform && <PlatformIcon platform={project.platform} />}
              <span
                aria-hidden="true"
                className="text-[10px] font-mono text-zinc-500 bg-zinc-800/60 border border-zinc-700 px-1.5 py-0.5 rounded whitespace-nowrap"
              >
                {project.products!.length} products
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: shouldReduce ? 0 : 0.2 }}
                className="inline-flex text-zinc-500"
              >
                <ChevronDown aria-hidden="true" className="w-4 h-4" />
              </motion.span>
            </div>
          </button>

          <p className="mt-1 text-sm md:text-base text-zinc-400 leading-relaxed">{project.description}</p>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={productsId}
                key="products"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: shouldReduce ? 0 : 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div className="mt-3 pt-3 border-t border-zinc-800/80">
                  {project.products!.map((prod) => (
                    <div
                      key={prod.name}
                      className="flex gap-3 pb-3 mb-3 border-b border-zinc-800/50 last:border-b-0 last:mb-0 last:pb-0"
                    >
                      <span
                        aria-hidden="true"
                        className="w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0 mt-1.5"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-sm md:text-base font-semibold">
                            {prod.link ? (
                              <Link
                                href={prod.link}
                                ariaLabel={`Visit product: ${prod.name}`}
                              >
                                {prod.name}
                              </Link>
                            ) : (
                              <span className="text-zinc-100">{prod.name}</span>
                            )}
                          </h4>
                          {prod.platform && <PlatformIcon platform={prod.platform} />}
                        </div>
                        <p className="mt-0.5 text-xs md:text-sm text-zinc-500 leading-relaxed">{prod.description}</p>
                        {prod.tech && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {prod.tech.map((tech) => (
                              <Tag key={tech} variant={tagVariant(tech)}>{tech}</Tag>
                            ))}
                          </div>
                        )}
                        {prod.related && prod.related.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1.5">
                            {prod.related.map((rel) => (
                              <span
                                key={rel.name}
                                title={rel.description}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-zinc-700 bg-zinc-800/40 text-[10px] font-mono text-zinc-400 tracking-wide"
                              >
                                <span aria-hidden="true">↳</span>
                                {rel.link ? (
                                  <Link
                                    href={rel.link}
                                    ariaLabel={`Visit related product: ${rel.name}`}
                                    className="text-zinc-200 hover:text-brand-magenta-500 focus-visible:outline-2 focus-visible:outline-brand-magenta-500 rounded-xs transition-colors"
                                  >
                                    {rel.name}
                                  </Link>
                                ) : (
                                  <span className="text-zinc-300">{rel.name}</span>
                                )}
                                {rel.platform && <PlatformIcon platform={rel.platform} />}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {project.tech && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Tag key={tech} variant={tagVariant(tech)}>{tech}</Tag>
              ))}
            </div>
          )}
        </>
      )}
    </motion.article>
  );
}
