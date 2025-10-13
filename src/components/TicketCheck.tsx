import { useState } from "react";
import { Ticket, Calendar } from "lucide-react";
import fishIcon from "@/assets/fish.svg";
import ticketLady from "@/assets/characters/ticket-lady.svg";
import DialogueBox from "@/components/ui/DialogueBox";
import Character from "@/components/characters/Character";
import ForestPark from "@/components/backgrounds/ForestPark";
import sfx from "@/game/sfx";

interface TicketCheckProps {
  onTicketsScanned: () => void;
}

const TicketCheck = ({ onTicketsScanned }: TicketCheckProps) => {
  const [ticketsFound, setTicketsFound] = useState<number>(0);
  const [showInvalid, setShowInvalid] = useState(false);
  const [fishReady, setFishReady] = useState(false);

  const handleHiddenTicketClick = (index: number) => {
    sfx.playClick();
    if (index === 1 && ticketsFound < 1) {
      setTicketsFound(1);
    }
    if (index === 2 && ticketsFound === 1) {
      setTicketsFound(2);
      // Show brief invalid overlay, then proceed to calendar return
      setShowInvalid(true);
      setTimeout(() => {
        onTicketsScanned();
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Ticket Lady + Dialogue */}
      <div className="absolute top-8 left-10 flex items-end gap-4 z-20">
        <Character src={ticketLady} alt="Contrôleuse" width={96} className="drop-shadow-2xl" />
        <DialogueBox speaker="Contrôleuse">Vos billets s'il vous plaît !</DialogueBox>
      </div>

      {/* Scene area with illustrated background */}
      <div className="absolute inset-0">
        <ForestPark />

        {/* Hidden tickets cleverly placed in the decor */}
        {/* Ticket 1: accolé à la fenêtre du chalet (gauche) */}
        <div
          className={`absolute bottom-[33%] left-[16%] cursor-pointer transition-all ${
            ticketsFound >= 1 ? "opacity-90 scale-110" : "opacity-30 hover:opacity-75"
          }`}
          onClick={() => handleHiddenTicketClick(1)}
          style={{ transform: "translate(-6px, -4px)" }}
        >
          <Ticket className={`w-5 h-5 ${ticketsFound >= 1 ? "text-amber-600" : "text-amber-700/60"}`} />
        </div>

        {/* Ticket 2: dans la grande roue (droite) */}
        <div
          className={`absolute bottom-[35%] right-[9.5%] cursor-pointer transition-all ${
            ticketsFound >= 2 ? "opacity-90 scale-110" : ticketsFound === 1 ? "opacity-30 hover:opacity-75" : "opacity-20"}
          }`}
          onClick={() => handleHiddenTicketClick(2)}
          style={{ transform: "translate(-12px, 10px)" }}
        >
          <Ticket className={`w-5 h-5 ${ticketsFound >= 2 ? "text-emerald-700" : "text-emerald-800/60"}`} />
        </div>

        {/* Invalid overlay */}
        {showInvalid && (
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="px-6 py-4 rounded-xl bg-white/90 backdrop-blur border border-white/60 shadow-strong animate-fade-in text-xl font-semibold text-foreground">
              ❌ Les billets ne sont pas valides.
            </div>
          </div>
        )}
      </div>

      {/* Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-foreground/90 bg-white/30 backdrop-blur px-3 py-1 rounded-lg border border-white/40 shadow-md z-20">
        Trouvez les 2 billets cachés dans la scène.
      </div>
    </div>
  );
}

export default TicketCheck;
