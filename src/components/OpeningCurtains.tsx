import { motion } from "framer-motion";

function Panel({ side, onDone }: { side: "left" | "right"; onDone?: () => void }) {
  const left = side === "left";
  return (
    <motion.div
      className={`absolute top-0 h-full w-1/2 curtain-fabric ${left ? "left-0" : "right-0"}`}
      style={{
        boxShadow: left ? "inset -30px 0 40px -10px oklch(0.4 0.04 70 / 0.5)" : "inset 30px 0 40px -10px oklch(0.4 0.04 70 / 0.5)",
        borderRadius: left ? "0 0 60% 0 / 0 0 6% 0" : "0 0 0 60% / 0 0 0 6%",
      }}
      initial={{ x: 0 }}
      animate={{ x: left ? "-100%" : "100%" }}
      transition={{ delay: 0.5, duration: 2, ease: [0.65, 0, 0.35, 1] }}
      {...(onDone && { onAnimationComplete: onDone })}
    >
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.3 0.03 60 / 0.15), transparent 25%, transparent 80%, oklch(0.3 0.03 60 / 0.25))" }} />
      <div className={`absolute top-0 h-full w-2 bg-gold-foil ${left ? "right-0" : "left-0"}`} />
      {/* tassel tie */}
      <div className={`absolute top-[55%] h-3 w-full bg-gold-foil opacity-90 shadow-soft`} />
      <div className={`absolute top-[55%] ${left ? "right-3" : "left-3"} h-16 w-4 rounded-b-full bg-gold-foil`} />
    </motion.div>
  );
}

export function OpeningCurtains({ onDone }: { onDone: () => void }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      <Panel side="left" onDone={onDone} />
      <Panel side="right" />
      <motion.div
        className="absolute inset-x-0 top-0 h-14 bg-gold-foil shadow-soft"
        style={{ clipPath: "polygon(0 0,100% 0,100% 60%,95% 100%,90% 60%,85% 100%,80% 60%,75% 100%,70% 60%,65% 100%,60% 60%,55% 100%,50% 60%,45% 100%,40% 60%,35% 100%,30% 60%,25% 100%,20% 60%,15% 100%,10% 60%,5% 100%,0 60%)" }}
        animate={{ y: "-100%" }}
        transition={{ delay: 2.2, duration: 0.6 }}
      />
    </div>
  );
}
