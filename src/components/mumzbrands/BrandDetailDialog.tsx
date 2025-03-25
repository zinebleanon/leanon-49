
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, CheckCircle } from 'lucide-react';
import BowRibbon from '@/components/mumzally/BowRibbon';

interface Brand {
  id: string;
  name: string;
  logo: string;
  category: 'local' | 'international';
  description: string;
  website: string;
  discountCode: string;
  discountValue: string;
  bgColor: string;
}

interface BrandDetailDialogProps {
  brand: Brand | null;
  isOpen: boolean;
  onClose: () => void;
}

const BrandDetailDialog = ({ brand, isOpen, onClose }: BrandDetailDialogProps) => {
  const [codeCopied, setCodeCopied] = useState(false);
  
  if (!brand) return null;
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(brand.discountCode);
    setCodeCopied(true);
    
    setTimeout(() => {
      setCodeCopied(false);
    }, 2000);
  };
  
  const visitWebsite = () => {
    window.open(brand.website, '_blank');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-20 object-contain"
            />
          </div>
          <DialogTitle className="text-2xl text-center">{brand.name}</DialogTitle>
          <DialogDescription className="text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs bg-primary/20 text-primary-foreground">
              {brand.category === 'local' ? 'Local Brand' : 'International Brand'}
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground">{brand.description}</p>
            <p className="font-medium">As a LeanOn community member, you get access to exclusive discounts:</p>
            <div className="my-6 relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 z-10">
                <BowRibbon />
              </div>
              <div className="bg-pastel-yellow/20 rounded-lg p-6 pt-8 text-center border border-pastel-yellow">
                <p className="text-lg font-bold mb-2">{brand.discountValue}</p>
                <div className="flex items-center justify-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm mx-auto max-w-[200px]">
                  <code className="font-bold">{brand.discountCode}</code>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 rounded-full" 
                    onClick={handleCopyCode}
                  >
                    {codeCopied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={visitWebsite} className="rounded-full">
              Visit Website <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            Discount valid until December 31, 2023. Terms and conditions apply.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BrandDetailDialog;
