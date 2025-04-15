
import React from 'react';

interface RibbonIconProps {
  className?: string;
  fill?: string;
  color?: string;
  size?: string;
}

const RibbonIcon = ({ className, fill = "#FFD9A7", color, size = "3em" }: RibbonIconProps) => {
  // Use color prop if provided, otherwise use fill
  const displayColor = color || fill;
  
  return (
    <div 
      className={className}
      style={{
        width: size,
        height: 'auto',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    >
      <img 
        src="/lovable-uploads/35ba163a-0115-4ea5-a330-fd8f9a6d1ca6.png" 
        alt="Ribbon" 
        className="w-full h-auto"
        style={{ filter: displayColor !== "#FFD9A7" ? `opacity(0.9) drop-shadow(0 0 0 ${displayColor})` : 'none' }}
      />
    </div>
  );
};

export default RibbonIcon;
