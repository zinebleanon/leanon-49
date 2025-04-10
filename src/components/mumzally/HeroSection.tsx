
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info, ListChecks, Users, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HowItWorksModal from "./HowItWorksModal";
import FilterSection from "./FilterSection";
import RecommendedMatches from "./RecommendedMatches";
import ConnectionRequests from "./ConnectionRequests";
import { MumzProfile } from "./ProfilesSection";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [searchResults, setSearchResults] = useState<MumzProfile[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (localSearchTerm.trim() && profiles.length > 0) {
      const results = profiles.filter(profile => 
        profile.name.toLowerCase().includes(localSearchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [localSearchTerm, profiles]);

  const handleSearchSelect = (profileId: number) => {
    const selectedProfile = profiles.find(p => p.id === profileId);
    if (selectedProfile && onSearchChange) {
      onSearchChange(selectedProfile.name);
      
      if (onFiltersChange) {
        onFiltersChange({ searchTerm: selectedProfile.name });
      }
    }
    setIsSearchOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(e.target.value);
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
      
      {/* Enhanced search and filter section */}
      <div className="mb-8 sticky top-20 z-20">
        <div className="bg-[#B8CEC2]/90 p-3 rounded-lg shadow-sm border border-[#B8CEC2] backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search moms by name..."
                value={localSearchTerm}
                onChange={handleSearchChange}
                onClick={() => setIsSearchOpen(true)}
                className="pl-9 h-10 bg-white/80 border-pastel-green focus-visible:ring-pastel-green"
              />
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-pastel-green" />
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsFiltersOpen(true)}
              className="h-10 px-4 whitespace-nowrap bg-white/80 hover:bg-white/90 border-pastel-green/30"
            >
              All Filters
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

      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput 
          placeholder="Search mom's name..." 
          value={localSearchTerm} 
          onValueChange={setLocalSearchTerm}
        />
        <CommandList>
          <CommandEmpty>No moms found. Try a different name.</CommandEmpty>
          <CommandGroup heading="Moms">
            {searchResults.map((profile) => (
              <CommandItem 
                key={profile.id} 
                onSelect={() => handleSearchSelect(profile.id)}
                className="flex items-center gap-2 py-2"
              >
                <div className="w-8 h-8 rounded-full bg-pastel-green/40 flex items-center justify-center text-xs font-medium">
                  {profile.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{profile.name}</span>
                  <span className="text-xs text-muted-foreground">{profile.location}</span>
                </div>
                <span className="ml-auto text-xs bg-pastel-green/20 px-2 py-0.5 rounded-full">
                  {profile.compatibility}% match
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export default HeroSection;
