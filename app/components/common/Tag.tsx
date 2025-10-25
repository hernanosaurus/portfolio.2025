interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`text-orange-300 bg-orange-900 border-none px-1.5 py-1 rounded text-[10px] transition-colors duration-200 ${className}`}
    >
      {children}
    </span>
  );
}
