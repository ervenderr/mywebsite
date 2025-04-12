"use client"

import type { Variants } from "framer-motion"

// Fade up animation
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

// Fade in animation
export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// Slide in from left
export const slideInLeftVariant: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
}

// Slide in from right
export const slideInRightVariant: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
}

// Scale up animation
export const scaleUpVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

// Staggered children animation
export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// For staggered children
export const staggerItemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Rotate in animation
export const rotateInVariant: Variants = {
  hidden: { opacity: 0, rotate: -5 },
  visible: { opacity: 1, rotate: 0 },
}

// Bounce animation
export const bounceVariant: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  },
}

// Flip animation
export const flipVariant: Variants = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: { opacity: 1, rotateX: 0 },
}

// Section header animation
export const sectionHeaderVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}
