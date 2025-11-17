import React, { useEffect, useState, useCallback } from 'react';

interface Splash {
  id: number;
  x: number;
  y: number;
  color: string;
}

const colors = ["#e11d48", "#db2777", "#c026d3", "#9333ea", "#7c3aed", "#4f46e5", "#2563eb"];

const SplashCursor: React.FC = () => {
  const [splashes, setSplashes] = useState<Splash[]>([]);

  const addSplash = useCallback((e: MouseEvent) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const newSplash: Splash = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      color,
    };
    setSplashes(prev => [...prev, newSplash].slice(-15)); // Keep only the last 15 splashes
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', addSplash);
    return () => {
      window.removeEventListener('mousemove', addSplash);
    };
  }, [addSplash]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {splashes.map(splash => (
        <div
          key={splash.id}
          className="splash-element"
          style={{
            top: `${splash.y}px`,
            left: `${splash.x}px`,
            backgroundColor: splash.color,
          }}
        />
      ))}
      <style>{`
        .splash-element {
          position: absolute;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: splash-anim 0.6s forwards;
          width: 20px;
          height: 20px;
        }
        @keyframes splash-anim {
          from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SplashCursor;
