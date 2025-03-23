
import React from 'react';
import { Gift } from 'lucide-react';

interface BowIconProps {
  className?: string;
  fill?: string;
}

const BowIcon = ({ className, fill = "currentColor" }: BowIconProps) => {
  return (
    <Gift 
      className={className} 
      strokeWidth={2.5}
      fill={fill}
    />
  );
};

export default BowIcon;
