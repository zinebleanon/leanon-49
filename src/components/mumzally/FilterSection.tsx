import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from "@/components/ui/badge";
import { Check, X, Filter, ArrowLeft, Search } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

interface FilterSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  searchTerm?: string;
}

const FilterSection = ({ onFiltersChange, onClose, open, onOpenChange, searchTerm = '' }: FilterSectionProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
  // Mother's age
  const [age, setAge] = useState('all');
  
  // Children filters
  const [kidFilters, setKidFilters] = useState([
    { ageRange: 'all', gender: 'all' },
    { ageRange: 'all', gender: 'all' },
    { ageRange: 'all', gender: 'all' }
  ]);
  
  // Location, nationality, work status
  const [location, setLocation] = useState('all');
  const [nationality, setNationality] = useState('all');
  const [workStatus, setWorkStatus] = useState('all');
  
  // Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const interestOptions = [
    "Outdoor activities", "Cooking", "Reading", "Arts and crafts", 
    "Music", "Playgroups", "Swimming", "Fitness", "Baby groups", "Beach days"
  ];
  
  // Compatibility slider
  const [compatibilityThreshold, setCompatibilityThreshold] = useState([70]);
  
  // Track active filters count
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Update local search term when prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  
  // Update kid filter at specific index
  const updateKidFilter = (index: number, field: 'ageRange' | 'gender', value: string) => {
    const newFilters = [...kidFilters];
    newFilters[index] = { ...newFilters[index], [field]: value };
    setKidFilters(newFilters);
  };
  
  // Toggle interest selection
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };
  
  // Calculate active filters count
  useEffect(() => {
    let count = 0;
    
    if (age !== 'all') count++;
    
    kidFilters.forEach(kid => {
      if (kid.ageRange !== 'all' || kid.gender !== 'all') count++;
    });
    
    if (location !== 'all') count++;
    if (nationality !== 'all') count++;
    if (workStatus !== 'all') count++;
    if (selectedInterests.length > 0) count++;
    if (compatibilityThreshold[0] !== 70) count++;
    if (localSearchTerm.trim() !== '') count++;
    
    setActiveFiltersCount(count);
  }, [age, kidFilters, location, nationality, workStatus, selectedInterests, compatibilityThreshold, localSearchTerm]);
  
  // Apply all filters
  const applyFilters = () => {
    const filters = {
      age,
      kids: kidFilters,
      location,
      nationality,
      workStatus,
      interests: selectedInterests,
      compatibilityThreshold: compatibilityThreshold[0],
      searchTerm: localSearchTerm
    };
    
    onFiltersChange(filters);
    
    toast({
      title: "Filters applied",
      description: `${activeFiltersCount} ${activeFiltersCount === 1 ? 'filter' : 'filters'} applied to your search.`,
    });
    
    if (onOpenChange) {
      onOpenChange(false);
    } else if (onClose) {
      onClose();
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    setAge('all');
    setKidFilters([
      { ageRange: 'all', gender: 'all' },
      { ageRange: 'all', gender: 'all' },
      { ageRange: 'all', gender: 'all' }
    ]);
    setLocation('all');
    setNationality('all');
    setWorkStatus('all');
    setSelectedInterests([]);
    setCompatibilityThreshold([70]);
    setLocalSearchTerm('');
    
    onFiltersChange({});
    
    toast({
      title: "Filters reset",
      description: "All filters have been cleared.",
    });
  };
  
  // Generate age options
  const ageOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i.toString(),
    label: `${i} year${i !== 1 ? 's' : ''}`
  }));
  
  const renderFilterContent = () => (
    <div className="py-6 px-4 bg-[#B8CEC2]/90">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold font-playfair">Find Moms</h2>
            {activeFiltersCount > 0 && (
              <Badge variant="outline" className="bg-white/50 px-2 py-1">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
            <X className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
        
        {/* Intelligent Search */}
        <Card className="p-3 bg-white/90 border-[#B8CEC2]/30 shadow-sm mb-4">
          <Label className="block mb-2 font-medium">Search</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, location, interests..."
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 border-[#B8CEC2]/30"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
        
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {/* Mother's Age */}
            <Card className="p-3 bg-white/90 border-[#B8CEC2]/30 shadow-sm">
              <Label className="block mb-2 font-medium">Mom's Age</Label>
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
            </Card>
            
            {/* Children */}
            <Card className="p-3 bg-white/90 border-[#B8CEC2]/30 shadow-sm">
              <Label className="block mb-2 font-medium">Children</Label>
              
              {kidFilters.map((kid, index) => (
                <div key={`kid-${index}`} className="mb-3 last:mb-0">
                  <h3 className="text-sm font-medium mb-2">Child {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs mb-1 block">Age</Label>
                      <Select 
                        value={kid.ageRange} 
                        onValueChange={(value) => updateKidFilter(index, 'ageRange', value)}
                      >
                        <SelectTrigger className="w-full h-9 text-sm bg-white/80 border-[#B8CEC2]/30">
                          <SelectValue placeholder="All Ages" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#B8CEC2]/30">
                          <SelectGroup>
                            <SelectItem value="all">All Ages</SelectItem>
                            {ageOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs mb-1 block">Gender</Label>
                      <Select 
                        value={kid.gender} 
                        onValueChange={(value) => updateKidFilter(index, 'gender', value)}
                      >
                        <SelectTrigger className="w-full h-9 text-sm bg-white/80 border-[#B8CEC2]/30">
                          <SelectValue placeholder="All" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#B8CEC2]/30">
                          <SelectGroup>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="Boy">Boy</SelectItem>
                            <SelectItem value="Girl">Girl</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </Card>
            
            {/* Location */}
            <Card className="p-3 bg-white/90 border-[#B8CEC2]/30 shadow-sm">
              <Label className="block mb-2 font-medium">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full bg-white/80 border-[#B8CEC2]/30">
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#B8CEC2]/30">
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
            </Card>
            
            {/* Nationality */}
            <Card className="p-3 bg-white/90 border-[#B8CEC2]/30 shadow-sm">
              <Label className="block mb-2 font-medium">Nationality</Label>
              <Select value={nationality} onValueChange={setNationality}>
                <SelectTrigger className="w-full bg-white/80 border-[#B8CEC2]/30">
                  <SelectValue placeholder="Any Nationality" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#B8CEC2]/30">
                  <SelectGroup>
                    <SelectItem value="all">Any Nationality</SelectItem>
                    <SelectItem value="British Expat">British Expat</SelectItem>
                    <SelectItem value="American Expat">American Expat</SelectItem>
                    <SelectItem value="Chinese-American">Chinese-American</SelectItem>
                    <SelectItem value="Indian Expat">Indian Expat</SelectItem>
                    <SelectItem value="Lebanese">Lebanese</SelectItem>
                    <SelectItem value="UAE">UAE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Card>
            
            {/* Work Status */}
            <Card className="p-3 bg-white/90 border-[#B8CEC2]/30 shadow-sm">
              <Label className="block mb-2 font-medium">Work Status</Label>
              <Select value={workStatus} onValueChange={setWorkStatus}>
                <SelectTrigger className="w-full bg-white/80 border-[#B8CEC2]/30">
                  <SelectValue placeholder="Any Work Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#B8CEC2]/30">
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
            </Card>
            
            {/* Interests */}
            <Card className="p-3 bg-white/90 border-[#B8CEC2]/30 shadow-sm">
              <Label className="block mb-2 font-medium">Interests</Label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(interest => (
                  <Badge 
                    key={interest}
                    variant={selectedInterests.includes(interest) ? "default" : "outline"}
                    className={`
                      cursor-pointer py-1 px-2 
                      ${selectedInterests.includes(interest) 
                        ? "bg-pastel-yellow text-foreground" 
                        : "bg-white/50 hover:bg-white"
                      }
                    `}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </Card>
            
            {/* Compatibility slider */}
            <Card className="p-3 bg-white/90 border-[#B8CEC2]/30 shadow-sm">
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
        </ScrollArea>
        
        {/* Sticky action buttons */}
        <div className="sticky bottom-4 mt-4 flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => {
              if (onOpenChange) {
                onOpenChange(false);
              } else if (onClose) {
                onClose();
              }
            }} 
            className="border-[#B8CEC2] bg-white hover:bg-[#B8CEC2]/20 text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            onClick={applyFilters} 
            className="bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground"
          >
            <Check className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
  
  // If open and onOpenChange props are provided, render as a dialog
  if (open !== undefined && onOpenChange) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-md p-0 bg-[#B8CEC2]/90 border-none">
          {renderFilterContent()}
        </DialogContent>
      </Dialog>
    );
  }
  
  // Otherwise, render as a regular section
  return <section id="filter-section">{renderFilterContent()}</section>;
};

export default FilterSection;
