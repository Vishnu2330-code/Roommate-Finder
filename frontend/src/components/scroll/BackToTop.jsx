import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollAnimations';

export default function BackToTop() {
  const { scrollY, scrollProgress } = useScrollPosition(250);
  const [hovered, setHovered] = useState(false);

  const isVisible = scrollY > 280;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG ring circumference (radius = 18)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 90,
        pointerEvents: isVisible ? 'auto' : 'none',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? hovered
            ? 'scale(1.1) translateY(-4px)'
            : 'scale(1) translateY(0)'
          : 'scale(0.7) translateY(20px)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Scroll to top"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'var(--bg-surface-elevated, #ffffff)',
          border: '1px solid var(--border-light, #e2e8f0)',
          color: 'var(--primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered
            ? '0 12px 30px -4px rgba(79, 70, 229, 0.35), 0 4px 12px rgba(15, 23, 42, 0.1)'
            : '0 6px 20px -2px rgba(15, 23, 42, 0.12)',
          position: 'relative',
          padding: 0,
          outline: 'none',
        }}
      >
        {/* SVG Circular Progress Ring */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'rotate(-90deg)',
            pointerEvents: 'none',
          }}
        >
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="var(--border-subtle, #f1f5f9)"
            strokeWidth="2.5"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            fill="none"
            stroke="url(#progress-gradient)"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
          <defs>
            <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary, #4f46e5)" />
              <stop offset="100%" stopColor="var(--accent-cyan, #06b6d4)" />
            </linearGradient>
          </defs>
        </svg>

        <ArrowUp
          size={20}
          strokeWidth={2.5}
          style={{
            transition: 'transform 0.2s ease',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
          }}
        />
      </button>
    </div>
  );
}
