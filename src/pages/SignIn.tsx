
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, ArrowLeft, Check } from 'lucide-react';
import BowIcon from '@/components/ui/BowIcon';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");
  const [signupStep, setSignupStep] = useState(1); // 1: Details, 2: OTP verification
  const [otpValue, setOtpValue] = useState("");
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      let formattedValue = value.replace(/\D/g, '');
      
      if (formattedValue.startsWith('971')) {
        formattedValue = formattedValue.substring(3);
      }
      
      if (formattedValue.length > 9) {
        formattedValue = formattedValue.substring(0, 9);
      }
      
      setSignUpData(prev => ({ ...prev, [name]: formattedValue }));
      return;
    }
    
    setSignUpData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      navigate('/ally/subscribe');
    }, 1500);
  };
  
  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      
      if (signUpData.phone.length !== 9) {
        toast({
          title: "Invalid phone number",
          description: "Please enter a valid UAE phone number.",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        setSignupStep(2);
        toast({
          title: "Verification code sent",
          description: `We've sent a code to +971 ${formatPhoneDisplay(signUpData.phone)}`,
        });
      }, 1500);
    } else if (signupStep === 2) {
      if (otpValue.length !== 6) {
        toast({
          title: "Invalid code",
          description: "Please enter the 6-digit verification code.",
          variant: "destructive",
        });
        return;
      }
      
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        toast({
          title: "Account created!",
          description: "Your phone number has been verified and your account has been created successfully.",
        });
        navigate('/ally/subscribe');
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
        description: `We've sent a new verification code to ${formatPhoneDisplay(signUpData.phone)}`,
      });
    }, 1000);
  };
  
  const goBack = () => {
    if (signupStep === 2) {
      setSignupStep(1);
      return;
    }
    
    navigate(-1);
  };

  const switchToSignUp = () => {
    setActiveTab("signup");
  };
  
  return (
    <div className="min-h-screen bg-primary/20 flex flex-col items-center pt-0 relative">
      <Button 
        variant="ghost" 
        onClick={goBack} 
        className="absolute top-2 left-2 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {signupStep === 2 ? "Back to Form" : "Back"}
      </Button>
      
      <div className="absolute top-4 right-4">
        <img 
          src="/lovable-uploads/cff1d041-e202-4a39-8f31-c3fea11a1405.png" 
          alt="LeanOn Logo" 
          className="w-16 h-auto"
        />
      </div>
      
      <div className="w-full max-w-md mt-20">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold font-playfair">Welcome to LeanOn</h1>
          <p className="text-gray-600 text-sm">A community of supportive moms</p>
        </div>
        
        <Tabs defaultValue="signin" className="w-full mt-1" value={activeTab} onValueChange={setActiveTab}>
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
                    No account? <Button variant="link" onClick={switchToSignUp} className="p-0 h-auto text-emerald-700 hover:text-emerald-800 font-medium">Sign up</Button>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="border-secondary/20 shadow-md">
              <CardHeader className="bg-gradient-to-b from-secondary/20 to-transparent pb-4">
                <CardTitle>{signupStep === 1 ? "Create an Account" : "Verify Your Phone"}</CardTitle>
                {signupStep === 2 && (
                  <CardDescription>
                    Enter the 6-digit code sent to {formatPhoneDisplay(signUpData.phone)}
                  </CardDescription>
                )}
              </CardHeader>
              <form onSubmit={handleSignUpSubmit}>
                {signupStep === 1 ? (
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input 
                        id="signup-name"
                        name="name"
                        placeholder="Enter your full name"
                        className="border-secondary/30 focus:border-secondary"
                        value={signUpData.name}
                        onChange={handleSignUpChange}
                        required
                      />
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
                      <Input 
                        id="signup-phone"
                        name="phone"
                        type="tel"
                        placeholder="XX XXX XXXX"
                        className="border-secondary/30 focus:border-secondary"
                        prefix="+971"
                        value={formatPhoneDisplay(signUpData.phone)}
                        onChange={handleSignUpChange}
                        required
                      />
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
                        required
                      />
                    </div>
                  </CardContent>
                ) : (
                  <CardContent className="space-y-6 pt-6">
                    <div className="flex justify-center">
                      <InputOTP 
                        maxLength={6} 
                        value={otpValue} 
                        onChange={setOtpValue}
                        className="gap-2"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={1} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={2} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={3} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={4} className="h-12 w-12 text-lg" />
                          <InputOTPSlot index={5} className="h-12 w-12 text-lg" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                    
                    <div className="text-center">
                      <Button 
                        variant="link" 
                        type="button" 
                        onClick={resendOTP}
                        disabled={isLoading}
                        className="text-muted-foreground text-sm"
                      >
                        Didn't receive a code? Resend
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
                        <BowIcon className="mr-2 h-4 w-4" fill="currentColor" />
                        Continue
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Verify & Join
                      </>
                    )}
                  </Button>
                  
                  {signupStep === 1 && (
                    <p className="text-xs text-center text-muted-foreground">
                      By signing up, you agree to our Terms of Service and Privacy Policy
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
