import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import stage from "@/assets/stage.jpg";
import { wedding } from "@/data/weddingDetails";

const item = (d: number) => ({
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { delay: d, duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
});

export function WeddingStage({ play }: { play: boolean }) {
  const base = play ? 1.6 : 0.2;
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <motion.img src={stage} alt="" width={864} height={1536}
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 4, ease: "easeOut" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 40% at 50% 45%, oklch(0.98 0.012 85 / 0.85), transparent 75%)" }} />
      <div className="relative z-10 mx-auto max-w-[70%] px-2 pb-24 text-center sm:max-w-md">
        <motion.p {...item(base)} className="font-ui text-[10px] font-medium uppercase tracking-[0.35em] text-sage sm:text-xs">We're Getting Married</motion.p>
        <motion.h1 {...item(base + 0.4)} className="mt-5 font-script text-5xl leading-tight text-olive sm:text-7xl">{wedding.groom}</motion.h1>
        <motion.p {...item(base + 0.7)} className="font-display text-3xl italic text-gold">&amp;</motion.p>
        <motion.h1 {...item(base + 1)} className="font-script text-5xl leading-tight text-olive sm:text-7xl">{wedding.bride}</motion.h1>
        <motion.div {...item(base + 1.4)} className="mx-auto my-5 h-px w-24 bg-gold-foil" />
        <motion.p {...item(base + 1.6)} className="font-formal text-sm text-cocoa sm:text-base">{wedding.fullDateLabel}</motion.p>
        <motion.p {...item(base + 1.8)} className="mt-1 font-display text-base italic text-cocoa/80">{wedding.timeLabel}</motion.p>
      </div>
      <motion.a href="#invitation" aria-label="Scroll to invitation"
        className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-10 grid h-11 w-11 place-items-center rounded-full border border-gold/60 bg-ivory/70 text-gold backdrop-blur"
        initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: base + 2.2 }, y: { repeat: Infinity, duration: 2 } }}>
        <ChevronDown className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
