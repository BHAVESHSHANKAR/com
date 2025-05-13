import { useEffect, useRef, useState } from 'react';

/**
 * Hook to handle scroll animations for components
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Percentage of element that must be visible to trigger animation (0-1)
 * @param {number} options.rootMargin - Margin around the root (in pixels)
 * @param {boolean} options.once - Whether to only trigger the animation once
 * @returns {Object} - Reference and isVisible state
 */
export default function useScrollAnimation({
  threshold = 0.1,
  rootMargin = '0px',
  once = true
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);
  
  useEffect(() => {
    // Skip animation during LCP optimization
    if (document.documentElement.classList.contains('loading')) {
      return;
    }
    
    const currentRef = ref.current;
    if (!currentRef) return;
    
    // Reuse observer instance when possible
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          // Use requestAnimationFrame to batch UI updates
          requestAnimationFrame(() => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
                if (once) {
                  observerRef.current?.unobserve(entry.target);
                }
              } else if (!once) {
                setIsVisible(false);
              }
            });
          });
        },
        {
          root: null,
          rootMargin,
          threshold
        }
      );
    }
    
    observerRef.current.observe(currentRef);
    
    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once]);
  
  return { ref, isVisible };
} 