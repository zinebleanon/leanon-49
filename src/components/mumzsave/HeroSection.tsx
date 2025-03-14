
import { Button } from '@/components/ui/button';
import { PercentCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  handleBrowseDeals: () => void;
}

const HeroSection = ({ handleBrowseDeals }: HeroSectionProps) => {
  return (
    <section className="py-4 md:py-6 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="rounded-full bg-primary"
            onClick={handleBrowseDeals}
          >
            <PercentCircle className="mr-2 h-4 w-4" />
            Mumz Deals
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full"
            asChild
          >
            <Link to="/marketplace">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Mumz Market place
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
