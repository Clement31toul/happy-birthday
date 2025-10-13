import { useState, useEffect } from "react";
import ForestScene from "@/components/ForestScene";
import fishIcon from "@/assets/fish.svg";
import carImg from "@/assets/vehicles/car-premium.svg";
import busImg from "@/assets/vehicles/bus-premium.svg";
import taxiImg from "@/assets/vehicles/taxi-premium.svg";
import RedCalendar from "@/components/RedCalendar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DollarSign, Clock, Leaf } from "lucide-react";
import sfx from "@/game/sfx";

interface CalendarRevealProps {
  onComplete: () => void;
  onFishClick: () => void;
  disableVehicles?: boolean;
  showFishArrow?: boolean;
  skipToApril?: boolean;
}

interface VehicleClickHandler {
  onVehicleClick: (vehicle: 'taxi' | 'bus' | 'car') => void;
}

const CalendarReveal = ({ onComplete, onFishClick, disableVehicles = false, showFishArrow = false, skipToApril = false }: CalendarRevealProps & Partial<VehicleClickHandler>) => {
  const handleVehicleClick = (vehicle: 'taxi' | 'bus' | 'car') => {
    if (disableVehicles || selectedTransport) return;
    if (vehicle === 'taxi') {
      setSelectedTransport('taxi');
      setMessage('Trop cher !');
      setShowSpeedLines(true);
      sfx.playClick();
      setTimeout(() => setShowSpeedLines(false), 600);
      setTimeout(() => {
        setMessage('');
        setSelectedTransport(null);
      }, 1200);
      return;
    }
    if (vehicle === 'car') {
      setSelectedTransport('car');
      setMessage('💥 Panne !');
      setShowSparks(true);
      sfx.playClick();
      setTimeout(() => setShowSparks(false), 800);
      setTimeout(() => {
        setMessage('');
        setSelectedTransport(null);
      }, 1500);
      return;
    }
    // bus
    sfx.playEngine();
    onComplete();
  };
  const [currentDate, setCurrentDate] = useState("16 Octobre");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);
  const [flipping, setFlipping] = useState<string[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const [showSparks, setShowSparks] = useState(false);

  useEffect(() => {
    if (skipToApril) {
      setCurrentDate("1er Avril");
      setShowDecorations(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsAnimating(true);
      animateToAprilFirst();
    }, 1000);
    return () => clearTimeout(timer);
  }, [skipToApril]);

  const animateToAprilFirst = () => {
    const dates = [
      "16 Octobre", "20 Octobre", "1 Novembre", "15 Novembre", "1 Décembre",
      "15 Décembre", "1 Janvier", "15 Janvier", "1 Février", "15 Février",
      "1 Mars", "10 Mars", "20 Mars", "25 Mars", "28 Mars", "30 Mars", "31 Mars", "1er Avril"
    ];
    
    let index = 0;
    const intervals = [200, 200, 180, 180, 160, 160, 140, 140, 120, 120, 100, 100, 150, 200, 300, 500, 800, 1000];
    
    const animate = () => {
      if (index < dates.length) {
        const nextDate = dates[index];
        // push a page to flip
        setFlipping((prev) => [nextDate, ...prev].slice(0, 6));
        setCurrentDate(nextDate);
        sfx.playFlip();
        
        if (index === dates.length - 1) {
          setShowDecorations(true);
          // Don't auto-proceed; wait for fish click
        } else {
          setTimeout(animate, intervals[index]);
        }
        index++;
      }
    };
    
    animate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-0 relative">
      {showDecorations && (
        <>
          <div className="absolute inset-0 opacity-50">
            <ForestScene width={1600} height={900} />
          </div>
          {/* Animated light rays */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 right-40 w-2 h-96 bg-gradient-to-b from-yellow-200/40 to-transparent rotate-12 animate-pulse" style={{ animationDuration: '3s' }} />
            <div className="absolute top-32 right-60 w-2 h-80 bg-gradient-to-b from-yellow-200/30 to-transparent rotate-6 animate-pulse" style={{ animationDuration: '3.5s' }} />
          </div>
          {/* Fish (click to proceed) */}
          <img
            src={fishIcon}
            alt="Fish"
            className="absolute top-[65%] left-[25%] w-16 h-16 cursor-pointer opacity-80 hover:opacity-100 transition-all animate-wiggle z-50"
            onClick={() => { sfx.playWater(); onFishClick(); }}
            style={{ filter: 'drop-shadow(0 4px 12px rgba(59,130,246,0.8))' }}
          />
          {/* Animated hint arrow pointing to fish */}
          {showFishArrow && (
            <div className="absolute z-40 animate-bounce" style={{ top: '52%', left: '23%', transform: 'translate(-50%, -50%)' }}>
              <svg
                width="160" height="160" viewBox="0 0 160 160"
                className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
              >
                <defs>
                  <linearGradient id="arrowGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24"/>
                    <stop offset="100%" stopColor="#f59e0b"/>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {/* Curved arrow path pointing more directly down-right */}
                <path 
                  d="M40 30 Q 60 70, 85 110" 
                  stroke="url(#arrowGrad)" 
                  strokeWidth="10" 
                  fill="none" 
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
                {/* Large arrow head pointing to fish */}
                <polygon 
                  points="75,105 95,125 85,130 65,110" 
                  fill="url(#arrowGrad)"
                  filter="url(#glow)"
                />
              </svg>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-2xl font-bold text-amber-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-pulse">
                  Clique ici ! ⬇
                </span>
              </div>
            </div>
          )}
          <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6">
            <div className="text-right mb-4 mr-8">
              <p className="text-2xl font-bold text-foreground drop-shadow-lg bg-white/80 px-6 py-3 rounded-lg">
                Par quel moyen allons-nous nous y rendre ?
              </p>
              {message && (
                <div className="mt-3 inline-block bg-white/70 backdrop-blur border rounded-lg px-3 py-2 text-sm font-semibold text-foreground shadow">
                  {message}
                </div>
              )}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="relative cursor-pointer group animate-float" 
                  style={{ animationDelay: '0s', animationDuration: '4s' }}
                  onClick={() => handleVehicleClick('taxi')}
                >
                  <img src={taxiImg} alt="Taxi" className={`w-[280px] h-auto drop-shadow-2xl ${selectedTransport === 'taxi' ? 'animate-slide-out-right' : disableVehicles ? '' : 'group-hover:scale-110 transition-all duration-300'} ${disableVehicles ? 'opacity-90 pointer-events-none' : ''} group-hover:drop-shadow-[0_10px_40px_rgba(251,191,36,0.6)]`} />
                  {showSpeedLines && (
                    <div className="pointer-events-none absolute inset-y-0 left-2 right-0 flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="speed-line" style={{ animationDelay: `${i * 60}ms` }} />
                      ))}
                    </div>
                  )}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur border shadow-lg rounded-xl px-3 py-2 text-sm text-black w-[180px] hidden group-hover:flex flex-col gap-1">
                    <div className="font-semibold">Taxi</div>
                    <div className="flex items-center gap-2 text-red-600"><DollarSign className="w-4 h-4" />Trop cher (~45€)</div>
                    <div className="flex items-center gap-2 text-neutral-800"><Clock className="w-4 h-4" />Rapide (~15 min)</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[220px]">
                <div className="space-y-1">
                  <div className="font-semibold">Taxi</div>
                  <div className="text-red-600">Coût élevé (~45–60€ selon trafic).</div>
                  <div className="text-neutral-800">Rapide (~15–20 min).</div>
                </div>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="relative cursor-pointer group animate-float" 
                  style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}
                  onClick={() => handleVehicleClick('bus')}
                >
                  <img src={busImg} alt="Bus" className={`w-[300px] h-auto drop-shadow-2xl ${disableVehicles ? '' : 'group-hover:scale-110 transition-all duration-300'} ${disableVehicles ? 'opacity-90 pointer-events-none' : ''} group-hover:drop-shadow-[0_10px_40px_rgba(249,115,22,0.6)]`} />
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur border shadow-lg rounded-xl px-3 py-2 text-sm text-black w-[200px] hidden group-hover:flex flex-col gap-1">
                    <div className="font-semibold">Bus (recommandé)</div>
                    <div className="flex items-center gap-2 text-emerald-700"><Leaf className="w-4 h-4" />Bas CO₂</div>
                    <div className="flex items-center gap-2 text-neutral-800"><Clock className="w-4 h-4" />~20 min</div>
                    <div className="flex items-center gap-2 text-emerald-700"><DollarSign className="w-4 h-4" />~2€</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[220px]">
                <div className="space-y-1">
                  <div className="font-semibold">Bus</div>
                  <div className="text-emerald-700">Économique (~2–3€) et écolo.</div>
                  <div className="text-neutral-800">~20–25 min, direct.</div>
                </div>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="relative cursor-pointer group animate-float" 
                  style={{ animationDelay: '1s', animationDuration: '4.2s' }}
                  onClick={() => handleVehicleClick('car')}
                >
                  <img src={carImg} alt="Voiture" className={`w-[280px] h-auto drop-shadow-2xl ${selectedTransport === 'car' ? 'animate-shake' : disableVehicles ? '' : 'group-hover:scale-110 transition-all duration-300'} ${disableVehicles ? 'opacity-90 pointer-events-none' : ''} group-hover:drop-shadow-[0_10px_40px_rgba(59,130,246,0.6)]`} />
                  {showSparks && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="spark absolute"
                          style={{
                            top: `calc(50% + ${(Math.random() * 16 - 8).toFixed(0)}px)`,
                            left: `calc(50% + ${(Math.random() * 16 - 8).toFixed(0)}px)`,
                            // @ts-ignore
                            "--sx": `${(8 + Math.random() * 14).toFixed(0)}px`,
                            // @ts-ignore
                            "--sy": `${(-12 - Math.random() * 10).toFixed(0)}px`,
                          } as any}
                        />
                      ))}
                    </div>
                  )}
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur border shadow-lg rounded-xl px-3 py-2 text-sm text-black w-[200px] hidden group-hover:flex flex-col gap-1">
                    <div className="font-semibold">Voiture</div>
                    <div className="flex items-center gap-2 text-neutral-800"><Clock className="w-4 h-4" />~35 min</div>
                    <div className="flex items-center gap-2 text-red-600"><DollarSign className="w-4 h-4" />Parking cher</div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[220px]">
                <div className="space-y-1">
                  <div className="font-semibold">Voiture</div>
                  <div>~30–40 min selon trafic.</div>
                  <div className="text-red-600">Parking compliqué et payant.</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </>
      )}
      
      <div className="relative w-full max-w-5xl">
        <div className="relative h-[460px] flex items-center justify-center">
          <RedCalendar current={currentDate} flipping={flipping} />
        </div>
      </div>
    </div>
  );
};

export default CalendarReveal;
