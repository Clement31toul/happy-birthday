import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import natureScene from "@/assets/nature-scene.png";
import fishIcon from "@/assets/fish.png";

interface CalendarRevealProps {
  onComplete: () => void;
  onFishClick: () => void;
}

const CalendarReveal = ({ onComplete, onFishClick }: CalendarRevealProps) => {
  const [currentDate, setCurrentDate] = useState("16 Octobre");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDecorations, setShowDecorations] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      animateToAprilFirst();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const animateToAprilFirst = () => {
    const dates = [
      "16 Octobre", "20 Octobre", "1 Novembre", "15 Novembre", "1 Décembre",
      "15 Décembre", "1 Janvier", "15 Janvier", "1 Février", "15 Février",
      "1 Mars", "10 Mars", "20 Mars", "25 Mars", "28 Mars", "30 Mars", "31 Mars", "1er Avril"
    ];
    
    let index = 0;
    const intervals = [200, 200, 180, 180, 160, 160, 140, 140, 120, 120, 100, 100, 150, 200, 300, 500, 800, 1000];
    
    const animate = () => {
      if (index < dates.length) {
        setCurrentDate(dates[index]);
        
        if (index === dates.length - 1) {
          setShowDecorations(true);
          setTimeout(onComplete, 2000);
        } else {
          setTimeout(animate, intervals[index]);
        }
        index++;
      }
    };
    
    animate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative">
      {showDecorations && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${natureScene})` }}
          />
          <img
            src={fishIcon}
            alt="Fish"
            className="absolute top-1/4 right-1/4 w-16 h-16 cursor-pointer opacity-60 hover:opacity-100 transition-opacity animate-pulse"
            onClick={onFishClick}
          />
        </>
      )}
      
      <Card className="relative w-full max-w-md p-12 bg-card/95 backdrop-blur shadow-strong">
        <div className="text-center space-y-6">
          <Calendar className="w-24 h-24 mx-auto text-primary animate-scale-in" />
          <div className={`text-5xl font-bold text-foreground transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}>
            {currentDate}
          </div>
          {showDecorations && (
            <div className="text-2xl text-secondary font-semibold animate-fade-in">
              🌲 Center Parcs 🌊
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CalendarReveal;
