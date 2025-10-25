'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="flex flex-col items-start gap-6 text-left max-w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6 }}
        variants={fadeInUp}
        className="flex flex-col gap-1"
      >
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
          Nani&nbsp;+&nbsp;
          <motion.span
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="inline-block"
          >
            ☕
          </motion.span>&nbsp;=&nbsp;
          <motion.span
            animate={{ y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="inline-block"
          >
            💻
          </motion.span>
        </h1>
        <h2 className="text-lg font-mono text-zinc-800 dark:text-zinc-200 mb-2">
          Creative / Frontend Developer.{' '}

        </h2>
      </motion.div>
      <motion.p
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.2 }}
        variants={fadeInUp}
        className="w-full max-w-full text-lg leading-relaxed text-zinc-800 dark:text-zinc-200"
      >
        I love building sleek, responsive, and user-friendly web experiences. I work remotely,
        powered by coffee, good music, and my comfy desk setup. When I&apos;m not coding, you&apos;ll
        probably find me watching movies or exploring design ideas just for fun.
        <br />
        <br />
        I&apos;m a&nbsp;
        <span className="font-bold text-orange-700 dark:text-orange-400">
          keyboard for hire
        </span>
        &nbsp; — ready to bring ideas to life, one line of code at a time.
      </motion.p>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.4 }}
        variants={fadeInUp}
        className="flex flex-row gap-4 mt-2"
      >
        <a
          href="https://github.com/hernanosaurus"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Nani's GitHub profile"
        >
          <Github className="w-6 h-6 text-zinc-800 dark:text-zinc-200 hover:text-orange-900 dark:hover:text-orange-200 transition-colors" />
        </a>
        <a
          href="https://www.linkedin.com/in/hernan-terania/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Nani's LinkedIn profile"
        >
          <Linkedin className="w-6 h-6 text-zinc-800 dark:text-zinc-200 hover:text-orange-900 dark:hover:text-orange-200 transition-colors" />
        </a>
        <a href="mailto:hterania.dev@gmail.com" aria-label="Send email to Nani">
          <Mail className="w-6 h-6 text-zinc-800 dark:text-zinc-200 hover:text-orange-900 dark:hover:text-orange-200 transition-colors" />
        </a>
        <a href="/hTerania.resume.2025.pdf" download aria-label="Download Nani's resume">
          <FileText className="w-6 h-6 text-zinc-800 dark:text-zinc-200 hover:text-orange-900 dark:hover:text-orange-200 transition-colors" />
        </a>
      </motion.div>
    </section>
  );
}
