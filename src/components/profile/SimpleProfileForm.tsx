import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUserInfo } from '@/hooks/use-user-info';
import { useToast } from '@/hooks/use-toast';
import EditProfileDialog from './EditProfileDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

interface SimpleProfileFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const SimpleProfileForm = ({ onSuccess, onCancel }: SimpleProfileFormProps) => {
  const { userInfo, updateUserInfo, kidsAges } = useUserInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddKidOpen, setIsAddKidOpen] = useState(false);
  
  const [workStatus, setWorkStatus] = useState(userInfo?.workStatus || 'full-time');
  const [nationality, setNationality] = useState(userInfo?.nationality || '');
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    userInfo?.birthDate ? new Date(userInfo.birthDate) : undefined
  );
  const [nationalitySearch, setNationalitySearch] = useState('');

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

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const updatedInfo = {
        workStatus,
        nationality,
        birthDate: birthDate ? birthDate.toISOString() : undefined,
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

  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 max-w-md mx-auto">
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
          <Select value={nationality} onValueChange={setNationality}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select your nationality" />
            </SelectTrigger>
            <SelectContent>
              <div className="sticky top-0 p-2 bg-white border-b">
                <Input
                  placeholder="Search nationality..."
                  value={nationalitySearch}
                  onChange={(e) => setNationalitySearch(e.target.value)}
                  className="h-8"
                />
              </div>
              <ScrollArea className="h-[200px]">
                {filteredNationalities.map((nat) => (
                  <SelectItem key={nat} value={nat}>
                    {nat}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="font-medium">Your Birth Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-1 justify-start text-left font-normal"
              >
                {birthDate ? (
                  format(birthDate, "MMMM d, yyyy")
                ) : (
                  <span className="text-muted-foreground">Select your birth date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={setBirthDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
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
              {kidsAges.map((kid, index) => (
                <div key={index} className="flex justify-between bg-muted p-2 rounded border">
                  <span>Child {index + 1}</span>
                  <span className="text-sm text-muted-foreground">
                    {kid.gender}, {kid.age} {kid.age === 1 ? 'year' : 'years'}
                  </span>
                </div>
              ))}
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

      <EditProfileDialog
        isOpen={isAddKidOpen}
        onOpenChange={setIsAddKidOpen}
        mode="kid"
        title="Add Child"
        description="Enter your child's information"
      />
    </div>
  );
};

export default SimpleProfileForm;
