"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import skillCategories from '@/data/Skills';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
          }
        }
      );

      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              }
            }
          );

          // Line draw animation
          const line = card.querySelector('.skill-line-bar');
          if (line) {
            gsap.fromTo(line,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1,
                delay: index * 0.1 + 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                }
              }
            );
          }
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-light py-24 md:py-32 z-30"
    >
      <div className="px-6 md:px-16 lg:px-24">
        {/* Heading */}
        <h2 
          ref={headingRef}
          className="text-section text-dark font-bold tracking-tighter mb-16 md:mb-24 will-change-transform"
        >
          SKILLS
        </h2>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {skillCategories.map((category, index) => (
              <div
                key={category.title}
                ref={el => { cardsRef.current[index] = el; }}
                className="group will-change-transform"
              >
                <div className="pb-6">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    {/* <div className="p-3 bg-dark/5 rounded-lg text-dark group-hover:bg-dark group-hover:text-white transition-colors duration-300">
                      {React.createElement(IconComponent, { className: 'w-6 h-6' })}
                    </div> */}
                    <h3 className="text-2xl md:text-3xl font-semibold text-dark tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                
                {/* Skills List */}
                <ul className="space-y-3">
                  {category.skills.map((skill) => (
                    <li 
                      key={skill}
                      className="text-dark/70 text-base md:text-lg flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 bg-steel rounded-full" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
              
                {/* Animated Line */}
                <div className="h-px bg-dark/10 relative overflow-hidden">
                  <div 
                    className="skill-line-bar absolute inset-y-0 left-0 bg-dark origin-left"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              </div>
            ))}
        </div>
        
        {/* Additional Info */}
        <div className="mt-20 md:mt-32 pt-12 border-t border-dark/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-dark mb-2">
                Always Learning
              </h3>
              <p className="text-dark/60 text-base max-w-xl">
                Currently exploring AI-powered design tools, WebGL shaders, and advanced animation techniques 
                to push the boundaries of digital experiences.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-dark">50+</div>
                <div className="text-dark/50 text-sm">Projects</div>
              </div>
              <div className="w-px h-12 bg-dark/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-dark">20+</div>
                <div className="text-dark/50 text-sm">Clients</div>
              </div>
              <div className="w-px h-12 bg-dark/20" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-dark">5+</div>
                <div className="text-dark/50 text-sm">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
