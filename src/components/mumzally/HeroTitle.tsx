
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface HeroTitleProps {
  isProfileComplete?: boolean;
  onCompleteProfile?: () => void;
}

const HeroTitle = ({ isProfileComplete = false, onCompleteProfile }: HeroTitleProps) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-2">
        Find Your LeanMoms
      </h1>
      
      {!isProfileComplete && onCompleteProfile && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onCompleteProfile}
          className="mt-2 text-sm"
        >
          <User className="h-3 w-3 mr-1" />
          Complete Your Profile
        </Button>
      )}
    </div>
  );
};

export default HeroTitle;
