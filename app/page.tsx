'use client';

import { motion } from 'framer-motion';
import { projects } from './data/projects';
import { skills } from './data/skills';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import CursorBlob from './components/common/CursorBlob';
import SectionMarker from './components/common/SectionMarker';
import { DURATION, EASE } from './lib/motion';

const SECTIONS = [
  { id: 'section-hero', number: '00', label: 'Intro' },
  { id: 'section-work', number: '01', label: 'Work' },
  { id: 'section-archive', number: '02', label: 'Archive' },
  { id: 'section-stack', number: '03', label: 'Stack' },
];

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-zinc-100 bg-linear-to-br from-black via-zinc-900 to-zinc-800 noise-overlay">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-orange-800 text-white px-3 py-1 rounded z-50"
      >
        Skip to content
      </a>
      <CursorBlob />
      <SectionMarker sections={SECTIONS} />
      <main id="main-content" className="w-full flex flex-col relative z-10">
        <Hero />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION.base / 1000, ease: EASE.out }}
            className="mt-16 md:mt-20 pb-10 md:pb-14 text-center"
          >
            <p className="text-xs font-mono text-zinc-500 leading-relaxed">
              Built with Next.js, Tailwind, TypeScript, and Framer Motion — deployed on Vercel.
            </p>
            <p
              className="text-xs font-mono text-zinc-500 leading-relaxed mt-1"
              aria-label="Coffee, vibes, good music"
            >
              Coffee <span aria-hidden="true">☕</span> · vibes <span aria-hidden="true">🤙</span> · good music{' '}
              <span aria-hidden="true">🎶</span>
            </p>
            <p className="text-[10px] font-mono text-zinc-600 mt-3 leading-relaxed max-w-sm mx-auto">
              Some projects do not include client names, links, or detailed descriptions due to confidentiality agreements. I am committed to respecting client privacy and NDAs.
            </p>
          </motion.footer>
        </div>
      </main>
    </div>
  );
}
