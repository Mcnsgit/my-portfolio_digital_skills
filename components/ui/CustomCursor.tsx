'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(checkTouch);
    
    if (checkTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    // Hover effects
    const handleMouseEnter = () => {
      cursor.classList.add('hover');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
    };

    // Add listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <div 
      ref={cursorRef}
      className="custom-cursor hidden md:block"
    />
  );
}
