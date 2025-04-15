
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardFooter } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';

interface SignInFormProps {
  onForgotPassword: () => void;
  onSwitchToSignUp: () => void;
}

const SignInForm = ({ onForgotPassword, onSwitchToSignUp }: SignInFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignInData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(signInData.email, signInData.password);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              onClick={onForgotPassword}
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
          No account? <Button type="button" variant="link" onClick={onSwitchToSignUp} className="p-0 h-auto text-emerald-700 hover:text-emerald-800 font-medium">Sign up</Button>
        </p>
      </CardFooter>
    </form>
  );
};

export default SignInForm;
