import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Mail } from 'lucide-react';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinCommunityModal = ({ isOpen, onOpenChange }: JoinCommunityModalProps) => {
  const navigate = useNavigate();

  const handleRedirectToSignUp = () => {
    onOpenChange(false);
    setTimeout(() => {
      navigate('/sign-up');
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair mb-2 flex items-center gap-2">
            <Heart className="text-primary h-5 w-5" fill="currentColor" />
            Join LeanOn Community
          </DialogTitle>
          <DialogDescription>
            A community of Moms Supporting Moms.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">            
          <Card 
            className="cursor-pointer hover:border-primary transition-all"
            onClick={handleRedirectToSignUp}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mt-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Join via Subscription</h3>
              <p className="text-sm text-muted-foreground">Create an account to connect with other moms</p>
              <Button
                variant="warm"
                className="mt-4"
                onClick={handleRedirectToSignUp}
                trackingName="join_modal_signup"
              >
                Sign Up Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityModal;
