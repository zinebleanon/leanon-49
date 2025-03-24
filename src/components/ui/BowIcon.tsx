
import React from 'react';

interface BowIconProps {
  className?: string;
  fill?: string;
}

const BowIcon = ({ className, fill = "#FFD9A7" }: BowIconProps) => {
  return (
    <svg 
      viewBox="0 0 350 120"
      className={className}
      style={{
        width: '3em',
        height: '3em',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    >
      <g stroke="#000000" strokeWidth="6" strokeLinecap="round">
        {/* Left side of ribbon */}
        <path 
          d="M175 60 C130 80, 90 100, 40 95 C20 92, 10 85, 15 75 C20 65, 60 55, 175 60" 
          fill={fill}
        />
        <path 
          d="M175 60 C140 40, 80 20, 35 25 C15 28, 5 35, 10 45 C15 55, 60 50, 175 60" 
          fill={fill} 
        />
        
        {/* Right side of ribbon */}
        <path 
          d="M175 60 C220 80, 260 100, 310 95 C330 92, 340 85, 335 75 C330 65, 290 55, 175 60" 
          fill={fill}
        />
        <path 
          d="M175 60 C210 40, 270 20, 315 25 C335 28, 345 35, 340 45 C335 55, 290 50, 175 60" 
          fill={fill}
        />
      </g>
    </svg>
  );
};

export default BowIcon;
