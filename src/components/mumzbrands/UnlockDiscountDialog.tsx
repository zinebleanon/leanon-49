
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Gift, ChevronRight, ChevronLeft, Search } from 'lucide-react';
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
  brands?: Array<{
    id: string;
    name: string;
    logo: string;
    category: 'local' | 'international';
    description: string;
    website: string;
    discountCode: string;
    discountValue: string;
    bgColor: string;
  }>;
}

interface DiscountCode {
  brand: string;
  logo: string;
  code: string;
  value: string;
  expiry: string;
  category: 'local' | 'international';
}

const UnlockDiscountDialog = ({ isOpen, onClose, brands = [] }: UnlockDiscountDialogProps) => {
  const [codeCopied, setCodeCopied] = useState<string | null>(null);
  const [brandType, setBrandType] = useState<'all' | 'local' | 'international'>('all');
  const [brandCategory, setBrandCategory] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const categories = [
    "All Categories", "Baby", "Toys", "Clothing", "Food", "Wellness", "Home", "Education", "Technology"
  ];
  
  // Map brands to discount codes format
  const allDiscountCodes: DiscountCode[] = brands.map(brand => ({
    brand: brand.name,
    logo: brand.logo,
    code: brand.discountCode,
    value: brand.discountValue,
    expiry: "December 31, 2025",
    category: brand.category
  }));

  // If no brands are passed, use default ones
  const fallbackDiscountCodes: DiscountCode[] = [
    {
      brand: "Pampers",
      logo: "/lovable-uploads/8d090dc9-1dec-4d92-a60b-f0b63c73e375.png",
      code: "PAMPERS15",
      value: "15% off all products",
      expiry: "December 31, 2025",
      category: 'international'
    },
    {
      brand: "Mothercare",
      logo: "/lovable-uploads/aad47488-6aaf-41bc-8d54-c6163b5cc62c.png",
      code: "MOTHER20",
      value: "20% off first purchase",
      expiry: "December 31, 2025",
      category: 'international'
    },
    {
      brand: "Mumzworld",
      logo: "/lovable-uploads/1d9135c7-232d-4e08-8e9c-1c4953d0b1db.png",
      code: "MUMZ10",
      value: "10% off entire order",
      expiry: "December 31, 2025",
      category: 'local'
    },
    {
      brand: "Babyshop",
      logo: "/lovable-uploads/9af559f0-e7cd-43a3-a625-8c67793f989b.png",
      code: "BABY25",
      value: "25% off selected items",
      expiry: "December 31, 2025",
      category: 'local'
    },
    {
      brand: "FirstCry",
      logo: "/lovable-uploads/bb4acf49-8869-49f7-9464-6e2f7d244c0e.png",
      code: "FIRST12",
      value: "12% off on orders above 200 AED",
      expiry: "December 31, 2025",
      category: 'international'
    },
    {
      brand: "OshKosh",
      logo: "/lovable-uploads/cff1d041-e202-4a39-8f31-c3fea11a1405.png",
      code: "OSH30",
      value: "30% off your purchase",
      expiry: "December 31, 2025",
      category: 'international'
    }
  ];
  
  const discountCodes = allDiscountCodes.length > 0 ? allDiscountCodes : fallbackDiscountCodes;
  
  const handleCategoryChange = (value: string) => {
    if (value) {
      setBrandCategory(value);
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredDiscountCodes = discountCodes.filter(discount => {
    // Filter by brand type if needed
    if (brandType !== 'all' && discount.category !== brandType) {
      return false;
    }
    
    // Filter by search term if provided
    if (searchTerm.trim() !== '') {
      return discount.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
             discount.code.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });
  
  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCodeCopied(codeText);
    
    toast({
      title: "Discount code copied!",
      description: "Use it at checkout to get your discount",
    });
    
    setTimeout(() => {
      setCodeCopied(null);
    }, 2000);
  };
  
  const resetDialog = () => {
    setCodeCopied(null);
    setBrandType('all');
    setBrandCategory('All Categories');
    setSearchTerm('');
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
            Browse All Discounts
          </DialogTitle>
          <DialogDescription className="text-center">
            Browse available discounts for all our partner brands
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="py-6 px-1">
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
                            <img 
                              src={discount.logo} 
                              alt={discount.brand} 
                              className="h-16 object-contain mb-2"
                            />
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
                                {codeCopied === discount.code ? (
                                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500">
                                    <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                                  </svg>
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
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
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockDiscountDialog;
