import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, ArrowLeft, Check, MapPin, Gift } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import RibbonIcon from '@/components/ui/RibbonIcon';
import { useAuth } from '@/hooks/use-auth';

interface SignInProps {
  defaultTab?: 'signin' | 'signup';
}

const SignIn = ({ defaultTab = 'signin' }: SignInProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const [signupStep, setSignupStep] = useState(1); // 1: Details, 2: OTP verification
  const [otpValue, setOtpValue] = useState("");
  const referralCodeFromParams = searchParams.get('referral') || '';
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (location.pathname === '/sign-up' && activeTab !== 'signup') {
      setActiveTab('signup');
    } else if (location.pathname === '/sign-in' && activeTab !== 'signin') {
      setActiveTab('signin');
    }
  }, [location.pathname, activeTab]);
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    neighborhood: 'Dubai Marina', 
    referralCode: referralCodeFromParams
  });
  
  const neighborhoods = [
    "Dubai Marina", "JLT", "Downtown Dubai", "Palm Jumeirah", "Arabian Ranches",
    "Emirates Hills", "Mirdif", "Dubailand", "Silicon Oasis", "Business Bay",
    "Al Barsha", "Deira", "Bur Dubai", "The Springs", "The Meadows", "The Greens",
    "Jumeirah", "Umm Suqeim", "Discovery Gardens", "International City"
  ];
  
  const getLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const randomIndex = Math.floor(Math.random() * neighborhoods.length);
          const autoDetectedNeighborhood = neighborhoods[randomIndex];
          
          setSignUpData(prev => ({
            ...prev,
            neighborhood: autoDetectedNeighborhood,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          }));
          
          toast({
            title: "Location detected",
            description: `We detected your neighborhood as ${autoDetectedNeighborhood}`,
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location error",
            description: "Could not get your location. You can still select your neighborhood.",
            variant: "destructive"
          });
          setIsLoading(false);
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
  
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };
  
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
  
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(signInData.email, signInData.password);
      // The navigation is handled in the auth provider
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };
  
  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        await signUp(
          signUpData.email, 
          signUpData.password, 
          {
            first_name: signUpData.firstName,
            last_name: signUpData.lastName
          }
        );
        
        // Let's skip the OTP for now since we're not implementing phone verification
        skipVerification();
      } catch (error) {
        console.error("Sign up error:", error);
        setIsLoading(false);
        toast({
          title: "Error signing up",
          description: error instanceof Error ? error.message : "An unexpected error occurred",
          variant: "destructive",
        });
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
      
      setTimeout(() => {
        setIsLoading(false);
        
        const formData = {
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.email,
          phone: signUpData.phone,
          neighborhood: signUpData.neighborhood,
          referralCode: signUpData.referralCode
        };
        
        const createUser = {
          name: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          neighborhood: formData.neighborhood,
          referralCode: formData.referralCode,
          profileNeedsUpdate: true
        };
        
        localStorage.setItem('userInfo', JSON.stringify(createUser));
        
        if (signUpData.referralCode) {
          toast({
            title: "Referral applied!",
            description: `You signed up using referral code: ${signUpData.referralCode}`,
          });
        }
        
        toast({
          title: "Account created!",
          description: "Welcome to LeanOn! Let's complete your profile.",
        });
        navigate('/');
      }, 1500);
    }
  };
  
  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    
    if (phone.length <= 9) {
      if (phone.length <= 2) {
        return phone;
      } else if (phone.length <= 5) {
        return `${phone.substring(0, 2)} ${phone.substring(2)}`;
      } else {
        return `${phone.substring(0, 2)} ${phone.substring(2, 5)} ${phone.substring(5)}`;
      }
    }
    
    return phone;
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
  
  const goBack = () => {
    if (signupStep > 1) {
      setSignupStep(prev => prev - 1);
      return;
    }
    
    navigate(-1);
  };

  const switchToSignUp = () => {
    setActiveTab("signup");
    navigate('/sign-up');
  };
  
  const switchToSignIn = () => {
    setActiveTab("signin");
    navigate('/sign-in');
  };
  
  const handleTabChange = (value: string) => {
    if (value === "signin") {
      navigate('/sign-in');
    } else {
      navigate('/sign-up');
    }
    setActiveTab(value as 'signin' | 'signup');
  };

  const skipVerification = () => {
    setIsLoading(false);
    toast({
      title: "Account created!",
      description: "Welcome to LeanOn! Your account has been created.",
    });
    // Navigation will be handled by the auth provider
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-0 relative">
      <div className="absolute top-4 left-4">
        <img 
          src="/lovable-uploads/cff1d041-e202-4a39-8f31-c3fea11a1405.png" 
          alt="LeanOn Logo" 
          className="w-16 h-auto"
        />
      </div>
      
      <div className="absolute top-8 right-4">
        <Button 
          variant="ghost" 
          onClick={goBack} 
          className="flex items-center px-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {signupStep > 1 ? "Back" : "Back"}
        </Button>
      </div>
      
      <div className="w-full max-w-md mt-28">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold font-playfair">Welcome to LeanOn</h1>
          <p className="text-gray-600 text-sm">A community of supportive moms</p>
        </div>
        
        <Tabs defaultValue={activeTab} className="w-full mt-4" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-2 bg-secondary/30">
            <TabsTrigger value="signin" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Sign In</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin">
            <Card className="border-secondary/20 shadow-md">
              <CardHeader className="bg-gradient-to-b from-secondary/20 to-transparent pb-4">
                <CardTitle>Sign In</CardTitle>
              </CardHeader>
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input 
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-secondary/30 focus:border-secondary"
                      icon={<Mail className="h-4 w-4" />}
                      value={signInData.email}
                      onChange={handleSignInChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <Button 
                        variant="link" 
                        className="text-xs p-0 h-auto font-normal text-muted-foreground"
                        type="button"
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Input 
                      id="signin-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      className="border-secondary/30 focus:border-secondary"
                      icon={<Lock className="h-4 w-4" />}
                      value={signInData.password}
                      onChange={handleSignInChange}
                      showPasswordToggle={true}
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter className="flex-col space-y-3 bg-gradient-to-t from-secondary/20 to-transparent pt-4">
                  <Button 
                    type="submit" 
                    className="w-full warm-button"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                    )}
                    Sign In
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    No account? <Button type="button" variant="link" onClick={switchToSignUp} className="p-0 h-auto text-emerald-700 hover:text-emerald-800 font-medium">Sign up</Button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="border-secondary/20 shadow-md">
              <CardHeader className="bg-gradient-to-b from-secondary/20 to-transparent pb-4">
                <CardTitle>
                  {signupStep === 1 ? "Create an Account" : "Verify Your Phone"}
                </CardTitle>
                {signupStep === 2 && (
                  <CardDescription>
                    Enter the 4-digit code sent to +971 {formatPhoneDisplay(signUpData.phone)}
                  </CardDescription>
                )}
              </CardHeader>
              <form onSubmit={handleSignUpSubmit}>
                {signupStep === 1 && (
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
                      <select
                        id="signup-neighborhood"
                        name="neighborhood"
                        className="w-full rounded-md border-secondary/30 focus:border-secondary h-10 px-3"
                        value={signUpData.neighborhood}
                        onChange={handleSignUpChange}
                        required
                      >
                        <option value="" disabled>Select your neighborhood</option>
                        {neighborhoods.map((neighborhood) => (
                          <option key={neighborhood} value={neighborhood}>
                            {neighborhood}
                          </option>
                        ))}
                      </select>
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
                )}
                
                {signupStep === 2 && (
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
                        onClick={skipVerification}
                        size="sm"
                        className="mx-auto text-xs"
                      >
                        Skip verification (for testing)
                      </Button>
                    </div>
                  </CardContent>
                )}
                
                <CardFooter className="flex-col space-y-4 bg-gradient-to-t from-secondary/20 to-transparent pt-4">
                  <Button 
                    type="submit" 
                    className="w-full warm-button"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                    )}
                    {signupStep === 1 ? (
                      <>
                        <RibbonIcon className="mr-2 h-4 w-4" color="currentColor" />
                        Continue
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                  
                  {signupStep === 1 && (
                    <p className="text-xs text-center text-muted-foreground">
                      Already have an account? <Button type="button" variant="link" onClick={switchToSignIn} className="p-0 h-auto text-emerald-700 hover:text-emerald-800 font-medium">Sign in</Button>
                    </p>
                  )}
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SignIn;
