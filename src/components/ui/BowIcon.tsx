
import React from 'react';

interface BowIconProps {
  className?: string;
  fill?: string;
}

const BowIcon = ({ className }: BowIconProps) => {
  return (
    <img 
      src="/lovable-uploads/8d090dc9-1dec-4d92-a60b-f0b63c73e375.png" 
      alt="Bow" 
      className={className}
      style={{
        width: '1.5em',
        height: '1.5em',
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    />
  );
};

export default BowIcon;
