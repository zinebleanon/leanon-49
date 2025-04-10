
import { Button } from '@/components/ui/button';
import { HeartHandshake, BadgePercent, Info, User } from 'lucide-react';
import BrandsHowItWorksDialog from '@/components/mumzbrands/BrandsHowItWorksDialog';
import { useNavigate } from 'react-router-dom';

interface BrandsHeroProps {
  onOpenDialog: () => void;
  onOpenDiscountDialog: () => void;
}

const BrandsHero = ({ onOpenDialog, onOpenDiscountDialog }: BrandsHeroProps) => {
  const navigate = useNavigate();
  
  const handleSignInClick = () => {
    navigate('/sign-in');
  };
  
  const handleSignUpClick = () => {
    navigate('/sign-up');
  };
  
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
            <BrandsHowItWorksDialog />
            <div className="flex gap-2">
              <Button 
                size="md" 
                className="rounded-full px-4 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all flex items-center h-9"
                onClick={handleSignInClick}
              >
                <User className="h-4 w-4 mr-1.5 flex-shrink-0" /> 
                <span>Sign In</span>
              </Button>
              <Button 
                size="md" 
                className="rounded-full px-4 border border-[#FFD9A7] bg-white hover:bg-gray-50 text-foreground active:opacity-95 transition-all flex items-center h-9"
                onClick={handleSignUpClick}
              >
                <User className="h-4 w-4 mr-1.5 flex-shrink-0" /> 
                <span>Sign Up</span>
              </Button>
            </div>
            <Button 
              size="md" 
              className="rounded-full px-4 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all flex items-center h-9"
              onClick={onOpenDiscountDialog}
            >
              <BadgePercent className="h-4 w-4 mr-1.5 flex-shrink-0" /> 
              <span>Browse Available Discounts</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;
