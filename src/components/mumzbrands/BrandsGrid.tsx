
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BrandDetailDialog from './BrandDetailDialog';
import { Star } from 'lucide-react';

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

interface BrandsGridProps {
  brands: Brand[];
}

const BrandsGrid = ({ brands }: BrandsGridProps) => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleBrandClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsDialogOpen(true);
  };
  
  if (brands.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <h3 className="text-xl font-medium mb-2">No brands found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Try adjusting your filters or check back later. We're constantly adding new brands to our collection!
        </p>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Card 
            key={brand.id} 
            className="overflow-hidden hover:shadow-md transition-all cursor-pointer border group hover:scale-[1.02]"
            onClick={() => handleBrandClick(brand)}
          >
            <CardContent className="p-6 flex flex-col items-center justify-center h-[200px]" style={{ backgroundColor: brand.bgColor }}>
              <div className="bg-white/80 rounded-full p-4 mb-4 w-24 h-24 flex items-center justify-center group-hover:bg-white transition-colors">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-16 w-16 object-contain"
                />
              </div>
              <h3 className="text-center font-medium text-base">{brand.name}</h3>
              <div className="flex items-center justify-center mt-2">
                {/* Fake stars for visual appeal */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <div className="mt-2">
                <span className="inline-block px-3 py-1 bg-white/70 rounded-full text-xs font-medium">
                  {brand.category}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <BrandDetailDialog 
        brand={selectedBrand} 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
    </>
  );
};

export default BrandsGrid;
