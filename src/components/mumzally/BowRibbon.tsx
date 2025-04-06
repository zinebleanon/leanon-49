
import React from 'react';
import RibbonIcon from '@/components/ui/RibbonIcon';

interface BowRibbonProps {
  className?: string;
  isActive?: boolean;
  isLeftActive?: boolean;
  isRightActive?: boolean;
  color?: string;
}

const BowRibbon = ({ 
  className, 
  isActive = false,
  isLeftActive = false,
  isRightActive = false,
  color = "#FFD9A7"
}: BowRibbonProps) => {
  // If isActive is true, both sides are active
  // If isLeftActive is true, only left side is active
  // If isRightActive is true, only right side is active
  const leftActive = isActive || isLeftActive;
  const rightActive = isActive || isRightActive;

  // If neither side is active, use a muted color
  const leftColor = leftActive ? color : "#e2e8f0";
  const rightColor = rightActive ? color : "#e2e8f0"; 
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Use the RibbonIcon component with appropriate styling */}
      <RibbonIcon 
        fill={leftActive || rightActive ? color : "#e2e8f0"} 
        size="100%" 
        className={className}
      />
    </div>
  );
};

export default BowRibbon;
