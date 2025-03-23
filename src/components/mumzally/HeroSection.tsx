
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';

const HeroSection = () => {
  const scrollToFilters = () => {
    const filterSection = document.getElementById('filter-section');
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  console.log("Rendering HeroSection with logo path:", "/lovable-uploads/e721b501-95df-45ef-b358-51c2c2fc8144.png");

  return (
    <section className="py-16 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-2xl mx-auto">
          <div className="mb-8 flex justify-center md:justify-start">
            <img 
              src="/lovable-uploads/e721b501-95df-45ef-b358-51c2c2fc8144.png" 
              alt="LeanOn Logo" 
              className="w-[500px] max-w-full h-auto"
              onError={(e) => {
                console.error("Error loading image:", e);
                e.currentTarget.style.border = "1px solid red";
                e.currentTarget.style.padding = "10px";
                e.currentTarget.alt = "Image failed to load";
              }}
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Find <span className="text-gradient">Match with Moms & LeanOn</span> each other
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
            Less alone in Motherhood. Connect with mumz based on your age, neighborhood, children's 
            age and gender, nationality, and work status for meaningful friendships.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="rounded-full w-full sm:w-auto"
              onClick={scrollToFilters}
            >
              Find Your Allies
            </Button>
            <HowItWorksModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
