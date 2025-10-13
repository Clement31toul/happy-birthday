import { useEffect, useState } from "react";

interface HighwayPOVProps {
  onComplete: () => void;
}

const DURATION = 0; // no auto-advance; user must click a sign

export default function HighwayPOV({ onComplete }: HighwayPOVProps) {
  const [hint, setHint] = useState<string>("");
  useEffect(() => {
    if (!DURATION) return;
    const t = setTimeout(onComplete, DURATION);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-300" />

      {/* Horizon glow */}
      <div className="absolute left-0 right-0 top-[38%] h-32 bg-gradient-to-b from-white/40 to-transparent opacity-70" />

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%]">
        {/* Asphalt */}
        <div className="absolute inset-0 bg-neutral-900" />
        {/* Center dashed line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-[length:80px_4px] bg-repeat-x animate-road-move" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.95) 40px, transparent 40px)' }} />
        {/* Side white lines */}
        <div className="absolute left-4 right-4 top-6 h-1 bg-neutral-700/70" />
        <div className="absolute left-4 right-4 bottom-6 h-1 bg-neutral-700/70" />
      </div>

      {/* Guard rails (parallax) */}
      <div className="absolute bottom-[38%] left-0 right-0 h-10 opacity-80">
        <div className="w-[200%] h-full animate-scroll-x-24 flex">
          {[0,1].map((k) => (
            <div key={k} className="w-1/2 h-full relative">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="absolute top-1/2 -translate-y-1/2 w-8 h-1.5 bg-neutral-500/80" style={{ left: `${i*8}%` }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Fixed overhead gantry with 3 clickable signs */}
      <div className="absolute left-0 right-0 top-[26%]">
        <div className="relative w-full h-20">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-neutral-700/90 shadow" />
          {/* Pillars */}
          <div className="absolute left-[14%] bottom-0 w-2 h-24 bg-neutral-700" />
          <div className="absolute right-[14%] bottom-0 w-2 h-24 bg-neutral-700" />
          {/* Signs */}
          <button
            type="button"
            className="absolute left-[18%] top-0 w-56 h-14 bg-emerald-700 text-white font-bold grid place-items-center rounded-md shadow-md border border-white/10 hover:brightness-110 active:scale-[0.98]"
            onClick={() => { setHint("👨‍👩‍👧 On est trop loin, ça va pas !"); setTimeout(() => setHint(""), 1800); }}
          >PARIS ←</button>
          <button
            type="button"
            className="absolute left-1/2 -translate-x-1/2 top-0 w-56 h-14 bg-sky-700 text-white font-bold grid place-items-center rounded-md shadow-md border border-white/10 hover:brightness-110 active:scale-[0.98]"
            onClick={onComplete}
          >DISNEY ↑</button>
          <button
            type="button"
            className="absolute right-[18%] top-0 w-56 h-14 bg-indigo-700 text-white font-bold grid place-items-center rounded-md shadow-md border border-white/10 hover:brightness-110 active:scale-[0.98]"
            onClick={() => { setHint("🥶 Il fera trop froid en décembre !"); setTimeout(() => setHint(""), 1800); }}
          >→ ST BREVIN</button>
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <div className="px-6 py-3 rounded-xl bg-white/70 backdrop-blur border border-white/50 shadow">
          <p className="text-xl font-semibold text-foreground">Autoroute — vue à la première personne…</p>
        </div>
      </div>

      {/* Hint bubble */}
      {hint && (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur border border-white/60 shadow animate-fade-in text-foreground font-semibold">
            {hint}
          </div>
        </div>
      )}
    </div>
  );
}
