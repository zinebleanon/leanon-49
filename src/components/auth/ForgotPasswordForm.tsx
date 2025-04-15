
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/use-auth';

interface ForgotPasswordFormProps {
  onClose: () => void;
}

const ForgotPasswordForm = ({ onClose }: ForgotPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const { resetPassword } = useAuth();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(resetPasswordEmail);
      onClose();
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="reset-email">Email</Label>
        <Input 
          id="reset-email"
          type="email"
          value={resetPasswordEmail}
          onChange={(e) => setResetPasswordEmail(e.target.value)}
          placeholder="Enter your email address"
          className="border-secondary/30 focus:border-secondary"
          icon={<Mail className="h-4 w-4" />}
          required
        />
      </div>
      
      <DialogFooter className="pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="warm-button"
          disabled={isLoading}
        >
          {isLoading && (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
          )}
          Send Reset Link
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ForgotPasswordForm;
