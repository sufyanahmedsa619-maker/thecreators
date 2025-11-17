import React, { useRef, useCallback, ReactNode } from 'react';

interface ClickSparkProps {
  children: ReactNode;
}

const ClickSpark: React.FC<ClickSparkProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const colors = ["#e11d48", "#db2777", "#c026d3", "#9333ea", "#7c3aed", "#4f46e5", "#2563eb", "#0ea5e9", "#06b6d4", "#14b8a6", "#22c55e", "#84cc16"];

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 15; i++) {
      const spark = document.createElement('div');
      spark.className = 'click-spark-particle';
      const color = colors[Math.floor(Math.random() * colors.length)];
      spark.style.backgroundColor = color;

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 50 + 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);

      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      
      container.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }, [colors]);

  return (
    <div ref={containerRef} onClick={handleClick} className="relative w-full">
      <style>{`
        .click-spark-particle {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: click-spark-anim 0.6s forwards;
        }
        @keyframes click-spark-anim {
          from {
            transform: translate(-50%, -50%) translate(0, 0) scale(1);
            opacity: 1;
          }
          to {
            transform: translate(-50%, -50%) translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }
      `}</style>
      {children}
    </div>
  );
};

export default ClickSpark;
