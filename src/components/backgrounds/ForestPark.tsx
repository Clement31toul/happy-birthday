import { memo, useMemo } from "react";

interface ForestParkProps {
  parallax?: boolean;
}

function ForestPark({ parallax = true }: ForestParkProps) {
  // Slight randomization to avoid looking too uniform
  const trees = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    x: Math.random() * 100,
    y: 48 + Math.random() * 12,
    s: 0.8 + Math.random() * 0.8,
    d: i % 3,
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-300" />

      {/* Far hills */}
      <div className="absolute bottom-[32%] left-0 right-0 h-32 bg-gradient-to-b from-emerald-300/70 to-emerald-400/60 rounded-t-[50%] translate-y-6" />

      {/* Ferris wheel silhouette (top-right) */}
      <div className="absolute bottom-[40%] right-[6%] w-44 h-44 rounded-full border-4 border-emerald-800/30" />
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute" style={{
          bottom: '40%', right: '6%',
          width: '10px', height: '10px',
          transformOrigin: '88px 88px',
          transform: `translate(88px,88px) rotate(${(i*45)}deg) translate(88px,0)`,
          borderRadius: '9999px', background: 'rgba(20,83,45,0.35)'
        }} />
      ))}

      {/* Carousel (top-left) */}
      <div className="absolute bottom-[40%] left-[6%] w-[200px] h-[120px]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160px] h-[70px] bg-rose-200/80 rounded-b-xl border border-rose-300 shadow" />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[190px] h-[80px] bg-rose-600/80 [clip-path:polygon(50%_0,100%_70%,0_70%)] shadow" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute bottom-2" style={{ left: `${20 + i*26}px` }}>
            <div className="w-1 h-10 bg-rose-700/70 mx-auto" />
            <div className="w-6 h-6 bg-yellow-200/80 rounded-full mx-auto -mt-1" />
          </div>
        ))}
      </div>

      {/* Rollercoaster (top center) */}
      <div className="absolute bottom-[42%] left-[28%] right-[28%] h-20">
        <div className="absolute inset-x-0 bottom-0 h-2 bg-emerald-900/50 rounded-full" />
        {[...Array(7)].map((_, i) => (
          <div key={i} className="absolute bottom-2 w-1 bg-emerald-900/50" style={{ left: `${i*12+6}%`, height: `${20 + (i%2)*10}px` }} />
        ))}
        {/* cart */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-5 bg-emerald-800/70 rounded-sm" />
      </div>

      {/* Midground chalet */}
      <div className="absolute bottom-[28%] left-[10%] w-[220px] h-[120px]">
        <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-amber-200 rounded-b-lg border border-amber-300 shadow" />
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[260px] h-[80px] bg-amber-700 rotate-0 [clip-path:polygon(50%_0,100%_60%,0_60%)] shadow" />
        <div className="absolute bottom-4 left-6 w-10 h-14 bg-slate-900/80 rounded-sm" />
        <div className="absolute bottom-10 left-24 w-14 h-10 bg-sky-100/70 rounded-sm border border-white/50" />
      </div>

      {/* Trees */}
      {trees.map((t, i) => (
        <div key={i} className="absolute" style={{ left: `${t.x}%`, top: `${t.y}%`, transform: `scale(${t.s})` }}>
          <div className="relative w-0 h-0" style={{ borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderBottom: '28px solid rgba(16,94,50,0.9)' }} />
          <div className="relative w-0 h-0 -mt-1" style={{ borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderBottom: '32px solid rgba(16,94,50,0.9)' }} />
          <div className="relative w-2 h-6 bg-amber-800 mx-auto -mt-1 rounded-sm" />
        </div>
      ))}

      {/* People silhouettes (more density) */}
      {[...Array(14)].map((_, p) => (
        <div key={p} className="absolute bottom-[28%]" style={{ left: `${8 + p*6}%` }}>
          <div className="w-4 h-4 rounded-full bg-emerald-900/45 mx-auto" />
          <div className="w-3 h-7 bg-emerald-900/45 mx-auto rounded-sm" />
        </div>
      ))}

      {/* Fountains */}
      {[0,1].map((i) => (
        <div key={i} className="absolute" style={{ bottom: '28%', left: `${20 + i*24}%` }}>
          <div className="relative w-28 h-10 rounded-full bg-sky-200/50 border border-white/50 shadow" />
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-2 h-8 bg-sky-200/70 rounded-full animate-fountain-jet" />
          <div className="absolute -top-7 left-[40%] w-1.5 h-6 bg-sky-200/70 rounded-full animate-fountain-jet delay-100" />
          <div className="absolute -top-7 left-[60%] w-1.5 h-6 bg-sky-200/70 rounded-full animate-fountain-jet delay-200" />
        </div>
      ))}

      {/* Ground */}
      <div className="absolute left-0 right-0 bottom-0 h-[30%] bg-gradient-to-t from-emerald-800 to-emerald-600" />
      {/* Path */}
      <div className="absolute left-[8%] right-[8%] bottom-[10%] h-10 rounded-full bg-amber-200/50" />
    </div>
  );
}

export default memo(ForestPark);
