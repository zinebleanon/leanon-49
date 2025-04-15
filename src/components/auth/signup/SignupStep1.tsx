
import React from 'react';
import { Mail, Lock, MapPin, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useToast } from '@/hooks/use-toast';
import { emiratesNeighborhoods, getEmirateFromNeighborhood } from '@/data/uae-locations';

interface SignupStep1Props {
  signUpData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    neighborhood: string;
    referralCode: string;
  };
  handleSignUpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const SignupStep1 = ({ signUpData, handleSignUpChange, isLoading }: SignupStep1Props) => {
  const [showNeighborhoodSearch, setShowNeighborhoodSearch] = React.useState(false);
  const [neighborhoodSearch, setNeighborhoodSearch] = React.useState('');
  const [selectedEmirate, setSelectedEmirate] = React.useState<string | null>(null);
  const { toast } = useToast();

  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    if (phone.length <= 9) {
      if (phone.length <= 2) return phone;
      if (phone.length <= 5) return `${phone.substring(0, 2)} ${phone.substring(2)}`;
      return `${phone.substring(0, 2)} ${phone.substring(2, 5)} ${phone.substring(5)}`;
    }
    return phone;
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Here you would typically make an API call to reverse geocode the coordinates
            const nearestNeighborhood = "Dubai Marina"; // This would come from the API
            const emirate = getEmirateFromNeighborhood(nearestNeighborhood);
            
            handleSignUpChange({
              target: {
                name: 'neighborhood',
                value: nearestNeighborhood
              }
            } as React.ChangeEvent<HTMLInputElement>);
            
            setSelectedEmirate(emirate);
            
            toast({
              title: "Location detected",
              description: `We detected your location in ${emirate}: ${nearestNeighborhood}`,
            });
          } catch (error) {
            console.error("Error getting location details:", error);
            toast({
              title: "Location detection failed",
              description: "Please select your neighborhood manually",
              variant: "destructive"
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Could not get your location. Please select your neighborhood manually.";
          
          toast({
            title: "Location error",
            description: errorMessage,
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "Geolocation unavailable",
        description: "Your browser doesn't support geolocation. Please select your neighborhood manually.",
        variant: "destructive"
      });
    }
  };

  return (
    <CardContent className="space-y-4 pt-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="signup-first-name">First Name</Label>
          <Input 
            id="signup-first-name"
            name="firstName"
            placeholder="First name"
            className="border-secondary/30 focus:border-secondary"
            value={signUpData.firstName}
            onChange={handleSignUpChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="signup-last-name">Last Name</Label>
          <Input 
            id="signup-last-name"
            name="lastName"
            placeholder="Last name"
            className="border-secondary/30 focus:border-secondary"
            value={signUpData.lastName}
            onChange={handleSignUpChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input 
          id="signup-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className="border-secondary/30 focus:border-secondary"
          icon={<Mail className="h-4 w-4" />}
          value={signUpData.email}
          onChange={handleSignUpChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-phone">Phone Number (UAE only)</Label>
        <div className="flex items-center">
          <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input h-10 text-sm">
            +971
          </div>
          <Input 
            id="signup-phone"
            name="phone"
            type="tel"
            placeholder="XX XXX XXXX"
            className="border-secondary/30 focus:border-secondary rounded-l-none"
            value={formatPhoneDisplay(signUpData.phone)}
            onChange={handleSignUpChange}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="signup-neighborhood">Your Neighborhood</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="h-8 flex items-center gap-1 text-xs"
            onClick={getLocation}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Get Location</span>
          </Button>
        </div>
        
        <div className="relative">
          <Input
            id="signup-neighborhood"
            name="neighborhood"
            value={signUpData.neighborhood}
            onClick={() => setShowNeighborhoodSearch(true)}
            readOnly
            placeholder="Select your neighborhood"
            className="border-secondary/30 focus:border-secondary"
          />
          
          <CommandDialog open={showNeighborhoodSearch} onOpenChange={setShowNeighborhoodSearch}>
            <CommandInput 
              placeholder="Search neighborhoods..." 
              value={neighborhoodSearch}
              onValueChange={setNeighborhoodSearch}
            />
            <CommandList>
              <CommandEmpty>No neighborhood found.</CommandEmpty>
              {Object.entries(emiratesNeighborhoods).map(([emirate, neighborhoods]) => {
                const filteredNeighborhoods = neighborhoods.filter(n => 
                  n.toLowerCase().includes(neighborhoodSearch.toLowerCase())
                );
                
                if (filteredNeighborhoods.length === 0) return null;
                
                return (
                  <CommandGroup key={emirate} heading={emirate}>
                    {filteredNeighborhoods.map((neighborhood) => (
                      <CommandItem
                        key={neighborhood}
                        onSelect={() => {
                          handleSignUpChange({
                            target: {
                              name: 'neighborhood',
                              value: neighborhood
                            }
                          } as React.ChangeEvent<HTMLInputElement>);
                          setSelectedEmirate(emirate);
                          setShowNeighborhoodSearch(false);
                        }}
                        className="cursor-pointer"
                      >
                        {neighborhood}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </CommandList>
          </CommandDialog>
        </div>
        
        {selectedEmirate && (
          <p className="text-xs text-muted-foreground mt-1">
            Located in {selectedEmirate}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input 
          id="signup-password"
          name="password"
          type="password"
          placeholder="Create a password"
          className="border-secondary/30 focus:border-secondary"
          icon={<Lock className="h-4 w-4" />}
          value={signUpData.password}
          onChange={handleSignUpChange}
          showPasswordToggle={true}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <Input 
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          className="border-secondary/30 focus:border-secondary"
          value={signUpData.confirmPassword}
          onChange={handleSignUpChange}
          showPasswordToggle={true}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-referral">Referral Code (Optional)</Label>
        <Input 
          id="signup-referral"
          name="referralCode"
          placeholder="Enter referral code if you have one"
          className="border-secondary/30 focus:border-secondary"
          icon={<Gift className="h-4 w-4" />}
          value={signUpData.referralCode}
          onChange={handleSignUpChange}
        />
        {signUpData.referralCode && (
          <p className="text-xs text-emerald-600 mt-1">
            <Check className="h-3 w-3 inline-block mr-1" /> Referral code applied
          </p>
        )}
      </div>
    </CardContent>
  );
};

export default SignupStep1;

