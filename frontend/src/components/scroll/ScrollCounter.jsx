import React from 'react';
import { useInView, useCountUp } from '../../hooks/useScrollAnimations';

/**
 * ScrollCounter: Displays numbers that smoothly count up when scrolled into the viewport.
 */
export default function ScrollCounter({
  target,
  duration = 1800,
  prefix = '',
  suffix = '',
  className = '',
  style = {},
}) {
  const [ref, isInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const count = useCountUp(target, duration, isInView);

  return (
    <span
      ref={ref}
      className={`scroll-counter ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontVariantNumeric: 'tabular-nums',
        ...style,
      }}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
