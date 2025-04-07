
import { Button } from '@/components/ui/button';
import { HeartHandshake, BadgePercent } from 'lucide-react';
import HowItWorksDialog from '@/components/HowItWorksDialog';

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
              Brands You Know<br />& You Don't Know
            </span>
          </h1>
          <p className="text-foreground/80 mb-6 max-w-2xl mx-auto md:mx-0">
            Browse our curated selection of both international and local brands offering exclusive discounts for LeanOn community members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6 mb-4">
            <Button 
              size="lg" 
              className="rounded-full px-6 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all"
              onClick={onOpenDialog}
            >
              <HeartHandshake className="mr-2 h-5 w-5" /> Support Moms Local Brands
            </Button>
            <Button 
              size="lg" 
              className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
              onClick={onOpenDiscountDialog}
            >
              <BadgePercent className="mr-2 h-5 w-5" /> Browse Available Discounts
            </Button>
          </div>
          <div className="mt-8 flex justify-center md:justify-start">
            <HowItWorksDialog />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;
