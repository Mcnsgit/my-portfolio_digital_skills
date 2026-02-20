"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Counter animation
    const duration = 1500;
    const startTime = Date.now();
    
    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * 100);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Exit animation
        const tl = gsap.timeline();
        
        tl.to(containerRef.current, {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            onComplete();
          }
        });
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="loading-screen"
    >
      <span 
        ref={counterRef}
        className="loading-counter"
      >
        {count}%
      </span>
    </div>
  );
}
