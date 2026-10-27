import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={`mx-auto h-6 w-48 text-gold ${className}`} aria-hidden>
      <path d="M0 12 H95 M145 12 H240" stroke="currentColor" strokeWidth="0.8" />
      <path d="M120 2 C112 8 112 16 120 22 C128 16 128 8 120 2Z" fill="none" stroke="currentColor" strokeWidth="0.9" />
      <circle cx="120" cy="12" r="2" fill="currentColor" />
      <path d="M100 12 q6 -6 12 0 q-6 6 -12 0Z M140 12 q-6 -6 -12 0 q6 6 12 0Z" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function Leaf({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 200" className={className} style={style} aria-hidden>
      <path d="M50 195 C50 140 50 80 50 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {[30, 60, 90, 120, 150].map((y, i) => (
        <g key={y}>
          <path d={`M50 ${y + 10} C${25 - i} ${y} ${15} ${y - 20} ${20} ${y - 28} C${35} ${y - 22} ${48} ${y - 5} 50 ${y + 10}Z`} fill="currentColor" />
          <path d={`M50 ${y + 22} C${75 + i} ${y + 12} ${85} ${y - 8} ${80} ${y - 16} C${65} ${y - 10} ${52} ${y + 7} 50 ${y + 22}Z`} fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-ui text-[10px] font-medium uppercase tracking-[0.35em] text-gold sm:text-xs">{children}</p>;
}
