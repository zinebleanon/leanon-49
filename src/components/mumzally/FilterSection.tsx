
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, UserCircle, BabyIcon, MapPin, Flag, Briefcase, X } from 'lucide-react';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FilterSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  
  // Define filter options for each category
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'age', label: 'Your Age', icon: <UserCircle className="h-4 w-4" /> },
    { id: 'kids', label: 'Kids Age/Gender', icon: <BabyIcon className="h-4 w-4" /> },
    { id: 'location', label: 'Neighborhood', icon: <MapPin className="h-4 w-4" /> },
    { id: 'nationality', label: 'Nationality', icon: <Flag className="h-4 w-4" /> },
    { id: 'work', label: 'Work Status', icon: <Briefcase className="h-4 w-4" /> },
  ];
  
  // Define filter options for each category
  const ageRanges = ['20-25', '26-30', '31-35', '36-40', '41+'];
  const kidAgeRanges = ['0-1', '2-3', '4-5', '6-8', '9-12', '13+'];
  const kidGenders = ['Boy', 'Girl'];
  const locations = ['Dubai Marina', 'Palm Jumeirah', 'Downtown Dubai', 'JBR', 'Arabian Ranches'];
  const nationalities = ['UAE', 'Lebanese', 'British Expat', 'Indian Expat', 'American Expat', 'Chinese Expat', 'Other'];
  const workStatuses = ['Full-time', 'Part-time', 'Stay-at-home', 'Freelancer', 'Business Owner'];
  
  const handleFilterSelect = (filterId: string) => {
    setActiveFilter(filterId);
  };
  
  const applyFilter = (category: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };
  
  const removeFilter = (category: string) => {
    const newFilters = { ...activeFilters };
    delete newFilters[category];
    setActiveFilters(newFilters);
  };
  
  const clearAllFilters = () => {
    setActiveFilters({});
    setActiveFilter('all');
  };
  
  // Render filter tags for active filters
  const renderFilterTags = () => {
    return Object.entries(activeFilters).map(([category, value]) => {
      let displayValue = value;
      
      if (Array.isArray(value)) {
        displayValue = value.join(', ');
      } else if (typeof value === 'object' && value !== null) {
        if ('ageRange' in value && 'gender' in value) {
          const ageRanges = Array.isArray(value.ageRange) ? value.ageRange.join(', ') : value.ageRange;
          const genders = Array.isArray(value.gender) ? value.gender.join(', ') : value.gender;
          displayValue = `${ageRanges} | ${genders}`;
        } else {
          displayValue = JSON.stringify(value);
        }
      }
      
      return (
        <Button 
          key={category} 
          variant="secondary" 
          size="sm" 
          className="rounded-full text-xs flex items-center gap-1 mr-2 mb-2"
          onClick={() => removeFilter(category)}
        >
          {category}: {displayValue}
          <X className="h-3 w-3" />
        </Button>
      );
    });
  };
  
  // Render appropriate filter options based on active filter
  const renderFilterOptions = () => {
    switch (activeFilter) {
      case 'age':
        return (
          <div className="p-4">
            <h3 className="font-medium mb-3">Select Your Age Range</h3>
            <div className="space-y-2">
              {ageRanges.map(range => (
                <div key={range} className="flex items-center">
                  <Checkbox 
                    id={`age-${range}`} 
                    checked={activeFilters.age === range}
                    onCheckedChange={() => applyFilter('age', range)}
                  />
                  <label htmlFor={`age-${range}`} className="ml-2 text-sm">{range}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'kids':
        return (
          <div className="p-4">
            <Tabs defaultValue="age">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="age" className="flex-1">Age Range</TabsTrigger>
                <TabsTrigger value="gender" className="flex-1">Gender</TabsTrigger>
              </TabsList>
              
              <TabsContent value="age" className="space-y-2">
                <h3 className="font-medium mb-3">Select Kids Age Range</h3>
                {kidAgeRanges.map(range => (
                  <div key={range} className="flex items-center">
                    <Checkbox 
                      id={`kid-age-${range}`}
                      checked={activeFilters.kids?.ageRange === range}
                      onCheckedChange={() => {
                        const currentKids = activeFilters.kids || {};
                        applyFilter('kids', {
                          ...currentKids,
                          ageRange: range
                        });
                      }}
                    />
                    <label htmlFor={`kid-age-${range}`} className="ml-2 text-sm">{range} years</label>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="gender" className="space-y-2">
                <h3 className="font-medium mb-3">Select Kids Gender</h3>
                <RadioGroup 
                  value={activeFilters.kids?.gender || ""}
                  onValueChange={(value) => {
                    const currentKids = activeFilters.kids || {};
                    applyFilter('kids', {
                      ...currentKids,
                      gender: value
                    });
                  }}
                >
                  {kidGenders.map(gender => (
                    <div key={gender} className="flex items-center space-x-2">
                      <RadioGroupItem value={gender} id={`gender-${gender}`} />
                      <Label htmlFor={`gender-${gender}`}>{gender}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>
            </Tabs>
          </div>
        );
        
      case 'location':
        return (
          <div className="p-4">
            <h3 className="font-medium mb-3">Select Neighborhood</h3>
            <div className="space-y-2">
              {locations.map(location => (
                <div key={location} className="flex items-center">
                  <Checkbox 
                    id={`location-${location}`}
                    checked={activeFilters.location === location}
                    onCheckedChange={() => applyFilter('location', location)}
                  />
                  <label htmlFor={`location-${location}`} className="ml-2 text-sm">{location}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'nationality':
        return (
          <div className="p-4">
            <h3 className="font-medium mb-3">Select Nationality</h3>
            <div className="space-y-2">
              {nationalities.map(nationality => (
                <div key={nationality} className="flex items-center">
                  <Checkbox 
                    id={`nationality-${nationality}`}
                    checked={activeFilters.nationality === nationality}
                    onCheckedChange={() => applyFilter('nationality', nationality)}
                  />
                  <label htmlFor={`nationality-${nationality}`} className="ml-2 text-sm">{nationality}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'work':
        return (
          <div className="p-4">
            <h3 className="font-medium mb-3">Select Work Status</h3>
            <div className="space-y-2">
              {workStatuses.map(status => (
                <div key={status} className="flex items-center">
                  <Checkbox 
                    id={`work-${status}`}
                    checked={activeFilters.workStatus === status}
                    onCheckedChange={() => applyFilter('workStatus', status)}
                  />
                  <label htmlFor={`work-${status}`} className="ml-2 text-sm">{status}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <section id="filter-section" className="py-6 md:py-8 px-4 md:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-4 md:mb-6 gap-2">
          <h2 className="text-xl md:text-2xl font-semibold">Filter Allies</h2>
          {Object.keys(activeFilters).length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs md:text-sm"
              onClick={clearAllFilters}
            >
              Clear All Filters
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {filters.map((filter) => (
            <Popover key={filter.id}>
              <PopoverTrigger asChild>
                <Button
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full text-xs md:text-sm py-1 h-8 md:h-9"
                  onClick={() => handleFilterSelect(filter.id)}
                >
                  {filter.icon && <span className="mr-1 md:mr-2">{filter.icon}</span>}
                  {filter.label}
                </Button>
              </PopoverTrigger>
              {filter.id !== 'all' && (
                <PopoverContent 
                  className="w-72 p-0" 
                  align="start"
                >
                  {renderFilterOptions()}
                </PopoverContent>
              )}
            </Popover>
          ))}
        </div>
        
        {Object.keys(activeFilters).length > 0 && (
          <div className="flex flex-wrap mb-4">
            <div className="flex flex-wrap">
              {renderFilterTags()}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FilterSection;
