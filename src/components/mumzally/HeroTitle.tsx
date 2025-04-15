
import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

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
          onClick={onCompleteProfile}
          variant="warm" 
          size="sm"
          className="mt-2 bg-pastel-yellow hover:bg-pastel-yellow/90 gap-2"
        >
          <User className="h-4 w-4" />
          Complete Profile
        </Button>
      )}
    </div>
  );
};

export default HeroTitle;
