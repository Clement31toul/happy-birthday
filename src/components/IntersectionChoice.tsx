import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface IntersectionChoiceProps {
  onDisneySelected: () => void;
}

const IntersectionChoice = ({ onDisneySelected }: IntersectionChoiceProps) => {
  const [message, setMessage] = useState<string>("");

  const handleParisClick = () => {
    setMessage("👨‍👩‍👧 On est trop loin, ça va pas !");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleSaintBrevinClick = () => {
    setMessage("🥶 Il fera trop froid en décembre !");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleDisneyClick = () => {
    setMessage("🏰 Direction Disney !");
    setTimeout(onDisneySelected, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-8 space-y-8 shadow-strong">
        <div className="text-center space-y-4">
          <MapPin className="w-20 h-20 mx-auto text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Quelle direction ?</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <Button
            variant="outline"
            size="lg"
            className="h-32 flex flex-col gap-3 transition-transform hover:scale-105"
            onClick={handleParisClick}
            disabled={message !== ""}
          >
            <span className="text-4xl">🗼</span>
            <span className="font-semibold">Paris</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-32 flex flex-col gap-3 transition-transform hover:scale-105 border-2 border-primary"
            onClick={handleDisneyClick}
            disabled={message !== ""}
          >
            <span className="text-4xl">🏰</span>
            <span className="font-semibold">Disney</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="h-32 flex flex-col gap-3 transition-transform hover:scale-105"
            onClick={handleSaintBrevinClick}
            disabled={message !== ""}
          >
            <span className="text-4xl">🏖️</span>
            <span className="font-semibold">Saint Brevin</span>
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

export default IntersectionChoice;
