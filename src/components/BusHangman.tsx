import { useEffect } from "react";
import HangmanGame from "@/components/HangmanGame";
import Character from "@/components/characters/Character";
import DialogueBox from "@/components/ui/DialogueBox";
import busDriver from "@/assets/characters/bus-driver.svg";
import sfx from "@/game/sfx";
import BusInterior from "@/components/backgrounds/BusInterior";
import { Volume2 } from "lucide-react";

interface BusHangmanProps {
  onComplete: () => void;
  onFail: () => void;
}

export default function BusHangman({ onComplete, onFail }: BusHangmanProps) {
  useEffect(() => {
    sfx.speak("Où allons-nous ?", "fr-FR");
    return () => sfx.stopSpeak();
  }, []);
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Premium Bus Interior with parallax */}
      <BusInterior />

      {/* Driver + line */}
      <div className="absolute top-[20%] left-10 z-20 flex items-end gap-3">
        <Character src={busDriver} alt="Chauffeur" width={120} />
        <div className="flex items-center gap-2">
          <DialogueBox speaker="Chauffeur">Où allons-nous ?</DialogueBox>
          <button
            type="button"
            onClick={() => sfx.speak("Où allons-nous ?", "fr-FR")}
            className="ml-1 h-9 w-9 rounded-full bg-white/70 backdrop-blur border border-white/40 shadow grid place-items-center hover:bg-white/85"
            aria-label="Répéter la phrase"
            title="Répéter la phrase"
          >
            <Volume2 className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Hangman UI center */}
      <div className="relative z-10">
        <HangmanGame frameless onComplete={onComplete} onFail={onFail} />
      </div>
    </div>
  );
}
