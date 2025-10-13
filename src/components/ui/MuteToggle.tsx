import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import sfx from "@/game/sfx";

export default function MuteToggle() {
  const [muted, setMuted] = useState(false);
  const toggle = () => {
    const next = !muted;
    setMuted(next);
    sfx.setMuted(next);
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? "Activer le son" : "Couper le son"}
      className="fixed bottom-4 right-4 z-[60] h-11 w-11 rounded-full bg-white/70 backdrop-blur border border-white/40 shadow-lg grid place-items-center hover:bg-white/85 transition"
    >
      {muted ? <VolumeX className="h-5 w-5 text-foreground" /> : <Volume2 className="h-5 w-5 text-foreground" />}
    </button>
  );
}
