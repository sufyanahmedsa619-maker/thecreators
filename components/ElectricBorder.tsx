import React from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({ children }) => {
  return (
    <>
      <div className="relative p-1">
        <div className="relative z-10">{children}</div>
        <div className="electric-border-glow"></div>
      </div>
      <style>{`
        .electric-border-glow {
          position: absolute;
          inset: 0;
          border-radius: 0.5rem; /* Match this with child's border-radius if any */
        }
        .electric-border-glow::before,
        .electric-border-glow::after {
          content: '';
          position: absolute;
          inset: -0.2rem;
          background: conic-gradient(from var(--angle), #05EEFF, #4158D0, #C850C0, #FFCC70, #05EEFF);
          border-radius: inherit;
          z-index: 0;
          animation: electric-border-spin 4s linear infinite;
        }
        .electric-border-glow::after {
          filter: blur(1.2rem);
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes electric-border-spin {
          to {
            --angle: 360deg;
          }
        }
      `}</style>
    </>
  );
};

export default ElectricBorder;
