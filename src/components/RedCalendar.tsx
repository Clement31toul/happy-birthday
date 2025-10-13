import { motion } from "framer-motion";

interface RedCalendarProps {
  current: string;
  flipping: string[]; // newest first
}

const pageVariants = {
  initial: { rotateX: 0, opacity: 1, transformOrigin: "bottom" as const },
  flip: (i: number) => ({
    rotateX: -180,
    opacity: 0,
    transition: { delay: i * 0.09, duration: 0.8, ease: [0.2, 0.6, 0.2, 1] },
    transformOrigin: "bottom" as const,
  }),
};

function RedCalendar({ current, flipping }: RedCalendarProps) {
  return (
    <div className="relative h-[420px] w-full max-w-3xl mx-auto">
      {/* Outer frame with thick black border */}
      <div className="absolute inset-0 rounded-2xl border-[6px] border-black shadow-strong" />

      {/* Header (red) */}
      <div className="absolute left-0 right-0 top-0 h-[120px] rounded-t-2xl bg-gradient-to-b from-red-500 to-red-600 shadow-[inset_0_-4px_0_rgba(0,0,0,0.3)]" />
      {/* Header highlight strip */}
      <div className="absolute left-1.5 right-1.5 top-1.5 h-6 rounded-t-xl bg-white/10 pointer-events-none" />

      {/* Divider */}
      <div className="absolute left-0 right-0 top-[120px] h-[6px] bg-black" />

      {/* Rings */}
      <div className="absolute top-[-14px] left-[22%] w-[28px] h-[50px] rounded-md bg-black" />
      <div className="absolute top-[-14px] left-[22%] w-[28px] h-[24px] rounded-md bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
      <div className="absolute top-[-14px] right-[22%] w-[28px] h-[50px] rounded-md bg-black" />
      <div className="absolute top-[-14px] right-[22%] w-[28px] h-[24px] rounded-md bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

      {/* Month text */}
      <div className="absolute top-[64px] left-0 right-0 text-center text-5xl font-bold text-white tracking-wide select-none">
        {getMonthLabel(current)}
      </div>

      {/* Page stack flipping */}
      <div className="absolute inset-x-6 bottom-6 top-[150px] perspective-[1200px]">
        {flipping.map((d, i) => (
          <motion.div
            key={`${d}-${i}`}
            custom={i}
            variants={pageVariants}
            initial="initial"
            animate="flip"
            className="absolute inset-0 rounded-xl bg-white border shadow-md flex items-center justify-center overflow-hidden"
            style={{ zIndex: 40 - i }}
          >
            <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-b from-black/0 via-black/0 to-black/10" />
            <div className="text-7xl font-extrabold text-black select-none">{getDayLabel(d)}</div>
          </motion.div>
        ))}

        {/* Current page (top) */}
        <div className="absolute inset-0 rounded-xl bg-white border shadow-md flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-b from-black/0 via-black/0 to-black/10" />
          <div className="text-7xl font-extrabold text-black select-none">{getDayLabel(current)}</div>
        </div>
      </div>
    </div>
  );
}

function getMonthLabel(dateText: string) {
  // Expect strings like "16 Octobre" or "1er Avril"
  const parts = dateText.split(" ");
  const month = parts[parts.length - 1];
  return month?.slice(0, 3).toUpperCase() ?? "";
}

function getDayLabel(dateText: string) {
  const parts = dateText.split(" ");
  const day = parts[0];
  return day?.toUpperCase() ?? "";
}

export default RedCalendar;
