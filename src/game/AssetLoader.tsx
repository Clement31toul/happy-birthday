import { ReactNode, useEffect, useMemo, useState } from "react";
import carPremium from "@/assets/vehicles/car-premium.svg";
import busPremium from "@/assets/vehicles/bus-premium.svg";
import taxiPremium from "@/assets/vehicles/taxi-premium.svg";
import fish from "@/assets/fish.svg";
import busDriver from "@/assets/characters/bus-driver.svg";
import ticketLady from "@/assets/characters/ticket-lady.svg";

interface AssetLoaderProps {
  children: ReactNode;
}

function usePreload(sources: string[]) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const jobs = sources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    );
    Promise.all(jobs).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [sources]);
  return ready;
}

export default function AssetLoader({ children }: AssetLoaderProps) {
  const sources = useMemo(
    () => [carPremium, busPremium, taxiPremium, fish, busDriver, ticketLady],
    [],
  );
  const ready = usePreload(sources);

  if (!ready) {
    return (
      <div className="min-h-screen w-full grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-foreground/30 border-t-foreground animate-spin" />
          <div className="text-sm text-foreground/80">Chargement…</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
