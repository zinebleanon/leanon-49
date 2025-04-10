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
import { cn } from "@/lib/utils";

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
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
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

  const handleQuickFilter = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
    
    if (onFiltersChange) {
      const filters: Record<string, any> = {};
      
      if (activeFilter !== filter) {
        // Apply the filter
        switch (filter) {
          case 'nearby':
            filters.location = 'nearby';
            break;
          case 'kids-age':
            filters.kids = [{ ageRange: '2', gender: 'all' }];
            break;
          case 'compatibility':
            filters.compatibilityThreshold = 85;
            break;
        }
      }
      
      // Keep the search term if there is one
      if (searchTerm) {
        filters.searchTerm = searchTerm;
      }
      
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
      
      {/* Enhanced search and filter section */}
      <div className="mb-8 sticky top-20 z-20">
        <div className="bg-[#B8CEC2]/90 p-3 rounded-lg shadow-sm border border-[#B8CEC2] backdrop-blur-sm">
          <div className="flex flex-col space-y-2">
            <div className="relative flex-1 w-full">
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-9 h-10 bg-white/80 border-pastel-green focus-visible:ring-pastel-green"
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pastel-green" />
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => setIsFiltersOpen(true)} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-pastel-green hover:bg-pastel-green/20 rounded-full"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Quick filters row */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickFilter('nearby')}
                className={cn(
                  "h-8 px-3 text-xs rounded-full border-pastel-green/30 bg-white/70",
                  activeFilter === 'nearby' && "bg-pastel-green/30 border-pastel-green"
                )}
              >
                <MapPin className="h-3 w-3 mr-1" />
                Nearby
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickFilter('kids-age')}
                className={cn(
                  "h-8 px-3 text-xs rounded-full border-pastel-green/30 bg-white/70",
                  activeFilter === 'kids-age' && "bg-pastel-green/30 border-pastel-green"
                )}
              >
                Ages 0-2
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickFilter('compatibility')}
                className={cn(
                  "h-8 px-3 text-xs rounded-full border-pastel-green/30 bg-white/70",
                  activeFilter === 'compatibility' && "bg-pastel-green/30 border-pastel-green"
                )}
              >
                85%+ Match
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFiltersOpen(true)}
                className="h-8 px-3 text-xs rounded-full border-pastel-green/30 bg-white/70 ml-auto"
              >
                <SlidersHorizontal className="h-3 w-3 mr-1" />
                All Filters
              </Button>
            </div>
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
