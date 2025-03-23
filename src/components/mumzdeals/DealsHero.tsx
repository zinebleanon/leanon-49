
import { ShoppingBag, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DealsHero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-black">Mumz</span> <span className="text-orange-500">Deals</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 font-playfair">
              Exclusive discounts and offers curated for moms. Save on your favorite brands and products for you and your little ones.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-primary">
                <Tag className="mr-2 h-4 w-4" />
                Browse Deals
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Featured Brands
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
