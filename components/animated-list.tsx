"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { staggerContainerVariant, staggerItemVariant } from "@/lib/animation-variants"
import ScrollAnimation from "./scroll-animation"

interface AnimatedListProps {
  items: ReactNode[]
  className?: string
  itemClassName?: string
  delay?: number
  staggerDelay?: number
}

export default function AnimatedList({
  items,
  className = "",
  itemClassName = "",
  delay = 0,
  staggerDelay = 0.1,
}: AnimatedListProps) {
  const containerVariants = {
    ...staggerContainerVariant,
    visible: {
      ...staggerContainerVariant.visible,
      transition: {
        ...staggerContainerVariant.visible.transition,
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <ScrollAnimation variants={containerVariants} className={className}>
      {items.map((item, index) => (
        <motion.div key={index} variants={staggerItemVariant} className={itemClassName}>
          {item}
        </motion.div>
      ))}
    </ScrollAnimation>
  )
}
