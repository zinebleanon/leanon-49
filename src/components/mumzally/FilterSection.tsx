import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from "@/components/ui/badge";
import { Check, X, Filter, ArrowLeft } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from '@/components/ui/input';

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
  const [age, setAge] = useState('all');
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  
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
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Add nationality search state
  const [nationalitySearch, setNationalitySearch] = useState('');
  
  // Filter nationalities based on search
  const nationalities = [
    "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentine", "Armenian", "Australian",
    "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese",
    "Bhutanese", "Bolivian", "Bosnian", "Botswanan", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese",
    "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian",
    "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican",
    "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirati", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian",
    "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian",
    "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian",
    "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan",
    "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourgish",
    "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian",
    "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Montenegrin", "Moroccan", "Mozambican", "Namibian", "Nauruan",
    "Nepalese", "New Zealand", "Nicaraguan", "Nigerian", "North Korean", "Norwegian", "Omani", "Pakistani", "Palauan", "Palestinian",
    "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan",
    "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Saudi", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean",
    "Slovak", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Surinamese",
    "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan",
    "Trinidadian", "Tunisian", "Turkish", "Turkmen", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Vanuatuan",
    "Vatican", "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean"
  ];
  
  const filteredNationalities = nationalities.filter(nat =>
    nat.toLowerCase().includes(nationalitySearch.toLowerCase())
  );

  // Update local search term when prop changes
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);
  
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
      compatibilityThreshold: compatibilityThreshold[0],
      searchTerm: localSearchTerm.trim() !== '' ? localSearchTerm : null
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
    if (activeFilters.searchTerm) count++;
    
    setActiveFiltersCount(count);
    
  }, [age, kid1AgeRange, kid1Gender, kid2AgeRange, kid2Gender, kid3AgeRange, kid3Gender, 
      location, nationality, workStatus, compatibilityThreshold, localSearchTerm]);
  
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
    setLocalSearchTerm('');
    
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
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  const renderFilterContent = () => (
    <div className="py-6 px-4 bg-pastel-green">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {activeFiltersCount > 0 && (
              <Badge variant="outline" className="bg-pastel-green/50 px-2 py-1">
                {activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} active
              </Badge>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
            
            <Button 
              onClick={applyFilters} 
              className="bg-pastel-green hover:bg-pastel-green/90 text-foreground"
              size="sm"
            >
              <Check className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
        
        <div className="space-y-3 overflow-y-auto pb-16" style={{ maxHeight: isMobile ? 'calc(100vh - 240px)' : 'none' }}>
          {/* Mother's Age */}
          <Collapsible
            open={expandedSection === 'mother-age'}
            onOpenChange={() => toggleSection('mother-age')}
            className="bg-white/90 rounded-lg shadow-sm border border-pastel-green/30"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left">
              <span className="font-medium">Mother's Age</span>
              <Badge variant={age !== 'all' ? 'default' : 'outline'} className="ml-2 bg-pastel-green/60">
                {age !== 'all' ? age : 'All'}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 border-t border-pastel-green/30">
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger className="w-full bg-white/80 border-pastel-green/30">
                  <SelectValue placeholder="All Ages" />
                </SelectTrigger>
                <SelectContent className="bg-white border-pastel-green/30">
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
            </CollapsibleContent>
          </Collapsible>
          
          {/* Child 1 */}
          <Collapsible
            open={expandedSection === 'child-1'}
            onOpenChange={() => toggleSection('child-1')}
            className="bg-white/90 rounded-lg shadow-sm border border-pastel-green/30"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left">
              <span className="font-medium">Child 1</span>
              <Badge 
                variant={(kid1AgeRange !== 'all' || kid1Gender !== 'all') ? 'default' : 'outline'} 
                className="ml-2 bg-pastel-green/60"
              >
                {kid1AgeRange !== 'all' ? `${kid1AgeRange}yr` : ''} 
                {kid1Gender !== 'all' ? (kid1AgeRange !== 'all' ? ', ' : '') + kid1Gender : ''}
                {kid1AgeRange === 'all' && kid1Gender === 'all' ? 'All' : ''}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 border-t border-pastel-green/30">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="kid1AgeRange" className="block mb-2 text-xs">Age</Label>
                  <Select value={kid1AgeRange} onValueChange={setKid1AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-pastel-green/30 h-9 text-sm">
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-pastel-green/30 max-h-[200px]">
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
                    <SelectTrigger className="w-full bg-white/80 border-pastel-green/30 h-9 text-sm">
                      <SelectValue placeholder="Any Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-pastel-green/30">
                      <SelectGroup>
                        <SelectItem value="all">Any Gender</SelectItem>
                        <SelectItem value="Boy">Boy</SelectItem>
                        <SelectItem value="Girl">Girl</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Child 2 */}
          <Collapsible
            open={expandedSection === 'child-2'}
            onOpenChange={() => toggleSection('child-2')}
            className="bg-white/90 rounded-lg shadow-sm border border-pastel-green/30"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left">
              <span className="font-medium">Child 2</span>
              <Badge 
                variant={(kid2AgeRange !== 'all' || kid2Gender !== 'all') ? 'default' : 'outline'} 
                className="ml-2 bg-pastel-green/60"
              >
                {kid2AgeRange !== 'all' ? `${kid2AgeRange}yr` : ''} 
                {kid2Gender !== 'all' ? (kid2AgeRange !== 'all' ? ', ' : '') + kid2Gender : ''}
                {kid2AgeRange === 'all' && kid2Gender === 'all' ? 'All' : ''}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 border-t border-pastel-green/30">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="kid2AgeRange" className="block mb-2 text-xs">Age</Label>
                  <Select value={kid2AgeRange} onValueChange={setKid2AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-pastel-green/30 h-9 text-sm">
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-pastel-green/30 max-h-[200px]">
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
                    <SelectTrigger className="w-full bg-white/80 border-pastel-green/30 h-9 text-sm">
                      <SelectValue placeholder="Any Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-pastel-green/30">
                      <SelectGroup>
                        <SelectItem value="all">Any Gender</SelectItem>
                        <SelectItem value="Boy">Boy</SelectItem>
                        <SelectItem value="Girl">Girl</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Child 3 */}
          <Collapsible
            open={expandedSection === 'child-3'}
            onOpenChange={() => toggleSection('child-3')}
            className="bg-white/90 rounded-lg shadow-sm border border-pastel-green/30"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left">
              <span className="font-medium">Child 3</span>
              <Badge 
                variant={(kid3AgeRange !== 'all' || kid3Gender !== 'all') ? 'default' : 'outline'} 
                className="ml-2 bg-pastel-green/60"
              >
                {kid3AgeRange !== 'all' ? `${kid3AgeRange}yr` : ''} 
                {kid3Gender !== 'all' ? (kid3AgeRange !== 'all' ? ', ' : '') + kid3Gender : ''}
                {kid3AgeRange === 'all' && kid3Gender === 'all' ? 'All' : ''}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 border-t border-pastel-green/30">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="kid3AgeRange" className="block mb-2 text-xs">Age</Label>
                  <Select value={kid3AgeRange} onValueChange={setKid3AgeRange}>
                    <SelectTrigger className="w-full bg-white/80 border-pastel-green/30 h-9 text-sm">
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-pastel-green/30 max-h-[200px]">
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
                    <SelectTrigger className="w-full bg-white/80 border-pastel-green/30 h-9 text-sm">
                      <SelectValue placeholder="Any Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-pastel-green/30">
                      <SelectGroup>
                        <SelectItem value="all">Any Gender</SelectItem>
                        <SelectItem value="Boy">Boy</SelectItem>
                        <SelectItem value="Girl">Girl</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Location */}
          <Collapsible
            open={expandedSection === 'location'}
            onOpenChange={() => toggleSection('location')}
            className="bg-white/90 rounded-lg shadow-sm border border-pastel-green/30"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left">
              <span className="font-medium">Location</span>
              <Badge variant={location !== 'all' ? 'default' : 'outline'} className="ml-2 bg-pastel-green/60">
                {location !== 'all' ? location : 'All'}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 border-t border-pastel-green/30">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full bg-white/80 border-pastel-green/30">
                  <SelectValue placeholder="Any Location" />
                </SelectTrigger>
                <SelectContent className="bg-white border-pastel-green/30">
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
            </CollapsibleContent>
          </Collapsible>
          
          {/* Nationality */}
          <Collapsible
            open={expandedSection === 'nationality'}
            onOpenChange={() => toggleSection('nationality')}
            className="bg-white/90 rounded-lg shadow-sm border border-pastel-green/30"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left">
              <span className="font-medium">Nationality</span>
              <Badge variant={nationality !== 'all' ? 'default' : 'outline'} className="ml-2 bg-pastel-green/60">
                {nationality !== 'all' ? nationality : 'All'}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 border-t border-pastel-green/30">
              <Select value={nationality} onValueChange={setNationality}>
                <SelectTrigger className="w-full bg-white/80 border-pastel-green/30">
                  <SelectValue placeholder="Any Nationality" />
                </SelectTrigger>
                <SelectContent className="bg-white border-pastel-green/30">
                  <div className="sticky top-0 p-2 bg-white border-b">
                    <Input
                      placeholder="Search nationality..."
                      value={nationalitySearch}
                      onChange={(e) => setNationalitySearch(e.target.value)}
                      className="h-8"
                    />
                  </div>
                  <ScrollArea className="h-[200px]">
                    <SelectGroup>
                      <SelectItem value="all">Any Nationality</SelectItem>
                      {filteredNationalities.map((nat) => (
                        <SelectItem key={nat} value={nat}>{nat}</SelectItem>
                      ))}
                    </SelectGroup>
                  </ScrollArea>
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Profession */}
          <Collapsible
            open={expandedSection === 'profession'}
            onOpenChange={() => toggleSection('profession')}
            className="bg-white/90 rounded-lg shadow-sm border border-pastel-green/30"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left">
              <span className="font-medium">Profession</span>
              <Badge variant={workStatus !== 'all' ? 'default' : 'outline'} className="ml-2 bg-pastel-green/60">
                {workStatus !== 'all' ? workStatus : 'All'}
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 border-t border-pastel-green/30">
              <Select value={workStatus} onValueChange={setWorkStatus}>
                <SelectTrigger className="w-full bg-white/80 border-pastel-green/30">
                  <SelectValue placeholder="Any Profession" />
                </SelectTrigger>
                <SelectContent className="bg-white border-pastel-green/30">
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
            </CollapsibleContent>
          </Collapsible>
          
          {/* Compatibility slider */}
          <Collapsible
            open={expandedSection === 'compatibility'}
            onOpenChange={() => toggleSection('compatibility')}
            className="bg-white/90 rounded-lg shadow-sm border border-pastel-green/30"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left">
              <span className="font-medium">Minimum Compatibility</span>
              <Badge 
                variant={compatibilityThreshold[0] !== 70 ? 'default' : 'outline'} 
                className="ml-2 bg-pastel-green/60"
              >
                {compatibilityThreshold[0]}%
              </Badge>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 border-t border-pastel-green/30">
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
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
  
  // If open and onOpenChange props are provided, render as a dialog
  if (open !== undefined && onOpenChange) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-5xl p-0 bg-pastel-green">
          {renderFilterContent()}
        </DialogContent>
      </Dialog>
    );
  }
  
  // Otherwise, render as a regular section
  return <section id="filter-section">{renderFilterContent()}</section>;
};

export default FilterSection;
