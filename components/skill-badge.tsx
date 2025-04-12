"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
        isDark
          ? "bg-primary/20 text-primary hover:bg-primary/25 transition-colors"
          : "bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
      }`}
    >
      {name}
    </div>
  )
}
