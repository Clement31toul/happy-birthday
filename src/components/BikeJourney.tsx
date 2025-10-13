import { useEffect } from "react";
import bikePremium from "@/assets/vehicles/bike-premium.svg";

interface BikeJourneyProps {
  onComplete: () => void;
}

const DURATION = 15000; // 15s

const BikeJourney = ({ onComplete }: BikeJourneyProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, DURATION);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-sky-300" />

      {/* Far trees (slow) */}
      <div className="absolute bottom-[38%] left-0 right-0 h-28 opacity-80">
        <div className="w-[200%] h-full animate-scroll-x-24 flex">
          {[0,1].map((k) => (
            <div key={k} className="w-1/2 h-full relative">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="absolute bottom-0" style={{ left: `${i*7}%`, transform: 'scale(0.9)' }}>
                  <div className="w-0 h-0" style={{ borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderBottom: '22px solid rgba(16,94,50,0.9)' }} />
                  <div className="w-0 h-0 -mt-1" style={{ borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderBottom: '26px solid rgba(16,94,50,0.9)' }} />
                  <div className="w-2 h-6 bg-amber-800 mx-auto -mt-1 rounded-sm" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-emerald-800 to-emerald-600" />

      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-[28%] bg-neutral-900">
        {/* Center dashed line */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-[length:80px_4px] bg-repeat-x animate-road-move" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.95) 40px, transparent 40px)' }} />
      </div>

      {/* Tulips borders (fast) */}
      <div className="absolute bottom-[20%] left-0 right-0 h-10">
        <div className="w-[200%] h-full animate-scroll-x-12 flex">
          {[0,1].map((k) => (
            <div key={k} className="w-1/2 h-full relative">
              {[...Array(22)].map((_, i) => (
                <div key={i} className="absolute bottom-0" style={{ left: `${i*5}%` }}>
                  <div className="w-1 h-5 bg-emerald-900 mx-auto" />
                  <div className="w-2 h-2 rounded-full bg-rose-400 mx-auto -mt-1" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bikes moving */}
      {[0,1,2,3].map((i) => (
        <div key={i} className="absolute bottom-[12%]" style={{ left: `${-20 - i*15}%`, animation: `bike-move ${8 + i*1.5}s linear infinite`, animationDelay: `${i*0.7}s` as any }}>
          <img src={bikePremium} alt="Vélo" className="w-[120px] h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
        </div>
      ))}

      {/* Title overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <div className="px-6 py-3 rounded-xl bg-white/70 backdrop-blur border border-white/50 shadow">
          <p className="text-xl font-semibold text-foreground">Balade à vélo parmi les tulipes…</p>
        </div>
      </div>
    </div>
  );
};

export default BikeJourney;
