import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Bike } from "lucide-react";
import tulipsPath from "@/assets/tulips-path.png";

interface BikeJourneyProps {
  onComplete: () => void;
}

const BikeJourney = ({ onComplete }: BikeJourneyProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${tulipsPath})` }}
      />
      <div className="absolute inset-0 bg-black/20" />
      
      <Card className="relative w-full max-w-2xl p-12 text-center space-y-8 shadow-strong bg-card/90 backdrop-blur">
        <h2 className="text-3xl font-bold text-foreground">🌷 En route ! 🚴</h2>
        <Bike className="w-32 h-32 mx-auto text-primary animate-slide-in-right" />
        <p className="text-xl text-muted-foreground">Pédalons à travers les tulipes...</p>
      </Card>
    </div>
  );
};

export default BikeJourney;
