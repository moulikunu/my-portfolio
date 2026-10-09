import { useState, useEffect, useRef } from 'react';

export function useScrollProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // When the top of element is at top of window: scrolled = -elementTop
      // Total scrollable distance within the container before bottom reaches bottom of viewport:
      const totalScrollable = elementHeight - windowHeight;

      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }

      // Compute progress: 0 when elementTop is at 0, 1 when element is fully scrolled through
      const scrolled = -elementTop;
      const rawProgress = scrolled / totalScrollable;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return { ref, progress };
}
