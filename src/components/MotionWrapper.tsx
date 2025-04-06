
import { motion } from "framer-motion";
import React from "react";

type MotionWrapperProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "fade" | "slide" | "scale" | "stagger";
};

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
    },
  }),
};

const slideVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.4,
      type: "spring",
      stiffness: 100,
    },
  }),
};

const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const getVariants = (variant: string) => {
  switch (variant) {
    case "fade":
      return fadeVariants;
    case "slide":
      return slideVariants;
    case "scale":
      return scaleVariants;
    case "stagger":
      return staggerVariants;
    default:
      return fadeVariants;
  }
};

export const MotionItem = ({
  children,
  className = "",
  delay = 0,
  variant = "fade",
}: MotionWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      custom={delay}
      variants={getVariants(variant)}
    >
      {children}
    </motion.div>
  );
};

export const MotionContainer = ({
  children,
  className = "",
  variant = "stagger",
}: Omit<MotionWrapperProps, "delay">) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerVariants}
    >
      {children}
    </motion.div>
  );
};

export const MotionChild = ({ children, className = "" }: Omit<MotionWrapperProps, "delay" | "variant">) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {children}
    </motion.div>
  );
};
