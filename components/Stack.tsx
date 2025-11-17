import React from 'react';

interface StackProps {
  children: React.ReactNode;
}

const Stack: React.FC<StackProps> = ({ children }) => {
  return (
    <div className="relative group">
      <div className="relative z-10 p-2 transition-transform duration-300 group-hover:rotate-0">
        {children}
      </div>
      <div className="absolute inset-0 bg-pink-500 rounded-lg transform -rotate-3 transition-transform duration-300 group-hover:rotate-2 z-0"></div>
      <div className="absolute inset-0 bg-blue-500 rounded-lg transform rotate-3 transition-transform duration-300 group-hover:-rotate-2 z-0"></div>
    </div>
  );
};

export default Stack;
