
import { ShoppingBag, Tag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RibbonIcon from '@/components/ui/RibbonIcon';
import DealsHowItWorksDialog from '@/components/mumzdeals/DealsHowItWorksDialog';

const DealsHero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-black">Mumz</span> <span className="text-orange-500">Deals</span>
            </h1>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button 
                size="lg"
                className="rounded-full px-6 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all"
              >
                <RibbonIcon className="mr-2 h-5 w-5" fill="#FFD9A7" />
                Browse Deals
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-6 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Featured Brands
              </Button>
            </div>
            <div className="mt-8 flex justify-center md:justify-start">
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors"
              >
                <Info className="mr-2 h-5 w-5" /> How It Works
              </Button>
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
