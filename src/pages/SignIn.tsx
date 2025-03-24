
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import BowIcon from '@/components/ui/BowIcon';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");
  
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });
  
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      navigate('/ally/subscribe');
    }, 1500);
  };
  
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (signUpData.password !== signUpData.confirmPassword) {
      setIsLoading(false);
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      navigate('/ally/subscribe');
    }, 1500);
  };
  
  const goBack = () => {
    navigate(-1);
  };

  const switchToSignUp = () => {
    setActiveTab("signup");
  };
  
  return (
    <div className="min-h-screen bg-primary/20 flex flex-col items-center justify-center p-4">
      <Button 
        variant="ghost" 
        onClick={goBack} 
        className="absolute top-4 left-4 flex items-center"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="h-20 w-auto bg-white p-2 rounded-lg shadow-sm">
              <img 
                src="/lovable-uploads/e721b501-95df-45ef-b358-51c2c2fc8144.png" 
                alt="LeanOn Logo" 
                className="h-full w-auto object-contain"
                style={{ maxHeight: '100%', maxWidth: '100%' }}
                onLoad={() => console.log("Logo loaded successfully in SignIn page")}
                onError={(e) => console.error("Error loading logo in SignIn page:", e)}
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-1 font-playfair">Welcome to LeanOn</h1>
          <p className="text-gray-600">A community of supportive moms</p>
        </div>
        
        <Tabs defaultValue="signin" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary/30">
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
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="signin-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 border-secondary/30 focus:border-secondary"
                        value={signInData.email}
                        onChange={handleSignInChange}
                        required
                      />
                    </div>
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
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="signin-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10 border-secondary/30 focus:border-secondary"
                        value={signInData.password}
                        onChange={handleSignInChange}
                        required
                      />
                    </div>
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
                <CardTitle>Create an Account</CardTitle>
              </CardHeader>
              <form onSubmit={handleSignUp}>
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
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10 border-secondary/30 focus:border-secondary"
                        value={signUpData.email}
                        onChange={handleSignUpChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input 
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10 border-secondary/30 focus:border-secondary"
                        value={signUpData.password}
                        onChange={handleSignUpChange}
                        required
                      />
                    </div>
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
                
                <CardFooter className="flex-col space-y-4 bg-gradient-to-t from-secondary/20 to-transparent pt-4">
                  <Button 
                    type="submit" 
                    className="w-full warm-button"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
                    )}
                    <BowIcon className="mr-2 h-4 w-4" fill="currentColor" />
                    Join & <span className="font-adlery">LeanOn</span>
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                  </p>
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
