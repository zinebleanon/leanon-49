
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

interface FilterSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  onClose?: () => void;
}

const FilterSection = ({ onFiltersChange, onClose }: FilterSectionProps) => {
  const navigate = useNavigate();
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
  
  // Fourth child
  const [kid4AgeRange, setKid4AgeRange] = useState('all');
  const [kid4Gender, setKid4Gender] = useState('all');
  
  // Fifth child
  const [kid5AgeRange, setKid5AgeRange] = useState('all');
  const [kid5Gender, setKid5Gender] = useState('all');
  
  // Sixth child
  const [kid6AgeRange, setKid6AgeRange] = useState('all');
  const [kid6Gender, setKid6Gender] = useState('all');
  
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
        },
        {
          ageRange: kid4AgeRange !== 'all' ? kid4AgeRange : null,
          gender: kid4Gender !== 'all' ? kid4Gender : null
        },
        {
          ageRange: kid5AgeRange !== 'all' ? kid5AgeRange : null,
          gender: kid5Gender !== 'all' ? kid5Gender : null
        },
        {
          ageRange: kid6AgeRange !== 'all' ? kid6AgeRange : null,
          gender: kid6Gender !== 'all' ? kid6Gender : null
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
    if (activeFilters.kids[3].ageRange || activeFilters.kids[3].gender) count++;
    if (activeFilters.kids[4].ageRange || activeFilters.kids[4].gender) count++;
    if (activeFilters.kids[5].ageRange || activeFilters.kids[5].gender) count++;
    if (activeFilters.location) count++;
    if (activeFilters.nationality) count++;
    if (activeFilters.workStatus) count++;
    if (activeFilters.compatibilityThreshold !== 70) count++;
    
    setActiveFiltersCount(count);
    
  }, [age, kid1AgeRange, kid1Gender, kid2AgeRange, kid2Gender, kid3AgeRange, kid3Gender, 
      kid4AgeRange, kid4Gender, kid5AgeRange, kid5Gender, kid6AgeRange, kid6Gender, 
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
        },
        {
          ageRange: kid4AgeRange,
          gender: kid4Gender
        },
        {
          ageRange: kid5AgeRange,
          gender: kid5Gender
        },
        {
          ageRange: kid6AgeRange,
          gender: kid6Gender
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
    setKid4AgeRange('all');
    setKid4Gender('all');
    setKid5AgeRange('all');
    setKid5Gender('all');
    setKid6AgeRange('all');
    setKid6Gender('all');
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
  
  return (
    <section className="py-8 px-4 md:px-8 bg-[#B8CEC2]/30" id="filter-section">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')} 
              className="bg-white/80 shadow-sm hover:bg-white mb-4"
            >
              <Home className="h-4 w-4 mr-2" />
              Main Menu
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold font-playfair">Filter Match</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="outline" className="bg-[#FFD9A7]/50 px-2 py-1">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters}>
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="ageRange" className="block mb-2">Mother's Age</Label>
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
            </div>
            
            <div className="p-4 bg-[#FFD9A7] rounded-lg border border-[#FFD9A7]/30">
              <h3 className="font-medium mb-3">Child 1</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kid1AgeRange" className="block mb-2">Age</Label>
                  <Select value={kid1AgeRange} onValueChange={setKid1AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
                  <Label htmlFor="kid1Gender" className="block mb-2">Gender</Label>
                  <Select value={kid1Gender} onValueChange={setKid1Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
            </div>
            
            <div className="p-4 bg-[#FFD9A7] rounded-lg border border-[#FFD9A7]/30">
              <h3 className="font-medium mb-3">Child 2</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kid2AgeRange" className="block mb-2">Age</Label>
                  <Select value={kid2AgeRange} onValueChange={setKid2AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
                  <Label htmlFor="kid2Gender" className="block mb-2">Gender</Label>
                  <Select value={kid2Gender} onValueChange={setKid2Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
            </div>
            
            <div className="p-4 bg-[#FFD9A7] rounded-lg border border-[#FFD9A7]/30">
              <h3 className="font-medium mb-3">Child 3</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kid3AgeRange" className="block mb-2">Age</Label>
                  <Select value={kid3AgeRange} onValueChange={setKid3AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
                  <Label htmlFor="kid3Gender" className="block mb-2">Gender</Label>
                  <Select value={kid3Gender} onValueChange={setKid3Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
            </div>
            
            <div className="p-4 bg-[#FFD9A7] rounded-lg border border-[#FFD9A7]/30">
              <h3 className="font-medium mb-3">Child 4</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kid4AgeRange" className="block mb-2">Age</Label>
                  <Select value={kid4AgeRange} onValueChange={setKid4AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
                  <Label htmlFor="kid4Gender" className="block mb-2">Gender</Label>
                  <Select value={kid4Gender} onValueChange={setKid4Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-[#FFD9A7] rounded-lg border border-[#FFD9A7]/30">
              <h3 className="font-medium mb-3">Child 5</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kid5AgeRange" className="block mb-2">Age</Label>
                  <Select value={kid5AgeRange} onValueChange={setKid5AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
                  <Label htmlFor="kid5Gender" className="block mb-2">Gender</Label>
                  <Select value={kid5Gender} onValueChange={setKid5Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
            </div>
            
            <div className="p-4 bg-[#FFD9A7] rounded-lg border border-[#FFD9A7]/30">
              <h3 className="font-medium mb-3">Child 6</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kid6AgeRange" className="block mb-2">Age</Label>
                  <Select value={kid6AgeRange} onValueChange={setKid6AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
                  <Label htmlFor="kid6Gender" className="block mb-2">Gender</Label>
                  <Select value={kid6Gender} onValueChange={setKid6Gender}>
                    <SelectTrigger className="w-full bg-white/80 border-[#FFD9A7]/30">
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
            </div>
            
            <div>
              <Label htmlFor="location" className="block mb-2">Location</Label>
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
            </div>
            
            <div>
              <Label htmlFor="nationality" className="block mb-2">Nationality</Label>
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
            </div>
            
            <div>
              <Label htmlFor="workStatus" className="block mb-2">Profession</Label>
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
            </div>
            
            <div className="mt-6 mb-8 p-4 bg-[#FFD9A7] rounded-lg border border-[#FFD9A7]/30">
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
                <Button variant="outline" onClick={onClose} className="border-[#FFD9A7]/50 hover:bg-[#FFD9A7]/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
              <Button onClick={applyFilters} className="min-w-[120px] bg-gradient-to-r from-[#B8CEC2] via-[#FFD9A7] to-[#FDB3A4] hover:opacity-90 text-foreground">
                <Check className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilterSection;
