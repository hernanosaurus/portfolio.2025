interface TagProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'mobile-os' | 'coding' | 'libraries' | 'tools';
}

const variantMap: Record<string, string> = {
  'mobile-os':
    'text-brand-magenta-300 border-brand-magenta-800/60 group-hover:border-brand-magenta-500 group-hover:text-brand-magenta-300',
  coding:
    'text-brand-orange-300 border-brand-orange-800/50 group-hover:border-brand-orange-500 group-hover:text-brand-orange-300',
  libraries:
    'text-brand-cyan-300 border-brand-cyan-800/50 group-hover:border-brand-cyan-400 group-hover:text-brand-cyan-300',
  tools:
    'text-zinc-400 border-zinc-700 group-hover:border-brand-cyan-500 group-hover:text-brand-cyan-300',
  default:
    'text-zinc-400 border-zinc-700 group-hover:border-brand-cyan-500 group-hover:text-brand-cyan-300',
};

export default function Tag({ children, className = '', variant = 'default' }: TagProps) {
  const variantClasses = variantMap[variant] ?? variantMap.default;

  return (
    <span
      className={`text-[10px] font-mono bg-transparent border px-1.5 py-0.5 rounded tracking-wide transition-colors duration-150 ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
