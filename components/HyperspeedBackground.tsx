import React, { useEffect, useRef } from 'react';

interface HyperspeedBackgroundProps {
  colors?: string[];
  speed?: number;
  className?: string;
}

const HyperspeedBackground: React.FC<HyperspeedBackgroundProps> = ({ 
  colors = ['#0ea5e9', '#ec4899'],
  speed = 1,
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;

    const lines: {
      x: number;
      y: number;
      length: number;
      speed: number;
      color: string;
      opacity: number;
    }[] = [];
    const numLines = 100;

    const initializeLines = () => {
        lines.length = 0; // Clear existing lines
        for (let i = 0; i < numLines; i++) {
            lines.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 100 + 50,
                speed: (Math.random() * 3 + 2) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.3
            });
        }
    };

    const resizeCanvas = () => {
        if (!canvas.parentElement) return;
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        initializeLines();
    };
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.parentElement);
    resizeCanvas(); // Initial call

    const animate = () => {
      if (!ctx) return;
      // Fade trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and move each line
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.globalAlpha = line.opacity;
        ctx.lineWidth = 2;
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.length, line.y);
        ctx.stroke();

        line.x += line.speed;

        // Reset line when it goes off screen
        if (line.x > canvas.width + line.length) {
          line.x = -line.length;
          line.y = Math.random() * canvas.height;
          line.color = colors[Math.floor(Math.random() * colors.length)];
        }
      });
      
      ctx.globalAlpha = 1; // Reset alpha for next frame
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (canvas.parentElement) {
          resizeObserver.unobserve(canvas.parentElement);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full z-0 ${className}`}
    />
  );
};

export default HyperspeedBackground;
