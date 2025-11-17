import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CreatorProfile } from '../types';

interface CreatorCardProps {
  roleName: string;
  bio: string;
  profiles: CreatorProfile[];
  titleColorClass: string;
  contactColorClass: string;
  borderColorClass: string;
}

const CreatorCard: React.FC<CreatorCardProps> = ({
  roleName,
  bio,
  profiles,
  titleColorClass,
  contactColorClass,
  borderColorClass
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  
  const currentProfile = profiles[currentIndex];
  const hasMultiple = profiles.length > 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  useEffect(() => {
    if (hasMultiple && !isPaused) {
      timeoutRef.current = window.setTimeout(() => {
        handleNext();
      }, 4000); // Change every 4 seconds
    }
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, isPaused, hasMultiple]);

  return (
    <div 
      className="p-6 bg-black/70 backdrop-blur-md rounded-lg text-center w-full max-w-md mx-auto transition-all duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Carousel */}
      <div className="relative w-48 h-48 mx-auto mb-6 group">
        <div className="relative w-32 h-32 mx-auto" onContextMenu={(e) => e.preventDefault()}>
            {/* Animated Image Switch */}
            <div key={currentIndex} className="animate-fade-in-card w-full h-full">
                <img 
                    src={currentProfile.profileImage} 
                    alt={roleName} 
                    className={`w-full h-full rounded-full border-4 ${borderColorClass} object-cover transition-all duration-500`} 
                    draggable="false" 
                />
            </div>
            <div className="absolute inset-0 rounded-full ring-2 ring-white/10 pointer-events-none"></div>
        </div>

        {/* Navigation Arrows - Only show if multiple profiles */}
        {hasMultiple && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 p-1 bg-black/50 hover:bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
              aria-label="Previous Creator"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 p-1 bg-black/50 hover:bg-white/20 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
              aria-label="Next Creator"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Dots Indicator */}
             <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
                {profiles.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? `w-4 ${contactColorClass.replace('text-', 'bg-')}` : 'w-1.5 bg-gray-600'}`}
                    />
                ))}
            </div>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="space-y-3">
        <h3 className={`text-2xl font-bold font-['Fredoka'] ${titleColorClass}`}>
            {roleName}
        </h3>
        
        {/* Contact Info - Moved ABOVE Bio as requested */}
        <div className="min-h-[1.5em]">
             <p className={`${contactColorClass} font-semibold transition-opacity duration-300 animate-fade-in-text`}>
                {currentProfile.contact}
             </p>
        </div>

        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            {bio}
        </p>
      </div>

      <style>{`
        @keyframes fadeInCard {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInText {
             from { opacity: 0; transform: translateY(5px); }
             to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-card {
            animation: fadeInCard 0.5s ease-out forwards;
        }
        .animate-fade-in-text {
            animation: fadeInText 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CreatorCard;