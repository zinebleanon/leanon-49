
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SignupStep1 from './signup/SignupStep1';
import SignupStep2 from './signup/SignupStep2';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
  signupStep: number;
  onStepChange: (step: number) => void;
  defaultReferralCode?: string;
}

const SignUpForm = ({ 
  onSwitchToSignIn, 
  signupStep, 
  onStepChange, 
  defaultReferralCode = '' 
}: SignUpFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  // Auto-redirect to index on mount if we got here after a successful signup
  useEffect(() => {
    const signupCompleted = sessionStorage.getItem('signup_completed');
    if (signupCompleted === 'true') {
      console.log("Found signup_completed flag, redirecting to index");
      sessionStorage.removeItem('signup_completed');
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        onStepChange(2);
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
        console.log("Completing sign up with data:", {
          email: signUpData.email,
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          phone: signUpData.phone
        });
        
        // Set a flag to indicate signup completion
        sessionStorage.setItem('signup_completed', 'true');
        
        await signUp(
          signUpData.email, 
          signUpData.password, 
          {
            first_name: signUpData.firstName,
            last_name: signUpData.lastName,
            phone: signUpData.phone
          }
        );
        
        // Multiple redirection strategies to ensure we get to index
        console.log("SignUp completed, redirecting to home page (Index)...");
        navigate('/', { replace: true });
        
        // Force a window reload after a brief delay if redirection fails
        setTimeout(() => {
          if (window.location.pathname !== '/') {
            console.log("Forced redirect via window.location");
            window.location.href = '/';
          }
        }, 500);
      } catch (error: any) {
        console.error("Error completing signup:", error);
        setIsLoading(false);
        
        if (error.message?.toLowerCase().includes('email address already in use')) {
          toast({
            title: "Email already registered",
            description: "This email address is already registered. Please sign in or use a different email.",
            variant: "destructive",
          });
          onStepChange(1);
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

  const formatPhoneDisplay = (phone: string) => {
    if (!phone) return '';
    if (phone.length <= 9) {
      if (phone.length <= 2) return phone;
      if (phone.length <= 5) return `${phone.substring(0, 2)} ${phone.substring(2)}`;
      return `${phone.substring(0, 2)} ${phone.substring(2, 5)} ${phone.substring(5)}`;
    }
    return phone;
  };

  const handleSkipVerification = () => {
    // This is for testing only - in real app, would not skip verification
    setIsLoading(true);
    
    // Set a flag to indicate signup completion
    sessionStorage.setItem('signup_completed', 'true');
    
    try {
      console.log("Skipping verification, completing signup directly");
      signUp(
        signUpData.email, 
        signUpData.password, 
        {
          first_name: signUpData.firstName,
          last_name: signUpData.lastName,
          phone: signUpData.phone
        }
      ).then(() => {
        // Explicit navigation after signup completes
        console.log("Skip verification signup completed, redirecting to home page (Index)...");
        navigate('/', { replace: true });
        
        // Force a window reload after a brief delay if redirection fails
        setTimeout(() => {
          if (window.location.pathname !== '/') {
            console.log("Forced redirect via window.location");
            window.location.href = '/';
          }
        }, 500);
      });
    } catch (error: any) {
      console.error("Error in signup with skip verification:", error);
      toast({
        title: "Error signing up",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      {signupStep === 2 ? (
        <SignupStep2
          phone={signUpData.phone}
          otpValue={otpValue}
          setOtpValue={setOtpValue}
          onResendOTP={resendOTP}
          onSkipVerification={handleSkipVerification}
          isLoading={isLoading}
        />
      ) : (
        <SignupStep1
          signUpData={signUpData}
          handleSignUpChange={handleSignUpChange}
          isLoading={isLoading}
        />
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
          {signupStep === 2 ? "Create Account" : "Continue"}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Already have an account? <Button type="button" variant="link" onClick={onSwitchToSignIn} className="p-0 h-auto text-emerald-700 hover:text-emerald-800 font-medium">Sign in</Button>
        </p>
      </CardFooter>
    </form>
  );
};

export default SignUpForm;
