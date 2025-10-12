import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface ScratchCardProps {
  onComplete: () => void;
}

const ScratchCard = ({ onComplete }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill with scratch-off color
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px system-ui";
    ctx.textAlign = "center";
    ctx.fillText("Grattez ici pour découvrir", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText("ce que vous avez gagné !", canvas.width / 2, canvas.height / 2 + 20);
  }, []);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const canvasX = (x - rect.left) * scaleX;
    const canvasY = (y - rect.top) * scaleY;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 30, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }

    const percentage = (transparent / (imageData.data.length / 4)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 60) {
      setTimeout(onComplete, 500);
    }
  };

  const handleMouseDown = () => setIsScratching(true);
  const handleMouseUp = () => setIsScratching(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) scratch(e.clientX, e.clientY);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="relative w-full max-w-2xl aspect-[3/2] overflow-hidden shadow-strong">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-festive p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">🎁 Surprise !</h1>
            <p className="text-xl text-white/90">Un cadeau vous attend...</p>
          </div>
        </div>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-pointer touch-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        />
      </Card>
    </div>
  );
};

export default ScratchCard;
