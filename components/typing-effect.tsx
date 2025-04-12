"use client"

import { useEffect, useState } from "react"

interface TypingEffectProps {
  texts: string[]
  className?: string
}

export default function TypingEffect({ texts, className = "" }: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const text = texts[currentTextIndex]

    if (isTyping) {
      if (displayText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1))
        }, 100)
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }, 50)
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(true)
        setCurrentTextIndex((currentTextIndex + 1) % texts.length)
      }
    }
  }, [displayText, currentTextIndex, isTyping, texts, mounted])

  if (!mounted) return null

  return (
    <span className={`${className} inline-block`}>
      {displayText}
      <span className="border-r-2 border-primary ml-1 animate-pulse">|</span>
    </span>
  )
}
