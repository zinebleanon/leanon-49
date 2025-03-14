
import { PercentCircle } from 'lucide-react';

const DealsHero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-black">Mumz</span> <span className="text-orange-500">Deals</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 font-playfair">
              Discover exclusive discounts and special offers for parents across the UAE. Save on everything from baby gear to children's clothing and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsHero;
