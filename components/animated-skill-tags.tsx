"use client"

import { useEffect, useState } from "react"

interface AnimatedSkillTagsProps {
  skills: string[]
  className?: string
}

export default function AnimatedSkillTags({ skills, className = "" }: AnimatedSkillTagsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {skills.map((skill, index) => (
        <span
          key={skill}
          className="skill-badge inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
          style={{ animationDelay: `${0.1 + index * 0.1}s` }}
        >
          {skill}
        </span>
      ))}
    </div>
  )
}
