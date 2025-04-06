import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Heart, Mail, Check, Plus, Minus, Calendar, MapPin, Search } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface JoinCommunityModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Kid {
  id: string;
  birthDate: Date | undefined;
  gender: string;
}

const neighborhoods = [
  "Dubai Marina", "JLT", "Downtown Dubai", "Palm Jumeirah", "Arabian Ranches",
  "Emirates Hills", "Mirdif", "Dubailand", "Silicon Oasis", "Business Bay",
  "Al Barsha", "Deira", "Bur Dubai", "The Springs", "The Meadows", "The Greens",
  "Jumeirah", "Umm Suqeim", "Discovery Gardens", "International City"
];

const nationalities = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguan", "Argentine", "Armenian", "Australian",
  "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean",
  "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Botswanan", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe",
  "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean",
  "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian",
  "Dominican", "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian",
  "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek",
  "Grenadian", "Guatemalan", "Guinean", "Guyanese", "Haitian", "Honduran", "Hungarian", "Icelandic", "Indian", "Indonesian",
  "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan",
  "Kiribati", "North Korean", "South Korean", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Lesothan", "Liberian",
  "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivian",
  "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian",
  "Montenegrin", "Moroccan", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealand", "Nicaraguan", "Nigerian", "Nigerien",
  "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese",
  "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi",
  "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovak", "Slovenian", "Solomon Islander", "Somali",
  "South African", "Spanish", "Sri Lankan", "Sudanese", "Surinamese", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik",
  "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian", "Tunisian", "Turkish", "Turkmen", "Tuvaluan", "Ugandan", "Ukrainian",
  "Uruguayan", "Uzbek", "Vanuatuan", "Vatican", "Venezuelan", "Vietnamese", "Yemeni", "Zambian", "Zimbabwean"
].sort((a, b) => a.localeCompare(b));

const JoinCommunityModal = ({ isOpen, onOpenChange }: JoinCommunityModalProps) => {
  const [step, setStep] = useState<'options' | 'form' | 'success'>('options');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: undefined as Date | undefined,
    neighborhood: '',
    nationality: '',
    workStatus: 'stay-home',
    interests: '',
    latitude: '',
    longitude: '',
  });
  const [kids, setKids] = useState<Kid[]>([
    { id: '1', birthDate: undefined, gender: '' }
  ]);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [nationalitySearch, setNationalitySearch] = useState('');
  const [filteredNationalities, setFilteredNationalities] = useState(nationalities);

  useEffect(() => {
    if (nationalitySearch.trim() === '') {
      setFilteredNationalities(nationalities);
    } else {
      const filtered = nationalities.filter(nationality => 
        nationality.toLowerCase().includes(nationalitySearch.toLowerCase())
      );
      setFilteredNationalities(filtered);
    }
  }, [nationalitySearch]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.birthDate || !formData.neighborhood || !formData.nationality) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const isKidsInfoComplete = kids.every(kid => kid.birthDate && kid.gender);
    if (!isKidsInfoComplete) {
      toast({
        title: "Missing kids information",
        description: "Please provide birth date and gender for each child.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Form submitted:', { ...formData, kids });
    
    toast({
      title: "Welcome to MumzAlly!",
      description: "Thanks for joining our community! We'll be in touch soon.",
    });
    
    setStep('success');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, birthDate: date }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, workStatus: value }));
  };

  const addKid = () => {
    setKids(prev => [...prev, { id: Date.now().toString(), birthDate: undefined, gender: '' }]);
  };

  const removeKid = (idToRemove: string) => {
    if (kids.length > 1) {
      setKids(prev => prev.filter(kid => kid.id !== idToRemove));
    }
  };

  const updateKidGender = (id: string, value: string) => {
    setKids(prev => 
      prev.map(kid => 
        kid.id === id ? { ...kid, gender: value } : kid
      )
    );
  };

  const updateKidBirthDate = (id: string, date: Date | undefined) => {
    setKids(prev => 
      prev.map(kid => 
        kid.id === id ? { ...kid, birthDate: date } : kid
      )
    );
  };

  const resetModal = () => {
    setStep('options');
    setFormData({
      name: '',
      email: '',
      birthDate: undefined,
      neighborhood: '',
      nationality: '',
      workStatus: 'stay-home',
      interests: '',
      latitude: '',
      longitude: '',
    });
    setKids([{ id: '1', birthDate: undefined, gender: '' }]);
    setNationalitySearch('');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(resetModal, 300);
    }
    onOpenChange(open);
  };

  const detectLocation = () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
          
          const randomIndex = Math.floor(Math.random() * neighborhoods.length);
          const autoDetectedNeighborhood = neighborhoods[randomIndex];
          
          setFormData(prev => ({
            ...prev,
            neighborhood: autoDetectedNeighborhood
          }));
          
          toast({
            title: "Location detected",
            description: `We detected your neighborhood as ${autoDetectedNeighborhood}`,
          });
          
          setIsDetectingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location error",
            description: "Could not detect your location. Please select your neighborhood manually.",
            variant: "destructive"
          });
          setIsDetectingLocation(false);
        }
      );
    } else {
      toast({
        title: "Geolocation unavailable",
        description: "Your browser doesn't support geolocation. Please select your neighborhood manually.",
        variant: "destructive"
      });
      setIsDetectingLocation(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair mb-2 flex items-center gap-2">
            <Heart className="text-primary h-5 w-5" fill="currentColor" />
            Join LeanOn Community
          </DialogTitle>
          <DialogDescription>
            A community of Moms Supporting Moms.
          </DialogDescription>
        </DialogHeader>

        {step === 'options' && (
          <div className="grid gap-4 py-4">            
            <Card 
              className="cursor-pointer hover:border-primary transition-all"
              onClick={() => setStep('form')}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mt-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Join via Subscription</h3>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'form' && (
          <form onSubmit={handleFormSubmit} className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Enter your full name" 
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="grid gap-2">
              <Label>Birth Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.birthDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.birthDate ? format(formData.birthDate, "PPP") : <span>Select your birth date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.birthDate}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Children Information</Label>
              {kids.map((kid, index) => (
                <div key={kid.id} className="grid grid-cols-12 gap-2 items-end pt-2 first:pt-0">
                  <div className="col-span-5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !kid.birthDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {kid.birthDate ? format(kid.birthDate, "PPP") : <span>Birth date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={kid.birthDate}
                          onSelect={(date) => updateKidBirthDate(kid.id, date)}
                          initialFocus
                          disabled={(date) => date > new Date()}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="col-span-5">
                    <Select 
                      value={kid.gender} 
                      onValueChange={(value) => updateKidGender(kid.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boy">Boy</SelectItem>
                        <SelectItem value="girl">Girl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 flex">
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeKid(kid.id)}
                      disabled={kids.length === 1}
                      className="ml-auto"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addKid}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Child
              </Button>
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="neighborhood">Neighborhood</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={detectLocation}
                  disabled={isDetectingLocation}
                  className="flex items-center gap-1"
                >
                  {isDetectingLocation ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  <span>Detect Location</span>
                </Button>
              </div>
              <Select 
                value={formData.neighborhood} 
                onValueChange={(value) => handleSelectChange('neighborhood', value)}
              >
                <SelectTrigger id="neighborhood">
                  <SelectValue placeholder="Select your neighborhood" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map((neighborhood) => (
                    <SelectItem key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Activate location so we can propose the closest Moms to you.
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {formData.nationality || "Select your nationality"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                  <div className="p-2">
                    <div className="flex items-center border rounded-md px-2">
                      <Search className="h-4 w-4 text-muted-foreground mr-2" />
                      <Input
                        placeholder="Search..."
                        value={nationalitySearch}
                        onChange={(e) => setNationalitySearch(e.target.value)}
                        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
                      />
                    </div>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredNationalities.length > 0 ? (
                      filteredNationalities.map((nationality) => (
                        <div
                          key={nationality}
                          className="px-3 py-2 text-sm cursor-pointer hover:bg-secondary"
                          onClick={() => {
                            handleSelectChange('nationality', nationality);
                            setNationalitySearch('');
                          }}
                        >
                          {nationality}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        No results found
                      </div>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label>Work Status</Label>
              <RadioGroup 
                value={formData.workStatus} 
                onValueChange={handleWorkStatusChange}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stay-home" id="stay-home" />
                  <Label htmlFor="stay-home" className="cursor-pointer">Stay-Home Mom</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="working" id="working" />
                  <Label htmlFor="working" className="cursor-pointer">Working Mom</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="interests">Interests</Label>
              <Textarea 
                id="interests" 
                name="interests" 
                value={formData.interests} 
                onChange={handleInputChange} 
                placeholder="What are you interested in? (e.g., Cooking, Fitness, Reading)" 
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 justify-end pt-3">
              <Button type="button" variant="outline" onClick={() => setStep('options')}>
                Back
              </Button>
              <Button type="submit" variant="warm">Join Now</Button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h3 className="text-xl font-medium">Welcome to MumzAlly!</h3>
            
            <p className="text-muted-foreground">
              Thank you for joining our community. We'll be in touch soon with more information about upcoming events and activities in your neighborhood.
            </p>
            
            <Button 
              variant="warm" 
              className="mt-4" 
              onClick={() => handleOpenChange(false)}
            >
              Continue Exploring
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityModal;
