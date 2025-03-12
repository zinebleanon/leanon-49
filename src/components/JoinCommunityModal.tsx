
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Heart, Users, Mail, Sparkles, Coffee } from 'lucide-react';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const JoinCommunityModal = ({ isOpen, onOpenChange }: JoinCommunityModalProps) => {
  const [step, setStep] = useState<'options' | 'form' | 'success'>('options');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    children: '',
    interests: '',
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd send this data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    toast({
      title: "Welcome to MumzAlly!",
      description: "Thanks for joining our community! We'll be in touch soon.",
    });
    
    // Move to success step
    setStep('success');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetModal = () => {
    setStep('options');
    setFormData({
      name: '',
      email: '',
      children: '',
      interests: '',
    });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when closing
      setTimeout(resetModal, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair mb-2 flex items-center gap-2">
            <Heart className="text-primary h-5 w-5" fill="currentColor" />
            Join Our Community
          </DialogTitle>
          <DialogDescription>
            Connect with other moms, share experiences, and find support.
          </DialogDescription>
        </DialogHeader>

        {step === 'options' && (
          <div className="grid gap-4 py-4">
            <p className="text-center text-muted-foreground mb-4">
              Choose how you'd like to join our community:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card 
                className="cursor-pointer hover:border-primary transition-all"
                onClick={() => setStep('form')}
              >
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mt-3">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Join via Email</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete a simple form to join our community
                  </p>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:border-primary transition-all">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mt-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Find Local Events</h3>
                  <p className="text-sm text-muted-foreground">
                    Meet mumz in your area at our community gatherings
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-primary transition-all">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mt-3">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Coffee Meetups</h3>
                  <p className="text-sm text-muted-foreground">
                    Join informal coffee sessions with mumz near you
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:border-primary transition-all">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mt-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Online Workshops</h3>
                  <p className="text-sm text-muted-foreground">
                    Attend virtual sessions on parenting topics
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 'form' && (
          <form onSubmit={handleFormSubmit} className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Enter your name" 
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="Enter your email" 
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="children">Children (ages)</Label>
              <Input 
                id="children" 
                name="children" 
                value={formData.children} 
                onChange={handleInputChange} 
                placeholder="e.g., 2yo, 5yo" 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="interests">Interests</Label>
              <Input 
                id="interests" 
                name="interests" 
                value={formData.interests} 
                onChange={handleInputChange} 
                placeholder="What are you interested in?" 
              />
            </div>
            
            <div className="flex gap-3 justify-end pt-3">
              <Button type="button" variant="outline" onClick={() => setStep('options')}>
                Back
              </Button>
              <Button type="submit" variant="warm">Join Now</Button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-primary" fill="currentColor" />
            </div>
            
            <h3 className="text-xl font-medium">Welcome to MumzAlly!</h3>
            
            <p className="text-muted-foreground">
              Thank you for joining our community. We'll be in touch soon with more information about upcoming events and activities.
            </p>
            
            <Button 
              variant="warm" 
              className="mt-4" 
              onClick={() => handleOpenChange(false)}
            >
              Continue Exploring
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityModal;
