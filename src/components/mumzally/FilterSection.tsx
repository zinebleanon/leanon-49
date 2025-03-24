
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Filter } from 'lucide-react';

interface FilterSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
}

const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const locations = [
    "Dubai Marina", "JBR", "Palm Jumeirah", "Downtown Dubai", 
    "Arabian Ranches", "Emirates Hills", "Jumeirah"
  ];
  
  const nationalities = [
    "UAE", "British Expat", "American Expat", "Lebanese", 
    "Indian Expat", "Chinese Expat", "South African"
  ];
  
  const workStatuses = [
    "Full-time", "Part-time", "Stay-at-home", "Freelancer", "Business Owner"
  ];
  
  const handleFilterChange = (category: string, value: any) => {
    const newFilters = { ...activeFilters };
    
    if (category === 'kids.ageRange' || category === 'kids.gender') {
      newFilters.kids = { ...newFilters.kids };
      
      if (category === 'kids.ageRange') {
        newFilters.kids.ageRange = value;
      } else if (category === 'kids.gender') {
        newFilters.kids.gender = value;
      }
    } else {
      newFilters[category] = value;
    }
    
    // If a filter is set to "all", remove it from active filters
    if (value === "all") {
      if (category === 'kids.ageRange' || category === 'kids.gender') {
        if (newFilters.kids) {
          delete newFilters.kids[category.split('.')[1]];
          if (Object.keys(newFilters.kids).length === 0) {
            delete newFilters.kids;
          }
        }
      } else {
        delete newFilters[category];
      }
    }
    
    setActiveFilters(newFilters);
  };
  
  const clearFilters = () => {
    setActiveFilters({});
  };
  
  // Pass filters up to parent whenever they change
  useEffect(() => {
    onFiltersChange(activeFilters);
  }, [activeFilters, onFiltersChange]);
  
  return (
    <section id="filter-section" className="py-8 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center mb-6">
          <Button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="rounded-full px-6 bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground transition-colors"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter Match
            {Object.keys(activeFilters).length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-primary text-white">
                {Object.keys(activeFilters).length}
              </span>
            )}
          </Button>
        </div>
        
        {isFilterOpen && (
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-sm mb-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={activeFilters.location || "all"}
                  onValueChange={(value) => handleFilterChange('location', value)}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Location</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="kids-age">Child Age Range</Label>
                <Select
                  value={activeFilters.kids?.ageRange || "all"}
                  onValueChange={(value) => handleFilterChange('kids.ageRange', value)}
                >
                  <SelectTrigger id="kids-age">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Age</SelectItem>
                    <SelectItem value="0-2">Infant (0-2 years)</SelectItem>
                    <SelectItem value="3-5">Preschool (3-5 years)</SelectItem>
                    <SelectItem value="6-9">Primary (6-9 years)</SelectItem>
                    <SelectItem value="10-12">Preteen (10-12 years)</SelectItem>
                    <SelectItem value="13+">Teenager (13+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="kids-gender">Child Gender</Label>
                <Select
                  value={activeFilters.kids?.gender || "all"}
                  onValueChange={(value) => handleFilterChange('kids.gender', value)}
                >
                  <SelectTrigger id="kids-gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Gender</SelectItem>
                    <SelectItem value="Boy">Boy</SelectItem>
                    <SelectItem value="Girl">Girl</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="mb-4">
              <AccordionItem value="advanced-filters">
                <AccordionTrigger>Advanced Filters</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Mom Age Range</Label>
                      <Select
                        value={activeFilters.age || "all"}
                        onValueChange={(value) => handleFilterChange('age', value)}
                      >
                        <SelectTrigger id="age">
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Age</SelectItem>
                          <SelectItem value="20-29">20-29 years</SelectItem>
                          <SelectItem value="30-39">30-39 years</SelectItem>
                          <SelectItem value="40-49">40-49 years</SelectItem>
                          <SelectItem value="50+">50+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Select
                        value={activeFilters.nationality || "all"}
                        onValueChange={(value) => handleFilterChange('nationality', value)}
                      >
                        <SelectTrigger id="nationality">
                          <SelectValue placeholder="Select nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Nationality</SelectItem>
                          {nationalities.map((nationality) => (
                            <SelectItem key={nationality} value={nationality}>
                              {nationality}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="work-status">Work Status</Label>
                      <Select
                        value={activeFilters.workStatus || "all"}
                        onValueChange={(value) => handleFilterChange('workStatus', value)}
                      >
                        <SelectTrigger id="work-status">
                          <SelectValue placeholder="Select work status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Work Status</SelectItem>
                          {workStatuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
              
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">
                  {Object.keys(activeFilters).length === 0 
                    ? 'No active filters' 
                    : `${Object.keys(activeFilters).length} filter${Object.keys(activeFilters).length === 1 ? '' : 's'} applied`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterSection;
