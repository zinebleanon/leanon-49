
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin, ListChecks, Users, Search, Filter, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HowItWorksModal from "./HowItWorksModal";
import FilterSection from "./FilterSection";
import RecommendedMatches from "./RecommendedMatches";
import ConnectionRequests from "./ConnectionRequests";
import { MumzProfile } from "./ProfilesSection";
import { Input } from "@/components/ui/input";

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
    
    if (onFiltersChange) {
      onFiltersChange({ searchTerm: e.target.value });
    }
  };

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
      
      {/* Prominently displayed search and filter section */}
      <div className="mb-8 sticky top-20 z-20">
        <div className="bg-[#9b87f5] p-4 rounded-lg shadow-lg border border-[#9b87f5]/30">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Input
                type="text"
                placeholder="Search by name, location, or interests..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 bg-white/90 border-2 border-[#9b87f5]/30 focus:border-[#9b87f5]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              variant="outline"
              onClick={() => setIsFiltersOpen(true)} 
              className="h-10 w-full md:w-auto flex items-center gap-2 px-3 bg-white hover:bg-[#F97316] hover:text-white hover:border-[#F97316] transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Advanced Filters</span>
            </Button>
          </div>
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
