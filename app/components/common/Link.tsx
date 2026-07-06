import { ArrowRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Link({
  href,
  children,
  className = 'chrome-link focus-visible:outline-2 focus-visible:outline-brand-magenta-500 rounded-xs group',
  ariaLabel,
}: LinkProps) {
  const controls = useAnimation();

  const bounceKeyframes = { x: [0, 8, 0] };

  const handleHoverStart = () => {
    controls.start({
      ...bounceKeyframes,
      transition: {
        repeat: Infinity,
        duration: 0.8,
        ease: 'easeInOut',
      },
    });
  };
  const handleHoverEnd = () => {
    controls.stop();
    controls.set({ x: 0 });
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onFocus={handleHoverStart}
      onBlur={handleHoverEnd}
    >
      <span className="flex items-center gap-1 align-middle">
        {children}
        <motion.span
          className="inline-block text-zinc-400 group-hover:text-brand-magenta-500 transition-colors"
          animate={controls}
        >
          <ArrowRight className="w-4 h-4 align-middle" />
        </motion.span>
      </span>
    </a>
  );
}
