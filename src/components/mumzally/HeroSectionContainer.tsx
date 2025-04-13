
import React, { useEffect, ReactNode } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface HeroSectionContainerProps {
  children: ReactNode;
}

const HeroSectionContainer: React.FC<HeroSectionContainerProps> = ({ children }) => {
  // Force scroll to top when this component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <AspectRatio ratio={16 / 9} className="md:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70" />
      </AspectRatio>
      <div className="container relative z-10">
        {children}
      </div>
    </div>
  );
};

export default HeroSectionContainer;
