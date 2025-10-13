import { useEffect } from "react";
import busImg from "@/assets/vehicles/bus-premium.svg";

interface BusJourneyProps {
  onComplete: () => void;
}

const DURATION = 6000; // 6s cinematic

const BusJourney = ({ onComplete }: BusJourneyProps) => {
  useEffect(() => {
    const t = setTimeout(() => {
      onComplete();
    }, DURATION);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-300" />

      {/* Clouds layer (slow) */}
      <div className="absolute top-6 left-0 right-0 h-40 opacity-70">
        <div className="w-[200%] h-full animate-scroll-x-30 flex">
          {[0,1].map((k) => (
            <div key={k} className="w-1/2 h-full relative">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute bg-white/80 rounded-full shadow" style={{
                  left: `${i*18+6}%`, top: `${10 + (i%3)*12}%`, width: `${80 - (i%3)*10}px`, height: `${40 - (i%3)*8}px`
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Far mountains (slow-mid) */}
      <div className="absolute bottom-[38%] left-0 right-0 h-32">
        <div className="w-[200%] h-full animate-scroll-x-24 flex">
          {[0,1].map((k) => (
            <div key={k} className="w-1/2 h-full relative">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute bottom-0" style={{ left: `${i*18}%`, width: '140px', height: '100%', background: 'linear-gradient(to top, rgba(16,94,50,0.9), rgba(16,94,50,0.5))', borderTopLeftRadius: '80% 60%', borderTopRightRadius: '80% 60%' }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Trees (fast) */}
      <div className="absolute bottom-[34%] left-0 right-0 h-28">
        <div className="w-[200%] h-full animate-scroll-x-12 flex">
          {[0,1].map((k) => (
            <div key={k} className="w-1/2 h-full relative">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="absolute bottom-0" style={{ left: `${i*7}%`, transform: 'scale(0.9)' }}>
                  <div className="w-0 h-0" style={{ borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderBottom: '26px solid rgba(16,94,50,0.95)' }} />
                  <div className="w-0 h-0 -mt-1" style={{ borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '30px solid rgba(16,94,50,0.95)' }} />
                  <div className="w-2 h-6 bg-amber-800 mx-auto -mt-1 rounded-sm" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[34%] bg-gradient-to-t from-emerald-800 to-emerald-600" />

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-[26%] bg-neutral-900">
        {/* Side borders */}
        <div className="absolute top-2 left-0 right-0 h-2 bg-neutral-700/70" />
        <div className="absolute bottom-2 left-0 right-0 h-2 bg-neutral-700/70" />
        {/* Center dashed line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-[length:80px_4px] bg-repeat-x animate-road-move" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.9) 40px, transparent 40px)' }} />
      </div>

      {/* Bus sprite */}
      <img src={busImg} alt="Bus" className="absolute bottom-[14%] left-[12%] w-[360px] h-auto drop-shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-bus-bob" />

      {/* Overlay title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <div className="px-6 py-3 rounded-xl bg-white/70 backdrop-blur border border-white/50 shadow">
          <p className="text-xl font-semibold text-foreground">Direction Center Parc…</p>
        </div>
      </div>
    </div>
  );
};

export default BusJourney;
