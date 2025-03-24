
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';
import { useEffect, useState } from 'react';
import FilterSection from './FilterSection';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface HeroSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
}

const HeroSection = ({ onFiltersChange }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const textStyles = "transition-all duration-700 ease-smooth";

  return (
    <section className="py-16 md:py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Match <br /> <span className="font-adlery">&amp;</span> LeanOn Moms
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button 
                  size="lg" 
                  className="rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors"
                >
                  Find your Match Filter
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl sm:max-w-4xl">
                <FilterSection onFiltersChange={onFiltersChange} onClose={() => setIsFilterOpen(false)} />
              </DialogContent>
            </Dialog>
            <HowItWorksModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
