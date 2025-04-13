
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface HeroTitleProps {
  isProfileComplete?: boolean;
}

const HeroTitle: React.FC<HeroTitleProps> = ({ isProfileComplete = false }) => {
  return (
    <div className="w-full text-center">
      <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-2">
        LeanMoms
      </h1>
      {isProfileComplete && (
        <Badge variant="outline" className="px-3 py-1 bg-white/50">
          Showing moms near you
        </Badge>
      )}
    </div>
  );
};

export default HeroTitle;
