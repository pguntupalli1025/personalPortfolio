"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }
      }
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}
