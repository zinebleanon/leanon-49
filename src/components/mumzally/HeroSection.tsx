
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your <span className="text-gradient">Mumz Ally</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with moms based on your age, neighborhood, children's 
              age and gender, nationality, and work status for meaningful friendships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full">
                Find Your Allies
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                How It Works
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-300/5 p-1">
              <div className="h-full w-full rounded-3xl bg-white/90 backdrop-blur-sm flex items-center justify-center p-8 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1591727826491-c30be2c4fd31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
                  alt="Two moms with their kids at a park" 
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
