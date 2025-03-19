
import { BookOpen } from 'lucide-react';

const SelectHero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-black">Mumz</span> <span className="text-orange-500">Select</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 font-playfair">
              Curated articles about products and services for kids, chosen by mums like you. Discover expert recommendations, exclusive content, and special discount codes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectHero;
