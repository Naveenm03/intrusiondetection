"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Environment } from "@react-three/drei"
import * as THREE from "three"

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load("/assets/3d/texture_earth.jpg")

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  )
}

interface GlobeProps {
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function Globe({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: GlobeProps) {
  return (
    <div className="scene-container">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <group scale={scale} position={new THREE.Vector3(...position)} rotation={new THREE.Euler(...rotation)}>
          <GlobeMesh />
        </group>
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

