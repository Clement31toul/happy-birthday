import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import calendarBg from "@/assets/calendar.svg";
import happyBirthdayBg from "@/assets/Happy-birthday.png";

interface ScratchCardProps {
  onComplete: () => void;
}

const ScratchCard = ({ onComplete }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [flecks, setFlecks] = useState<Array<{ id: number; x: number; y: number; sx: number; sy: number }>>([]);
  const fleckIdRef = useRef(0);

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

    // spawn fleck particle at container-relative position
    const container = containerRef.current;
    if (container) {
      const crect = container.getBoundingClientRect();
      const id = fleckIdRef.current++;
      const relX = x - crect.left;
      const relY = y - crect.top;
      const sx = 8 + Math.random() * 14;
      const sy = -12 - Math.random() * 10;
      setFlecks((prev) => [...prev, { id, x: relX, y: relY, sx, sy }]);
      setTimeout(() => setFlecks((prev) => prev.filter((f) => f.id !== id)), 700);
    }
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
  const handleMouseMove = (e: any) => {
    if (isScratching) scratch(e.clientX, e.clientY);
  };
  const handleTouchMove = (e: any) => {
    e.preventDefault();
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-2 bg-cover bg-center"
      style={{ backgroundImage: `url(${happyBirthdayBg})` }}
    >
      <Card ref={containerRef} className="relative w-full max-w-5xl aspect-[16/9] overflow-hidden shadow-strong">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${calendarBg})` }}
        />
        <div className="absolute inset-0 foil opacity-40 pointer-events-none" />
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
        {/* fleck particles */}
        <div className="pointer-events-none absolute inset-0">
          {flecks.map((f) => (
            <div
              key={f.id}
              className="spark absolute"
              style={{
                left: f.x,
                top: f.y,
                // @ts-ignore custom var for animation
                "--sx": `${f.sx}px`,
                // @ts-ignore
                "--sy": `${f.sy}px`,
              } as any}
            />)
          )}
        </div>
      </Card>
    </div>
  );
};

export default ScratchCard;
