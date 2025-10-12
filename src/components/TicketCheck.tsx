import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

interface TicketCheckProps {
  onTicketsScanned: () => void;
}

const TicketCheck = ({ onTicketsScanned }: TicketCheckProps) => {
  const [ticketsFound, setTicketsFound] = useState<number>(0);
  const [showMessage, setShowMessage] = useState(false);

  const handleTicketClick = (ticketNumber: number) => {
    if (ticketsFound >= ticketNumber - 1) {
      setTicketsFound(ticketNumber);
      
      if (ticketNumber === 2) {
        setShowMessage(true);
        setTimeout(onTicketsScanned, 2000);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl p-8 space-y-8 shadow-strong">
        <h2 className="text-3xl font-bold text-center text-foreground">
          "Vos billets s'il vous plaît !"
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <Button
            variant="outline"
            size="lg"
            className={`h-40 flex flex-col gap-4 ${
              ticketsFound >= 1 ? "bg-primary/10 border-primary" : "opacity-50"
            }`}
            onClick={() => handleTicketClick(1)}
          >
            <Ticket className="w-16 h-16" />
            <span>Billet 1</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className={`h-40 flex flex-col gap-4 ${
              ticketsFound >= 2 ? "bg-primary/10 border-primary" : "opacity-50"
            }`}
            onClick={() => handleTicketClick(2)}
            disabled={ticketsFound < 1}
          >
            <Ticket className="w-16 h-16" />
            <span>Billet 2</span>
          </Button>
        </div>

        {showMessage && (
          <div className="text-center p-6 bg-destructive/10 rounded-lg animate-fade-in">
            <p className="text-xl font-semibold text-destructive">
              ❌ Vos billets ne sont pas valides !
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TicketCheck;
