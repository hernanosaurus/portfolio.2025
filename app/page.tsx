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
      <main id="main-content" className="mx-auto w-full max-w-3xl py-10 md:py-16 px-4 md:px-6 flex flex-col gap-12 md:gap-16">
        <Hero />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center text-sm text-zinc-400 max-w-xs sm:max-w-none mx-auto break-words leading-snug"
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="inline-block"
            aria-hidden="true"
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
          className="mt-4 text-center text-xs text-zinc-500 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto break-words leading-snug"
        >
          Built with{' '}
          <span className="font-bold text-zinc-200">Next.js</span>,{' '}
          <span className="font-bold text-zinc-200">Tailwind</span>, and loose{' '}
          <span className="font-bold text-zinc-200">TypeScript</span> 😉 — deployed on{' '}
          <span className="font-bold text-zinc-200">Vercel</span>. Designed and coded with good coffee{' '}
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-block"
            aria-hidden="true"
          >
            ☕
          </motion.span>
          , good vibes{' '}
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="inline-block"
            aria-hidden="true"
          >
            🤙
          </motion.span>
          , and good music{' '}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="inline-block"
            aria-hidden="true"
          >
            🎶
          </motion.span>
          .
          <br />
          <span className="text-[10px] text-zinc-600 mt-2 block">
            (Dabbled with <span className="font-bold text-zinc-200">Framer Motion</span> — just exploring the basics and having fun with simple motion effects. 😄)
          </span>
           <br />
          <span className="text-[10px] text-zinc-600 mt-2 block">
            Some projects do not include client names, links, or detailed descriptions due to confidentiality agreements. I am committed to respecting client privacy and NDAs.
          </span>
        </motion.div>
      </main>
    </div>
  );
}
