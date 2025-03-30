"use client"

import { useEffect, useRef } from "react"

export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollY = window.scrollY
      const layers = containerRef.current.querySelectorAll(".parallax-layer")

      layers.forEach((layer, index) => {
        const speed = index * 0.5
        const yPos = -(scrollY * speed)
        ;(layer as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 h-full w-full overflow-hidden">
      <div className="parallax-layer" style={{ zIndex: -3 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900" />
      </div>

      <div className="parallax-layer" style={{ zIndex: -2 }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/20"
            style={{
              width: `${Math.random() * 10 + 5}rem`,
              height: `${Math.random() * 10 + 5}rem`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      <div className="parallax-layer" style={{ zIndex: -1 }}>
        <div className="absolute inset-0 bg-grid-white/[0.05]" />
      </div>
    </div>
  )
}

