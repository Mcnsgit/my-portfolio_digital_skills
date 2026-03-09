//components/sections/Abouts.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
        }
      });

      // Entrance: Background slides up
      scrollTl.fromTo(bgRef.current,
        { y: '100%' },
        { y: '0%', duration: 1,ease: 'none' },
        0
      );

      scrollTl.fromTo(headingRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        0.3
      );

      scrollTl.fromTo(imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(100% at 50% 50%)', duration: 1.2, ease: 'power2.inOut' },
        0.3
      );

      scrollTl.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        0.5
      );

      // --- PHASE 2: THE "READING PAUSE" ---
      scrollTl.to(textRef.current, { y: -350, duration: 2.5, ease: 'none' }, 1.5);
        
      // Parallax effect: The image moves up too, but slightly slower than the text
      scrollTl.to(imageContainerRef.current, { y: -80, duration: 2.5, ease: 'none' }, 1.5);
      scrollTl.to(headingRef.current, { y: -40, duration: 2.5, ease: 'none' }, 1.5);

      // --- PHASE 3: EXIT ---
      // Everything fades out gracefully
      scrollTl.to([headingRef.current, textRef.current, imageContainerRef.current],
        { opacity: 0, duration: 1, ease: 'power2.inOut' },
        4.0 // Starts after the active scroll phase finishes
      );

    }, sectionRef);


    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-20"
    >
      {/* Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-light will-change-transform"
      />
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left: Text Content */}
            <div className="order-2 lg:order-1">
              <h2 
                ref={headingRef}
                className="text-section text-dark font-bold tracking-tighter mb-8 will-change-transform"
              >
                ABOUT
              </h2>
              
              <div ref={textRef} className="space-y-6 will-change-transform">
                <p className="text-dark/80 text-lg md:text-xl leading-relaxed">
                Multidisciplinary digital professional with 5+ years of experience delivering content strategy, brand identity, accessibility compliance, and user-centered design for nonprofits, social enterprises, and small businesses. Passionate about creating measurable impact through storytelling, community engagement, and inclusive digital experiences, with a focus on WCAG standards and mission-driven solutions that connect and inspire.
                </p>
                
                <p className="text-dark/70 text-base md:text-lg leading-relaxed">
                  With a background in both editting, marketing and code, I create memorable interactions that 
                  leave a lasting impact. My work spans brand identity, web development, and multimedia content design always with a focus on purpose-driven solutions.
                </p>
                
                <p className="text-dark/60 text-base leading-relaxed">
                  Currently seeking opportunities in purpose-driven tech and creative roles where 
                  I can contribute to meaningful projects while continuing to grow developer and editting skills.
                </p>
                
                <div className="pt-6 flex flex-wrap gap-4">
                  <div className="px-4 py-2 border border-dark/20 rounded-full">
                    <span className="text-dark/70 text-sm">5+ Years Experience</span>
                  </div>
                  <div className="px-4 py-2 border border-dark/20 rounded-full">
                    <span className="text-dark/70 text-sm">Greater Manchester, UK</span>
                  </div>
                  <div className="px-4 py-2 border border-dark/20 rounded-full">
                    <span className="text-dark/70 text-sm">Open to Work</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Portrait Image */}
            <div 
              ref={imageContainerRef}
              className="order-1 lg:order-2 flex justify-center lg:justify-end will-change-transform"
            >
              <div className="relative w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-112">
                <img
                  ref={imageRef}
                  src="/portrait.jpg"
                  alt="Miguel Cardiga"
                  className="w-full h-full object-cover grayscale"
                  style={{ clipPath: 'circle(0% at 50% 50%)' }}
                />
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}