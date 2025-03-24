
import React from 'react';

interface BowRibbonProps {
  className?: string;
  isActive?: boolean;
  isLeftActive?: boolean;
  isRightActive?: boolean;
}

const BowRibbon = ({ 
  className, 
  isActive, 
  isLeftActive, 
  isRightActive 
}: BowRibbonProps) => {
  // Both sides active if isActive is true
  const leftActive = isActive || isLeftActive;
  const rightActive = isActive || isRightActive;
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Left side of the bow */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 350 162" 
        fill={leftActive ? "#FFD9A7" : "#e2e8f0"} 
        stroke="#000000"
        strokeWidth="6"
        className="w-full h-full"
      >
        <path d="M175.5 81.5C112.5 127 78.9999 156 27.9999 161C19.6665 161.333 2.89992 159.6 1.49995 152C-0.100022 143 42.3332 115.5 65.4999 102.5C94.4999 86.5 147 56.5 175.5 41" />
        <path d="M175.5 81.5C128.3 44.3 68.6665 1 40.4999 1C33.6665 1 22.7999 4.6 27.9999 13C34.4999 23.5 78.9999 46 97.9999 57C129 75.5 146.833 77.1667 175.5 88.5" />
        <path d="M175.5 81.5C124.7 72.7 72.8332 66.1667 40.9999 61.5C33.4999 60.3 16.7999 60.1 22.9999 68.5C30.9999 79.5 81.3332 80.1667 107 81.5C138.6 83.1 157.167 83.8333 175.5 88.5" />
      </svg>
      
      {/* Right side of the bow - flipped horizontally */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 350 162" 
        fill={rightActive ? "#FFD9A7" : "#e2e8f0"} 
        stroke="#000000"
        strokeWidth="6"
        className="w-full h-full transform scale-x-[-1] absolute left-0"
      >
        <path d="M175.5 81.5C112.5 127 78.9999 156 27.9999 161C19.6665 161.333 2.89992 159.6 1.49995 152C-0.100022 143 42.3332 115.5 65.4999 102.5C94.4999 86.5 147 56.5 175.5 41" />
        <path d="M175.5 81.5C128.3 44.3 68.6665 1 40.4999 1C33.6665 1 22.7999 4.6 27.9999 13C34.4999 23.5 78.9999 46 97.9999 57C129 75.5 146.833 77.1667 175.5 88.5" />
        <path d="M175.5 81.5C124.7 72.7 72.8332 66.1667 40.9999 61.5C33.4999 60.3 16.7999 60.1 22.9999 68.5C30.9999 79.5 81.3332 80.1667 107 81.5C138.6 83.1 157.167 83.8333 175.5 88.5" />
      </svg>
    </div>
  );
};

export default BowRibbon;
