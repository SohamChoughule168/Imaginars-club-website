'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
import { useMousePosition } from '@/hooks/useMousePosition';

const Particles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  const particleCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30; // z
    }
    return pos;
  }, [particleCount]);

  const colors = useMemo(() => {
    const col = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color('#7C3AED');
    const color2 = new THREE.Color('#06B6D4');
    
    for (let i = 0; i < particleCount; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return col;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;

      // Subtle mouse follow
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, normalizedX * 0.8, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, normalizedY * 0.8, 0.05);
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
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const ParticleFieldComponent = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#0A0A0F', 5, 20]} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default dynamic(() => Promise.resolve(ParticleFieldComponent), { ssr: false });
