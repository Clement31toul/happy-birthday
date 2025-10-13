import { memo } from "react";
import { motion } from "framer-motion";

interface CharacterProps {
  src: string;
  alt: string;
  width?: number;
  className?: string;
  style?: any;
  float?: boolean;
  breathe?: boolean;
  sway?: boolean;
}

function Character({ src, alt, width = 96, className = "", style, float = true, breathe = true, sway = true }: CharacterProps) {
  return (
    <motion.img
      src={src}
      alt={alt}
      width={width}
      className={`drop-shadow-2xl ${className}`}
      style={style}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{
        opacity: 1,
        y: float ? [0, -2, 0, 2, 0] : 0,
        scaleY: breathe ? [1.0, 1.015, 1.0, 0.995, 1.0] : 1.0,
        rotate: sway ? [0, -0.4, 0, 0.4, 0] : 0,
      }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default memo(Character);
