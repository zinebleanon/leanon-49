
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
  const [hashParam, setHashParam] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Extract hash parameter from URL on component mount
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const type = params.get('type');
    
    // Only set the hash if it's a recovery flow
    if (type === 'recovery') {
      setHashParam(hash);
    }
  }, []);
  
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
