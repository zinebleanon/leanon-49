
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

const SignIn = ({ defaultTab = 'signin' }: { defaultTab?: 'signin' | 'signup' }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>(defaultTab);
  const [signupStep, setSignupStep] = useState(1);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const referralCodeFromParams = searchParams.get('referral') || '';

  useEffect(() => {
    if (location.pathname === '/sign-up' && activeTab !== 'signup') {
      setActiveTab('signup');
    } else if (location.pathname === '/sign-in' && activeTab !== 'signin') {
      setActiveTab('signin');
    }
  }, [location.pathname, activeTab]);

  const handleTabChange = (value: string) => {
    if (value === "signin") {
      navigate('/sign-in');
    } else {
      navigate('/sign-up');
    }
    setActiveTab(value as 'signin' | 'signup');
  };

  const goBack = () => {
    if (signupStep > 1) {
      setSignupStep(prev => prev - 1);
      return;
    }
    navigate(-1);
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
              <SignInForm 
                onForgotPassword={() => setShowForgotPassword(true)}
                onSwitchToSignUp={() => handleTabChange('signup')}
              />
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
                    Enter the 4-digit code sent to your phone
                  </CardDescription>
                )}
              </CardHeader>
              <SignUpForm 
                onSwitchToSignIn={() => handleTabChange('signin')}
                signupStep={signupStep}
                onStepChange={setSignupStep}
                defaultReferralCode={referralCodeFromParams}
              />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Forgot Password</DialogTitle>
            <DialogDescription>
              Enter your email and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm onClose={() => setShowForgotPassword(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignIn;
