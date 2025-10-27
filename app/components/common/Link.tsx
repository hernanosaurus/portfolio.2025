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
  className = 'text-orange-400 underline underline-offset-2 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors group',
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
          className="inline-block"
          animate={controls}
        >
          <ArrowRight className="w-4 h-4 align-middle" />
        </motion.span>
      </span>
    </a>
  );
}
