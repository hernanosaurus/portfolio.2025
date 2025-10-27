import React from 'react';

interface DownloadProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Download({
  href,
  children,
  className = 'inline-block underline underline-offset-2 text-orange-400 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors',
  ariaLabel,
}: DownloadProps) {
  return (
    <a
      href={href}
      download
      className={className}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </a>
  );
}
