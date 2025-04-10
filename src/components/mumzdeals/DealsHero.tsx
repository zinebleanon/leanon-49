
import { ShoppingBag, Tag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RibbonIcon from '@/components/ui/RibbonIcon';
import DealsHowItWorksDialog from '@/components/mumzdeals/DealsHowItWorksDialog';

const DealsHero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-black">Mumz</span> <span className="text-orange-500">Deals</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button 
                size="lg"
                className="rounded-full px-6 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all flex items-center"
              >
                <RibbonIcon className="h-5 w-5 mr-2 flex-shrink-0" fill="#FFD9A7" />
                <span className="flex-1 text-center">Browse Deals</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-6 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all flex items-center"
              >
                <ShoppingBag className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="flex-1 text-center">Featured Brands</span>
              </Button>
              <DealsHowItWorksDialog />
            </div>
          </div>
          <div className="hidden md:block">
            {/* Illustration or image would go here */}
            <div className="bg-orange-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-3xl font-bold text-orange-500">Special Offers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsHero;
