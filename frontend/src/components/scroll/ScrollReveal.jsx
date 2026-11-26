import React from 'react';
import { useInView } from '../../hooks/useScrollAnimations';

/**
 * ScrollReveal: Wraps children with hardware-accelerated scroll-triggered animations.
 * Supports fade-up, fade-down, fade-left, fade-right, scale-up, zoom-in, blur-in, flip-up.
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  distance = '30px',
  threshold = 0.12,
  triggerOnce = true,
  className = '',
  style = {},
  as = 'div',
}) {
  const [ref, isInView] = useInView({ threshold, triggerOnce });

  const getTransform = () => {
    if (isInView) return 'none';
    switch (animation) {
      case 'fade-up':
        return `translate3d(0, ${distance}, 0)`;
      case 'fade-down':
        return `translate3d(0, -${distance}, 0)`;
      case 'fade-left':
        return `translate3d(-${distance}, 0, 0)`;
      case 'fade-right':
        return `translate3d(${distance}, 0, 0)`;
      case 'scale-up':
      case 'zoom-in':
        return 'scale(0.92) translate3d(0, 15px, 0)';
      case 'flip-up':
        return 'perspective(800px) rotateX(20deg) translate3d(0, 25px, 0)';
      default:
        return `translate3d(0, ${distance}, 0)`;
    }
  };

  const getFilter = () => {
    if (animation === 'blur-in') {
      return isInView ? 'blur(0px)' : 'blur(10px)';
    }
    return 'none';
  };

  const Component = as;

  return (
    <Component
      ref={ref}
      className={`scroll-reveal ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: getTransform(),
        filter: getFilter(),
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: isInView ? 'auto' : 'opacity, transform, filter',
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
