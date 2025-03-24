
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

interface FilterSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
}

const FilterSection = ({ onFiltersChange }: FilterSectionProps) => {
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [isExpanded, setIsExpanded] = useState(false);
  
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold font-playfair">Filter Match</h2>
            <p className="text-muted-foreground">Find the perfect match for you and your children</p>
          </div>
          <Button 
            variant="outline" 
            className="mt-2 md:mt-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Hide Filters" : "Show All Filters"}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select
              value={activeFilters.location || ""}
              onValueChange={(value) => handleFilterChange('location', value)}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Location</SelectItem>
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
              value={activeFilters.kids?.ageRange || ""}
              onValueChange={(value) => handleFilterChange('kids.ageRange', value)}
            >
              <SelectTrigger id="kids-age">
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Age</SelectItem>
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
              value={activeFilters.kids?.gender || ""}
              onValueChange={(value) => handleFilterChange('kids.gender', value)}
            >
              <SelectTrigger id="kids-gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Gender</SelectItem>
                <SelectItem value="Boy">Boy</SelectItem>
                <SelectItem value="Girl">Girl</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isExpanded && (
          <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value="advanced-filters">
              <AccordionTrigger>Advanced Filters</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Mom Age Range</Label>
                    <Select
                      value={activeFilters.age || ""}
                      onValueChange={(value) => handleFilterChange('age', value)}
                    >
                      <SelectTrigger id="age">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Age</SelectItem>
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
                      value={activeFilters.nationality || ""}
                      onValueChange={(value) => handleFilterChange('nationality', value)}
                    >
                      <SelectTrigger id="nationality">
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Nationality</SelectItem>
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
                      value={activeFilters.workStatus || ""}
                      onValueChange={(value) => handleFilterChange('workStatus', value)}
                    >
                      <SelectTrigger id="work-status">
                        <SelectValue placeholder="Select work status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Work Status</SelectItem>
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
        )}
        
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
    </section>
  );
};

export default FilterSection;
