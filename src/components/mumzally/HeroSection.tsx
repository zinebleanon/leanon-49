
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

  return (
    <section className="py-16 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Find <span className="text-gradient">Match with Moms & LeanOn them</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button 
              size="lg" 
              className="rounded-full w-full sm:w-auto bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground"
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
