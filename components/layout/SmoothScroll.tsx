"use client";

import { useEffect, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {

    useIsomorphicLayoutEffect(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      ScrollTrigger.normalizeScroll(true);
            
      const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          eventsTarget: document.documentElement,
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