// components/sections/Skills.tsx
'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '@/lib/skillsData';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
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
    <section ref={sectionRef} className="py-24 px-6 md:px-16 lg:px-24 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-16">Expertise & Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="skill-card bg-zinc-900 border border-zinc-800 rounded-xl p-8 hover:border-zinc-600 transition-colors">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-zinc-800 rounded-lg text-white">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
                </div>
                <ul className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <li key={i} className="text-zinc-400 flex items-center gap-2 text-sm md:text-base">
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full"></span>
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