'use client';

import { motion } from 'framer-motion';
import { projects } from './data/projects';
import { skills } from './data/skills';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-zinc-100 bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-orange-800 text-white px-3 py-1 rounded z-50"
      >
        Skip to content
      </a>
      <main id="main-content" className="mx-auto max-w-3xl py-16 px-6 flex flex-col gap-16">
        <Hero />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center text-sm text-zinc-700 dark:text-zinc-300"
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="inline-block"
          >
            👋
          </motion.span>{' '}
          Let&apos;s connect &mdash; Available for remote work!
        </motion.footer>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-center text-xs text-zinc-700 dark:text-zinc-300"
        >
          Built with Next.js, Tailwind, and loose TypeScript 😉 — deployed on Vercel.
          <br />
          Designed and coded with good coffee{' '}
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-block"
          >
            ☕
          </motion.span>
          , good vibes{' '}
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="inline-block"
          >
            🤙
          </motion.span>
          , and good music{' '}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="inline-block"
          >
            🎶
          </motion.span>
          .
          <br />
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 block">
            (Dabbled with Framer Motion — just exploring the basics and having fun with simple motion effects. 😄)
          </span>
        </motion.div>
      </main>
    </div>
  );
}
