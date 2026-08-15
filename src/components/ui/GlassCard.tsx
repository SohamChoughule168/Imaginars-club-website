'use client';

import React, { useRef, useState, useCallback } from 'react';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover3D?: boolean;
  glowColor?: string;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', hover3D = false, glowColor = 'rgba(124, 58, 237, 0.5)', style, ...props }, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glareX, setGlareX] = useState(50);
    const [glareY, setGlareY] = useState(50);
    const [glareOpacity, setGlareOpacity] = useState(0);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!hover3D || !cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Calculate rotation (max 15 degrees)
      const rY = ((mouseX / width) - 0.5) * 30; // -15 to 15
      const rX = -((mouseY / height) - 0.5) * 30; // -15 to 15
      
      setRotateX(rX);
      setRotateY(rY);
      
      // Calculate glare position
      setGlareX((mouseX / width) * 100);
      setGlareY((mouseY / height) * 100);
      setGlareOpacity(0.15);
    }, [hover3D]);

    const handleMouseLeave = useCallback(() => {
      if (!hover3D) return;
      setRotateX(0);
      setRotateY(0);
      setGlareOpacity(0);
    }, [hover3D]);

    // Use composed ref
    const setRef = useCallback(
      (node: HTMLDivElement) => {
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref]
    );

    const dynamicStyle: React.CSSProperties = {
      ...style,
      transform: hover3D ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` : undefined,
      transition: hover3D && rotateX === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'transform 0.1s ease-out',
      backgroundColor: 'rgba(255,255,255,0.03)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.08)',
    };

    return (
      <div
        ref={setRef}
        className={`relative overflow-hidden rounded-2xl group transition-colors duration-300 hover:border-white/20 ${className}`}
        style={dynamicStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Subtle Glow Shadow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            boxShadow: `0 0 40px ${glowColor}`,
            zIndex: -1
          }}
        />

        {/* Glossy highlight for 3D effect */}
        {hover3D && (
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
              opacity: glareOpacity,
              mixBlendMode: 'overlay',
            }}
          />
        )}
        
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
