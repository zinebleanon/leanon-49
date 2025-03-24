
import React from 'react';

interface BowRibbonProps {
  className?: string;
  isActive?: boolean;
  color?: string;
}

const BowRibbon = ({ 
  className, 
  isActive = true,
  color = "#FFD9A7"
}: BowRibbonProps) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Single ribbon with gradient fill */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 350 162" 
        fill={isActive ? color : "#e2e8f0"} 
        stroke="#000000"
        strokeWidth="6"
        className="w-full h-full"
      >
        <path d="M175.5 81.5C112.5 127 78.9999 156 27.9999 161C19.6665 161.333 2.89992 159.6 1.49995 152C-0.100022 143 42.3332 115.5 65.4999 102.5C94.4999 86.5 147 56.5 175.5 41" />
        <path d="M175.5 81.5C128.3 44.3 68.6665 1 40.4999 1C33.6665 1 22.7999 4.6 27.9999 13C34.4999 23.5 78.9999 46 97.9999 57C129 75.5 146.833 77.1667 175.5 88.5" />
        <path d="M175.5 81.5C124.7 72.7 72.8332 66.1667 40.9999 61.5C33.4999 60.3 16.7999 60.1 22.9999 68.5C30.9999 79.5 81.3332 80.1667 107 81.5C138.6 83.1 157.167 83.8333 175.5 88.5" />
        {/* Mirror the left side for the right side of bow */}
        <path d="M175.5 81.5C238.5 127 272 156 323 161C331.333 161.333 348.1 159.6 349.5 152C351.1 143 308.667 115.5 285.5 102.5C256.5 86.5 204 56.5 175.5 41" />
        <path d="M175.5 81.5C222.7 44.3 282.333 1 310.5 1C317.333 1 328.2 4.6 323 13C316.5 23.5 272 46 253 57C222 75.5 204.167 77.1667 175.5 88.5" />
        <path d="M175.5 81.5C226.3 72.7 278.167 66.1667 310 61.5C317.5 60.3 334.2 60.1 328 68.5C320 79.5 269.667 80.1667 244 81.5C212.4 83.1 193.833 83.8333 175.5 88.5" />
      </svg>
    </div>
  );
};

export default BowRibbon;
