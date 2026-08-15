'use client';

import React, { useState } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({ 
  value, 
  suffix = '', 
  label, 
  duration = 2 
}: AnimatedCounterProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setHasStarted(true);
      }
    }
  });

  return (
    <div 
      ref={ref}
      className={`flex flex-col relative transition-transform duration-700 ease-out ${
        inView ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
      }`}
    >
      <div className="font-display text-4xl md:text-5xl font-semibold mb-2 text-primary tracking-tight">
        {hasStarted ? (
          <CountUp 
            end={value} 
            duration={duration} 
            useEasing={true}
            separator=","
          />
        ) : (
          "0"
        )}
        {suffix && <span className="ml-1">{suffix}</span>}
      </div>
      <p className="text-sm text-secondary font-medium tracking-wide uppercase">
        {label}
      </p>
    </div>
  );
}
