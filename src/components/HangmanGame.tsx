import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import sfx from "@/game/sfx";

interface HangmanGameProps {
  onComplete: () => void;
  onFail: () => void;
  frameless?: boolean;
}

const HangmanGame = ({ onComplete, onFail, frameless = false }: HangmanGameProps) => {
  const TARGET = "CENTER PARC";
  const [timeLeft, setTimeLeft] = useState(60);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [justWrong, setJustWrong] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowHint(true);
          setTimeout(onFail, 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFail]);

  const handleLetterClick = (letter: string) => {
    if (usedLetters.includes(letter)) return;
    const next = [...usedLetters, letter];
    setUsedLetters(next);
    const isIn = TARGET.includes(letter);
    if (!isIn) {
      setJustWrong(true);
      sfx.playError();
      setTimeout(() => setJustWrong(false), 300);
      setTimeLeft((prev) => Math.max(0, prev - 10));
    }

    const solved = TARGET.split("")
      .filter((c) => c !== " ")
      .every((c) => next.includes(c));
    if (solved) setTimeout(onComplete, 600);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (/^[A-Z]$/.test(k)) handleLetterClick(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [usedLetters]);

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const masked = TARGET
    .split("")
    .map((c) => (c === " " ? " " : usedLetters.includes(c) ? c : "_"))
    .join("");

  const progress = (timeLeft / 60) * 360;

  return (
    <div className={frameless ? "flex items-center justify-center py-8" : "flex items-center justify-center min-h-screen p-4"}>
      {frameless ? (
        <div className="w-full max-w-2xl p-8 space-y-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 shadow-strong">
          <div className={`flex items-center justify-center gap-6 ${justWrong ? "animate-shake" : ""}`}>
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(hsl(var(--primary)) ${progress}deg, hsl(var(--muted)) ${progress}deg)`,
                }}
              />
              <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
                <div className="text-2xl font-bold">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </div>
              </div>
            </div>
            <div className="text-4xl font-mono tracking-[0.35em] select-none">
              {masked}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {letters.map((letter) => (
              <Button
                key={letter}
                variant={usedLetters.includes(letter) ? "secondary" : "outline"}
                onClick={() => handleLetterClick(letter)}
                className={`h-12 ${usedLetters.includes(letter) ? "opacity-60" : "hover:scale-105 transition-transform"}`}
                disabled={usedLetters.includes(letter) || timeLeft === 0}
              >
                {letter}
              </Button>
            ))}
          </div>

          {showHint && (
            <div className="text-center p-6 bg-secondary/20 rounded-lg animate-fade-in">
              <p className="text-xl font-semibold">
                👧 "Ils vont sûrement au Center Parc !"
              </p>
            </div>
          )}
        </div>
      ) : (
      <Card className="w-full max-w-2xl p-8 space-y-8 shadow-strong">
        <div className="flex items-center justify-center gap-6">
          <div className="relative w-24 h-24">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(hsl(var(--primary)) ${progress}deg, hsl(var(--muted)) ${progress}deg)`,
              }}
            />
            <div className="absolute inset-2 rounded-full bg-card flex items-center justify-center">
              <div className="text-2xl font-bold">
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
              </div>
            </div>
          </div>
          <div className="text-4xl font-mono tracking-[0.35em] select-none">
            {masked}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {letters.map((letter) => {
            const used = usedLetters.includes(letter);
            const wrong = used && !TARGET.includes(letter);
            return (
              <Button
                key={letter}
                variant={used ? "secondary" : "outline"}
                onClick={() => handleLetterClick(letter)}
                className={`h-12 ${used ? "" : "hover:scale-105 transition-transform"} ${wrong ? "border-red-300 bg-red-50 text-red-700" : ""}`}
                disabled={used || timeLeft === 0}
              >
                {letter}
              </Button>
            );
          })}
        </div>

        {showHint && (
          <div className="text-center p-6 bg-secondary/20 rounded-lg animate-fade-in">
            <p className="text-xl font-semibold">
              👧 "Ils vont sûrement au Center Parc !"
            </p>
          </div>
        )}
      </Card>
      )}
    </div>
  );
}

export default HangmanGame;
