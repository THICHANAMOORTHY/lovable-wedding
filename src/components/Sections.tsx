import { motion } from "framer-motion";
import { CalendarDays, CalendarHeart, Navigation, RotateCcw, Heart } from "lucide-react";
import florals from "@/assets/florals.png";
import { wedding, mapsUrl, receptionMapsUrl } from "@/data/weddingDetails";
import { downloadIcs } from "@/lib/ics";
import { Divider, Eyebrow, Leaf, Reveal } from "./Ornaments";
import { ScratchDate } from "./ScratchDate";

const btn = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 font-ui text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0";
const btnPrimary = `${btn} bg-sage text-ivory hover:bg-olive`;
const btnGold = `${btn} bg-gold-foil text-cocoa`;

export function InvitationMessage() {
  return (
    <section id="invitation" className="relative overflow-hidden bg-paper px-5 py-20 sm:py-28">
      <Leaf className="pointer-events-none absolute -left-8 top-10 w-24 rotate-[-25deg] text-sage opacity-15" />
      <Leaf className="pointer-events-none absolute -right-8 bottom-10 w-24 rotate-[155deg] text-sage opacity-15" />
      <Reveal className="relative mx-auto max-w-xl gold-frame px-6 py-12 text-center sm:px-12">
        <Eyebrow>Together with their families</Eyebrow>
        <h2 className="mt-5 font-display text-3xl font-medium uppercase leading-tight tracking-[0.08em] text-olive sm:text-4xl">
          {wedding.mainHeading}
        </h2>
        <Divider className="my-7" />
        {wedding.invitation.map((t, i) => (
          <Reveal key={i} delay={0.15 * (i + 1)}>
            <p className="mb-5 font-formal text-base leading-relaxed text-cocoa sm:text-lg">“{t}”</p>
          </Reveal>
        ))}
      </Reveal>
    </section>
  );
}

export function CoupleIntroduction() {
  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-20 text-center">
      <Reveal><Eyebrow>The Groom &amp; The Bride</Eyebrow></Reveal>
      <div className="mx-auto mt-10 grid max-w-3xl items-center gap-8 sm:grid-cols-[1fr_auto_1fr]">
        <Reveal delay={0.1}>
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-muted-foreground">The Groom</p>
          <p className="mt-2 font-script text-6xl text-olive">{wedding.groom}</p>
        </Reveal>
        <Reveal delay={0.25} className="flex justify-center">
          <motion.svg viewBox="0 0 120 70" className="h-16 w-28 text-gold" animate={{ rotate: [0, -3, 3, 0] }} transition={{ repeat: Infinity, duration: 6 }} aria-hidden>
            <circle cx="45" cy="38" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
            <circle cx="75" cy="38" r="22" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M45 16 l-5 -8 h10z" fill="currentColor" />
          </motion.svg>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-muted-foreground">The Bride</p>
          <p className="mt-2 font-script text-6xl text-olive">{wedding.bride}</p>
        </Reveal>
      </div>
      <Reveal delay={0.5} className="mt-10 flex items-center justify-center gap-3 text-gold">
        <span className="h-px w-16 bg-gold/60" /><Heart className="h-4 w-4 fill-current" /><span className="h-px w-16 bg-gold/60" />
      </Reveal>
    </section>
  );
}

export function SaveTheDate() {
  return (
    <section className="relative bg-envelope px-5 py-20 text-center sm:py-28">
      <Reveal><p className="font-ui text-[10px] uppercase tracking-[0.35em] text-champagne sm:text-xs">Our Forever Begins</p></Reveal>
      <Reveal delay={0.15} className="mt-8">
        <ScratchDate />
      </Reveal>
      <Reveal delay={0.3} className="mt-8">
        <button onClick={downloadIcs} className={btnGold}><CalendarHeart className="h-4 w-4" />Save the Date</button>
        <p className="mt-2 font-ui text-[11px] text-champagne">Adds both celebrations to your calendar</p>
      </Reveal>
      <Reveal delay={0.45} className="mt-10">
        <p className="font-ui text-[10px] uppercase tracking-[0.35em] text-champagne">Wedding Reception</p>
        <p className="mt-2 font-formal text-base text-ivory">{wedding.events[0].fullDateLabel} · {wedding.events[0].timeLabel}</p>
        <p className="font-formal text-sm text-ivory/90">{wedding.events[0].venue}, {wedding.events[0].location}</p>
      </Reveal>
    </section>
  );
}

export function WeddingDetails() {
  return (
    <section className="bg-paper px-5 py-20 sm:py-28">
      <Reveal className="text-center">
        <Eyebrow>The Celebrations</Eyebrow>
        <h2 className="mt-4 font-display text-4xl text-olive">Wedding Events</h2>
        <Divider className="mt-5" />
      </Reveal>
      <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
        {wedding.events.map((ev, i) => (
          <Reveal key={ev.name} delay={i * 0.12} className="rounded-sm border border-gold/50 bg-ivory p-6 text-center transition-shadow hover:shadow-soft">
            <CalendarDays className="mx-auto h-6 w-6 text-gold" strokeWidth={1.4} />
            <p className="mt-3 font-ui text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{ev.name}</p>
            <p className="mt-2 font-display text-xl text-olive">{ev.fullDateLabel}</p>
            <p className="mt-1 font-formal text-base text-cocoa">{ev.timeLabel}</p>
            <p className="mt-3 font-formal text-base text-cocoa">{ev.venue}</p>
            <p className="font-formal text-sm text-cocoa/80">{ev.location}</p>
            <a href={i === 0 ? receptionMapsUrl : mapsUrl} target="_blank" rel="noopener noreferrer" className={`${btnPrimary} mt-6 px-6`}>
              <Navigation className="h-4 w-4" />Get Directions
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FinalReveal({ onReplay }: { onReplay: () => void }) {
  const petals = Array.from({ length: 12 }, (_, i) => i);
  return (
    <section className="relative overflow-hidden bg-ivory px-5 pb-[max(5rem,env(safe-area-inset-bottom))] pt-16 text-center">
      {petals.map((i) => (
        <motion.span key={i} aria-hidden
          className="pointer-events-none absolute top-0 h-3 w-2 rounded-[60%_0] bg-champagne"
          style={{ left: `${(i * 8.3) % 100}%` }}
          animate={{ y: ["-10vh", "110vh"], rotate: [0, 360], x: [0, i % 2 ? 30 : -30] }}
          transition={{ duration: 9 + (i % 5), repeat: Infinity, delay: i * 0.8, ease: "linear" }} />
      ))}
      <img src={florals} alt="" width={1536} height={640} loading="lazy" className="relative mx-auto w-full max-w-lg" />
      <Reveal className="relative">
        <p className="mx-auto max-w-md font-display text-2xl uppercase leading-snug tracking-[0.12em] text-olive sm:text-3xl">{wedding.closing}</p>
        <Divider className="my-6" />
        <p className="font-script text-5xl text-olive sm:text-6xl">{wedding.groom} &amp; {wedding.bride}</p>
        <p className="mt-3 font-formal tracking-wide text-cocoa">{wedding.dateLabel}</p>
        <button onClick={onReplay} className={`${btnPrimary} mt-10`}><RotateCcw className="h-4 w-4" />Replay Invitation</button>
      </Reveal>
    </section>
  );
}
