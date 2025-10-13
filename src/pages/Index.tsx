import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ScratchCard from "@/components/ScratchCard";
import CalendarReveal from "@/components/CalendarReveal";
import TransportChoice from "@/components/TransportChoice";
import HangmanGame from "@/components/HangmanGame";
import BusHangman from "@/components/BusHangman";
import BusJourney from "@/components/BusJourney";
import TicketCheck from "@/components/TicketCheck";
// Removed RealTripReveal, BikeJourney, VanGoghScene from the simplified flow
import FinalReveal from "@/components/FinalReveal";
import CalendarRewind from "@/components/CalendarRewind";
// Removed HighwayPOV from the simplified flow
import Scene from "@/components/core/Scene";
import sfx from "@/game/sfx";

type Stage = 
  | "scratch"
  | "calendar"
  | "transport"
  | "hangman"
  | "bus-journey"
  | "ticket-check"
  | "calendar-return"
  | "calendar-rewind"
  | "final-reveal";

const Index = () => {
  const [stage, setStage] = useState<Stage>("scratch");
  const [hasClickedFish, setHasClickedFish] = useState(false);

  const handleNextStage = (nextStage: Stage) => {
    setStage(nextStage);
  };

  const handleFishClick = () => {
    setHasClickedFish(true);
    setStage("calendar-rewind");
  };

  useEffect(() => {
    // Mute all SFX globally per user request
    sfx.setMuted(true);
  }, []);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {stage === "scratch" && (
          <Scene key="scratch">
            <ScratchCard onComplete={() => handleNextStage("calendar")} />
          </Scene>
        )}
        {stage === "calendar" && (
          <Scene key="calendar">
            <CalendarReveal onComplete={() => handleNextStage("hangman")} onFishClick={handleFishClick} />
          </Scene>
        )}
        {stage === "transport" && (
          <Scene key="transport">
            <TransportChoice onBusSelected={() => handleNextStage("hangman")} />
          </Scene>
        )}
        {stage === "hangman" && (
          <Scene key="hangman">
            <BusHangman onComplete={() => handleNextStage("bus-journey")} onFail={() => handleNextStage("bus-journey")} />
          </Scene>
        )}
        {stage === "bus-journey" && (
          <Scene key="bus-journey">
            <BusJourney onComplete={() => handleNextStage("ticket-check")} />
          </Scene>
        )}
        {stage === "ticket-check" && (
          <Scene key="ticket-check">
            <TicketCheck onTicketsScanned={() => handleNextStage("calendar-return")} />
          </Scene>
        )}
        {stage === "calendar-return" && (
          <Scene key="calendar-return">
            <CalendarReveal onComplete={() => {}} onFishClick={handleFishClick} disableVehicles showFishArrow skipToApril />
          </Scene>
        )}
        {stage === "calendar-rewind" && (
          <Scene key="calendar-rewind">
            <CalendarRewind onComplete={() => handleNextStage("final-reveal")} />
          </Scene>
        )}
        
        {stage === "final-reveal" && (
          <Scene key="final-reveal">
            <FinalReveal />
          </Scene>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
