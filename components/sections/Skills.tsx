// components/sections/Skills.tsx
'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { skillCategories } from '@/lib/skillsData';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export default function Skills() {
  const sectionRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-card", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-16 lg:px-24 border-t border-border bg-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-on-dark-muted mb-16">Expertise & Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isFeatured = index === 0;
            return (
              <div
                key={index}
                className={`skill-card bg-dark-elevated border border-border rounded-xl hover:border-on-dark-muted/40 transition-colors flex flex-col min-h-[180px] ${
                  isFeatured ? 'lg:col-span-2 lg:flex-row lg:items-center lg:gap-12 p-8 lg:p-10' : 'p-8'
                }`}
              >
                <div className={`flex items-center gap-4 ${isFeatured ? 'mb-6 lg:mb-0 lg:shrink-0' : 'mb-6'}`}>
                  <div className={`bg-muted rounded-lg text-on-dark shrink-0 ${isFeatured ? 'p-4' : 'p-3'}`}>
                    <IconComponent size={isFeatured ? 32 : 24} />
                  </div>
                  <h3 className={`font-bold text-on-dark tracking-tight ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                    {category.title}
                  </h3>
                </div>
                <ul className={`space-y-2 flex-1 min-h-0 ${isFeatured ? 'lg:columns-2 lg:gap-x-8' : 'space-y-3'}`}>
                  {category.skills.map((skill, i) => (
                    <li key={i} className="text-on-dark-muted flex items-center gap-2 text-sm md:text-base py-1">
                      <span className="w-1.5 h-1.5 bg-on-dark-muted/60 rounded-full shrink-0" aria-hidden />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}