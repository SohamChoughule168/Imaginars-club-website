'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useMousePosition } from '@/hooks/useMousePosition';

const Particles = React.memo(() => {
  const pointsRef = useRef<THREE.Points>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  const particleCount = 2500;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, [particleCount]);

  const sizes = useMemo(() => {
    const s = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      s[i] = Math.random() * 0.05 + 0.01;
    }
    return s;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      
      // Parallax effect on mouse move
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, normalizedX * 1.5, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, normalizedY * 1.5, 0.05);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#06B6D4"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
});
Particles.displayName = 'Particles';

const CentralShape = React.memo(() => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color="#7C3AED"
          metalness={0.8}
          roughness={0.2}
          wireframe={false}
          emissive="#7C3AED"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
});
CentralShape.displayName = 'CentralShape';

export const HeroSceneComponent = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <color attach="background" args={['#0A0A0F']} />
        <fog attach="fog" args={['#0A0A0F', 3, 12]} />
        
        <ambientLight intensity={0.5} color="#ffffff" />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#06B6D4" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7C3AED" />
        
        <Particles />
        <CentralShape />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default dynamic(() => Promise.resolve(HeroSceneComponent), { ssr: false });
