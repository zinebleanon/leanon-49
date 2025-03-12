
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';

const HeroSection = () => {
  const scrollToFilters = () => {
    const filterSection = document.getElementById('filter-section');
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Find Your <span className="text-gradient">Mumz Ally</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8">
            Connect with mumz based on your age, neighborhood, children's 
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
