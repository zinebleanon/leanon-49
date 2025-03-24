
import React from 'react';

interface BowRibbonProps {
  className?: string;
  isActive?: boolean;
  isLeftActive?: boolean;
  isRightActive?: boolean;
  color?: string;
}

const BowRibbon = ({ 
  className, 
  isActive = true,
  isLeftActive = false,
  isRightActive = false,
  color = "#FFD9A7"
}: BowRibbonProps) => {
  // If isActive is true, both sides are active
  // If isLeftActive is true, only left side is active
  // If isRightActive is true, only right side is active
  const leftActive = isActive || isLeftActive;
  const rightActive = isActive || isRightActive;
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 350 120" 
        className="w-full h-full"
      >
        <g strokeWidth="6" strokeLinecap="round">
          {/* Left side of ribbon */}
          <path 
            d="M175 60 C130 80, 90 100, 40 95 C20 92, 10 85, 15 75 C20 65, 60 55, 175 60" 
            fill={leftActive ? color : "#e2e8f0"} 
            stroke="#000000"
          />
          <path 
            d="M175 60 C140 40, 80 20, 35 25 C15 28, 5 35, 10 45 C15 55, 60 50, 175 60" 
            fill={leftActive ? color : "#e2e8f0"} 
            stroke="#000000"
          />
          
          {/* Right side of ribbon */}
          <path 
            d="M175 60 C220 80, 260 100, 310 95 C330 92, 340 85, 335 75 C330 65, 290 55, 175 60" 
            fill={rightActive ? color : "#e2e8f0"} 
            stroke="#000000"
          />
          <path 
            d="M175 60 C210 40, 270 20, 315 25 C335 28, 345 35, 340 45 C335 55, 290 50, 175 60" 
            fill={rightActive ? color : "#e2e8f0"} 
            stroke="#000000"
          />
        </g>
      </svg>
    </div>
  );
};

export default BowRibbon;
