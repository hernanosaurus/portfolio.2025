interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Link({
  href,
  children,
  className = 'text-orange-400 underline underline-offset-2 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:bg-orange-950/20 transition-colors',
  ariaLabel,
}: LinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
    </a>
  );
}
