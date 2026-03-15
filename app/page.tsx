'use client';

import { useState } from 'react';

// Components
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/ui/CustomCursor';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/Abouts';
import Skills from '@/components/sections/Skills';
import ProjectList from '@/components/sections/ProjectList';
import Contact from '@/components/sections/Contact';

// Hooks
import { useScrollSnap } from '@/hooks/useScrollSnap';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Activate scroll snapping once loading is complete
  useScrollSnap(!isLoading);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <ProjectList />
        <Contact />
      </main>
    </>
  );
}
