import React, { useRef, useEffect } from 'react';

const Ribbons: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const ribbons: {
        x: number; y: number; vx: number; vy: number;
        history: {x: number, y: number}[];
        angle: number;
        color: string;
    }[] = [];
    
    const ribbonCount = 7;
    const historySize = 30;

    for (let i = 0; i < ribbonCount; i++) {
        ribbons.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0,
            vy: 0,
            history: [],
            angle: Math.random() * 360,
            color: `hsla(${Math.random() * 360}, 100%, 50%, 0.7)`
        });
    }

    const render = () => {
        ctx.clearRect(0, 0, width, height);

        ribbons.forEach(ribbon => {
            let last = ribbon.history[ribbon.history.length - 1] || {x: ribbon.x, y: ribbon.y};
            
            ribbon.angle += Math.random() * 2 - 1;
            ribbon.vx += (Math.cos(ribbon.angle * (Math.PI / 180)) - ribbon.vx) * 0.1;
            ribbon.vy += (Math.sin(ribbon.angle * (Math.PI / 180)) - ribbon.vy) * 0.1;

            ribbon.x += ribbon.vx;
            ribbon.y += ribbon.vy;

            if (ribbon.x > width) ribbon.x = 0;
            if (ribbon.x < 0) ribbon.x = width;
            if (ribbon.y > height) ribbon.y = 0;
            if (ribbon.y < 0) ribbon.y = height;

            ribbon.history.push({ x: ribbon.x, y: ribbon.y });
            if (ribbon.history.length > historySize) {
                ribbon.history.shift();
            }

            ctx.beginPath();
            ctx.strokeStyle = ribbon.color;
            ctx.lineWidth = 2;
            ctx.moveTo(ribbon.history[0].x, ribbon.history[0].y);
            for (let i = 1; i < ribbon.history.length; i++) {
                ctx.lineTo(ribbon.history[i].x, ribbon.history[i].y);
            }
            ctx.stroke();
        });

        animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default Ribbons;