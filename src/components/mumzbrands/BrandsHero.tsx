
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tags } from 'lucide-react';
import BrandsHowItWorksDialog from '@/components/mumzbrands/BrandsHowItWorksDialog';
import { useIsMobile } from '@/hooks/use-mobile';

interface BrandsHeroProps {
  onOpenDialog: () => void;
  onOpenDiscountDialog: () => void;
}

const BrandsHero = ({ onOpenDialog, onOpenDiscountDialog }: BrandsHeroProps) => {
  const isMobile = useIsMobile();
  
  const handleDiscountDialogOpen = () => {
    console.log('Opening discount dialog from BrandsHero');
    onOpenDiscountDialog();
  };
  
  return (
    <section className="py-4 md:py-6 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 font-playfair">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Brands You Know<br />Or You Don't Know
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 mb-8 md:mt-12 md:mb-12">
            <BrandsHowItWorksDialog 
              className="w-full sm:w-auto" 
              trackingName="brands_how_it_works"
            />
            
            <Button 
              size="lg" 
              className="rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors flex items-center w-full sm:w-auto"
              onClick={handleDiscountDialogOpen}
              trackingName="brands_browse_discounts"
            >
              <Tags className="h-5 w-5 mr-2 flex-shrink-0 my-auto" /> 
              <span className="my-auto">View All Brand Discounts</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;
