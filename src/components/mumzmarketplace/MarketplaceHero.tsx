
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const MarketplaceHero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-black">Mumz</span><br />
              <span className="text-orange-500">Marketplace</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 font-playfair">
              Buy and sell gently used children's items across the UAE. Connect with other moms to declutter your home and find quality items at a fraction of retail prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="rounded-full bg-primary h-11 px-8 w-full sm:w-auto"
                asChild
              >
                <Link to="/marketplace/find">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Browse Items
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full h-11 px-8 w-full sm:w-auto"
                asChild
              >
                <Link to="/marketplace/sell">
                  <Package className="mr-2 h-4 w-4" />
                  Start Selling
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceHero;
