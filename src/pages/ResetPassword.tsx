
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Check if we have a valid auth token in the URL on component mount
  useEffect(() => {
    // This is crucial for password reset functionality
    // We need to check if we have the correct type & access token in URL
    const checkToken = async () => {
      // Parse the URL fragment (#) portion to get the auth token
      const hash = window.location.hash.substring(1);
      
      if (!hash) {
        console.log("No hash parameter found in URL");
        return;
      }
      
      const params = new URLSearchParams(hash);
      const type = params.get('type');
      const accessToken = params.get('access_token');

      console.log("Auth params:", { type, hasAccessToken: !!accessToken });
      
      if (type === 'recovery' && accessToken) {
        try {
          // Validate the token by setting the session
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: '',
          });
          
          if (error) {
            console.error("Invalid or expired reset token:", error);
            toast({
              title: "Invalid or expired token",
              description: "Please request a new password reset link.",
              variant: "destructive",
            });
          } else {
            setIsValidToken(true);
          }
        } catch (err) {
          console.error("Error validating reset token:", err);
        }
      } else {
        toast({
          title: "Invalid reset link",
          description: "This link is not valid for password reset.",
          variant: "destructive",
        });
      }
    };
    
    checkToken();
  }, [toast]);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      toast({
        title: "Password updated!",
        description: "Your password has been successfully updated.",
      });
      
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Error updating password",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isValidToken) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-0">
        <div className="w-full max-w-md text-center">
          <img 
            src="/lovable-uploads/cff1d041-e202-4a39-8f31-c3fea11a1405.png" 
            alt="LeanOn Logo" 
            className="w-20 h-auto mx-auto mb-4"
          />
          <Card className="border-secondary/20 shadow-md">
            <CardHeader className="bg-gradient-to-b from-secondary/20 to-transparent pb-4">
              <CardTitle>Reset Password Link Invalid</CardTitle>
              <CardDescription>
                The password reset link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex-col space-y-3 bg-gradient-to-t from-secondary/20 to-transparent pt-4">
              <Button 
                onClick={() => navigate('/sign-in')} 
                className="w-full warm-button"
              >
                Return to Sign In
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-0">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <img 
            src="/lovable-uploads/cff1d041-e202-4a39-8f31-c3fea11a1405.png" 
            alt="LeanOn Logo" 
            className="w-20 h-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold font-playfair">Reset Your Password</h1>
          <p className="text-gray-600 text-sm">Create a new secure password for your account</p>
        </div>
        
        <Card className="border-secondary/20 shadow-md">
          <CardHeader className="bg-gradient-to-b from-secondary/20 to-transparent pb-4">
            <CardTitle>New Password</CardTitle>
            <CardDescription>
              Please enter your new password below
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input 
                  id="new-password"
                  type="password"
                  placeholder="Enter your new password"
                  className="border-secondary/30 focus:border-secondary"
                  icon={<Lock className="h-4 w-4" />}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPasswordToggle={true}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input 
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your new password"
                  className="border-secondary/30 focus:border-secondary"
                  icon={<Lock className="h-4 w-4" />}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Update Password
              </Button>
              <p className="text-sm text-center text-muted-foreground">
                Remember your password? <Button type="button" variant="link" onClick={() => navigate('/sign-in')} className="p-0 h-auto text-emerald-700 hover:text-emerald-800 font-medium">Sign in</Button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
