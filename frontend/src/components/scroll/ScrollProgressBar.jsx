import React from 'react';
import { useScrollPosition } from '../../hooks/useScrollAnimations';

export default function ScrollProgressBar() {
  const { scrollProgress, isScrolled } = useScrollPosition(10);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 1000,
        pointerEvents: 'none',
        background: 'transparent',
      }}
      aria-hidden="true"
    >
      <div
        style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent-purple) 50%, var(--accent-cyan) 100%)',
          boxShadow: isScrolled
            ? '0 0 12px rgba(99, 102, 241, 0.7), 0 0 4px rgba(6, 182, 212, 0.9)'
            : 'none',
          transition: 'width 0.08s ease-out, opacity 0.3s ease',
          opacity: isScrolled ? 1 : 0,
          position: 'relative',
        }}
      >
        {/* Glow bead at the tip */}
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '-2px',
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 0 8px #06b6d4, 0 0 14px #6366f1',
          }}
        />
      </div>
    </div>
  );
}
