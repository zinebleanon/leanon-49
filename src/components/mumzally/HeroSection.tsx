
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="py-28 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
              Find Your <span className="text-gradient">Mumz Ally</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
              Connect with mumz based on your age, neighborhood, children's 
              age and gender, nationality, and work status for meaningful friendships.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="rounded-full w-full sm:w-auto">
                Find Your Allies
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full w-full sm:w-auto mt-3 sm:mt-0"
              >
                How It Works
              </Button>
            </div>
          </div>
          
          <div className="relative mt-8 md:mt-0">
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-300/5 p-1">
              <div className="h-full w-full rounded-3xl bg-white/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1591727826491-c30be2c4fd31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                  alt="Two mumz with their kids at a park" 
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 md:w-24 md:h-24 bg-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute -top-8 -left-8 w-24 h-24 md:w-32 md:h-32 bg-purple-500/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
