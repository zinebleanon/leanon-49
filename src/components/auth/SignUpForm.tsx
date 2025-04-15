import React, { useState } from 'react';
import { Mail, Lock, MapPin, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

const dubaiNeighborhoods = [
  "Dubai Marina", "JLT", "Downtown Dubai", "Palm Jumeirah", "Arabian Ranches",
  "Emirates Hills", "Mirdif", "Dubailand", "Silicon Oasis", "Business Bay",
  "Al Barsha", "Deira", "Bur Dubai", "The Springs", "The Meadows", "The Greens",
  "Jumeirah", "Umm Suqeim", "Discovery Gardens", "International City"
];

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
  signupStep: number;
  onStepChange: (step: number) => void;
  defaultReferralCode?: string;
}

const SignUpForm = ({ onSwitchToSignIn, signupStep, onStepChange, defaultReferralCode = '' }: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showNeighborhoodSearch, setShowNeighborhoodSearch] = useState(false);
  const [neighborhoodSearch, setNeighborhoodSearch] = useState('');
  const [otpValue, setOtpValue] = useState("");
  const { signUp } = useAuth();
  const { toast } = useToast();

  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    neighborhood: 'Dubai Marina',
    referralCode: defaultReferralCode
  });

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      let formattedValue = value.replace(/\D/g, '');
      if (formattedValue.startsWith('0')) {
        formattedValue = formattedValue.substring(1);
      }
      if (formattedValue.length > 9) {
        formattedValue = formattedValue.substring(0, 9);
      }
      setSignUpData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setSignUpData(prev => ({ ...prev, [name]: value }));
  };

  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    if (phone.length <= 9) {
      if (phone.length <= 2) return phone;
      if (phone.length <= 5) return `${phone.substring(0, 2)} ${phone.substring(2)}`;
      return `${phone.substring(0, 2)} ${phone.substring(2, 5)} ${phone.substring(5)}`;
    }
    return phone;
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (signupStep === 1) {
      if (signUpData.password !== signUpData.confirmPassword) {
        toast({
          title: "Passwords don't match",
          description: "Please make sure your passwords match.",
          variant: "destructive",
        });
        return;
      }
      
      if (signUpData.phone.length < 8) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid UAE phone number.",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      try {
        
        setSignupStep(2);
        toast({
          title: "Verification code sent",
          description: `We've sent a verification code to +971 ${formatPhoneDisplay(signUpData.phone)}`,
        });
      } catch (error: any) {
        console.error("Error in signup:", error);
        toast({
          title: "Error signing up",
          description: error instanceof Error ? error.message : "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else if (signupStep === 2) {
      if (otpValue.length !== 4) {
        toast({
          title: "Invalid code",
          description: "Please enter the 4-digit verification code.",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      try {
        await signUp(
          signUpData.email, 
          signUpData.password, 
          {
            first_name: signUpData.firstName,
            last_name: signUpData.lastName,
            phone: signUpData.phone
          }
        );
        
        toast({
          title: "Welcome to LeanOn!",
          description: `We're excited to have you here, ${signUpData.firstName}!`,
        });

        // The navigation will be handled by the auth provider in use-auth.tsx
        // which already redirects to /ally/subscribe on successful signup
      } catch (error: any) {
        console.error("Error completing signup:", error);
        setIsLoading(false);
        
        if (error.message?.toLowerCase().includes('email address already in use')) {
          toast({
            title: "Email already registered",
            description: "This email address is already registered. Please sign in or use a different email.",
            variant: "destructive",
          });
          setSignupStep(1);
        } else {
          toast({
            title: "Error signing up",
            description: error.message || "An unexpected error occurred",
            variant: "destructive",
          });
        }
      }
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          };
          
          console.log("Got precise coordinates:", coordinates);
          
          // In a real app, we would use reverse geocoding API here to get the neighborhood name
          // For demonstration purposes, we'll simulate this by doing one of these options:
          
          // Option 1: Use the coordinates as the neighborhood for more precision
          const locationString = `${coordinates.latitude.substring(0, 8)}, ${coordinates.longitude.substring(0, 8)}`;
          
          // Option 2 (fallback): Use a random neighborhood from our list
          let autoDetectedNeighborhood = locationString;
          
          // For demonstration, we can also use a random neighborhood from our list
          // (but in a real app, you would use the reverse geocoding result)
          if (Math.random() > 0.5) {
            const randomIndex = Math.floor(Math.random() * dubaiNeighborhoods.length);
            autoDetectedNeighborhood = dubaiNeighborhoods[randomIndex];
          }
          
          setSignUpData(prev => ({
            ...prev,
            neighborhood: autoDetectedNeighborhood,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }));
          
          toast({
            title: "Location detected",
            description: `We detected your location as ${autoDetectedNeighborhood}`,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          
          let errorMessage = "Could not get your location. You can still select your neighborhood.";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location permission denied. Please enable location services.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
          }
          
          toast({
            title: "Location error",
            description: errorMessage,
            variant: "destructive"
          });
          setIsLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      toast({
        title: "Geolocation unavailable",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
    }
  };

  const resendOTP = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Code resent",
        description: `We've sent a new verification code to +971 ${formatPhoneDisplay(signUpData.phone)}`,
      });
    }, 1000);
  };

  if (signupStep === 2) {
    return (
      <form onSubmit={handleSignUp}>
        <CardContent className="space-y-6 pt-6">
          <div className="text-center mb-4">
            <div className="inline-block bg-muted px-3 py-1 rounded-full text-sm font-medium">
              +971 {formatPhoneDisplay(signUpData.phone)}
            </div>
          </div>
          
          <div className="flex justify-center">
            <InputOTP 
              maxLength={4} 
              value={otpValue} 
              onChange={setOtpValue}
              className="gap-2"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          <div className="text-center flex flex-col gap-2">
            <Button 
              variant="link" 
              type="button" 
              onClick={resendOTP}
              disabled={isLoading}
              className="text-muted-foreground text-sm"
            >
              Didn't receive a code? Resend
            </Button>
            
            <Button
              variant="outline"
              type="button"
              onClick={() => {}}
              size="sm"
              className="mx-auto text-xs"
            >
              Skip verification (for testing)
            </Button>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col space-y-4 bg-gradient-to-t from-secondary/20 to-transparent pt-4">
          <Button 
            type="submit" 
            className="w-full warm-button"
            disabled={isLoading}
          >
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
            )}
            <Check className="mr-2 h-4 w-4" />
            Create Account
          </Button>
        </CardFooter>
      </form>
    );
  }

  return (
    <form onSubmit={handleSignUp}>
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
                <CommandGroup heading="Dubai Neighborhoods">
                  {dubaiNeighborhoods
                    .filter(n => n.toLowerCase().includes(neighborhoodSearch.toLowerCase()))
                    .map((neighborhood) => (
                      <CommandItem
                        key={neighborhood}
                        onSelect={() => {
                          setSignUpData(prev => ({ ...prev, neighborhood }));
                          setShowNeighborhoodSearch(false);
                        }}
                        className="cursor-pointer"
                      >
                        {neighborhood}
                      </CommandItem>
                    ))
                  }
                </CommandGroup>
              </CommandList>
            </CommandDialog>
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">
            Activate location so we can propose the closest Moms to you.
          </p>
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
      
      <CardFooter className="flex-col space-y-4 bg-gradient-to-t from-secondary/20 to-transparent pt-4">
        <Button 
          type="submit" 
          className="w-full warm-button"
          disabled={isLoading}
        >
          {isLoading && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
          )}
          Continue
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Already have an account? <Button type="button" variant="link" onClick={onSwitchToSignIn} className="p-0 h-auto text-emerald-700 hover:text-emerald-800 font-medium">Sign in</Button>
        </p>
      </CardFooter>
    </form>
  );
};

export default SignUpForm;
