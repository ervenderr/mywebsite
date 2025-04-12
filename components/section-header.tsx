"use client"

import type { ReactNode } from "react"
import ScrollAnimation from "./scroll-animation"
import { sectionHeaderVariant } from "@/lib/animation-variants"

interface SectionHeaderProps {
  title: string
  subtitle?: string | ReactNode
  centered?: boolean
  className?: string
}

export default function SectionHeader({ title, subtitle, centered = true, className = "" }: SectionHeaderProps) {
  return (
    <ScrollAnimation
      variants={sectionHeaderVariant}
      className={`space-y-2 ${centered ? "text-center" : ""} ${className}`}
    >
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </ScrollAnimation>
  )
}
