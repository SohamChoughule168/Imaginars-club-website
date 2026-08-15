'use client'

import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

const CrystalObject = () => {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
      meshRef.current.rotation.x += delta * 0.1
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.mouse.x * 0.5, 0.05)
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, state.mouse.y * 0.5, 0.05)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={meshRef} scale={1.5}>
        {/* Inner Solid Core */}
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Outer Wireframe Shell - visible against black background */}
        <mesh scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial 
            color="#ffffff" 
            wireframe 
            transparent 
            opacity={0.15} 
          />
        </mesh>
      </group>
    </Float>
  )
}

export default function CrystalCore() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Cap DPR to 2 for performance
        gl={{ antialias: false, powerPreference: "high-performance" }} // Optimized WebGL context
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <directionalLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        
        <CrystalObject />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
