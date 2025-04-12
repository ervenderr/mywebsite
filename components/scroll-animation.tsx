"use client"

import type React from "react"

import { type ReactNode, useEffect, useRef, useState } from "react"
import { motion, useAnimation, type Variants } from "framer-motion"

interface ScrollAnimationProps {
  children: ReactNode
  variants?: Variants
  className?: string
  viewport?: { once?: boolean; amount?: number | "some" | "all" }
  transition?: {
    duration?: number
    delay?: number
    ease?: string | number[]
    type?: string
  }
  as?: React.ElementType
}

export default function ScrollAnimation({
  children,
  variants,
  className = "",
  viewport = { once: true, amount: 0.3 },
  transition = { duration: 0.5, ease: "easeOut" },
  as = "div",
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Default animation variants
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
          controls.start("visible")
        } else if (!entry.isIntersecting && !viewport.once && isInView) {
          setIsInView(false)
          controls.start("hidden")
        }
      },
      {
        threshold: typeof viewport.amount === "number" ? viewport.amount : 0.3,
        rootMargin: "0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [controls, isInView, viewport])

  const Component = motion[as as keyof typeof motion] || motion.div

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants || defaultVariants}
      transition={transition}
      className={className}
    >
      {children}
    </Component>
  )
}
