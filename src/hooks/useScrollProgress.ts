'use client';

import { useState, useEffect } from 'react';

export function useScrollProgress() {
  const [scrollData, setScrollData] = useState({
    progress: 0,
    scrollY: 0,
    direction: 'down' as 'up' | 'down',
  });

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? currentScrollY / scrollHeight : 0;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      setScrollData({
        progress,
        scrollY: currentScrollY,
        direction: currentScrollY === lastScrollY ? scrollData.direction : direction,
      });

      lastScrollY = currentScrollY;
    };

    const handleScroll = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial setup
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return scrollData;
}
