import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUserInfo } from '@/hooks/use-user-info';
import { useToast } from '@/hooks/use-toast';
import EditProfileDialog from './EditProfileDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import InterestsSelector from './InterestsSelector';
import NationalitySearch from './NationalitySearch';

interface SimpleProfileFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const SimpleProfileForm = ({ onSuccess, onCancel }: SimpleProfileFormProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddKidOpen, setIsAddKidOpen] = useState(false);
  
  const [workStatus, setWorkStatus] = useState(userInfo?.workStatus || 'full-time');
  const [nationality, setNationality] = useState(userInfo?.nationality || '');
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    userInfo?.birthDate ? new Date(userInfo.birthDate) : undefined
  );
  const [nationalitySearch, setNationalitySearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>(
    birthDate ? birthDate.getFullYear().toString() : new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    birthDate ? (birthDate.getMonth() + 1).toString().padStart(2, '0') : 
    (new Date().getMonth() + 1).toString().padStart(2, '0')
  );
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    userInfo?.interests ? userInfo.interests.split(', ').filter(Boolean) : []
  );
  
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

  const maxDate = new Date(); // Today
  const minDate = new Date('1900-01-01');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 81 }, (_, i) => 
    (currentYear - 80 + i).toString()
  );

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const updatedInfo = {
        workStatus,
        nationality,
        birthDate: birthDate ? birthDate.toISOString() : undefined,
        interests: selectedInterests.join(', '),
      };
      
      const success = updateUserInfo(updatedInfo);
      
      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully.",
        });
        onSuccess();
      } else {
        toast({
          title: "Update failed",
          description: "There was a problem updating your profile. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChild = () => {
    setIsAddKidOpen(true);
  };
  
  const filteredNationalities = nationalities.filter(nat =>
    nat.toLowerCase().includes(nationalitySearch.toLowerCase())
  );

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    const newDate = new Date(parseInt(year), parseInt(selectedMonth) - 1, 1);
    setBirthDate(newDate);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    const newDate = new Date(parseInt(selectedYear), parseInt(month) - 1, 1);
    setBirthDate(newDate);
  };

  const handleKidAdded = () => {
    setIsAddKidOpen(false);
    toast({
      title: "Child added",
      description: "Your child has been added to your profile.",
    });
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm p-0 max-w-md mx-auto relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 z-50"
        onClick={onCancel}
      >
        <X className="h-4 w-4" />
      </Button>

      <ScrollArea className="h-[80vh] rounded-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-2">Complete Your Profile</h2>
          <p className="text-center text-muted-foreground mb-6">Help us find Moms Around You</p>
          
          <Button 
            variant="outline" 
            className="w-full mb-6"
            onClick={onCancel}
          >
            <Clock className="mr-2 h-4 w-4" />
            Do this later
          </Button>
          
          <div className="space-y-6">
            <div>
              <Label className="font-medium">I am a:</Label>
              <RadioGroup 
                defaultValue={workStatus}
                onValueChange={setWorkStatus}
                className="flex gap-8 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full-time" id="full-time" />
                  <Label htmlFor="full-time">Full Time Mom</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="working" id="working" />
                  <Label htmlFor="working">Working Mom</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="nationality" className="font-medium">Your Nationality</Label>
              <NationalitySearch
                selectedNationality={nationality}
                onNationalitySelect={setNationality}
              />
            </div>
            
            <div>
              <Label className="font-medium">Your Birth Date</Label>
              <div className="flex gap-2 mb-2">
                <Select value={selectedMonth} onValueChange={handleMonthChange}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedYear} onValueChange={handleYearChange}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !birthDate && "text-muted-foreground"
                    )}
                  >
                    {birthDate ? (
                      format(birthDate, "MMMM d, yyyy")
                    ) : (
                      <span>Select day</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={birthDate}
                    onSelect={setBirthDate}
                    month={new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1)}
                    defaultMonth={new Date(parseInt(selectedYear), parseInt(selectedMonth) - 1)}
                    disabled={(date) => {
                      const minDate = new Date();
                      minDate.setFullYear(minDate.getFullYear() - 80);
                      return date > new Date() || date < minDate;
                    }}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1">
                Please select your date of birth
              </p>
            </div>
            
            <div>
              <InterestsSelector
                selectedInterests={selectedInterests}
                onInterestsChange={setSelectedInterests}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <Label className="font-medium">Your Children</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleAddChild}
                  className="text-primary hover:bg-primary/10"
                >
                  + Add Child
                </Button>
              </div>
              
              {(!userInfo?.kids || userInfo.kids.length === 0) && (
                <p className="text-sm text-muted-foreground mt-2">No children added yet</p>
              )}
              
              {userInfo?.kids && userInfo.kids.length > 0 && (
                <div className="space-y-2 mt-2">
                  {userInfo.kids.map((kid, index) => {
                    let age = 0;
                    if (kid.birthDate) {
                      const birthDate = new Date(kid.birthDate);
                      const today = new Date();
                      age = today.getFullYear() - birthDate.getFullYear();
                      
                      const monthDiff = today.getMonth() - birthDate.getMonth();
                      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                      }
                    }
                    
                    return (
                      <div key={index} className="flex justify-between bg-muted p-2 rounded border">
                        <span>Child {index + 1}</span>
                        <span className="text-sm text-muted-foreground">
                          {kid.gender === 'male' ? 'Boy' : kid.gender === 'female' ? 'Girl' : kid.gender}, {age} {age === 1 ? 'year' : 'years'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            
            <Button 
              className="w-full"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        </div>
      </ScrollArea>

      <EditProfileDialog
        isOpen={isAddKidOpen}
        onOpenChange={setIsAddKidOpen}
        mode="kid"
        title="Add Child"
        description="Enter your child's information"
        onSuccess={handleKidAdded}
      />
    </div>
  );
};

export default SimpleProfileForm;
