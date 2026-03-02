"use client";

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {

    useEffect(() => {
        // A11y: Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
          // Bail out of smooth scroll for accessibility
          return;
        }
    
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
        });
    
        lenis.on('scroll', ScrollTrigger.update);
    
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0, 0);
    
        return () => {
          lenis.destroy();
          gsap.ticker.remove(lenis.raf);
        };
      },[]);
    
      return <>{children}</>;
    }