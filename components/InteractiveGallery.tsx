import React, { useState, useRef, useCallback, useEffect } from 'react';

interface InteractiveGalleryProps {
  images: string[];
  onImageSelect?: (index: number) => void;
}

const InteractiveGallery: React.FC<InteractiveGalleryProps> = ({ images, onImageSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragInfo, setDragInfo] = useState({
    isDragging: false,
    startX: 0,
    currentX: 0,
  });
  const [isHovered, setIsHovered] = useState(false);
  // Dynamic transition duration for momentum effects
  const [transitionDuration, setTransitionDuration] = useState(500);

  const containerRef = useRef<HTMLDivElement>(null);
  const wasDragged = useRef(false);
  
  // Refs for velocity calculation
  const lastDragX = useRef(0);
  const lastDragTime = useRef(0);
  const velocityRef = useRef(0);

  // Circular navigation helpers
  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-scroll functionality
  useEffect(() => {
    // Pause auto-scroll if dragging or user is hovering
    if (dragInfo.isDragging || isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Auto-advance every 3 seconds

    return () => clearInterval(interval);
  }, [dragInfo.isDragging, isHovered, handleNext]);

  // Drag handlers
  const handleDragStart = useCallback((x: number) => {
    setDragInfo({ isDragging: true, startX: x, currentX: x });
    wasDragged.current = false;
    
    // Reset velocity tracking
    lastDragX.current = x;
    lastDragTime.current = Date.now();
    velocityRef.current = 0;
    
    // Reset duration to standard for dragging feel
    setTransitionDuration(0); 
  }, []);

  const handleDragMove = useCallback((x: number) => {
    if (!dragInfo.isDragging) return;
    
    const now = Date.now();
    const dt = now - lastDragTime.current;
    const dx = x - lastDragX.current;
    
    // Calculate instantaneous velocity (pixels per ms) with simple smoothing
    if (dt > 0) {
        const v = dx / dt;
        // Low-pass filter to smooth out jitter
        velocityRef.current = 0.7 * v + 0.3 * velocityRef.current;
    }
    
    lastDragTime.current = now;
    lastDragX.current = x;

    if (Math.abs(x - dragInfo.startX) > 5) {
      wasDragged.current = true;
    }
    setDragInfo(prev => ({ ...prev, currentX: x }));
  }, [dragInfo.isDragging, dragInfo.startX]);

  const handleDragEnd = useCallback(() => {
    if (!dragInfo.isDragging) return;

    const dragDistance = dragInfo.currentX - dragInfo.startX;
    const velocity = velocityRef.current;
    
    setDragInfo({ isDragging: false, startX: 0, currentX: 0 });
    
    const absVel = Math.abs(velocity);
    const absDist = Math.abs(dragDistance);
    
    // Determine direction: 
    // Velocity wins if it's significant, otherwise drag distance.
    // Negative velocity/distance means dragging left -> goes to NEXT image.
    // Positive velocity/distance means dragging right -> goes to PREV image.
    const moveDir = absVel > 0.2 
        ? (velocity < 0 ? 1 : -1) 
        : (dragDistance < 0 ? 1 : -1);

    let steps = 0;
    
    // Logic for number of steps based on velocity (Momentum)
    if (absVel > 2.5) {
        steps = 4; // Very fast flick
    } else if (absVel > 1.5) {
        steps = 3; // Fast flick
    } else if (absVel > 0.6) {
        steps = 2; // Medium flick
    } else if (absDist > 50) {
        steps = 1; // Slow drag but crossed threshold
    }
    
    if (steps > 0) {
        // Use a faster transition for the momentum phase
        setTransitionDuration(300);
        
        let currentStep = 0;
        
        const tick = () => {
            if (moveDir === 1) handleNext();
            else handlePrev();
            
            currentStep++;
            if (currentStep < steps) {
                // Schedule next step. Time between steps creates the "spin" speed feel.
                setTimeout(tick, 150); 
            } else {
                // After momentum finishes, restore default duration
                setTimeout(() => setTransitionDuration(500), 300);
            }
        };
        tick();
    } else {
        // Snap back if threshold not met
        setTransitionDuration(500);
    }

    // Prevent immediate clicks
    setTimeout(() => { wasDragged.current = false; }, 100);
  }, [dragInfo, handleNext, handlePrev]);

  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => { 
      setIsHovered(false);
      if (dragInfo.isDragging) handleDragEnd(); 
  };

  const onTouchStart = (e: React.TouchEvent) => {
      setIsHovered(true); 
      handleDragStart(e.touches[0].clientX);
  }
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => {
      handleDragEnd();
      setTimeout(() => setIsHovered(false), 3000);
  };

  const handleCardClick = (index: number, offset: number) => {
    if (wasDragged.current) return;

    if (offset === 0) {
      if (onImageSelect) {
        onImageSelect(index);
      }
    } else if (offset === -1) {
      setTransitionDuration(500);
      handlePrev();
    } else if (offset === 1) {
      setTransitionDuration(500);
      handleNext();
    }
  };

  // Helper to determine relative position in a circular list
  const getOffset = (index: number) => {
    const len = images.length;
    let diff = (index - currentIndex) % len;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  return (
    <>
      <div 
        className="relative w-full group select-none"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          ref={containerRef}
          className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing perspective-1000"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.map((src, index) => {
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);
            
            // Only render visible cards (center, prev, next, and maybe one more layer for smoothness)
            if (absOffset > 2) return null; 

            let zIndex = 10;
            let scale = 0.8;
            let opacity = 0;
            let translateX = '0%';
            let rotateY = '0deg';
            let brightness = 0.5;

            if (offset === 0) {
                zIndex = 30;
                scale = 1;
                opacity = 1;
                translateX = '0%';
                brightness = 1;
            } else if (offset === -1) {
                zIndex = 20;
                scale = 0.85;
                opacity = 1;
                translateX = '-60%';
                rotateY = '15deg';
                brightness = 0.6;
            } else if (offset === 1) {
                zIndex = 20;
                scale = 0.85;
                opacity = 1;
                translateX = '60%';
                rotateY = '-15deg';
                brightness = 0.6;
            } else {
                // Just offscreen for transition smoothness
                zIndex = 5;
                scale = 0.7;
                opacity = 0;
                translateX = offset < 0 ? '-120%' : '120%';
            }
            
            // Apply drag offset only to visible elements for a "elastic" feel
            const dragPx = dragInfo.isDragging ? (dragInfo.currentX - dragInfo.startX) : 0;
            const dragPercent = (dragPx / (containerRef.current?.offsetWidth || 500)) * 100;
            
            // Simplified transform calc
            const transform = `translate3d(calc(-50% + ${translateX} + ${dragPercent}%), -50%, 0) scale(${scale}) rotateY(${rotateY})`;
            
            // Determine transition style: instant when dragging, smooth otherwise
            const transitionStyle = dragInfo.isDragging 
                ? 'none' 
                : `all ${transitionDuration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;

            return (
              <div
                key={src + index}
                className="absolute top-1/2 left-1/2 w-[70%] md:w-[45%] max-w-[450px] aspect-[4/3] rounded-2xl bg-neutral-900 shadow-2xl shadow-black/80 origin-center will-change-transform"
                style={{
                  transform,
                  zIndex,
                  opacity,
                  filter: `brightness(${brightness})`,
                  transition: transitionStyle,
                }}
                onClick={() => handleCardClick(index, offset)}
                onContextMenu={(e) => e.preventDefault()}
              >
                {/* Protective Layer for click handling */}
                <div className="absolute inset-0 z-10"></div>
                <img
                  src={src}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl pointer-events-none select-none"
                  draggable="false"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <button
            onClick={(e) => { e.stopPropagation(); setTransitionDuration(500); handlePrev(); }}
            aria-label="Previous image"
            className="absolute top-1/2 left-2 md:left-8 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-pink-600/80 backdrop-blur-sm rounded-full text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 z-40 shadow-lg hover:scale-110"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
            onClick={(e) => { e.stopPropagation(); setTransitionDuration(500); handleNext(); }}
            aria-label="Next image"
            className="absolute top-1/2 right-2 md:right-8 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-pink-600/80 backdrop-blur-sm rounded-full text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 z-40 shadow-lg hover:scale-110"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-2 mt-4 flex-wrap px-4">
        {images.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to image ${index + 1}`}
            onClick={() => { setTransitionDuration(500); setCurrentIndex(index); }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-pink-500 w-6' : 'bg-neutral-600 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
      <style>{`
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>
    </>
  );
};

export default InteractiveGallery;