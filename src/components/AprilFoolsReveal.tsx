import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import fishIcon from "@/assets/fish.svg";

interface AprilFoolsRevealProps {
  onComplete: () => void;
}

const AprilFoolsReveal = ({ onComplete }: AprilFoolsRevealProps) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-12 text-center space-y-8 shadow-strong bg-gradient-festive">
        <img
          src={fishIcon}
          alt="Poisson d'Avril"
          className="w-32 h-32 mx-auto animate-scale-in"
        />
        <h1 className="text-5xl font-bold text-white animate-fade-in">
          C'était un poisson d'avril 🎣
        </h1>
        <p className="text-xl text-white/90">
          Merci d'avoir joué le jeu !
        </p>
      </Card>
    </div>
  );
};

export default AprilFoolsReveal;
