import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SceneProps {
  children: ReactNode;
}

export default function Scene({ children }: SceneProps) {
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
