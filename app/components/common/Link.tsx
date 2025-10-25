interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function Link({
  href,
  children,
  className = 'text-orange-600 dark:text-orange-400 hover:underline',
  ariaLabel,
}: LinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
