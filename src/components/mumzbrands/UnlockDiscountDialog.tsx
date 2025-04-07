
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Copy, Gift, Lock, Unlock, ChevronRight, ChevronLeft, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import BowRibbon from '@/components/mumzally/BowRibbon';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface UnlockDiscountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DiscountCode {
  brand: string;
  code: string;
  value: string;
  expiry: string;
}

const UnlockDiscountDialog = ({ isOpen, onClose }: UnlockDiscountDialogProps) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [code, setCode] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [codeCopied, setCodeCopied] = useState(false);
  const [showBrowseMode, setShowBrowseMode] = useState(false);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [brandType, setBrandType] = useState<'all' | 'local' | 'international'>('all');
  const [brandCategory, setBrandCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const categories = [
    "All Categories", "Baby", "Toys", "Clothing", "Food", "Wellness", "Home", "Education", "Technology"
  ];
  
  const allDiscountCodes: DiscountCode[] = [
    {
      brand: "Pampers",
      code: "PAMPERS15",
      value: "15% off all products",
      expiry: "December 31, 2025"
    },
    {
      brand: "Mothercare",
      code: "MOTHER20",
      value: "20% off first purchase",
      expiry: "December 31, 2025"
    },
    {
      brand: "Mumzworld",
      code: "MUMZ10",
      value: "10% off entire order",
      expiry: "December 31, 2025"
    },
    {
      brand: "Babyshop",
      code: "BABY25",
      value: "25% off selected items",
      expiry: "December 31, 2025"
    },
    {
      brand: "FirstCry",
      code: "FIRST12",
      value: "12% off on orders above 200 AED",
      expiry: "December 31, 2025"
    },
    {
      brand: "OshKosh",
      code: "OSH30",
      value: "30% off your purchase",
      expiry: "December 31, 2025"
    }
  ];
  
  const handleCategoryChange = (value: string) => {
    if (value) {
      setBrandCategory(value);
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredDiscountCodes = allDiscountCodes.filter(discount => {
    // Filter by brand type if needed (would need to add type to discount objects)
    // Filter by search term if provided
    if (searchTerm.trim() !== '') {
      return discount.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
             discount.code.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });
  
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
  
  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCodeCopied(true);
    
    toast({
      title: "Discount code copied!",
      description: "Use it at checkout to get your discount",
    });
    
    setTimeout(() => {
      setCodeCopied(false);
    }, 2000);
  };
  
  const resetDialog = () => {
    setIsUnlocked(false);
    setCode('');
    setDiscountCode('');
    setShowBrowseMode(false);
    setCurrentBrandIndex(0);
    setBrandType('all');
    setBrandCategory('All Categories');
    setSearchTerm('');
    onClose();
  };
  
  const handleNextBrand = () => {
    if (currentBrandIndex < filteredDiscountCodes.length - 1) {
      setCurrentBrandIndex(prevIndex => prevIndex + 1);
    } else {
      setCurrentBrandIndex(0); // Loop back to the beginning
    }
  };
  
  const handlePrevBrand = () => {
    if (currentBrandIndex > 0) {
      setCurrentBrandIndex(prevIndex => prevIndex - 1);
    } else {
      setCurrentBrandIndex(filteredDiscountCodes.length - 1); // Loop to the end
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetDialog()}>
      <DialogContent className="max-w-md overflow-hidden bg-gradient-to-b from-white to-pastel-yellow/20 border-pastel-yellow/30">
        <DialogHeader>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 z-10">
            <BowRibbon />
          </div>
          <DialogTitle className="text-2xl font-playfair text-center pt-4 text-primary">
            {showBrowseMode ? "Browse All Discounts" : (isUnlocked ? "Discount Unlocked!" : "Unlock Special Discount")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {showBrowseMode 
              ? "Browse available discounts for all our partner brands"
              : (isUnlocked 
                ? "Congratulations! You've unlocked a special discount"
                : "Enter your code to unlock a special discount for all brands"
              )
            }
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="py-6 px-1">
            {!isUnlocked && !showBrowseMode ? (
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
                    
                    <div className="flex items-center justify-center mt-2">
                      <Button 
                        variant="link" 
                        onClick={() => setShowBrowseMode(true)}
                        className="text-sm text-muted-foreground"
                      >
                        Browse available discounts
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  If you don't have a code, please contact support or join our community.
                </p>
              </div>
            ) : showBrowseMode ? (
              <div className="space-y-6">
                <div className="bg-background/80 p-6 rounded-lg border border-pastel-yellow/40 shadow-sm">
                  {/* Browse Mode Category Filter */}
                  <div className="mb-4">
                    <Tabs 
                      defaultValue="all" 
                      onValueChange={(value) => setBrandType(value as 'all' | 'local' | 'international')}
                      className="border rounded-lg overflow-hidden p-0.5 bg-muted/20 mb-4"
                    >
                      <TabsList className="grid w-full grid-cols-3 bg-transparent">
                        <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white">All Brands</TabsTrigger>
                        <TabsTrigger value="local" className="rounded-md data-[state=active]:bg-white">Local</TabsTrigger>
                        <TabsTrigger value="international" className="rounded-md data-[state=active]:bg-white">International</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <div className="relative w-full mb-4">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input 
                        type="search" 
                        placeholder="Search brands..." 
                        className="pl-8"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                    
                    <ScrollArea className="w-full">
                      <div className="mb-2 pb-2 overflow-x-auto">
                        <ToggleGroup type="single" value={brandCategory} onValueChange={handleCategoryChange}>
                          <div className="flex space-x-2 pb-1">
                            {categories.map((category) => (
                              <ToggleGroupItem 
                                key={category} 
                                value={category}
                                className="rounded-full text-sm whitespace-nowrap bg-background data-[state=on]:bg-[#B8CEC2]/60 data-[state=on]:text-foreground"
                              >
                                {category}
                              </ToggleGroupItem>
                            ))}
                          </div>
                        </ToggleGroup>
                      </div>
                    </ScrollArea>
                  </div>
                  
                  {/* Carousel of discount codes */}
                  {filteredDiscountCodes.length > 0 ? (
                    <Carousel className="w-full max-w-md mx-auto">
                      <CarouselContent>
                        {filteredDiscountCodes.map((discount, index) => (
                          <CarouselItem key={index}>
                            <div className="flex flex-col items-center justify-center gap-3 p-4">
                              <h3 className="text-lg font-medium text-center">{discount.brand}</h3>
                              <div className="bg-green-100 p-3 rounded-full">
                                <Gift className="h-6 w-6 text-green-600" />
                              </div>
                              
                              <h3 className="text-lg font-medium text-center">
                                {discount.value}
                              </h3>
                              
                              <div className="flex items-center justify-center gap-2 bg-white rounded-full px-4 py-3 shadow-sm mx-auto max-w-[200px] border border-pastel-yellow my-2">
                                <code className="font-bold text-lg">{discount.code}</code>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  className="h-8 w-8 p-0 rounded-full" 
                                  onClick={() => handleCopyCode(discount.code)}
                                  aria-label="Copy discount code"
                                >
                                  {codeCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                </Button>
                              </div>
                              
                              <p className="text-sm">
                                <span className="font-medium">Valid until:</span> {discount.expiry}
                              </p>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex justify-center mt-4 gap-2">
                        <CarouselPrevious className="relative static left-0 translate-y-0" />
                        <CarouselNext className="relative static right-0 translate-y-0" />
                      </div>
                    </Carousel>
                  ) : (
                    <div className="text-center p-6">
                      <p className="text-muted-foreground">No discount codes found matching your criteria</p>
                    </div>
                  )}
                  
                  <div className="mt-6 pt-4 border-t border-pastel-yellow/20">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => setShowBrowseMode(false)}
                    >
                      Back to Unlock Screen
                    </Button>
                  </div>
                </div>
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
                      onClick={() => handleCopyCode(discountCode)}
                      aria-label="Copy discount code"
                    >
                      {codeCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={() => setShowBrowseMode(true)}
                    >
                      Browse All Discounts
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockDiscountDialog;
