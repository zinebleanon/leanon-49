
import { Button } from '@/components/ui/button';
import { HeartHandshake, BadgePercent, Info } from 'lucide-react';
import BrandsHowItWorksDialog from '@/components/mumzbrands/BrandsHowItWorksDialog';
import { useNavigate } from 'react-router-dom';

interface BrandsHeroProps {
  onOpenDialog: () => void;
  onOpenDiscountDialog: () => void;
}

const BrandsHero = ({ onOpenDialog, onOpenDiscountDialog }: BrandsHeroProps) => {
  const navigate = useNavigate();
  
  return (
    <section className="py-4 md:py-6 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mx-auto max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 font-playfair">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Brands You Know<br />Or You Don't Know
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-12">
            <Button 
              variant="warm"
              size="lg"
              className="rounded-full h-11 px-8 w-full sm:w-auto flex items-center gap-2"
              onClick={onOpenDialog}
            >
              <Info className="h-5 w-5 flex-shrink-0" />
              <span>How It Works</span>
            </Button>
            
            <Button 
              variant="warm"
              size="lg"
              className="rounded-full h-11 px-8 w-full sm:w-auto flex items-center gap-2"
              onClick={onOpenDiscountDialog}
            >
              <BadgePercent className="h-5 w-5 flex-shrink-0" /> 
              <span>Browse Available Discounts</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;
