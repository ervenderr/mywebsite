"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { User } from "lucide-react"

export default function ProfileImage() {
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading to ensure client-side rendering
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <span className="sr-only">Loading profile image</span>
        <div className="animate-pulse rounded-full bg-muted-foreground/20 w-3/4 h-3/4"></div>
      </div>
    )
  }

  if (imageError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted">
        <User className="h-24 w-24 text-muted-foreground" />
      </div>
    )
  }

  return (
    <Image
      src="/placeholder.svg?height=320&width=320&text=EI"
      alt="Erven Idjad"
      width={320}
      height={320}
      className="object-cover w-full h-full"
      priority
      onError={() => setImageError(true)}
    />
  )
}
