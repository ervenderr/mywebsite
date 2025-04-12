"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Background grid */}
      <div className="hero-grid"></div>

      {/* Radial gradient */}
      <div className="hero-gradient"></div>

      {/* Decorative blobs */}
      <div
        className="hero-blob w-[500px] h-[500px] -top-[250px] -right-[250px] animate-rotate"
        style={{ opacity: isDark ? 0.4 : 0.3 }}
      ></div>
      <div
        className="hero-blob w-[300px] h-[300px] -bottom-[150px] -left-[150px] animate-rotate"
        style={{
          animationDirection: "reverse",
          animationDuration: "25s",
          opacity: isDark ? 0.4 : 0.3,
        }}
      ></div>

      {/* Dot patterns */}
      <div className="hero-pattern top-[20%] right-[10%] w-[200px] h-[200px]"></div>
      <div className="hero-pattern bottom-[20%] left-[10%] w-[150px] h-[150px]"></div>

      {/* Code symbols */}
      <div className="code-symbol text-2xl top-[30%] right-[20%] animate-delay-200">&lt;/&gt;</div>
      <div className="code-symbol text-2xl bottom-[30%] left-[20%] animate-delay-300">{`{}`}</div>
      <div className="code-symbol text-xl top-[60%] right-[30%] animate-delay-100">()</div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary/20 animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-5 h-5 rounded-full bg-primary/10 animate-float animate-delay-200"></div>
      <div className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-primary/15 animate-float animate-delay-300"></div>

      {/* Dark mode specific elements */}
      {isDark && (
        <>
          <div className="absolute top-1/2 left-1/3 w-6 h-6 rounded-full bg-primary/5 animate-float animate-delay-400"></div>
          <div className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-primary/8 animate-float animate-delay-300"></div>
        </>
      )}
    </div>
  )
}
