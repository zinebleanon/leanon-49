
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
            <div className="flex flex-col gap-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Health Care & Professional support</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Emotional, Mental & Physical wellbeing</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Parenting Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Childcare & Schooling</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Kids Entertainment</span>
              </div>
            </div>
          </div>
          <div className="relative hidden md:flex justify-end">
            <img 
              src="/lovable-uploads/01f579f8-89e7-4c0c-b14e-96ac7cdf8637.png" 
              alt="Guide Her Content Categories" 
              className="rounded-lg shadow-lg max-w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectHero;
