"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import type * as THREE from "three"

interface IconProps {
  position: [number, number, number]
  icon: string
  color: string
  speed?: number
}

function FloatingIcon({ position, icon, color, speed = 1 }: IconProps) {
  const groupRef = useRef<THREE.Group>(null)
  const initialY = position[1]

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = initialY + Math.sin(clock.getElapsedTime() * speed) * 0.1
      // Slow rotation
      groupRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0]}
        style={{
          fontSize: "2rem",
          color: color,
          userSelect: "none",
        }}
      >
        <div className="select-none pointer-events-none">{icon}</div>
      </Html>
    </group>
  )
}

export function FloatingIcons() {
  const icons = [
    { icon: "🔒", position: [-2, 1, 0] as [number, number, number], color: "#34c759", speed: 1.2 },
    { icon: "⚠️", position: [2, -1, -1] as [number, number, number], color: "#ff3b30", speed: 0.8 },
    { icon: "🛡️", position: [0, 2, -2] as [number, number, number], color: "#34c759", speed: 1 },
    { icon: "⚡", position: [-1.5, -1.5, -1] as [number, number, number], color: "#ffcc00", speed: 1.5 },
    { icon: "🔍", position: [1.5, 1.5, -2] as [number, number, number], color: "#34c759", speed: 0.7 },
  ]

  return (
    <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        {icons.map((icon, index) => (
          <FloatingIcon key={index} position={icon.position} icon={icon.icon} color={icon.color} speed={icon.speed} />
        ))}
      </Canvas>
    </div>
  )
}
