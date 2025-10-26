import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SocialLinkProps {
  href: string;
  ariaLabel: string;
  children: ReactNode;
  download?: boolean;
}

export default function SocialLink({ href, ariaLabel, children, download = false }: SocialLinkProps) {
  return (
    <motion.a
      href={href}
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      aria-label={ariaLabel}
      className="text-orange-400 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 rounded transition-colors group"
      tabIndex={0}
      download={download}
      whileHover={{ scale: 1.12, y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="flex items-center gap-1 align-middle">
        {children}
      </span>
    </motion.a>
  );
}
