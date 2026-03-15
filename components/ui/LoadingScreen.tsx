// "use client";

// import { useEffect, useRef, useState } from 'react';
// import gsap from 'gsap';

// interface LoadingScreenProps {
//   onComplete: () => void;
// }

// export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const counterRef = useRef<HTMLSpanElement>(null);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     // Counter animation
//     const duration = 2000;
//     const startTime = Date.now();
    
//     const updateCounter = () => {
//       const elapsed = Date.now() - startTime;
//       const progress = Math.min(elapsed / duration, 1);
//       const currentCount = Math.floor(progress * 100);
      
//       setCount(currentCount);
      
//       if (progress < 1) {
//         requestAnimationFrame(updateCounter);
//       } else {
//         // Exit animation
//         const tl = gsap.timeline();
        
//         tl.to(containerRef.current, {
//           scaleY: 0,
//           transformOrigin: 'bottom',
//           duration: 0.8,
//           ease: 'power3.inOut',
//           onComplete: () => {
//             onComplete();
//           }
//         });
//       }
//     };
    
//     requestAnimationFrame(updateCounter);
//   }, [onComplete]);

//   return (
//     <div 
//       ref={containerRef}
//       className="loading-screen"
//     >
//       <span 
//         ref={counterRef}
//         className="loading-counter"
//       >
//         {count}%
//       </span>
//     </div>
//   );
// }
'use client';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { value: 0 }; // Create a proxy object to hold the number
      
      // Force the counter to take 2.5 seconds
      gsap.to(proxy, {
        value: 100,
        duration: 2.5, 
        ease: "power3.inOut",
        onUpdate: () => {
          setProgress(Math.round(proxy.value));
        },
        onComplete: () => {
          if (!containerRef.current) {
            onComplete();
            return;
          }
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  },[onComplete]);

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="loading-counter">{progress}%</div>
    </div>
  );
}