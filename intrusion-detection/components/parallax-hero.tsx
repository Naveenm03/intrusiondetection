"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ParallaxHeroProps {
  title: string
  description: string
}

export function ParallaxHero({ title, description }: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX / width - 0.5) * 20
      const y = (clientY / height - 0.5) * 20

      const elements = containerRef.current.querySelectorAll(".parallax-element")
      elements.forEach((el, index) => {
        const depth = index + 1
        const translateX = x * depth
        const translateY = y * depth
        ;(el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-background to-secondary p-8 text-foreground container mx-auto"
    >
      <div className="parallax-element absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10" />
      <div className="parallax-element absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-warning/10" />
      <div className="parallax-element absolute bottom-10 right-10 h-32 w-32 rounded-full bg-destructive/10" />

      <div className="relative z-10">
        <motion.h1
          className="mb-4 text-4xl font-bold text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="max-w-2xl text-lg text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  )
}

