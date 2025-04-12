"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

interface AnimatedProfileProps {
  src: string
  alt: string
  className?: string
}

export default function AnimatedProfile({ src, alt, className = "" }: AnimatedProfileProps) {
  const [mounted, setMounted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 rounded-full blur-xl -z-10 ${
          isDark
            ? "bg-gradient-to-tr from-primary/30 via-primary/15 to-transparent"
            : "bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent"
        }`}
      ></div>

      {/* Animated rings */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${isDark ? "border-primary/30" : "border-primary/20"}`}
        animate={{
          boxShadow: isDark
            ? [
                "0 0 0 0 rgba(59, 130, 246, 0.3)",
                "0 0 0 10px rgba(59, 130, 246, 0.15)",
                "0 0 0 0 rgba(59, 130, 246, 0.3)",
              ]
            : [
                "0 0 0 0 rgba(59, 130, 246, 0.2)",
                "0 0 0 10px rgba(59, 130, 246, 0.1)",
                "0 0 0 0 rgba(59, 130, 246, 0.2)",
              ],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      ></motion.div>

      {/* Rotating ring */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 border-dashed ${
          isDark ? "border-primary/30" : "border-primary/20"
        }`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      ></motion.div>

      {/* Image container */}
      <motion.div
        className={`relative w-full h-full rounded-full overflow-hidden border-4 ${
          isDark ? "border-primary/30 bg-card shadow-lg shadow-primary/10" : "border-primary/20 bg-muted shadow-lg"
        }`}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={src || "/placeholder.svg?height=400&width=400&text=EI"}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          priority
          onLoad={() => setImageLoaded(true)}
        />

        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted dark:bg-card">
            <div
              className={`w-16 h-16 border-4 rounded-full animate-spin ${
                isDark ? "border-primary/40 border-t-primary" : "border-primary/30 border-t-primary"
              }`}
            ></div>
          </div>
        )}
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className={`absolute -top-4 -right-4 w-8 h-8 rounded-full ${isDark ? "bg-primary/30" : "bg-primary/20"}`}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      ></motion.div>

      <motion.div
        className={`absolute -bottom-2 -left-2 w-6 h-6 rounded-full ${isDark ? "bg-primary/40" : "bg-primary/30"}`}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
      ></motion.div>

      <motion.div
        className={`absolute top-1/2 -right-6 w-4 h-4 rounded-full ${isDark ? "bg-primary/50" : "bg-primary/40"}`}
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
      ></motion.div>
    </motion.div>
  )
}
