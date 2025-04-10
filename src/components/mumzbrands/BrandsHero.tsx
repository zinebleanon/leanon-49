
import { Button } from '@/components/ui/button';
import { HeartHandshake, BadgePercent, Info } from 'lucide-react';
import BrandsHowItWorksDialog from '@/components/mumzbrands/BrandsHowItWorksDialog';

interface BrandsHeroProps {
  onOpenDialog: () => void;
  onOpenDiscountDialog: () => void;
}

const BrandsHero = ({ onOpenDialog, onOpenDiscountDialog }: BrandsHeroProps) => {
  return (
    <section className="py-16 md:py-20 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 font-playfair">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Brands You Know<br />Or You Don't Know
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-12 mb-8">
            <Button 
              size="lg" 
              className="rounded-full px-6 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all flex items-center"
              onClick={onOpenDialog}
            >
              <HeartHandshake className="h-5 w-5 mr-2 flex-shrink-0" /> 
              <span className="flex-1 text-center">Support Moms Local Brands</span>
            </Button>
            <Button 
              size="lg" 
              className="rounded-full px-6 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all flex items-center"
              onClick={onOpenDiscountDialog}
            >
              <BadgePercent className="h-5 w-5 mr-2 flex-shrink-0" /> 
              <span className="flex-1 text-center">Browse Available Discounts</span>
            </Button>
            <BrandsHowItWorksDialog />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;
