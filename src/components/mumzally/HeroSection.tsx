
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MumzProfile } from "@/pages/MumzAlly";
import HowItWorksModal from "./HowItWorksModal";
import FilterSection from "./FilterSection";
import ConnectionRequests from "./ConnectionRequests";
import HeroTitle from "./HeroTitle";
import ActionButtons from "./ActionButtons";
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  onFiltersChange?: (filters: Record<string, any>) => void;
  profiles: MumzProfile[];
  nearbyMoms: MumzProfile[];
  onViewToggle?: () => void;
  showTinderView?: boolean;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  isProfileComplete?: boolean;
  onCompleteProfile?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onFiltersChange, 
  profiles, 
  nearbyMoms = [], 
  onViewToggle, 
  showTinderView = false,
  searchTerm = '',
  onSearchChange,
  isProfileComplete = false,
  onCompleteProfile
}) => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isConnectionRequestsOpen, setIsConnectionRequestsOpen] = useState(false);

  const handleFiltersChange = (filters: Record<string, any>) => {
    setIsFiltersOpen(false);
    if (onFiltersChange) {
      onFiltersChange(filters);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <HeroTitle 
          isProfileComplete={isProfileComplete} 
          onCompleteProfile={onCompleteProfile}
        />
        <ActionButtons 
          onHowItWorksClick={() => setIsHowItWorksOpen(true)}
          onConnectionRequestsClick={() => setIsConnectionRequestsOpen(true)}
        />
      </div>
      
      <div className="mb-8 sticky top-20 z-20">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onFiltersChange={(filters) => {
            setIsFiltersOpen(true);
            if (onFiltersChange) {
              onFiltersChange(filters);
            }
          }}
          profiles={profiles}
        />
      </div>

      <HowItWorksModal
        open={isHowItWorksOpen}
        onOpenChange={setIsHowItWorksOpen}
      />
      
      <FilterSection
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
        onFiltersChange={handleFiltersChange}
        searchTerm={searchTerm}
      />
      
      <ConnectionRequests
        dialogMode={true}
        nearbyMoms={nearbyMoms}
        open={isConnectionRequestsOpen}
        onOpenChange={setIsConnectionRequestsOpen}
      />
    </div>
  );
};

export default HeroSection;
