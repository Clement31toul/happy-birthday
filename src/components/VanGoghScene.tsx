import { useEffect } from "react";
import painting from "@/assets/vangogh-starry.svg";

interface VanGoghSceneProps {
  onComplete: () => void;
}

const DURATION = 15000; // 15s display

export default function VanGoghScene({ onComplete }: VanGoghSceneProps) {
  useEffect(() => {
    const t = setTimeout(onComplete, DURATION);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${painting})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="px-5 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-white/60 shadow">
          <p className="text-base font-semibold text-foreground">Un clin d’œil à Van Gogh…</p>
        </div>
      </div>
    </div>
  );
}
