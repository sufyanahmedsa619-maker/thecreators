import React, { useState, useEffect, useMemo, useRef } from 'react';

interface RotatingTextProps {
  texts: string[];
  className?: string;
  prefix?: string;
  suffix?: string;
}

const RotatingText: React.FC<RotatingTextProps> = ({ texts, className, prefix, suffix }) => {
  const [index, setIndex] = useState(0);
  type AnimationState = 'in' | 'out' | 'reset';
  const [animationState, setAnimationState] = useState<AnimationState>('in');
  
  const [widths, setWidths] = useState({
    prefix: 0,
    longestWord: 0,
    currentWord: 0,
  });
  const [isMeasured, setIsMeasured] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const prefixRef = useRef<HTMLSpanElement>(null);
  const wordSizerRef = useRef<HTMLSpanElement>(null);
  const longestWordSizerRef = useRef<HTMLSpanElement>(null);

  const longestText = useMemo(() => {
    if (!texts || texts.length === 0) return '';
    return texts.reduce((a, b) => (a.length > b.length ? a : b));
  }, [texts]);

  const currentText = texts[index];

  useEffect(() => {
    const animationDuration = 600;
    const displayDuration = 2000;

    const intervalId = setInterval(() => {
      setAnimationState('out');

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setAnimationState('reset');
        
        setTimeout(() => {
          setAnimationState('in');
        }, 20);

      }, animationDuration);
    }, displayDuration + animationDuration);

    return () => clearInterval(intervalId);
  }, [texts.length]);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's `md` breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (prefixRef.current && wordSizerRef.current && longestWordSizerRef.current) {
      setWidths({
        prefix: prefixRef.current.offsetWidth,
        currentWord: wordSizerRef.current.offsetWidth,
        longestWord: longestWordSizerRef.current.offsetWidth,
      });
      if (!isMeasured) setIsMeasured(true);
    }
  }, [currentText, isMeasured, isMobile]);

  const words = currentText.split(' ');
  let charCount = 0;

  const animationClass = {
    'in': 'state-in',
    'out': 'state-out',
    'reset': 'state-reset'
  }[animationState];

  const stableContainerWidth = widths.prefix + widths.longestWord + (prefix ? 8 : 0); // 8px for margin

  const AnimatedText = useMemo(() => (
    <div className="absolute inset-0 flex justify-start items-center">
        <span className="text-rotate">
        <span className="text-rotate-sr-only">{currentText}</span>
        <span
            aria-hidden="true"
            className={animationClass}
        >
            {words.map((word, wordIndex) => (
            <React.Fragment key={wordIndex}>
                <span className="text-rotate-word">
                {word.split('').map((char, charIndex) => {
                    const delay = (charCount + charIndex) * 40;
                    charCount++;
                    return (
                    <span
                        key={charIndex}
                        className="text-rotate-element"
                        style={{ transitionDelay: `${delay}ms` }}
                    >
                        {char}
                    </span>
                    );
                })}
                </span>
                {(() => { charCount++; return null; })()}
                {wordIndex < words.length - 1 && <span className="text-rotate-space">&nbsp;</span>}
            </React.Fragment>
            ))}
        </span>
        </span>
    </div>
  ), [currentText, animationClass]);


  return (
    <>
      {/* Invisible sizers to measure text widths without affecting layout */}
      <div className="invisible fixed top-[-9999px] left-[-9999px]">
        <span ref={prefixRef} className={`whitespace-pre font-bold ${className}`}>{prefix}</span>
        <span ref={wordSizerRef} className={`whitespace-pre ${className}`}>{currentText}</span>
        <span ref={longestWordSizerRef} className={`whitespace-pre ${className}`}>{longestText}</span>
      </div>

      <div 
        className={`flex justify-center items-center ${className}`}
        style={{
          minHeight: isMobile ? '3.5em' : '1.5em', // Prevent vertical layout shift
          opacity: isMeasured ? 1 : 0, // Fade in smoothly after measurement
          transition: 'opacity 0.2s',
        }}
      >
        {isMobile ? (
            <div className="text-center">
                {prefix && <span className="font-bold prefix-glow block mb-1">{prefix}</span>}
                <div 
                    className="relative transition-[width] duration-400 ease-in-out mx-auto" 
                    style={{ height: '1.5em', width: `${widths.currentWord}px` }}
                >
                   {AnimatedText}
                </div>
            </div>
        ) : (
            <div 
            className="flex items-center" 
            style={{ width: `${stableContainerWidth}px` }}
            >
            {prefix && <span className="mr-2 font-bold prefix-glow">{prefix}</span>}
            
            <div 
                className="relative transition-[width] duration-400 ease-in-out" 
                style={{ height: '1.5em', width: `${widths.currentWord}px` }}
            >
                {AnimatedText}
            </div>
            {suffix && <span className="ml-2">{suffix}</span>}
            </div>
        )}
      </div>
      <style>{`
        .prefix-glow {
          color: #fff;
          text-shadow: 0 0 5px rgba(219, 39, 119, 0.6), 
                       0 0 10px rgba(219, 39, 119, 0.4), 
                       0 0 20px rgba(219, 39, 119, 0.2);
        }
      
        .text-rotate {
          display: inline-flex;
          position: relative;
        }

        .text-rotate-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .text-rotate-word {
          display: inline-flex;
        }
        
        .text-rotate-space {
          white-space: pre;
        }

        .text-rotate-element {
          display: inline-block;
          opacity: 0;
          transform: translateY(110%);
          color: #cffafe; /* Light cyan */
          text-shadow: 0 0 5px rgba(5, 238, 255, 0.6), 
                       0 0 10px rgba(5, 238, 255, 0.4), 
                       0 0 20px rgba(5, 238, 255, 0.2);
        }
        
        /* State for instantly resetting position without animation */
        .state-reset .text-rotate-element {
          transition: none;
        }
        
        /* States for animated transitions */
        .state-in .text-rotate-element,
        .state-out .text-rotate-element {
          transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
        }
        
        .state-in .text-rotate-element {
          transform: translateY(0%);
          opacity: 1;
        }
        
        .state-out .text-rotate-element {
          transform: translateY(-110%);
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default RotatingText;