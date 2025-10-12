import { useState, useEffect } from "react";
import ScratchCard from "@/components/ScratchCard";
import CalendarReveal from "@/components/CalendarReveal";
import TransportChoice from "@/components/TransportChoice";
import HangmanGame from "@/components/HangmanGame";
import BusJourney from "@/components/BusJourney";
import TicketCheck from "@/components/TicketCheck";
import AprilFoolsReveal from "@/components/AprilFoolsReveal";
import RealTripReveal from "@/components/RealTripReveal";
import BikeJourney from "@/components/BikeJourney";
import IntersectionChoice from "@/components/IntersectionChoice";
import DisneyToTrain from "@/components/DisneyToTrain";
import TrainScene from "@/components/TrainScene";
import FinalReveal from "@/components/FinalReveal";

type Stage = 
  | "scratch"
  | "calendar"
  | "transport"
  | "hangman"
  | "bus-journey"
  | "ticket-check"
  | "april-fools"
  | "real-trip"
  | "bike-journey"
  | "intersection"
  | "disney-to-train"
  | "train-scene"
  | "final-reveal";

const Index = () => {
  const [stage, setStage] = useState<Stage>("scratch");
  const [hasClickedFish, setHasClickedFish] = useState(false);

  const handleNextStage = (nextStage: Stage) => {
    setStage(nextStage);
  };

  const handleFishClick = () => {
    setHasClickedFish(true);
    setStage("april-fools");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {stage === "scratch" && (
        <ScratchCard onComplete={() => handleNextStage("calendar")} />
      )}
      
      {stage === "calendar" && (
        <CalendarReveal 
          onComplete={() => handleNextStage("transport")}
          onFishClick={handleFishClick}
        />
      )}
      
      {stage === "transport" && (
        <TransportChoice onBusSelected={() => handleNextStage("hangman")} />
      )}
      
      {stage === "hangman" && (
        <HangmanGame 
          onComplete={() => handleNextStage("bus-journey")}
          onFail={() => handleNextStage("bus-journey")}
        />
      )}
      
      {stage === "bus-journey" && (
        <BusJourney onComplete={() => handleNextStage("ticket-check")} />
      )}
      
      {stage === "ticket-check" && (
        <TicketCheck onTicketsScanned={handleFishClick} />
      )}
      
      {stage === "april-fools" && (
        <AprilFoolsReveal onComplete={() => handleNextStage("real-trip")} />
      )}
      
      {stage === "real-trip" && (
        <RealTripReveal onBikeSelected={() => handleNextStage("bike-journey")} />
      )}
      
      {stage === "bike-journey" && (
        <BikeJourney onComplete={() => handleNextStage("intersection")} />
      )}
      
      {stage === "intersection" && (
        <IntersectionChoice onDisneySelected={() => handleNextStage("disney-to-train")} />
      )}
      
      {stage === "disney-to-train" && (
        <DisneyToTrain onComplete={() => handleNextStage("train-scene")} />
      )}
      
      {stage === "train-scene" && (
        <TrainScene onSeatsClicked={() => handleNextStage("final-reveal")} />
      )}
      
      {stage === "final-reveal" && (
        <FinalReveal />
      )}
    </div>
  );
};

export default Index;
