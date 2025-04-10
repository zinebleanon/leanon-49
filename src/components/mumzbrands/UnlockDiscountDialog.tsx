
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Gift, Search, Star, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface UnlockDiscountDialogProps {
  isOpen: boolean;
  onClose: () => void;
  brands?: Array<Brand>;
  onBrandSelect?: (brand: Brand) => void;
}

// Product categories commonly used for baby products
const productCategories = [
  "All Categories",
  "Baby Clothing",
  "Baby Gear",
  "Baby Accessories",
  "Nursery",
  "Feeding",
  "Diapering",
  "Bath & Skincare",
  "Toys & Play",
  "Maternity",
  "Health & Safety",
  "Other"
];

const UnlockDiscountDialog = ({ isOpen, onClose, brands = [], onBrandSelect }: UnlockDiscountDialogProps) => {
  const [codeCopied, setCodeCopied] = useState<string | null>(null);
  const [brandType, setBrandType] = useState<'all' | 'local' | 'international'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Map brands to discount codes format
  const allDiscountCodes = brands.map(brand => ({
    id: brand.id,
    brand: brand.name,
    logo: brand.logo,
    code: brand.discountCode,
    value: brand.discountValue,
    expiry: "December 31, 2025",
    category: brand.category,
    website: brand.website,
    bgColor: brand.bgColor || '#fff',
    originalBrand: brand // Keep reference to original brand object
  }));

  // If no brands are passed, use default ones
  const fallbackDiscountCodes = [
    {
      id: '1',
      brand: "Pampers",
      logo: "/lovable-uploads/8d090dc9-1dec-4d92-a60b-f0b63c73e375.png",
      code: "PAMPERS15",
      value: "15% off all products",
      expiry: "December 31, 2025",
      category: 'international' as const,
      website: "https://www.pampers.com",
      bgColor: '#f8f4ff'
    },
    {
      id: '2',
      brand: "Mothercare",
      logo: "/lovable-uploads/aad47488-6aaf-41bc-8d54-c6163b5cc62c.png",
      code: "MOTHER20",
      value: "20% off first purchase",
      expiry: "December 31, 2025",
      category: 'international' as const,
      website: "https://www.mothercare.com",
      bgColor: '#f0fff4'
    },
    {
      id: '3',
      brand: "Mumzworld",
      logo: "/lovable-uploads/1d9135c7-232d-4e08-8e9c-1c4953d0b1db.png",
      code: "MUMZ10",
      value: "10% off entire order",
      expiry: "December 31, 2025",
      category: 'local' as const,
      website: "https://www.mumzworld.com",
      bgColor: '#fff5f5'
    },
    {
      id: '4',
      brand: "Babyshop",
      logo: "/lovable-uploads/9af559f0-e7cd-43a3-a625-8c67793f989b.png",
      code: "BABY25",
      value: "25% off selected items",
      expiry: "December 31, 2025",
      category: 'local' as const,
      website: "https://www.babyshop.com",
      bgColor: '#f0f9ff'
    },
    {
      id: '5',
      brand: "FirstCry",
      logo: "/lovable-uploads/bb4acf49-8869-49f7-9464-6e2f7d244c0e.png",
      code: "FIRST12",
      value: "12% off on orders above 200 AED",
      expiry: "December 31, 2025",
      category: 'international' as const,
      website: "https://www.firstcry.com",
      bgColor: '#fffbea'
    },
    {
      id: '6',
      brand: "OshKosh",
      logo: "/lovable-uploads/cff1d041-e202-4a39-8f31-c3fea11a1405.png",
      code: "OSH30",
      value: "30% off your purchase",
      expiry: "December 31, 2025",
      category: 'international' as const,
      website: "https://www.oshkosh.com",
      bgColor: '#f2f7fd'
    }
  ];
  
  const discountCodes = allDiscountCodes.length > 0 ? allDiscountCodes : fallbackDiscountCodes;
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Filter discount codes based on selected filters
  const filteredDiscountCodes = discountCodes.filter(discount => {
    // Filter by brand type
    if (brandType !== 'all' && discount.category !== brandType) {
      return false;
    }
    
    // Filter by category (when implemented with real data)
    if (selectedCategory !== "All Categories") {
      // This would filter by category if we had category data
      // For now, just show all since we don't have category data in the sample
      // return discount.productCategory === selectedCategory;
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
  
  const handleBrandSelect = (discount: any) => {
    if (onBrandSelect && discount.originalBrand) {
      onBrandSelect(discount.originalBrand);
      onClose(); // Close this dialog as we're opening another one
    }
  };
  
  const visitWebsite = (url: string) => {
    window.open(url, '_blank');
  };
  
  const resetDialog = () => {
    setCodeCopied(null);
    setBrandType('all');
    setSelectedCategory('All Categories');
    setSearchTerm('');
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && resetDialog()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">Exclusive Discounts</DialogTitle>
          <DialogDescription>
            Browse and unlock special discounts from both international and local brands for LeanOn community members.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 sticky top-0 z-10 bg-background pb-2 border-b">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Search Brands</h3>
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input 
                  type="search" 
                  placeholder="Search brands..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Filter by Type</h3>
              <Select onValueChange={(value) => setBrandType(value as 'all' | 'local' | 'international')} value={brandType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="local">Local Brands</SelectItem>
                  <SelectItem value="international">International Brands</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Category</h3>
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {productCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 pb-4 h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4 pr-4">
            {filteredDiscountCodes.length > 0 ? (
              filteredDiscountCodes.map((discount) => (
                <div 
                  key={discount.id} 
                  className="flex flex-col gap-3 p-4 rounded-lg border border-primary/20 hover:shadow-md transition-shadow cursor-pointer"
                  style={{ background: `${discount.bgColor}10` }}
                  onClick={() => handleBrandSelect(discount)}
                >
                  <div className="flex gap-3">
                    <div className="bg-white/90 p-2 rounded-md w-20 h-20 flex items-center justify-center shadow-sm">
                      <img src={discount.logo} alt={discount.brand} className="w-16 h-16 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-lg">{discount.brand}</h4>
                      <p className="text-xs text-muted-foreground">
                        {discount.category === 'local' ? 'Local Brand' : 'International Brand'}
                      </p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <div className="p-2 rounded-md bg-primary/5 text-center">
                      <p className="text-sm font-medium">{discount.value}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1 shadow-sm border">
                      <code className="text-xs font-bold">{discount.code}</code>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0 rounded-full ml-1" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyCode(discount.code);
                        }}
                      >
                        {codeCopied === discount.code ? (
                          <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500">
                            <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="rounded-full text-xs px-3 py-1 h-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        visitWebsite(discount.website);
                      }}
                    >
                      Visit <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    Valid until: {discount.expiry}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">No discounts found matching your criteria</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockDiscountDialog;
