'use client';

import { useState, useEffect } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    let animationFrameId: number;
    let currentX = 0;
    let currentY = 0;

    const updatePosition = () => {
      setMousePosition({
        x: currentX,
        y: currentY,
        normalizedX: (currentX / window.innerWidth) * 2 - 1,
        normalizedY: -(currentY / window.innerHeight) * 2 + 1,
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      currentX = event.clientX;
      currentY = event.clientY;
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Initial call just to have defaults if possible
    if (typeof window !== 'undefined') {
       currentX = window.innerWidth / 2;
       currentY = window.innerHeight / 2;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return mousePosition;
}
