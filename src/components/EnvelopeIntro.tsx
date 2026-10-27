import { useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "./Ornaments";
import { wedding, coupleMonogram } from "@/data/weddingDetails";

type Props = { onOpened: () => void; onSkip: () => void };

export function EnvelopeIntro({ onOpened, onSkip }: Props) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpened, 2600);
  };

  const leaves = [
    { l: "-4%", t: "4%", r: -30, s: 1 }, { l: "78%", t: "2%", r: 35, s: 0.9 },
    { l: "-6%", t: "62%", r: -150, s: 1.1 }, { l: "80%", t: "66%", r: 150, s: 1 },
    { l: "12%", t: "30%", r: -60, s: 0.6 }, { l: "70%", t: "36%", r: 60, s: 0.6 },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-envelope safe-pad"
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.9 }}
    >
      {/* embossed botanicals */}
      {leaves.map((x, i) => (
        <Leaf key={i} className="pointer-events-none absolute w-28 text-olive opacity-40 drop-shadow-[0_1px_0_oklch(0.62_0.04_120)] sm:w-40"
          style={{ left: x.l, top: x.t, transform: `rotate(${x.r}deg) scale(${x.s})` }} />
      ))}
      <div className="pointer-events-none absolute inset-3 rounded-sm border border-gold/60 sm:inset-6" />

      <div className="relative w-[min(88vw,420px)] [perspective:1400px]" style={{ aspectRatio: "3 / 4" }}>
        {/* letter card */}
        <motion.div
          className="absolute inset-x-4 top-6 bottom-6 rounded-sm bg-paper shadow-soft"
          initial={false}
          animate={opening ? { y: "-38%", zIndex: 30 } : { y: 0 }}
          transition={{ delay: 1.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="m-3 flex h-[calc(100%-1.5rem)] flex-col items-center justify-start gap-2 border border-gold/60 pt-8 text-center">
            <p className="font-ui text-[9px] uppercase tracking-[0.3em] text-gold">Holy Matrimony</p>
            <p className="font-script text-4xl text-olive">{wedding.groom}</p>
            <p className="font-display text-lg text-gold">&amp;</p>
            <p className="font-script text-4xl text-olive">{wedding.bride}</p>
          </div>
        </motion.div>

        {/* envelope body */}
        <div className="absolute inset-0 z-10 overflow-hidden rounded-md border border-gold/70 bg-envelope shadow-soft">
          <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(to top right, transparent 49.6%, oklch(0.7 0.08 80) 50%, transparent 50.4%), linear-gradient(to top left, transparent 49.6%, oklch(0.7 0.08 80) 50%, transparent 50.4%)" }} />
          <Leaf className="absolute -bottom-6 left-2 w-20 rotate-[-20deg] text-olive opacity-50" />
          <Leaf className="absolute -bottom-6 right-2 w-20 rotate-[20deg] text-olive opacity-50" />
        </div>

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 z-20 h-[55%] origin-top [transform-style:preserve-3d]"
          initial={false}
          animate={opening ? { rotateX: 180, zIndex: 5 } : { rotateX: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: "easeInOut", zIndex: { delay: 1.1 } }}
        >
          <div className="h-full w-full bg-envelope [backface-visibility:hidden] drop-shadow-[0_6px_8px_oklch(0.2_0.02_120/0.5)]" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}>
            <div className="h-full w-full bg-gold-foil opacity-80" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%, 49.4% 99%, 1.5% 1%, 98.5% 1%, 50.6% 99%, 50% 100%)" }} />
          </div>
        </motion.div>

        {/* seal */}
        <motion.button
          onClick={open}
          disabled={opening}
          aria-label="Tap to open the invitation"
          style={{ x: "-50%", y: "-50%" }}
          className="absolute left-1/2 top-[55%] z-40 grid h-28 w-28 place-items-center rounded-full bg-gold-foil shadow-seal outline-none focus-visible:ring-2 focus-visible:ring-ivory sm:h-32 sm:w-32"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={opening ? { scale: [1, 1.15, 0], rotate: [0, 25, 90], opacity: [1, 1, 0] } : { scale: [1, 1.04, 1] }}
          transition={opening ? { duration: 0.8 } : { duration: 2.4, repeat: Infinity }}
        >
          <span className="absolute inset-2 rounded-full border border-cocoa/30" />
          <span className="absolute inset-3.5 rounded-full border border-dashed border-cocoa/25" />
          <span className="flex flex-col items-center">
            <span className="font-script text-3xl leading-none text-cocoa">{coupleMonogram}</span>
            <span className="mt-1 font-ui text-[9px] font-semibold tracking-[0.25em] text-cocoa">TAP TO OPEN</span>
          </span>
        </motion.button>
      </div>

      <p className="absolute bottom-[max(4.5rem,calc(env(safe-area-inset-bottom)+3.5rem))] font-display text-sm italic tracking-wide text-champagne">
        You are cordially invited
      </p>
      <button onClick={onSkip} className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 min-h-11 px-3 font-ui text-[11px] uppercase tracking-[0.25em] text-champagne/80 underline-offset-4 hover:text-ivory hover:underline">
        Skip intro
      </button>
    </motion.div>
  );
}
