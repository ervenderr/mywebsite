"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href^="#"]')

      if (!link) return

      e.preventDefault()

      const targetId = link.getAttribute("href")
      if (!targetId) return

      const targetElement = document.querySelector(targetId)
      if (!targetElement) return

      const headerHeight = document.querySelector("header")?.offsetHeight || 0

      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - headerHeight,
        behavior: "smooth",
      })
    }

    document.addEventListener("click", handleLinkClick)

    return () => {
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  return null
}
