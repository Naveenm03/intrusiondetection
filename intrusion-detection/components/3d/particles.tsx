"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function ParticlesMesh() {
  const points = useRef<THREE.Points>(null)

  const particlesCount = 2000
  const positions = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }

    return positions
  }, [particlesCount])

  useFrame(() => {
    if (points.current) {
      points.current.rotation.x += 0.0003
      points.current.rotation.y += 0.0005
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={particlesCount} 
          array={positions} 
          itemSize={3}
          args={[positions, 3]} 
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#34c759" sizeAttenuation transparent opacity={0.8} />
    </points>
  )
}

export function Particles() {
  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ParticlesMesh />
      </Canvas>
    </div>
  )
}

