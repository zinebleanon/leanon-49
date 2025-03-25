
import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BrandDetailDialog from './BrandDetailDialog';
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

// Example brands data
const brandsData: Brand[] = [
  {
    id: '1',
    name: 'Bloom Baby',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    category: 'local',
    description: 'A premium baby clothing brand focusing on organic cotton and sustainable fashion for infants and toddlers.',
    website: 'https://example.com/bloombaby',
    discountCode: 'LEANON20',
    discountValue: '20% off your first order',
    bgColor: 'bg-pastel-green/20'
  },
  {
    id: '2',
    name: 'TinyTots',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    category: 'international',
    description: 'Internationally renowned brand offering innovative baby gear, strollers, and accessories for modern parents.',
    website: 'https://example.com/tinytots',
    discountCode: 'LEANON15',
    discountValue: '15% off all products',
    bgColor: 'bg-pastel-yellow/20'
  },
  {
    id: '3',
    name: 'MotherCare UAE',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    category: 'local',
    description: 'The regional branch of the global baby retailer, offering UAE-specific products and services.',
    website: 'https://example.com/mothercareUAE',
    discountCode: 'LEANON25',
    discountValue: '25% off select items',
    bgColor: 'bg-pastel-pink/20'
  },
  {
    id: '4',
    name: 'Baby Essentials',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    category: 'international',
    description: 'Premium essentials for babies from diapers to feeding equipment, trusted by parents worldwide.',
    website: 'https://example.com/babyessentials',
    discountCode: 'LEANON10',
    discountValue: '10% off + free shipping',
    bgColor: 'bg-pastel-orange/20'
  },
  {
    id: '5',
    name: 'Desert Baby',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    category: 'local',
    description: 'A local UAE brand specializing in clothing and accessories designed for the regional climate.',
    website: 'https://example.com/desertbaby',
    discountCode: 'LEANON30',
    discountValue: '30% off your purchase',
    bgColor: 'bg-pastel-green/20'
  },
  {
    id: '6',
    name: 'Kiddo World',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    category: 'international',
    description: 'A global toy brand focused on educational and developmental toys for various age groups.',
    website: 'https://example.com/kiddoworld',
    discountCode: 'LEANON22',
    discountValue: '22% off toys and games',
    bgColor: 'bg-pastel-yellow/20'
  },
];

interface BrandGridProps {
  categoryFilter: 'all' | 'local' | 'international';
}

const BrandGrid = ({ categoryFilter }: BrandGridProps) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  
  const filteredBrands = categoryFilter === 'all' 
    ? brandsData 
    : brandsData.filter(brand => brand.category === categoryFilter);
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <Card key={brand.id} className={`overflow-hidden transition-all duration-300 hover:shadow-md ${brand.bgColor}`}>
            <CardContent className="p-6">
              <div className="w-full h-40 flex items-center justify-center mb-4">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{brand.name}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {brand.category === 'local' ? 'Local Brand' : 'International Brand'}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center p-6 pt-0">
              <Button 
                variant="warm" 
                className="rounded-full"
                onClick={() => setSelectedBrand(brand)}
              >
                View Discounts
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <BrandDetailDialog 
        brand={selectedBrand} 
        isOpen={!!selectedBrand} 
        onClose={() => setSelectedBrand(null)} 
      />
    </>
  );
};

export default BrandGrid;
