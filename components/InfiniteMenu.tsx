import React from 'react';

interface InfiniteMenuProps {
  items: string[];
}

const InfiniteMenu: React.FC<InfiniteMenuProps> = ({ items }) => {
  // Create a large array of items to ensure the scrolling track is much wider than the screen
  // This eliminates the "jerk" at the loop reset point by ensuring there's always off-screen content ready to scroll in.
  // We repeat the items 8 times to create a very long strip.
  const repeatedItems = Array(8).fill(items).flat();

  return (
    <div className="relative w-full overflow-hidden py-5 bg-gradient-to-r from-purple-600 to-pink-500 border-y border-white/20">
      <div className="flex w-max animate-infinite-scroll-rapid">
        {repeatedItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-xl md:text-3xl font-bold font-['Baloo_2'] mx-8 text-white uppercase tracking-widest drop-shadow-md whitespace-nowrap">
              {item}
            </span>
            {/* Decorative separator to add rhythm and consistent spacing */}
            <span className="text-white/40 text-2xl">•</span>
          </div>
        ))}
      </div>
       <style>{`
        @keyframes infinite-scroll-rapid {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-infinite-scroll-rapid {
          /* 
            Speed explanation:
            Increased duration from 15s to 75s to reduce speed by a factor of 5.
            This maintains the smooth 60fps translation but makes the text readable.
          */
          animation: infinite-scroll-rapid 75s linear infinite;
          will-change: transform;
          /* Optimizations for smoothness */
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
        }
       `}</style>
    </div>
  );
};

export default InfiniteMenu;