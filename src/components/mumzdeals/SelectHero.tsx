
import { BookOpen } from 'lucide-react';

const SelectHero = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-black">Guide</span> <span className="text-orange-500">Her</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 font-playfair">
              Expert content, posts and videos tailored to your journey as a mom. Discover personalized parenting advice and tips based on your profile and your children's ages.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-5 w-5" />
              <span>Curated by experts, personalized for you</span>
            </div>
          </div>
          <div className="relative hidden md:flex justify-end">
            <img 
              src="/lovable-uploads/35ba163a-0115-4ea5-a330-fd8f9a6d1ca6.png" 
              alt="Mom reading with child" 
              className="rounded-lg shadow-lg max-w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectHero;
