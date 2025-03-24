
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from "@/components/ui/badge";
import { Check, X, Filter, ArrowLeft, Home } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';

interface FilterSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  onClose?: () => void;
}

const FilterSection = ({ onFiltersChange, onClose }: FilterSectionProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [age, setAge] = useState('all');
  
  // First child
  const [kid1AgeRange, setKid1AgeRange] = useState('all');
  const [kid1Gender, setKid1Gender] = useState('all');
  
  // Second child
  const [kid2AgeRange, setKid2AgeRange] = useState('all');
  const [kid2Gender, setKid2Gender] = useState('all');
  
  // Third child
  const [kid3AgeRange, setKid3AgeRange] = useState('all');
  const [kid3Gender, setKid3Gender] = useState('all');
  
  const [location, setLocation] = useState('all');
  const [nationality, setNationality] = useState('all');
  const [workStatus, setWorkStatus] = useState('all');
  const [compatibilityThreshold, setCompatibilityThreshold] = useState([70]);
  
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  useEffect(() => {
    const activeFilters = {
      age: age !== 'all' ? age : null,
      kids: [
        {
          ageRange: kid1AgeRange !== 'all' ? kid1AgeRange : null,
          gender: kid1Gender !== 'all' ? kid1Gender : null
        },
        {
          ageRange: kid2AgeRange !== 'all' ? kid2AgeRange : null,
          gender: kid2Gender !== 'all' ? kid2Gender : null
        },
        {
          ageRange: kid3AgeRange !== 'all' ? kid3AgeRange : null,
          gender: kid3Gender !== 'all' ? kid3Gender : null
        }
      ],
      location: location !== 'all' ? location : null,
      nationality: nationality !== 'all' ? nationality : null,
      workStatus: workStatus !== 'all' ? workStatus : null,
      compatibilityThreshold: compatibilityThreshold[0]
    };
    
    // Count active filters
    let count = 0;
    if (activeFilters.age) count++;
    if (activeFilters.kids[0].ageRange || activeFilters.kids[0].gender) count++;
    if (activeFilters.kids[1].ageRange || activeFilters.kids[1].gender) count++;
    if (activeFilters.kids[2].ageRange || activeFilters.kids[2].gender) count++;
    if (activeFilters.location) count++;
    if (activeFilters.nationality) count++;
    if (activeFilters.workStatus) count++;
    if (activeFilters.compatibilityThreshold !== 70) count++;
    
    setActiveFiltersCount(count);
    
  }, [age, kid1AgeRange, kid1Gender, kid2AgeRange, kid2Gender, kid3AgeRange, kid3Gender, 
      location, nationality, workStatus, compatibilityThreshold]);
  
  const applyFilters = () => {
    const filters = {
      age,
      kids: [
        {
          ageRange: kid1AgeRange,
          gender: kid1Gender
        },
        {
          ageRange: kid2AgeRange,
          gender: kid2Gender
        },
        {
          ageRange: kid3AgeRange,
          gender: kid3Gender
        }
      ],
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
    setKid1AgeRange('all');
    setKid1Gender('all');
    setKid2AgeRange('all');
    setKid2Gender('all');
    setKid3AgeRange('all');
    setKid3Gender('all');
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
  
  // Generate age options from 0 to 11
  const ageOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: `${i} year${i !== 1 ? 's' : ''}`
  }));
  
  const renderFilterItem = (label, component) => (
    <div className="mb-4">
      <Label className="block mb-2 font-medium">{label}</Label>
      {component}
    </div>
  );
  
  return (
    <section className="py-6 px-4 bg-[#B8CEC2]/30" id="filter-section">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="bg-white/80 shadow-sm hover:bg-white"
          >
            <Home className="h-4 w-4 mr-2" />
            Main Menu
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-semibold font-playfair">Filter Match</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="outline" className="bg-[#FFD9A7]/50 px-2 py-1">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
        
        <div className="space-y-4">
          {/* Mother's Age */}
          <Card className="p-3 bg-white/90 border-[#FFD9A7]/30 shadow-sm">
            {renderFilterItem("Mother's Age", (
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger className="w-full bg-white/80 border-[#B8CEC2]/30">
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#B8CEC2]/30">
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
            ))}
          </Card>
          
          {/* Children */}
          <div className="grid grid-cols-1 gap-3">
            {/* Child 1 */}
            <Card className="p-3 bg-white/90 border-[#FFD9A7]/30 shadow-sm">
              <h3 className="font-medium mb-3 text-sm">Child 1</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="kid1AgeRange" className="block mb-2 text-xs">Age</Label>
                  <Select value={kid1AgeRange} onValueChange={setKid1AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30 h-9 text-sm">
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#FFD9A7]/30 max-h-[200px]">
                      <ScrollArea className="h-[200px]">
                        <SelectGroup>
                          <SelectItem value="all">All Ages</SelectItem>
                          {ageOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="kid1Gender" className="block mb-2 text-xs">Gender</Label>
                  <Select value={kid1Gender} onValueChange={setKid1Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30 h-9 text-sm">
                      <SelectValue placeholder="Any Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#FFD9A7]/30">
                      <SelectGroup>
                        <SelectItem value="all">Any Gender</SelectItem>
                        <SelectItem value="Boy">Boy</SelectItem>
                        <SelectItem value="Girl">Girl</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
            
            {/* Child 2 */}
            <Card className="p-3 bg-white/90 border-[#FFD9A7]/30 shadow-sm">
              <h3 className="font-medium mb-3 text-sm">Child 2</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="kid2AgeRange" className="block mb-2 text-xs">Age</Label>
                  <Select value={kid2AgeRange} onValueChange={setKid2AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30 h-9 text-sm">
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#FFD9A7]/30 max-h-[200px]">
                      <ScrollArea className="h-[200px]">
                        <SelectGroup>
                          <SelectItem value="all">All Ages</SelectItem>
                          {ageOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="kid2Gender" className="block mb-2 text-xs">Gender</Label>
                  <Select value={kid2Gender} onValueChange={setKid2Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30 h-9 text-sm">
                      <SelectValue placeholder="Any Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#FFD9A7]/30">
                      <SelectGroup>
                        <SelectItem value="all">Any Gender</SelectItem>
                        <SelectItem value="Boy">Boy</SelectItem>
                        <SelectItem value="Girl">Girl</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
            
            {/* Child 3 */}
            <Card className="p-3 bg-white/90 border-[#FFD9A7]/30 shadow-sm">
              <h3 className="font-medium mb-3 text-sm">Child 3</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="kid3AgeRange" className="block mb-2 text-xs">Age</Label>
                  <Select value={kid3AgeRange} onValueChange={setKid3AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30 h-9 text-sm">
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#FFD9A7]/30 max-h-[200px]">
                      <ScrollArea className="h-[200px]">
                        <SelectGroup>
                          <SelectItem value="all">All Ages</SelectItem>
                          {ageOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="kid3Gender" className="block mb-2 text-xs">Gender</Label>
                  <Select value={kid3Gender} onValueChange={setKid3Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30 h-9 text-sm">
                      <SelectValue placeholder="Any Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#FFD9A7]/30">
                      <SelectGroup>
                        <SelectItem value="all">Any Gender</SelectItem>
                        <SelectItem value="Boy">Boy</SelectItem>
                        <SelectItem value="Girl">Girl</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Location */}
          <Card className="p-3 bg-white/90 border-[#FFD9A7]/30 shadow-sm">
            {renderFilterItem("Location", (
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#FFD9A7]/30">
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
            ))}
          </Card>
          
          {/* Nationality */}
          <Card className="p-3 bg-white/90 border-[#FFD9A7]/30 shadow-sm">
            {renderFilterItem("Nationality", (
              <Select value={nationality} onValueChange={setNationality}>
                <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
                  <SelectValue placeholder="Any Nationality" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#FFD9A7]/30">
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
            ))}
          </Card>
          
          {/* Profession */}
          <Card className="p-3 bg-white/90 border-[#FFD9A7]/30 shadow-sm">
            {renderFilterItem("Profession", (
              <Select value={workStatus} onValueChange={setWorkStatus}>
                <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
                  <SelectValue placeholder="Any Profession" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#FFD9A7]/30">
                  <SelectGroup>
                    <SelectItem value="all">Any Profession</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Stay-at-home">Stay-at-home</SelectItem>
                    <SelectItem value="Freelancer">Freelancer</SelectItem>
                    <SelectItem value="Business Owner">Business Owner</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ))}
          </Card>
          
          {/* Compatibility slider */}
          <Card className="p-3 bg-white/90 border-[#FFD9A7]/30 shadow-sm">
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
          </Card>
        </div>
        
        {/* Sticky action buttons */}
        <div className="sticky bottom-4 mt-4 flex justify-end gap-2">
          {onClose && (
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="border-[#FFD9A7]/50 hover:bg-[#FFD9A7]/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button 
            onClick={applyFilters} 
            className="bg-gradient-to-r from-[#B8CEC2] via-[#FFD9A7] to-[#FDB3A4] hover:opacity-90 text-foreground"
          >
            <Check className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
