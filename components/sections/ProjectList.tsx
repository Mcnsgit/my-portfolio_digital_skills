"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/data';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);


export default function ProjectList() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          }
        }
      );

      // Project cards with parallax
      projectRefs.current.forEach((project) => {
        if (project) {
          const image = project.querySelector('.project-image');
          const content = project.querySelector('.project-content');
          
          // Content reveal
          gsap.fromTo(content,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: project,
                start: 'top 75%',
              }
            }
          );

          // Parallax on image
          if (image) {
            gsap.fromTo(image,
              { y: '10%' },
              {
                y: '-10%',
                ease: 'none',
                scrollTrigger: {
                  trigger: project,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
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
      className="relative w-full min-h-screen bg-dark py-24 md:py-32 z-40"
    >
      <div className="px-6 md:px-16 lg:px-24">
        {/* Heading */}
        <h2 
          ref={headingRef}
          className="text-section text-white font-bold tracking-tighter mb-16 md:mb-24 will-change-transform"
        >
          SELECTED WORKS
        </h2>
        
        {/* Projects List */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project: (typeof projects)[number], index: number) => (
            <div
              key={project.id}
              ref={el => { projectRefs.current[index] = el; }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center will-change-transform ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <h3 className="text-project text-white font-bold tracking-tight group cursor-pointer">
  <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-4 hover:gap-6 transition-all duration-300">
    {project.title}
    <ArrowUpRight className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" />
  </Link>
</h3>
              {/* Image */}
              <div 
                className={`project-content ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="project-image-wrapper relative aspect-16/10 overflow-hidden rounded-lg bg-white/5">
                  <img
                    src={project.coverImage || ''}
                    alt={project.title}
                    className="project-image absolute inset-0 w-full h-full object-cover will-change-transform"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              
              {/* Content */}
              <div 
                className={`project-content ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <div className="space-y-6">
                  {/* Number */}
                  <div className="text-white/30 text-sm font-mono">
                    0{project.id}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-project text-white font-bold tracking-tight group cursor-pointer">
                    <span className="inline-flex items-center gap-4 hover:gap-6 transition-all duration-300">
                      {project.title}
                      <ArrowUpRight className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" />
                    </span>
                  </h3>
                  
                  {/* Category */}
                  <p className="text-steel text-lg font-medium">
                    {project.category}
                  </p>
                  
                  {/* Description */}
                  <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.tags && project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-4 py-2 border border-white/20 rounded-full text-white/60 text-sm hover:border-white/40 hover:text-white transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View All Link */}
        <div className="mt-24 md:mt-32 text-center">
          <a 
            href="#"
            className="inline-flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
          >
            <span className="text-lg">View All Projects</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
