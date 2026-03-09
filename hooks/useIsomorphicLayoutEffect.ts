import { useEffect, useLayoutEffect } from 'react';

// Runs pre-paint in browser, preventing FOUC, but doesn't break Next.js SSR
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;