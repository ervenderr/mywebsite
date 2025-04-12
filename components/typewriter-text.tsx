"use client"

import { useEffect, useState } from "react"

interface TypewriterTextProps {
  texts: string[]
  className?: string
  speed?: number
  delay?: number
}

export default function TypewriterText({ texts, className = "", speed = 100, delay = 2000 }: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const text = texts[currentTextIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(text.substring(0, currentText.length + 1))

          if (currentText === text) {
            setIsDeleting(true)
            clearTimeout(timeout)
            setTimeout(() => setIsDeleting(true), delay)
          }
        } else {
          setCurrentText(text.substring(0, currentText.length - 1))

          if (currentText === "") {
            setIsDeleting(false)
            setCurrentTextIndex((currentTextIndex + 1) % texts.length)
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, mounted, texts, speed, delay])

  if (!mounted) return null

  return (
    <span className={`${className} inline-block`}>
      {currentText}
      <span className="border-r-2 border-primary ml-1 animate-blink">&nbsp;</span>
    </span>
  )
}
