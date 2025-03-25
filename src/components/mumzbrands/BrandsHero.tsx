
import { Button } from '@/components/ui/button';
import { Tag, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const BrandsHero = () => {
  return (
    <section className="py-2 md:py-3 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 font-playfair">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Brands You Know<br />& You Don't Know
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
};

export default BrandsHero;
