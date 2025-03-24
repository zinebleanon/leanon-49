
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from "@/components/ui/badge";
import { Check, X, Filter } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface FilterSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  onClose?: () => void;
}

const FilterSection = ({ onFiltersChange, onClose }: FilterSectionProps) => {
  const [age, setAge] = useState('all');
  const [kidsAgeRange, setKidsAgeRange] = useState('all');
  const [kidsGender, setKidsGender] = useState('all');
  const [location, setLocation] = useState('all');
  const [nationality, setNationality] = useState('all');
  const [workStatus, setWorkStatus] = useState('all');
  const [compatibilityThreshold, setCompatibilityThreshold] = useState([70]);
  
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  useEffect(() => {
    const activeFilters = {
      age: age !== 'all' ? age : null,
      kids: {
        ageRange: kidsAgeRange !== 'all' ? kidsAgeRange : null,
        gender: kidsGender !== 'all' ? kidsGender : null
      },
      location: location !== 'all' ? location : null,
      nationality: nationality !== 'all' ? nationality : null,
      workStatus: workStatus !== 'all' ? workStatus : null,
      compatibilityThreshold: compatibilityThreshold[0]
    };
    
    // Count active filters
    let count = 0;
    if (activeFilters.age) count++;
    if (activeFilters.kids.ageRange) count++;
    if (activeFilters.kids.gender) count++;
    if (activeFilters.location) count++;
    if (activeFilters.nationality) count++;
    if (activeFilters.workStatus) count++;
    if (activeFilters.compatibilityThreshold !== 70) count++;
    
    setActiveFiltersCount(count);
    
  }, [age, kidsAgeRange, kidsGender, location, nationality, workStatus, compatibilityThreshold]);
  
  const applyFilters = () => {
    const filters = {
      age,
      kids: {
        ageRange: kidsAgeRange,
        gender: kidsGender
      },
      location,
      nationality,
      workStatus,
      compatibilityThreshold: compatibilityThreshold[0]
    };
    
    onFiltersChange(filters);
    toast({
      title: "Filters applied",
      description: `${activeFiltersCount} ${activeFiltersCount === 1 ? 'filter' : 'filters'} applied to your search.`,
    });
    
    if (onClose) {
      onClose();
    }
  };
  
  const resetFilters = () => {
    setAge('all');
    setKidsAgeRange('all');
    setKidsGender('all');
    setLocation('all');
    setNationality('all');
    setWorkStatus('all');
    setCompatibilityThreshold([70]);
    
    onFiltersChange({});
    
    toast({
      title: "Filters reset",
      description: "All filters have been cleared.",
    });
  };
  
  return (
    <section className="py-8 px-4 md:px-8" id="filter-section">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold font-playfair">Filter Match</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="outline" className="bg-secondary/50 px-2 py-1">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="ageRange" className="block mb-2">Mother's Age</Label>
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="20-25">20-25 years</SelectItem>
                    <SelectItem value="26-30">26-30 years</SelectItem>
                    <SelectItem value="31-35">31-35 years</SelectItem>
                    <SelectItem value="36-40">36-40 years</SelectItem>
                    <SelectItem value="41+">41+ years</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="kidsAgeRange" className="block mb-2">Children's Age</Label>
              <Select value={kidsAgeRange} onValueChange={setKidsAgeRange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="0-1">0-1 years (Infant)</SelectItem>
                    <SelectItem value="2-3">2-3 years (Toddler)</SelectItem>
                    <SelectItem value="4-5">4-5 years (Preschool)</SelectItem>
                    <SelectItem value="6-10">6-10 years (School age)</SelectItem>
                    <SelectItem value="11+">11+ years (Pre-teen/teen)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="kidsGender" className="block mb-2">Children's Gender</Label>
              <Select value={kidsGender} onValueChange={setKidsGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Any Gender</SelectItem>
                    <SelectItem value="Boy">Boy</SelectItem>
                    <SelectItem value="Girl">Girl</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="location" className="block mb-2">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Any Location</SelectItem>
                    <SelectItem value="Dubai Marina">Dubai Marina</SelectItem>
                    <SelectItem value="Palm Jumeirah">Palm Jumeirah</SelectItem>
                    <SelectItem value="JBR">JBR</SelectItem>
                    <SelectItem value="Downtown Dubai">Downtown Dubai</SelectItem>
                    <SelectItem value="Arabian Ranches">Arabian Ranches</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="nationality" className="block mb-2">Nationality</Label>
              <Select value={nationality} onValueChange={setNationality}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any Nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Any Nationality</SelectItem>
                    <SelectItem value="British Expat">British Expat</SelectItem>
                    <SelectItem value="American Expat">American Expat</SelectItem>
                    <SelectItem value="Chinese Expat">Chinese Expat</SelectItem>
                    <SelectItem value="Indian Expat">Indian Expat</SelectItem>
                    <SelectItem value="Lebanese">Lebanese</SelectItem>
                    <SelectItem value="UAE">UAE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="workStatus" className="block mb-2">Work Status</Label>
              <Select value={workStatus} onValueChange={setWorkStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any Work Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Any Work Status</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Stay-at-home">Stay-at-home</SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                    <SelectItem value="Business Owner">Business Owner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="mt-6 md:mt-8">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <Label>Minimum Compatibility</Label>
              <span className="text-sm font-medium">{compatibilityThreshold}%</span>
            </div>
            <Slider
              value={compatibilityThreshold}
              onValueChange={setCompatibilityThreshold}
              max={100}
              step={5}
              className="my-4"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-4 mt-4">
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
            <Button onClick={applyFilters} className="min-w-[120px]">
              <Check className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
