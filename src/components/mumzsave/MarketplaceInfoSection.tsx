
import { Button } from '@/components/ui/button';
import { Tag, ShoppingBag, DollarSign, Package } from 'lucide-react';

const MarketplaceInfoSection = () => {
  return (
    <section className="py-12 px-6 md:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-8 font-playfair text-center">
          How Mumz World UAE Marketplace Works
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center px-2">
            <div className="bg-[#FFD9A7] rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <Tag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base font-medium mb-1 font-playfair">List Items</h3>
            <p className="text-xs text-muted-foreground font-playfair">
              Post photos of unused kids gear across all emirates.
            </p>
          </div>
          
          <div className="text-center px-2">
            <div className="bg-[#FFD9A7] rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base font-medium mb-1 font-playfair">Shop & Browse</h3>
            <p className="text-xs text-muted-foreground font-playfair">
              Find quality used items at fraction of retail prices.
            </p>
          </div>
          
          <div className="text-center px-2">
            <div className="bg-[#FFD9A7] rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-base font-medium mb-1 font-playfair">Save & Declutter</h3>
            <p className="text-xs text-muted-foreground font-playfair">
              Save dirhams while decluttering your UAE home.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Button size="sm" className="rounded-full">
            <Package className="mr-2 h-4 w-4" />
            Start Selling
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceInfoSection;
