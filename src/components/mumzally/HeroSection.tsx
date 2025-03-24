
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const scrollToFilters = () => {
    const filterSection = document.getElementById('filter-section');
    if (filterSection) {
      filterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const textStyles = "transition-all duration-700 ease-smooth";

  return (
    <section className="py-16 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">Match <span className="font-adlery">&amp; LeanOn</span> Moms</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors"
              onClick={scrollToFilters}
            >
              Find Your Match
            </Button>
            <HowItWorksModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
