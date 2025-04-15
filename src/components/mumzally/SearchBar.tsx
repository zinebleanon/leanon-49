import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { MumzProfile } from "@/pages/MumzAlly";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";

interface SearchBarProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  onFiltersChange?: (filters: Record<string, any>) => void;
  profiles: MumzProfile[];
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm = '',
  onSearchChange,
  onFiltersChange,
  profiles
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [searchResults, setSearchResults] = useState<MumzProfile[]>([]);

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

  return (
    <>
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
            onClick={() => onFiltersChange && onFiltersChange({})}
            className="h-10 px-4 whitespace-nowrap bg-white/80 hover:bg-white/90 border-pastel-green/30"
          >
            All Filters
          </Button>
        </div>
      </div>

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
    </>
  );
};

export default SearchBar;
