import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Train } from "lucide-react";

interface DisneyToTrainProps {
  onComplete: () => void;
}

const DisneyToTrain = ({ onComplete }: DisneyToTrainProps) => {
  const [stage, setStage] = useState<"disney" | "walking" | "train">("disney");

  useEffect(() => {
    const timer1 = setTimeout(() => setStage("walking"), 2000);
    const timer2 = setTimeout(() => setStage("train"), 4000);
    const timer3 = setTimeout(onComplete, 6000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {stage === "disney" && (
        <Card className="w-full max-w-2xl p-12 text-center space-y-8 shadow-strong">
          <h2 className="text-4xl font-bold text-foreground">🏰 Bienvenue à Disney !</h2>
          <p className="text-xl text-muted-foreground">Direction la gare...</p>
        </Card>
      )}

      {stage === "walking" && (
        <Card className="w-full max-w-2xl p-12 text-center space-y-8 shadow-strong">
          <p className="text-2xl text-muted-foreground animate-pulse">
            🚶‍♂️ Marche vers la gare... 🚶‍♀️
          </p>
        </Card>
      )}

      {stage === "train" && (
        <div className="w-full h-screen bg-black flex items-center justify-center animate-fade-in">
          <Train className="w-32 h-32 text-white animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default DisneyToTrain;
