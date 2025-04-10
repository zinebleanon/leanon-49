
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin, Search, List, MoveHorizontal, Users } from "lucide-react";
import HowItWorksModal from "./HowItWorksModal";
import FilterSection from "./FilterSection";
import RecommendedMatches from "./RecommendedMatches";
import ConnectionRequests from "./ConnectionRequests";
import { MumzProfile } from "./ProfilesSection";

interface HeroSectionProps {
  onFiltersChange?: (filters: Record<string, any>) => void;
  profiles: MumzProfile[];
  nearbyMoms: MumzProfile[];
  onViewToggle?: () => void;
  showTinderView?: boolean;
}

const HeroSection = ({ onFiltersChange, profiles, nearbyMoms = [], onViewToggle, showTinderView = false }: HeroSectionProps) => {
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
        <div className="w-full text-center">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mb-2">
            LeanMoms Around You
          </h1>
        </div>
        
        <div className="flex flex-wrap gap-3 items-start justify-center w-full">
          <Button
            className="gap-2"
            variant="warm"
            onClick={() => setIsHowItWorksOpen(true)}
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>How It Works</span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="gap-2 bg-white/80"
            onClick={() => setIsConnectionRequestsOpen(true)}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Connection Requests</span>
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="gap-2 bg-white/80"
            onClick={() => setIsFiltersOpen(true)}
          >
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span>Find LeanMoms Around</span>
            </div>
          </Button>
          
          {nearbyMoms.length > 0 && onViewToggle && (
            <Button
              variant="outline"
              className="gap-2 bg-white/80"
              onClick={onViewToggle}
            >
              <div className="flex items-center gap-2">
                {showTinderView ? (
                  <>
                    <List className="h-4 w-4" />
                    <span>List View</span>
                  </>
                ) : (
                  <>
                    <MoveHorizontal className="h-4 w-4" />
                    <span>Swipe View</span>
                  </>
                )}
              </div>
            </Button>
          )}
        </div>
      </div>
      
      {!showTinderView && nearbyMoms.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-medium">Moms Near You</h2>
            {nearbyMoms.length > 0 && (
              <Badge variant="outline" className="px-3 py-1 bg-white/50">
                {nearbyMoms.length} {nearbyMoms.length === 1 ? 'mom' : 'moms'} nearby
              </Badge>
            )}
          </div>
          <RecommendedMatches profiles={nearbyMoms} />
        </div>
      )}
      
      {!showTinderView && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-medium">Matched for You</h2>
            {profiles.length > 0 && (
              <Badge variant="outline" className="px-3 py-1 bg-white/50">
                {profiles.length} {profiles.length === 1 ? 'match' : 'matches'} found
              </Badge>
            )}
          </div>
          <RecommendedMatches profiles={profiles} />
        </div>
      )}

      <HowItWorksModal
        open={isHowItWorksOpen}
        onOpenChange={setIsHowItWorksOpen}
      />
      
      <FilterSection
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
        onFiltersChange={handleFiltersChange}
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
