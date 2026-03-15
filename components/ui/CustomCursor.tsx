'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  // Use a lazy initializer to check for touch device only on the client
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches;
  });

  useEffect(() => {
    if (isTouch) return;

    const cursor = document.querySelector('.custom-cursor');
    const cursorInner = document.querySelector('.custom-cursor-inner');
    
    if (!cursor || !cursorInner) return;

    // Set initial position
    gsap.set([cursor, cursorInner], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      // Main cursor with slight lag
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });

      // Dot with no lag
      gsap.to(cursorInner, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power3.out',
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer');
      
      if (isLink) {
        gsap.to(cursor, {
          scale: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          duration: 0.3,
        });
        gsap.to(cursorInner, {
          scale: 0.5,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        duration: 0.3,
      });
      gsap.to(cursorInner, {
        scale: 1,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      <div className="custom-cursor fixed top-0 left-0 w-10 h-10 border border-on-dark/20 rounded-full pointer-events-none z-9999 mix-blend-difference hidden md:block" />
      <div className="custom-cursor-inner fixed top-0 left-0 w-1.5 h-1.5 bg-on-dark rounded-full pointer-events-none z-9999 mix-blend-difference hidden md:block" />
    </>
  );
}
