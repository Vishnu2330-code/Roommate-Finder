import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Tracks window scroll position, direction, progress percentage, and scroll states.
 * Throttled using requestAnimationFrame for 60/120fps performance.
 */
export function useScrollPosition(threshold = 20) {
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    scrollProgress: 0,
    scrollDirection: 'none', // 'up' | 'down' | 'none'
    isScrolled: false,
  });

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
          );
          const progress = Math.min(Math.max((currentScrollY / maxScroll) * 100, 0), 100);
          const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';

          setScrollState({
            scrollY: currentScrollY,
            scrollProgress: progress,
            scrollDirection: direction,
            isScrolled: currentScrollY > threshold,
          });

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrollState;
}

/**
 * Hook to trigger animations when element enters viewport using IntersectionObserver.
 */
export function useInView(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}

/**
 * Scroll spy hook: detects which section element ID is currently visible in viewport.
 */
export function useScrollSpy(sectionIds = [], offset = 120) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  const checkSection = useCallback(() => {
    const scrollPosition = window.scrollY + offset;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const id = sectionIds[i];
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        if (scrollPosition >= top) {
          setActiveSection(id);
          return;
        }
      }
    }
    if (sectionIds.length > 0) {
      setActiveSection(sectionIds[0]);
    }
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener('scroll', checkSection, { passive: true });
    checkSection();
    return () => window.removeEventListener('scroll', checkSection);
  }, [checkSection]);

  return activeSection;
}

/**
 * Count up animation hook for statistics when scrolled into view.
 */
export function useCountUp(endValue, duration = 1600, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;
    let animationFrame;

    // Support numbers passed as strings e.g. "420"
    const parsedTarget = typeof endValue === 'number' ? endValue : parseFloat(endValue) || 0;
    const isDecimal = String(endValue).includes('.');

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out expo formula for snappy, luxurious feel
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easeOut * parsedTarget;

      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(parsedTarget);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [endValue, duration, trigger]);

  return count;
}
