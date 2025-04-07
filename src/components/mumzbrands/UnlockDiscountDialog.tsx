
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy, Gift, Lock, Unlock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BowRibbon from '@/components/mumzally/BowRibbon';

interface UnlockDiscountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const UnlockDiscountDialog = ({ isOpen, onClose }: UnlockDiscountDialogProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const { toast } = useToast();
  
  const handleUnlock = () => {
    // In a real app, you would validate the code with your backend
    if (code.trim().toLowerCase() === 'mumz' || code.trim() === '1234') {
      setIsUnlocked(true);
      setDiscountCode('LEANON25');
      toast({
        title: "Discount unlocked!",
        description: "You've unlocked a special 25% discount",
      });
    } else {
      toast({
        title: "Invalid code",
        description: "Please check your code and try again",
        variant: "destructive",
      });
    }
  };
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(discountCode);
    setCodeCopied(true);
    
    toast({
      title: "Discount code copied!",
      description: "Use it at checkout to get 25% off",
    });
    
    setTimeout(() => {
      setCodeCopied(false);
    }, 2000);
  };
  
  const resetDialog = () => {
    setIsUnlocked(false);
    setCode('');
    setDiscountCode('');
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetDialog()}>
      <DialogContent className="max-w-md overflow-hidden bg-gradient-to-b from-white to-pastel-yellow/20 border-pastel-yellow/30">
        <DialogHeader>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 z-10">
            <BowRibbon />
          </div>
          <DialogTitle className="text-2xl font-playfair text-center pt-4 text-primary">
            {isUnlocked ? "Discount Unlocked!" : "Unlock Special Discount"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isUnlocked 
              ? "Congratulations! You've unlocked a special discount"
              : "Enter your code to unlock a special discount for all brands"
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 px-1">
          {!isUnlocked ? (
            <div className="space-y-6">
              <div className="bg-background/80 p-6 rounded-lg border border-pastel-yellow/40 shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-sm text-center mb-4">
                  This special discount is available only for LeanOn community members.
                  Enter your code below to unlock it.
                </p>
                <div className="space-y-4">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your unlock code"
                    className="text-center font-medium"
                  />
                  <Button 
                    onClick={handleUnlock} 
                    className="w-full" 
                    variant="warm"
                  >
                    Unlock Discount <Unlock className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                If you don't have a code, please contact support or join our community.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-background/80 p-6 rounded-lg border border-pastel-yellow/40 shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Gift className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">25% Off All Brands</h3>
                <p className="text-sm text-center mb-4">
                  Use this code at checkout when shopping with any of our partner brands.
                </p>
                <div className="flex items-center justify-center gap-2 bg-white rounded-full px-4 py-3 shadow-sm mx-auto max-w-[200px] border border-pastel-yellow">
                  <code className="font-bold text-lg">{discountCode}</code>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 rounded-full" 
                    onClick={handleCopyCode}
                    aria-label="Copy discount code"
                  >
                    {codeCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="bg-pastel-yellow/20 p-4 rounded-lg">
                <p className="text-sm text-center">
                  <span className="font-medium">Valid until:</span> December 31, 2025
                </p>
                <p className="text-xs text-center text-muted-foreground mt-1">
                  Terms and conditions apply. Cannot be combined with other offers.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockDiscountDialog;
