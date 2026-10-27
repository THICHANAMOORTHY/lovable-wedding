import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Eye, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { wedding } from "@/data/weddingDetails";

const SIZE = 760;

export function ScratchDate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previous = useRef<{ x: number; y: number } | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const tokens = getComputedStyle(document.documentElement);
    const gold = tokens.getPropertyValue("--gold").trim();
    const champagne = tokens.getPropertyValue("--champagne").trim();
    const cocoa = tokens.getPropertyValue("--cocoa").trim();
    const gradient = ctx.createLinearGradient(0, 0, SIZE, SIZE);
    gradient.addColorStop(0, gold);
    gradient.addColorStop(0.45, champagne);
    gradient.addColorStop(1, gold);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.fillStyle = cocoa;
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < 9000; i++) {
      ctx.fillRect((i * 137.51) % SIZE, (i * 73.39) % SIZE, 1.5, 1.5);
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.fillStyle = cocoa;
    ctx.font = "italic 48px Georgia, serif";
    ctx.fillText("Our forever", SIZE / 2, 310);
    ctx.fillText("begins here", SIZE / 2, 370);
    ctx.font = "28px Georgia, serif";
    ctx.fillText("♡", SIZE / 2, 445);
  }, []);

  const scratch = (event: PointerEvent<HTMLCanvasElement>) => {
    const ctx = event.currentTarget.getContext("2d");
    if (!ctx || !previous.current || revealed) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const point = { x: (event.clientX - bounds.left) / bounds.width * SIZE, y: (event.clientY - bounds.top) / bounds.height * SIZE };
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 76;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(previous.current.x, previous.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    previous.current = point;
  };

  const finishScratch = () => {
    previous.current = null;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || revealed) return;
    // Measure only the central date area, excluding the heart's empty corners.
    const pixels = ctx.getImageData(190, 220, 380, 300).data;
    let erased = 0;
    let sampled = 0;
    for (let i = 3; i < pixels.length; i += 64) {
      sampled++;
      if ((pixels[i] ?? 255) < 128) erased++;
    }
    if (erased / sampled >= 0.45) setRevealed(true);
  };

  return (
    <div className="mx-auto w-[min(86vw,380px)] select-none">
      <div className="relative aspect-square">
        <svg viewBox="0 0 200 190" className="absolute inset-0 h-full w-full text-gold" aria-hidden="true">
          <defs>
            <clipPath id="scratch-heart" clipPathUnits="objectBoundingBox">
              <path d="M.5 .937 C.2 .711 .04 .526 .04 .316 C.04 .158 .16 .053 .29 .053 C.39 .053 .46 .116 .5 .2 C.54 .116 .61 .053 .71 .053 C.84 .053 .96 .158 .96 .316 C.96 .526 .8 .711 .5 .937Z" />
            </clipPath>
          </defs>
          <path d="M100 178 C40 135 8 100 8 60 C8 30 32 10 58 10 C78 10 92 22 100 38 C108 22 122 10 142 10 C168 10 192 30 192 60 C192 100 160 135 100 178Z" className="fill-ivory" stroke="currentColor" strokeWidth="1.5" />
          <path d="M100 168 C46 128 17 97 17 61 C17 35 37 19 59 19 C77 19 90 30 100 47 C110 30 123 19 141 19 C163 19 183 35 183 61 C183 97 154 128 100 168Z" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
        </svg>
        <div aria-hidden={!revealed} className="relative flex h-full flex-col items-center justify-center pb-10">
          <p className="font-ui text-[10px] uppercase tracking-[0.3em] text-sage">{wedding.dayName}</p>
          <p className="font-display text-7xl font-medium leading-none text-olive">{wedding.dateLabel.split(" ")[0]}</p>
          <p className="font-formal text-lg text-cocoa">{wedding.dateLabel.split(" ").slice(1).join(" ")}</p>
          <p className="mt-2 font-display text-sm italic text-cocoa/80">{wedding.timeLabel}</p>
        </div>
        <canvas ref={canvasRef} width={SIZE} height={SIZE} aria-label="Scratch away the gold heart to reveal the wedding date" aria-hidden={revealed}
          className={`absolute inset-0 h-full w-full touch-none cursor-crosshair transition-opacity duration-700 motion-reduce:transition-none ${revealed ? "pointer-events-none opacity-0" : "opacity-100"}`}
          style={{ clipPath: "url(#scratch-heart)" }}
          onPointerDown={(event) => {
            if (event.button !== 0 || revealed) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            const bounds = event.currentTarget.getBoundingClientRect();
            previous.current = { x: (event.clientX - bounds.left) / bounds.width * SIZE, y: (event.clientY - bounds.top) / bounds.height * SIZE };
            scratch(event);
          }}
          onPointerMove={scratch} onPointerUp={finishScratch} onPointerCancel={finishScratch} onLostPointerCapture={finishScratch} />
      </div>
      <div className="flex h-11 items-center justify-center">
        {revealed ? <Heart aria-hidden="true" className="h-4 w-4 text-champagne" /> : (
          <>
            <Button variant="ghost" size="icon" title="Reveal wedding date" aria-label="Reveal wedding date" onClick={() => setRevealed(true)} className="text-champagne hover:bg-ivory/10 hover:text-ivory"><Eye /></Button>
            <p className="ml-1 font-ui text-[10px] uppercase tracking-[0.25em] text-champagne">Scratch the heart to reveal the date</p>
          </>
        )}
      </div>
      <p role="status" className="sr-only">{revealed ? `${wedding.fullDateLabel}, ${wedding.timeLabel}` : "Wedding date concealed beneath a scratchable gold heart."}</p>
    </div>
  );
}