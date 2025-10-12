import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Bus } from "lucide-react";

interface BusJourneyProps {
  onComplete: () => void;
}

const BusJourney = ({ onComplete }: BusJourneyProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-2xl p-12 text-center space-y-8 shadow-strong">
        <h2 className="text-3xl font-bold text-foreground">C'est parti !</h2>
        <Bus className="w-32 h-32 mx-auto text-primary animate-slide-in-right" />
        <p className="text-xl text-muted-foreground">Direction Center Parcs...</p>
      </Card>
    </div>
  );
};

export default BusJourney;
