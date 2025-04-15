
import React from 'react';

interface HeroTitleProps {
  isProfileComplete?: boolean;
  onCompleteProfile?: () => void;
}

const HeroTitle = ({ isProfileComplete = false }: HeroTitleProps) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold font-playfair">
        Find Your LeanMoms
      </h1>
    </div>
  );
};

export default HeroTitle;
