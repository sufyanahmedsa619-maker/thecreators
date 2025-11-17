import React from 'react';

interface SectionHeadingProps {
  text: string;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ text, className }) => {
  return (
    <>
      <h2 className={`subtle-glitch ${className}`} data-text={text}>
        {text}
      </h2>
      <style>{`
        .subtle-glitch {
          position: relative;
          color: #00D1FF;
          text-shadow: 0 0 5px rgba(0, 209, 255, 0.5);
        }

        .subtle-glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 2px;
          top: 2px;
          color: #FF00C1;
          z-index: -1;
          opacity: 0.8;
          text-shadow: none;
          animation: subtle-glitch-anim 150ms infinite steps(1, end);
        }

        @keyframes subtle-glitch-anim {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          60% { transform: translate(-1px, 1px); }
          80% { transform: translate(1px, -2px); }
          100% { transform: translate(-2px, -1px); }
        }
      `}</style>
    </>
  );
};

export default SectionHeading;
