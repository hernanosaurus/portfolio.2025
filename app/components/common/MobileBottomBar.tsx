'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/hernanosaurus',
    external: true,
    Icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hernan-terania/',
    external: true,
    Icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:hterania.dev@gmail.com',
    external: false,
    Icon: Mail,
  },
] as const;

export default function MobileBottomBar() {
  const shouldReduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hero = document.getElementById('section-hero');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Quick actions"
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-zinc-800/60 bg-zinc-950/60 backdrop-blur-md"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <ul className="flex items-center gap-1">
              {SOCIALS.map(({ label, href, external, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="inline-flex items-center justify-center w-11 h-11 text-zinc-400 hover:text-brand-cyan-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-cyan-400 rounded-full transition-colors"
                  >
                    <Icon aria-hidden="true" className="w-5 h-5" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/hTerania.resume.2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume as a PDF"
              className="chrome-button group inline-flex items-center gap-2 pl-3 pr-4 py-2.5 rounded-full font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cyan-400"
            >
              <FloppyIcon />
              <span className="font-semibold">Resume</span>
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function FloppyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5"
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
