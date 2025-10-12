import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import amsterdamScene from "@/assets/amsterdam-scene.png";

const FinalReveal = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${amsterdamScene})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
      
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-fade-in"
              style={{
                background: `hsl(${Math.random() * 360}, 70%, 60%)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <Card className="relative w-full max-w-3xl p-12 space-y-8 shadow-strong bg-white/95 backdrop-blur animate-scale-in">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            🎉 Surprise ! 🎁
          </h1>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Bienvenue à Amsterdam !
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-6 text-lg">
          <div className="p-6 bg-primary/10 rounded-lg">
            <p className="font-semibold text-primary mb-2">📅 Dates</p>
            <p className="text-foreground">20 - 23 Décembre 2024</p>
          </div>

          <div className="p-6 bg-secondary/10 rounded-lg">
            <p className="font-semibold text-secondary mb-2">📍 Départ</p>
            <p className="text-foreground">Chessy - Disney</p>
          </div>

          <div className="p-6 bg-accent/10 rounded-lg">
            <p className="font-semibold text-accent mb-2">👨‍👩‍👧‍👦 Voyageurs</p>
            <p className="text-foreground">5 personnes</p>
          </div>

          <div className="p-6 bg-secondary/10 rounded-lg">
            <p className="font-semibold text-secondary mb-2">🐕 Et aussi...</p>
            <p className="text-foreground">1 chien !</p>
          </div>
        </div>

        <div className="text-center pt-6 space-y-4">
          <p className="text-2xl font-semibold text-foreground">
            🌷 Préparez vos valises ! 🧳
          </p>
          <p className="text-xl text-muted-foreground">
            Une aventure inoubliable vous attend !
          </p>
        </div>
      </Card>
    </div>
  );
};

export default FinalReveal;
