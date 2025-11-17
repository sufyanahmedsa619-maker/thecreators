import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Lightbox: React.FC<LightboxProps> = ({ 
  isOpen, 
  imageSrc, 
  onClose, 
  onNext, 
  onPrev,
  hasNext,
  hasPrev
}) => {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-4 right-4 z-[110] p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
        aria-label="Close lightbox"
      >
        <X size={36} />
      </button>

      {/* Left Arrow */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-8 z-[110] p-3 bg-black/50 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft size={36} />
        </button>
      )}

      {/* Right Arrow */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-8 z-[110] p-3 bg-black/50 hover:bg-white/20 text-white rounded-full transition-all hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight size={36} />
        </button>
      )}

      {/* Image Container */}
      <div 
        className="relative max-w-[95vw] max-h-[95vh] p-2"
        onClick={(e) => e.stopPropagation()} 
      >
        <img
          src={imageSrc}
          alt="Enlarged view"
          className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl shadow-black"
        />
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default Lightbox;