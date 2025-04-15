
import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface HeroTitleProps {
  isProfileComplete?: boolean;
  onCompleteProfile?: () => void;
}

const HeroTitle = ({ isProfileComplete = false, onCompleteProfile }: HeroTitleProps) => {
  return (
    <div className="text-center flex flex-col md:flex-row items-center gap-4">
      <h1 className="text-2xl md:text-3xl font-bold font-playfair">
        Find Your LeanMoms
      </h1>
      
      {!isProfileComplete && onCompleteProfile && (
        <Button 
          onClick={onCompleteProfile}
          variant="warm" 
          size="sm"
          className="whitespace-nowrap bg-pastel-yellow hover:bg-pastel-yellow/90 gap-2 md:ml-auto"
        >
          <User className="h-4 w-4" />
          Complete Your Profile
        </Button>
      )}
    </div>
  );
};

export default HeroTitle;
