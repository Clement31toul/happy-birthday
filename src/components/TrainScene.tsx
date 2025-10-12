import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TrainSceneProps {
  onSeatsClicked: () => void;
}

const TrainScene = ({ onSeatsClicked }: TrainSceneProps) => {
  const [seatsClicked, setSeatsClicked] = useState<number>(0);

  const handleSeatClick = (seatNumber: number) => {
    if (seatsClicked >= seatNumber - 1) {
      setSeatsClicked(seatNumber);
      
      if (seatNumber === 5) {
        setTimeout(onSeatsClicked, 500);
      }
    }
  };

  const clues = [
    "🧀 Fromage hollandais",
    "🌷 Tulipes colorées",
    "🚲 Vélos partout",
    "🏠 Maisons sur canaux",
    "🎨 Van Gogh"
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-800 to-gray-900">
      <Card className="w-full max-w-4xl p-8 space-y-8 shadow-strong bg-gray-800/90 backdrop-blur">
        <h2 className="text-3xl font-bold text-center text-white">
          🚄 Dans le train...
        </h2>

        <div className="grid grid-cols-5 gap-4 mb-8">
          {clues.map((clue, index) => (
            <div
              key={index}
              className="p-4 bg-white/10 rounded-lg text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <p className="text-2xl">{clue}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-xl text-white text-center mb-6">
            Cliquez sur vos places ! ✨
          </p>
          
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((seat) => (
              <Button
                key={seat}
                variant="outline"
                size="lg"
                className={`h-24 text-xl font-bold transition-all ${
                  seatsClicked >= seat
                    ? "bg-primary text-primary-foreground animate-pulse"
                    : seat === seatsClicked + 1
                    ? "animate-pulse border-primary border-2"
                    : "opacity-50"
                }`}
                onClick={() => handleSeatClick(seat)}
                disabled={seatsClicked < seat - 1 || seatsClicked >= 5}
              >
                Place {seat}
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrainScene;
