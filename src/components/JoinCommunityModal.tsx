
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Heart, Mail, Check, Plus, Minus, Calendar, MapPin, Search } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface JoinCommunityModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

// Redirect to sign-up page instead of using in-modal sign-up
const JoinCommunityModal = ({ isOpen, onOpenChange }: JoinCommunityModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'options' | 'redirect'>('options');

  const handleRedirectToSignUp = () => {
    onOpenChange(false);
    // Short delay to allow modal to close smoothly before navigation
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
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityModal;
