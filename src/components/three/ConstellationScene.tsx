'use client'

import React, { useMemo, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTICLE_COUNT = 3000

// Helper to generate text-like positions (very basic "IC" shape)
function generateICPositions(count: number) {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const isI = i < count / 2
    if (isI) {
      // Form 'I'
      pos[i * 3] = (Math.random() - 0.5) * 1 - 2 // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6 // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1 // z
    } else {
      // Form 'C'
      const angle = Math.random() * Math.PI + Math.PI / 2 // semi-circle
      const radius = 2 + Math.random() * 1
      pos[i * 3] = Math.sin(angle) * radius + 2 // x
      pos[i * 3 + 1] = Math.cos(angle) * radius // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1 // z
    }
  }
  return pos
}

// Helper to generate 6 distinct clusters
function generateClusterPositions(count: number) {
  const pos = new Float32Array(count * 3)
  const clusterCount = 6
  const particlesPerCluster = Math.floor(count / clusterCount)
  
  for (let c = 0; c < clusterCount; c++) {
    const angle = (c / clusterCount) * Math.PI * 2
    const cx = Math.sin(angle) * 8
    const cy = Math.cos(angle) * 4
    
    for (let i = 0; i < particlesPerCluster; i++) {
      const idx = c * particlesPerCluster + i
      if (idx >= count) break
      
      // Sphere around cluster center
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = Math.random() * 1.5
      
      pos[idx * 3] = cx + r * Math.sin(phi) * Math.cos(theta)
      pos[idx * 3 + 1] = cy + r * Math.sin(phi) * Math.sin(theta)
      pos[idx * 3 + 2] = (Math.random() - 0.5) * 2 + r * Math.cos(phi)
    }
  }
  return pos
}

const ConstellationParticles = () => {
  const pointsRef = useRef<THREE.Points>(null)
  
  // States
  const state0 = useMemo(() => generateICPositions(PARTICLE_COUNT), [])
  const state1 = useMemo(() => generateClusterPositions(PARTICLE_COUNT), [])
  
  const currentPositions = useMemo(() => new Float32Array(state0), [state0])
  const targetPositions = useRef(new Float32Array(state0))
  
  const sizes = useMemo(() => {
    const s = new Float32Array(PARTICLE_COUNT)
    for (let i = 0; i < PARTICLE_COUNT; i++) s[i] = Math.random() * 0.05 + 0.02
    return s
  }, [])

  // GSAP ScrollTrigger to update target positions based on scroll
  useEffect(() => {
    // We update a dummy object to lerp between states
    const proxy = { progress: 0 }
    
    ScrollTrigger.create({
      trigger: "#services-sequence",
      start: "top center",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        // If in services section, target state1 (clusters)
        if (self.progress > 0.1 && self.progress < 0.9) {
          targetPositions.current = state1
        } else {
          targetPositions.current = state0
        }
      }
    })
  }, [state0, state1])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    const geom = pointsRef.current.geometry
    const positions = geom.attributes.position.array as Float32Array
    
    // Lerp positions
    for (let i = 0; i < positions.length; i++) {
      positions[i] = THREE.MathUtils.lerp(positions[i], targetPositions.current[i], 0.03)
    }
    
    geom.attributes.position.needsUpdate = true
    
    // Slow rotation
    pointsRef.current.rotation.y += delta * 0.1
    pointsRef.current.rotation.x += delta * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
          count={PARTICLE_COUNT}
          array={currentPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#C9A34E"
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ConstellationScene() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <fog attach="fog" args={['#0A0E14', 10, 25]} />
        <ConstellationParticles />
      </Canvas>
    </div>
  )
}
