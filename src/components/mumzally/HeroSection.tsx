
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin, ListChecks, Users, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

const HeroSection = ({ 
  onFiltersChange, 
  profiles, 
  nearbyMoms = [], 
  onViewToggle, 
  showTinderView = false,
  searchTerm = '',
  onSearchChange
}: HeroSectionProps) => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isConnectionRequestsOpen, setIsConnectionRequestsOpen] = useState(false);
  const navigate = useNavigate();

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
            LeanMoms<br />Around You
          </h1>
        </div>
        
        <div className="flex flex-col gap-3 items-center w-full max-w-[200px] mx-auto md:mx-0">
          <Button
            className="w-full gap-2"
            variant="warm"
            size="md"
            onClick={() => setIsHowItWorksOpen(true)}
          >
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span>How It Works</span>
            </div>
          </Button>
          
          <Button
            variant="warm"
            size="md"
            className="w-full gap-2"
            onClick={() => setIsConnectionRequestsOpen(true)}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>LeanOn Requests</span>
            </div>
          </Button>
          
          <Button
            variant="warm"
            size="md"
            className="w-full gap-2"
            onClick={() => navigate('/connections')}
          >
            <div className="flex items-center gap-2">
              <ListChecks className="h-4 w-4" />
              <span>My LeanMoms</span>
            </div>
          </Button>
        </div>
      </div>
      
      {!showTinderView && nearbyMoms.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-medium">Moms Near You</h2>
            <div className="flex items-center gap-2">
              {nearbyMoms.length > 0 && (
                <Badge variant="outline" className="px-3 py-1 bg-white/50">
                  {nearbyMoms.length} {nearbyMoms.length === 1 ? 'mom' : 'moms'} nearby
                </Badge>
              )}
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsFiltersOpen(true)} 
                className="h-8 flex items-center gap-1 px-3 bg-white/50"
              >
                <Filter className="h-3 w-3" />
                <span className="text-xs">Filters</span>
              </Button>
            </div>
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
