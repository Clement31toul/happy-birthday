import { useEffect, useState } from "react";
import RedCalendar from "@/components/RedCalendar";
import sfx from "@/game/sfx";
import fishIcon from "@/assets/fish.svg";
import painting from "@/assets/vangogh-starry.svg";

interface CalendarRewindProps {
  onComplete: () => void;
}

const CalendarRewind = ({ onComplete }: CalendarRewindProps) => {
  const [currentDate, setCurrentDate] = useState("1er Avril");
  const [flipping, setFlipping] = useState<string[]>([]);
  const [showFools, setShowFools] = useState(true);
  const [atFinalDate, setAtFinalDate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowFools(false), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showFools) return;
    const dates = [
      "31 Mars", "30 Mars", "28 Mars", "25 Mars", "20 Mars", "10 Mars", "1 Mars",
      "15 Février", "1 Février", "15 Janvier", "1 Janvier", "15 Décembre", "1 Décembre", "20 Décembre"
    ];
    let index = 0;
    const intervals = [200, 200, 180, 160, 140, 120, 100, 120, 140, 160, 180, 220, 300, 600];

    const step = () => {
      if (index < dates.length) {
        const next = dates[index];
        setFlipping((prev) => [next, ...prev].slice(0, 6));
        setCurrentDate(next);
        sfx.playFlip();
        if (index === dates.length - 1) {
          setAtFinalDate(true);
          setTimeout(onComplete, 10000);
        } else {
          setTimeout(step, intervals[index]);
        }
        index++;
      }
    };

    const t = setTimeout(step, 600);
    return () => clearTimeout(t);
  }, [onComplete, showFools]);

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-0 relative overflow-hidden"
      style={{
        backgroundColor: atFinalDate ? '#1a1a2e' : '#ffffff',
        transition: 'background-color 1s ease-in-out'
      }}
    >
      {/* Van Gogh background when reaching 20 Décembre */}
      {atFinalDate && (
        <>
          <div
            className="fixed inset-0 bg-cover bg-center animate-fade-in"
            style={{ 
              backgroundImage: `url(${painting})`,
              zIndex: 1,
              opacity: 0.95
            }}
          />
          {/* Dark overlay for better contrast */}
          <div 
            className="fixed inset-0 bg-black/20"
            style={{ zIndex: 2 }}
          />
        </>
      )}
      <div className="relative w-full max-w-5xl" style={{ zIndex: 10 }}>
        <div className="relative h-[460px] flex items-center justify-center">
          <RedCalendar current={currentDate} flipping={flipping} />
          {/* Inline April Fools overlay */}
          {showFools && (
            <div className="absolute inset-0 flex items-center justify-center z-50">
              <div className="px-6 py-4 rounded-2xl bg-white/90 backdrop-blur border border-white/70 shadow-strong text-center space-y-3">
                <img src={fishIcon} alt="Poisson" className="w-12 h-12 mx-auto" />
                <div className="text-2xl font-bold text-foreground">C’était un poisson d’avril</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarRewind;
