import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface HangmanGameProps {
  onComplete: () => void;
  onFail: () => void;
}

const HangmanGame = ({ onComplete, onFail }: HangmanGameProps) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [word, setWord] = useState("C _ _ _ _ _    P _ _ _");
  const [guess, setGuess] = useState("");
  const [showHint, setShowHint] = useState(false);

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

  const handleGuess = (letter: string) => {
    setGuess(letter);
    if (letter.toLowerCase() === "center parc") {
      onComplete();
    }
  };

  const handleLetterClick = (letter: string) => {
    const answer = "CENTER PARC";
    if (answer.includes(letter)) {
      const newWord = word.split("").map((char, index) => {
        if (answer[index] === letter) return letter;
        return char;
      }).join("");
      setWord(newWord);
      
      if (newWord.replace(/\s/g, "") === answer.replace(/\s/g, "")) {
        setTimeout(onComplete, 1000);
      }
    }
  };

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-8 space-y-8 shadow-strong">
        <div className="text-center">
          <div className="text-6xl font-bold mb-4">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
          </div>
          <div className="text-4xl font-mono tracking-widest mb-8">
            {word}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {letters.map((letter) => (
            <Button
              key={letter}
              variant="outline"
              onClick={() => handleLetterClick(letter)}
              className="h-12"
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
      </Card>
    </div>
  );
};

export default HangmanGame;
