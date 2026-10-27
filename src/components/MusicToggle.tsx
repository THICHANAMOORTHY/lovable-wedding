import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { toast } from "sonner";
import { wedding } from "@/data/weddingDetails";

export function MusicToggle() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => ref.current?.pause(), []);

  const toggle = async () => {
    if (!ref.current) {
      ref.current = new Audio(wedding.musicSrc);
      ref.current.loop = true;
      ref.current.volume = 0.5;
    }
    if (playing) { ref.current.pause(); setPlaying(false); return; }
    try { await ref.current.play(); setPlaying(true); }
    catch { toast("Music isn't available right now."); }
  };

  return (
    <button onClick={toggle} aria-pressed={playing} aria-label={playing ? "Mute music" : "Play music"}
      className="fixed right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-[60] grid h-11 w-11 place-items-center rounded-full border border-gold/60 bg-ivory/80 text-olive shadow-soft backdrop-blur transition hover:scale-105">
      {playing ? <Music className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
