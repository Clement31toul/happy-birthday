import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Bus, Car as Taxi } from "lucide-react";

interface TransportChoiceProps {
  onBusSelected: () => void;
}

const TransportChoice = ({ onBusSelected }: TransportChoiceProps) => {
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleTaxiClick = () => {
    setSelectedTransport("taxi");
    setMessage("Trop cher !");
    setTimeout(() => {
      setMessage("");
      setSelectedTransport(null);
    }, 2000);
  };

  const handleCarClick = () => {
    setSelectedTransport("car");
    setMessage("💥 Panne !");
    setTimeout(() => {
      setMessage("");
      setSelectedTransport(null);
    }, 2000);
  };

  const handleBusClick = () => {
    setSelectedTransport("bus");
    setMessage("Montez, je vous emmène ! Où allons-nous ?");
    setTimeout(onBusSelected, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-8 space-y-8 shadow-strong">
        <h2 className="text-3xl font-bold text-center text-foreground">
          Que prenons-nous ?
        </h2>
        
        <div className="grid grid-cols-3 gap-6">
          <Button
            variant="outline"
            size="lg"
            className={`h-32 flex flex-col gap-3 transition-transform hover:scale-105 ${
              selectedTransport === "car" ? "animate-scale-out" : ""
            }`}
            onClick={handleCarClick}
            disabled={selectedTransport !== null}
          >
            <Car className="w-12 h-12" />
            <span>Voiture</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className={`h-32 flex flex-col gap-3 transition-transform hover:scale-105 ${
              selectedTransport === "bus" ? "bg-secondary text-secondary-foreground" : ""
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
              selectedTransport === "taxi" ? "animate-slide-out-right" : ""
            }`}
            onClick={handleTaxiClick}
            disabled={selectedTransport !== null}
          >
            <Taxi className="w-12 h-12" />
            <span>Taxi</span>
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

export default TransportChoice;
