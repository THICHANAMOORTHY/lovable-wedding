import portrait from "@/assets/couple-portrait.png.asset.json";
import portraitImage from "@/assets/couple-portrait.png";
import { wedding } from "@/data/weddingDetails";
import { Divider, Eyebrow, Reveal } from "./Ornaments";

export function CouplePortrait() {
  return (
    <section aria-labelledby="couple-portrait-heading" className="bg-paper px-5 py-16 text-center sm:py-24">
      <Reveal>
        <Eyebrow>Together Forever</Eyebrow>
        <h2 id="couple-portrait-heading" className="mt-5 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-1 font-script text-5xl leading-tight text-olive sm:text-6xl">
          <span>{wedding.groom}</span>
          <span className="font-display text-3xl italic text-gold">&amp;</span>
          <span>{wedding.bride}</span>
        </h2>
        <Divider className="my-7" />
      </Reveal>
      <Reveal delay={0.15} className="mx-auto max-w-lg">
        <img src={portraitImage || portrait.url} alt={`Illustrated portrait of ${wedding.groom} and ${wedding.bride}`} width={768} height={1152} loading="lazy" className="h-auto w-full rounded-sm shadow-soft" />
      </Reveal>
    </section>
  );
}