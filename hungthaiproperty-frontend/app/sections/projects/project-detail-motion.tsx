"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ProjectDetailMotionProps = {
  children: ReactNode;
};

export function ProjectDetailMotion({ children }: ProjectDetailMotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 56 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
