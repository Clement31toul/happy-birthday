import RedCalendar from "@/components/RedCalendar";
import fishIcon from "@/assets/fish.svg";
import sfx from "@/game/sfx";

interface RedCalendarFishProps {
  onFishClick: () => void;
}

export default function RedCalendarFish({ onFishClick }: RedCalendarFishProps) {
  const current = "1er Avril";
  return (
    <div className="flex items-center justify-center min-h-screen p-0 relative">
      <div className="relative w-full max-w-5xl">
        <div className="relative h-[460px] flex items-center justify-center">
          <RedCalendar current={current} flipping={[]} />
          <img
            src={fishIcon}
            alt="Poisson"
            className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-16 h-16 cursor-pointer opacity-90 hover:opacity-100 animate-wiggle"
            onClick={() => { sfx.playWater(); onFishClick(); }}
            style={{ filter: 'drop-shadow(0 6px 14px rgba(59,130,246,0.8))' }}
          />
        </div>
      </div>
    </div>
  );
}
