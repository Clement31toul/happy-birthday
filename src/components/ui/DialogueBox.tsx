import { ReactNode } from "react";

interface DialogueBoxProps {
  speaker?: string;
  children: ReactNode;
  align?: "left" | "right" | "center";
}

export default function DialogueBox({ speaker, children, align = "left" }: DialogueBoxProps) {
  const alignment = align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";
  return (
    <div className={`pointer-events-auto flex ${alignment}`}>
      <div className="relative max-w-xl rounded-2xl border border-white/30 bg-white/30 backdrop-blur-md shadow-[0_8px_40px_rgba(0,0,0,0.25)] px-6 py-4">
        {speaker && (
          <div className="absolute -top-3 left-4 text-xs font-semibold tracking-wide bg-black/70 text-white px-2 py-0.5 rounded-md shadow">
            {speaker}
          </div>
        )}
        <div className="text-base leading-relaxed text-black drop-shadow-sm">{children}</div>
      </div>
    </div>
  );
}
