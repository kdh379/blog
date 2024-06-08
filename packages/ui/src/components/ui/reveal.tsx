"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@ui/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
}

export default function Reveal({width = "fit-content", className, children}: RevealProps) {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={cn("relative", width, className)}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="absolute inset-0 z-10 bg-primary"
      />
    </div>
  );
}