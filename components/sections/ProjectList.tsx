"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { projects } from '@/lib/data';
import Link from 'next/link';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

export default function ProjectList() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
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
          className="text-section text-on-dark font-bold tracking-tighter mb-16 md:mb-24 will-change-transform"
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
              {/* Single h3 with link (avoids duplicate heading) */}
              <h3 className="text-project text-on-dark font-bold tracking-tight group cursor-pointer">
                <Link href={`/projects/${project.id}`} className="inline-flex items-center gap-4 hover:gap-6 transition-all duration-300">
                  {project.title}
                  <ArrowUpRight className="w-8 h-8 text-on-dark-muted group-hover:text-on-dark transition-colors" />
                </Link>
              </h3>
              {/* Image */}
              <div
                className={`project-content ${index % 2 === 1 ? 'lg:order-2' : ''}`}
              >
                <div className="project-image-wrapper relative aspect-16/10 overflow-hidden rounded-lg bg-muted/20">
                  <Image
                    src={project.coverImage || ''}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="project-image object-cover will-change-transform"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-dark/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Content */}
              <div
                className={`project-content ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              >
                <div className="space-y-6">
                  <div className="text-on-dark-muted text-sm font-mono">
                    0{project.id}
                  </div>
                  <p className="text-steel text-lg font-medium">
                    {project.category}
                  </p>
                  <p className="text-on-dark-muted text-base md:text-lg leading-relaxed max-w-lg">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-4">
                    {project.tags && project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 border border-on-dark-muted/40 rounded-full text-on-dark-muted text-sm hover:border-on-dark-muted hover:text-on-dark transition-colors cursor-default"
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
        
        {/* View All — placeholder until projects index page exists */}
        <div className="mt-24 md:mt-32 text-center">
          <button
            aria-label="View all projects (coming soon)"
            className="inline-flex items-center gap-3 text-on-dark-muted cursor-not-allowed group"
            disabled
          >
            <span className="text-lg uppercase tracking-widest font-bold">View All Projects</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
