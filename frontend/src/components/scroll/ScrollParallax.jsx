import React, { useRef, useEffect, useState } from 'react';

/**
 * ScrollParallax: Translates child elements at subtle parallax speeds relative to scroll.
 */
export default function ScrollParallax({
  children,
  speed = 0.1, // Positive floats down slower than scroll; negative floats up faster
  direction = 'vertical', // 'vertical' | 'horizontal'
  className = '',
  style = {},
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Calculate distance relative to center of viewport
            const centerDistance = rect.top + rect.height / 2 - windowHeight / 2;
            setOffset(centerDistance * speed);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const transform =
    direction === 'vertical'
      ? `translate3d(0, ${offset.toFixed(1)}px, 0)`
      : `translate3d(${offset.toFixed(1)}px, 0, 0)`;

  return (
    <div
      ref={ref}
      className={`scroll-parallax ${className}`}
      style={{
        transform,
        willChange: 'transform',
        transition: 'transform 0.08s linear',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
