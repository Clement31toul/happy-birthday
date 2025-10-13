import { useState, useCallback } from "react";

interface BusInteriorProps {
  onParallaxChange?: (px: number, py: number) => void;
}

export default function BusInterior({ onParallaxChange }: BusInteriorProps) {
  const [p, setP] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const rx = (e.clientX - rect.left) / rect.width; // 0..1
    const ry = (e.clientY - rect.top) / rect.height; // 0..1
    const px = (rx - 0.5) * 2; // -1..1
    const py = (ry - 0.5) * 2; // -1..1
    const next = { x: px, y: py };
    setP(next);
    onParallaxChange?.(px, py);
  }, [onParallaxChange]);

  const t = (multX: number, multY = multX) => `translate(${(p.x * multX).toFixed(2)}px, ${(p.y * multY).toFixed(2)}px)`;

  return (
    <div className="absolute inset-0 overflow-hidden" onMouseMove={handleMove}>
      {/* Outside scenery in windshield (parallax slow) */}
      <div className="absolute top-0 left-0 right-0 h-[44%]">
        <div className="absolute inset-0 rounded-b-[96px] bg-gradient-to-b from-sky-200 via-sky-200/80 to-sky-300/30 shadow-[inset_0_-10px_24px_rgba(0,0,0,0.15)]" />
        <div className="absolute inset-0 rounded-b-[96px] overflow-hidden">
          <div className="absolute -top-6 left-1/5 w-24 h-24 rounded-full bg-yellow-200/80" style={{ transform: t(-6, -4) }} />
          <div className="absolute bottom-6 left-0 right-0 h-24 bg-emerald-400/60 rounded-t-[50%]" style={{ transform: t(-8, 0) }} />
          <div className="absolute bottom-4 left-0 right-0 h-24 bg-emerald-500/60 rounded-t-[50%]" style={{ transform: t(-10, 0) }} />
        </div>
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 rounded-md bg-white/70 border border-white/50 shadow" />
      </div>

      {/* Dashboard */}
      <div className="absolute top-[36%] left-0 right-0 h-14 bg-neutral-900/90 shadow-[0_6px_24px_rgba(0,0,0,0.35)]" />
      <div className="absolute top-[36%] left-0 right-0 h-14 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />

      {/* Steering wheel */}
      <div className="absolute top-[30%] left-12" style={{ transform: t(2, 1) }}>
        <div className="w-28 h-28 rounded-full border-[10px] border-neutral-900/90 shadow-[0_4px_16px_rgba(0,0,0,0.4)]" />
        <div className="absolute top-[34%] left-[34%] w-12 h-12 rounded-full bg-neutral-900/90" />
      </div>

      {/* Aisle */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[46%] bottom-[12%] w-24 bg-gradient-to-b from-neutral-800/80 to-neutral-900/95 rounded-xl border border-white/10" />

      {/* Seat rows (left/right pairs) */}
      {[50, 60, 70, 80].map((top, row) => (
        <div key={row} className="absolute left-0 right-0" style={{ top: `${top}%` }}>
          {/* Left pair */}
          <div className="absolute left-8 w-[30%] h-16 grid grid-cols-2 gap-3" style={{ transform: t(3) }}>
            {[0, 1].map((i) => (
              <div key={i} className="relative rounded-xl border border-white/12 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                <div className="absolute top-0 left-0 right-0 h-4 rounded-t-xl bg-white/8" />
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 rounded-t-full bg-white/20" />
              </div>
            ))}
          </div>
          {/* Right pair */}
          <div className="absolute right-8 w-[30%] h-16 grid grid-cols-2 gap-3" style={{ transform: t(-3) }}>
            {[0, 1].map((i) => (
              <div key={i} className="relative rounded-xl border border-white/12 bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-[0_8px_20px_rgba(0,0,0,0.35)]">
                <div className="absolute top-0 left-0 right-0 h-4 rounded-t-xl bg-white/8" />
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 rounded-t-full bg-white/20" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[12%] bg-gradient-to-t from-neutral-950 to-neutral-900" />
    </div>
  );
}
