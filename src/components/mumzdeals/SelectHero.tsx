
import { BookOpen, Activity, Heart, Baby, School, Film } from 'lucide-react';

const SelectHero = () => {
  return (
    <section className="py-8 px-6 md:px-8 bg-card rounded-lg shadow-sm">
      <div className="max-w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              <span className="text-foreground">Guide</span> <span className="text-orange-500">Her</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Expert content, posts and videos tailored to your journey as a mom. Discover personalized parenting advice and tips based on your profile and your children's ages.
            </p>
            <div className="flex flex-col gap-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-rose-400" />
                <span>Health Care & Professional support</span>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-blue-400" />
                <span>Emotional, Mental & Physical wellbeing</span>
              </div>
              <div className="flex items-center gap-3">
                <Baby className="h-5 w-5 text-pink-400" />
                <span>Parenting Guidance</span>
              </div>
              <div className="flex items-center gap-3">
                <School className="h-5 w-5 text-yellow-400" />
                <span>Childcare & Schooling</span>
              </div>
              <div className="flex items-center gap-3">
                <Film className="h-5 w-5 text-amber-400" />
                <span>Kids Entertainment</span>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <img 
              src="/lovable-uploads/01f579f8-89e7-4c0c-b14e-96ac7cdf8637.png" 
              alt="Guide Her Content Categories" 
              className="rounded-lg shadow-md max-w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectHero;
