
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';
import { useEffect, useState } from 'react';
import FilterSection from './FilterSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';

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
                  className="rounded-full px-6 border bg-gradient-to-r from-[#B8CEC2] via-[#FFD9A7] to-[#FDB3A4] hover:opacity-90 text-foreground active:opacity-95 transition-all"
                >
                  Find your Match Filter
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl sm:max-w-4xl bg-gradient-to-br from-[#FFF8E7] via-[#FFD9A7]/30 to-[#B8CEC2]/20 border-[#FFD9A7]/50">
                <DialogHeader className="relative">
                  <DialogClose asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute top-0 left-0 p-2 h-auto text-muted-foreground hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      <span>Back</span>
                    </Button>
                  </DialogClose>
                  <DialogTitle className="text-xl font-semibold text-center mt-6">Find Your Perfect Mom Match</DialogTitle>
                </DialogHeader>
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
