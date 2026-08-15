'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
}

export default function TextReveal({ 
  children, 
  className = '', 
  as: Component = 'h2',
  delay = 0 
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const words = children.split(' ');

  return (
    <Component 
      ref={containerRef as any} 
      className={`flex flex-wrap ${className}`}
      aria-label={children}
    >
      {words.map((word, index) => (
        <span 
          key={`${word}-${index}`} 
          className="overflow-hidden inline-flex mr-[0.25em] last:mr-0 pb-1"
        >
          <span
            className="inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              opacity: isVisible ? 1 : 0,
              transitionDelay: `${delay + index * 50}ms`
            }}
            aria-hidden="true"
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
