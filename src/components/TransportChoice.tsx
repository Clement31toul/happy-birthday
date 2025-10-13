import { useState } from "react";
import carImg from "@/assets/vehicles/car-premium.svg";
import busImg from "@/assets/vehicles/bus-premium.svg";
import taxiImg from "@/assets/vehicles/taxi-premium.svg";
import busDriver from "@/assets/characters/bus-driver.svg";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DollarSign, Clock, Leaf, Wrench } from "lucide-react";
import DialogueBox from "@/components/ui/DialogueBox";
import Character from "@/components/characters/Character";
import sfx from "@/game/sfx";

interface TransportChoiceProps {
  onBusSelected: () => void;
}

const TransportChoice = ({ onBusSelected }: TransportChoiceProps) => {
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [showSpeedLines, setShowSpeedLines] = useState(false);
  const [showSparks, setShowSparks] = useState(false);

  const handleTaxiClick = () => {
    setSelectedTransport("taxi");
    setMessage("Trop cher !");
    setShowSpeedLines(true);
    sfx.playClick();
    setTimeout(() => setShowSpeedLines(false), 600);
    setTimeout(() => {
      setMessage("");
      setSelectedTransport(null);
    }, 1200);
  };

  const handleCarClick = () => {
    setSelectedTransport("car");
    setMessage("💥 Panne !");
    setShowSparks(true);
    sfx.playClick();
    setTimeout(() => setShowSparks(false), 800);
    setTimeout(() => {
      setMessage("");
      setSelectedTransport(null);
    }, 1500);
  };

  const handleBusClick = () => {
    setSelectedTransport("bus");
    setMessage("👨‍✈️ Montez, je vous emmène ! Où allons-nous ?");
    sfx.playEngine();
    setTimeout(onBusSelected, 1800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-5xl p-8">
        <div className="grid grid-cols-5 gap-6 items-center">
          <div className="col-span-3">
            <h2 className="text-4xl font-bold text-left text-foreground mb-6">
              Que prenons-nous ?
            </h2>
            {message && (
              <div className="text-left inline-flex">
                <DialogueBox speaker={selectedTransport === "bus" ? "Chauffeur" : undefined}>
                  {message}
                </DialogueBox>
              </div>
            )}
          </div>

          <div className="col-span-2 flex flex-col items-end gap-8">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group relative w-[280px] h-[130px] overflow-visible cursor-pointer" onClick={handleTaxiClick} style={{ cursor: selectedTransport ? "default" : "pointer" }}>
                  <img src={taxiImg} alt="Taxi" className={`w-full h-auto drop-shadow-2xl ${selectedTransport === "taxi" ? "animate-slide-out-right" : "group-hover:scale-[1.03] transition-transform"}`} />
                  <div className="absolute -top-3 left-2 rounded-lg bg-white/70 backdrop-blur px-3 py-1 text-xs font-semibold text-red-700 shadow">Taxi • Trop cher</div>
                  {showSpeedLines && (
                    <div className="pointer-events-none absolute inset-y-0 left-2 right-0 flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="speed-line" style={{ animationDelay: `${i * 60}ms` }} />
                      ))}
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[220px]">
                <div className="space-y-1">
                  <div className="font-semibold">Taxi</div>
                  <div className="flex items-center gap-2 text-red-600"><DollarSign className="w-4 h-4" />Coût élevé (~45–60€)</div>
                  <div className="flex items-center gap-2 text-neutral-800"><Clock className="w-4 h-4" />Rapide (~15–20 min)</div>
                </div>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group relative w-[300px] h-[150px] overflow-visible" onClick={handleBusClick} style={{ cursor: selectedTransport ? "default" : "pointer" }}>
                  <img src={busImg} alt="Bus" className={`w-full h-auto drop-shadow-2xl ${selectedTransport === "bus" ? "scale-105" : "group-hover:scale-[1.03] transition-transform"}`} />
                  <div className="absolute -top-3 left-2 rounded-lg bg-white/70 backdrop-blur px-3 py-1 text-xs font-semibold text-emerald-700 shadow">Bus • Recommandé</div>
                  {selectedTransport === "bus" && (
                    <div className="absolute -left-24 -top-4 flex items-end gap-2">
                      <Character src={busDriver} alt="Chauffeur" width={96} className="animate-fade-in" />
                      <div className="pointer-events-none">
                        <DialogueBox speaker="Chauffeur" align="left">Montez, je vous emmène ! Où allons-nous ?</DialogueBox>
                      </div>
                    </div>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[240px]">
                <div className="space-y-1">
                  <div className="font-semibold">Bus</div>
                  <div className="flex items-center gap-2 text-emerald-700"><Leaf className="w-4 h-4" />Écolo, bas CO₂</div>
                  <div className="flex items-center gap-2 text-neutral-800"><Clock className="w-4 h-4" />~20–25 min</div>
                  <div className="flex items-center gap-2 text-emerald-700"><DollarSign className="w-4 h-4" />~2–3€</div>
                </div>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="group relative w-[280px] h-[130px] overflow-visible" onClick={handleCarClick} style={{ cursor: selectedTransport ? "default" : "pointer" }}>
                  <img src={carImg} alt="Voiture" className={`w-full h-auto drop-shadow-2xl ${selectedTransport === "car" ? "animate-shake" : "group-hover:scale-[1.03] transition-transform"}`} />
                  <div className="absolute -top-3 left-2 rounded-lg bg-white/70 backdrop-blur px-3 py-1 text-xs font-semibold text-amber-700 shadow">Voiture • Parking cher</div>
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
                </div>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[240px]">
                <div className="space-y-1">
                  <div className="font-semibold">Voiture</div>
                  <div className="flex items-center gap-2 text-neutral-800"><Clock className="w-4 h-4" />~30–40 min</div>
                  <div className="flex items-center gap-2 text-red-600"><DollarSign className="w-4 h-4" />Parking cher</div>
                  <div className="flex items-center gap-2 text-amber-700"><Wrench className="w-4 h-4" />Imprévus possibles</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportChoice;
