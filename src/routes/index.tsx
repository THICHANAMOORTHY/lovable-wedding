import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { OpeningCurtains } from "@/components/OpeningCurtains";
import { WeddingStage } from "@/components/WeddingStage";
import { InvitationMessage, CoupleIntroduction, SaveTheDate, WeddingDetails, FinalReveal } from "@/components/Sections";
import { CouplePortrait } from "@/components/CouplePortrait";
import { coupleNames } from "@/data/weddingDetails";
import { MusicToggle } from "@/components/MusicToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${coupleNames} — Holy Matrimony · 15 Nov 2026` },
      { name: "description", content: `You are invited to the wedding of ${coupleNames} — Reception on Saturday 14 November 2026 at M.D.J. Mahal, Purathakudi, and Holy Matrimony on Sunday 15 November 2026 at Punitha Thomaiyar Aalayam, South Irungalur.` },
      { property: "og:title", content: `${coupleNames} — Wedding Invitation` },
      { property: "og:description", content: "Reception: Sat 14 Nov 2026 · M.D.J. Mahal, Purathakudi. Holy Matrimony: Sun 15 Nov 2026 · 8:30 AM · Punitha Thomaiyar Aalayam, South Irungalur." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Phase = "envelope" | "curtains" | "done";

function Index() {
  const [phase, setPhase] = useState<Phase>("envelope");
  const [run, setRun] = useState(0);

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    setRun((r) => r + 1);
    setPhase("envelope");
  };

  return (
    <MotionConfig reducedMotion="user">
      <MusicToggle />
      <AnimatePresence>
        {phase === "envelope" && (
          <EnvelopeIntro key={`env-${run}`} onOpened={() => setPhase("curtains")} onSkip={() => setPhase("done")} />
        )}
      </AnimatePresence>
      {phase === "curtains" && <OpeningCurtains onDone={() => setPhase("done")} />}
      {phase !== "envelope" && (
        <main key={`main-${run}`} className="overflow-x-hidden">
          <WeddingStage play={phase === "curtains"} />
          <InvitationMessage />
          <CoupleIntroduction />
          <CouplePortrait />
          <SaveTheDate />
          <WeddingDetails />
          <FinalReveal onReplay={replay} />
        </main>
      )}
    </MotionConfig>
  );
}
