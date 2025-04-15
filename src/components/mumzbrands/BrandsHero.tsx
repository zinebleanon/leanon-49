
import React from 'react';
import { Button } from '@/components/ui/button';
import { HeartHandshake, BadgePercent, Info } from 'lucide-react';
import BrandsHowItWorksDialog from '@/components/mumzbrands/BrandsHowItWorksDialog';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface BrandsHeroProps {
  onOpenDialog: () => void;
  onOpenDiscountDialog: () => void;
}

const BrandsHero = ({ onOpenDialog, onOpenDiscountDialog }: BrandsHeroProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleDiscountDialogOpen = () => {
    console.log('Discount dialog open clicked');
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
              variant="warm"
              size={isMobile ? "default" : "lg"}
              className="rounded-full h-10 md:h-11 px-4 md:px-8 w-full sm:w-auto flex items-center gap-2 active:scale-95 transition-transform"
              onClick={handleDiscountDialogOpen}
              trackingName="brands_browse_discounts"
            >
              <BadgePercent className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" /> 
              <span>Browse Available Discounts</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;
