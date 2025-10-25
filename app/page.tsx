import { projects } from './data/projects';
import { skills } from './data/skills';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-zinc-900 dark:text-zinc-100 bg-gradient-to-br from-white via-orange-50 to-orange-100 dark:from-black dark:via-zinc-900 dark:to-zinc-800">
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
        <footer className="mt-12 text-center text-sm text-zinc-700 dark:text-zinc-300">
          Let&apos;s connect &mdash; Available for remote work!
        </footer>
        <div className="mt-4 text-center text-xs text-zinc-700 dark:text-zinc-300">
          Built with Next.js, Tailwind, and loose TypeScript 😉 — deployed on Vercel. Designed and
          coded with good coffee ☕, good vibes 🤙, and good music 🎶.
        </div>
      </main>
    </div>
  );
}
