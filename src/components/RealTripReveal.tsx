import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Bus, Bike, Zap } from "lucide-react";

interface RealTripRevealProps {
  onBikeSelected: () => void;
}

const RealTripReveal = ({ onBikeSelected }: RealTripRevealProps) => {
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleBusClick = () => {
    setSelectedTransport("bus");
    setMessage("Désolé, je suis en retard !");
    setTimeout(() => {
      setMessage("");
      setSelectedTransport(null);
    }, 2000);
  };

  const handleScooterClick = () => {
    setSelectedTransport("scooter");
    setMessage("💥 Cassée !");
    setTimeout(() => {
      setMessage("");
      setSelectedTransport(null);
    }, 2000);
  };

  const handleBikeClick = () => {
    setSelectedTransport("bike");
    setMessage("En route pour la vraie destination !");
    setTimeout(onBikeSelected, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-8 space-y-8 shadow-strong">
        <div className="text-center space-y-4">
          <Calendar className="w-20 h-20 mx-auto text-primary animate-scale-in" />
          <h2 className="text-4xl font-bold text-foreground">20 Décembre</h2>
          <p className="text-xl text-muted-foreground">Le vrai voyage commence !</p>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <Button
            variant="outline"
            size="lg"
            className={`h-32 flex flex-col gap-3 transition-transform hover:scale-105 ${
              selectedTransport === "bus" ? "animate-slide-out-right" : ""
            }`}
            onClick={handleBusClick}
            disabled={selectedTransport !== null}
          >
            <Bus className="w-12 h-12" />
            <span>Bus</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className={`h-32 flex flex-col gap-3 transition-transform hover:scale-105 ${
              selectedTransport === "bike" ? "bg-secondary text-secondary-foreground" : ""
            }`}
            onClick={handleBikeClick}
            disabled={selectedTransport !== null}
          >
            <Bike className="w-12 h-12" />
            <span>Vélo</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className={`h-32 flex flex-col gap-3 transition-transform hover:scale-105 ${
              selectedTransport === "scooter" ? "animate-scale-out" : ""
            }`}
            onClick={handleScooterClick}
            disabled={selectedTransport !== null}
          >
            <Zap className="w-12 h-12" />
            <span>Trottinette</span>
          </Button>
        </div>

        {message && (
          <div className="text-center p-4 bg-primary/10 rounded-lg animate-fade-in">
            <p className="text-xl font-semibold text-foreground">{message}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RealTripReveal;
