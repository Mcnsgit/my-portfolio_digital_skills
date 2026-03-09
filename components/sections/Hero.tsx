//components/sections/Hero.tsx
"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const miguelRef = useRef<HTMLDivElement>(null);
  const cardigaRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    let mm = gsap.matchMedia();

    // 1. Accessibility: Only run animations if user allows motion
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      
      // 2. Context automatically cleans up GSAP on unmount/route change
      let ctx = gsap.context(() => {
        
        const tl = gsap.timeline({ delay: 0.2 }); // Sped up the start delay slightly
        
        // Split text animation for MIGUEL
        const miguelLetters = miguelRef.current?.querySelectorAll('.letter');
        if (miguelLetters) {
          tl.fromTo(miguelLetters, 
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1, stagger: 0.05, ease: 'power3.out' },
            0
          );
        }
        
        // Split text animation for CARDIGA
        const cardigaLetters = cardigaRef.current?.querySelectorAll('.letter');
        if (cardigaLetters) {
          tl.fromTo(cardigaLetters,
            { y: '100%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1, stagger: 0.05, ease: 'power3.out' },
            0.2
          );
        }
        
        // Subtitle fade in
        tl.fromTo(subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          0.8
        );
        
        // Scroll indicator
        tl.fromTo(scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          1
        );

        // Scroll-driven exit animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
          }
        });

        // Exit animation - names split apart
        scrollTl.to(miguelRef.current, { y: '-100vh', ease: 'none' }, 0);
        scrollTl.to(cardigaRef.current, { y: '100vh', ease: 'none' }, 0);
        scrollTl.to(subtitleRef.current, { opacity: 0, y: -50, ease: 'none', immediateRender: false }, 0);
        scrollTl.to(scrollIndicatorRef.current, { opacity: 0, ease: 'none', immediateRender: false }, 0);
        scrollTl.to(containerRef.current, { opacity: 0, ease: 'none' }, 0.5);

      }, sectionRef);

      return () => ctx.revert(); // Cleanup timeline
    });

    return () => mm.revert(); // Cleanup matchMedia
  });

  const renderLetters = (text: string) => {
    return text.split('').map((letter, index) => (
      <span 
        key={index} 
        aria-hidden="true"
        className="letter inline-block"
        style={{ display: letter === ' ' ? 'inline' : 'inline-block' }}
      >
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    ));
  };


  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen bg-dark overflow-hidden z-10"
    >
      <div 
        ref={containerRef}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        {/* Main Name */}
        <div className="relative w-full px-4">
          {/* MIGUEL */}
          <div 
            ref={miguelRef}
            className="overflow-hidden will-change-transform"
          >
            <h1 aria-label="Miguel" className="text-hero text-foreground">
              {renderLetters('MIGUEL')}
            </h1>
          </div>
          
          {/* CARDIGA */}
          <div 
            ref={cardigaRef}
            className="overflow-hidden will-change-transform"
          >
            <h1 aria-label="Cardiga" className="text-hero text-foreground">
              {renderLetters('CARDIGA')}
            </h1>
          </div>
        </div>
        
        {/* Subtitle */}
        <div 
          ref={subtitleRef}
          className="mt-8 md:mt-12 overflow-hidden"
        >
          <p aria-label="Creative Developer" className="text-hero text-foreground">
            Creative Developer
          </p>
        </div>
        
        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-16 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce-subtle" />
          </div>
        </div>
      </div>
    </section>
  );
}
