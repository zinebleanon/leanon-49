
import React from 'react';

interface HeroTitleProps {
  isProfileComplete?: boolean;
}

const HeroTitle = ({ isProfileComplete = false }: HeroTitleProps) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-2">
        Find Your LeanMoms
      </h1>
    </div>
  );
};

export default HeroTitle;
