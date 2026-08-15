'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

export default function MagneticButton({
  children,
  className = '',
  href,
  variant = 'primary',
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate distance from center
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // If mouse is within 100px radius of the button
      if (distance < 100) {
        // Move towards cursor, proportional to distance but capped
        setPosition({
          x: distanceX * 0.4,
          y: distanceY * 0.4
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 rounded-full font-medium transition-all duration-300 outline-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] border border-white/10",
    secondary: "bg-transparent border border-white/20 text-white hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const InnerContent = (
    <div 
      ref={buttonRef}
      className="inline-block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s linear'
      }}
    >
      {href ? (
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      ) : (
        <button className={combinedClassName} {...props}>
          {children}
        </button>
      )}
    </div>
  );

  return InnerContent;
}
