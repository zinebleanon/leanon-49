
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BrandDetailDialog from './BrandDetailDialog';

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
      <div className="text-center py-10">
        <p className="text-muted-foreground">No brands found</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <Card 
            key={brand.id} 
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-none"
            onClick={() => handleBrandClick(brand)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center h-40" style={{ backgroundColor: brand.bgColor }}>
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-16 object-contain mb-2"
              />
              <p className="text-center font-medium text-sm">{brand.name}</p>
              <div className="mt-2">
                <span className="inline-block px-2 py-0.5 bg-white/70 rounded-full text-xs">
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
