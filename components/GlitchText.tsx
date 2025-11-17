import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className }) => {
  return (
    <>
      <div className={`relative ${className}`} data-text={text}>
        {text}
      </div>
      <style>{`
        [data-text]::before,
        [data-text]::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          clip-path: inset(0 0 0 0);
        }

        [data-text]::before {
          left: -2px;
          text-shadow: 2px 0 #ff00c1;
          animation: glitch-anim-1 2.5s infinite linear alternate-reverse;
        }

        [data-text]::after {
          left: 2px;
          text-shadow: -2px 0 #00fff9;
          animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
        }

        @keyframes glitch-anim-1 {
          0% { clip-path: inset(45% 0 50% 0); }
          25% { clip-path: inset(0 0 0 0); }
          50% { clip-path: inset(80% 0 15% 0); }
          75% { clip-path: inset(50% 0 45% 0); }
          100% { clip-path: inset(10% 0 82% 0); }
        }

        @keyframes glitch-anim-2 {
          0% { clip-path: inset(70% 0 25% 0); }
          25% { clip-path: inset(100% 0 0 0); }
          50% { clip-path: inset(30% 0 62% 0); }
          75% { clip-path: inset(5% 0 90% 0); }
          100% { clip-path: inset(85% 0 5% 0); }
        }
      `}</style>
    </>
  );
};

export default GlitchText;
