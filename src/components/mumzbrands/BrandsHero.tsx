
import { Button } from '@/components/ui/button';
import { Tag, ShoppingBag } from 'lucide-react';

const BrandsHero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-black">Brands You Know</span> & <span className="text-orange-500">You Don't Know</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 font-playfair">
              Discover exclusive discounts from your favorite brands and explore new ones. 
              All discounts are exclusively available for our LeanOn community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full bg-pastel-yellow text-foreground hover:bg-pastel-yellow/90">
                <Tag className="mr-2 h-4 w-4" />
                Unlock Your Discounts
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Categories
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="p-8 h-80 flex items-center justify-center">
              <img 
                src="/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png" 
                alt="Premium brands" 
                className="h-full w-auto object-contain rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;
