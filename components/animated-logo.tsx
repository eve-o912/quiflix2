"use client"

import { useEffect, useRef, useState } from "react"

export function AnimatedLogo() {
  const logoRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const logo = logoRef.current
    if (!logo) return

    // Initial animation on load
    setTimeout(() => {
      logo.classList.add("logo-initial")
    }, 100)
  }, [])

  return (
    <div
      ref={logoRef}
      className={`logo-container relative cursor-pointer ${isHovered ? "logo-hover" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <span className="text-3xl font-extrabold netflix-logo-text-black">QUI</span>
        <span className="text-3xl font-extrabold netflix-logo-text-maroon">FLIX</span>
      </div>
    </div>
  )
}
