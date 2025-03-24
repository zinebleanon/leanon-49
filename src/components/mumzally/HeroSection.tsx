
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';
import { useEffect, useState } from 'react';
import FilterSection from './FilterSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
}

const HeroSection = ({ onFiltersChange }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const textStyles = "transition-all duration-700 ease-smooth";

  return (
    <section className="py-16 md:py-12 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="bg-white/80 shadow-sm hover:bg-white"
          >
            <Home className="h-4 w-4 mr-2" />
            Main Menu
          </Button>
        </div>
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Match <br /> <span className="font-adlery">&amp;</span> LeanOn Moms
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    size="lg" 
                    className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                  >
                    Filter to find your Matches
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh] bg-[#B8CEC2] rounded-t-xl">
                  <FilterSection onFiltersChange={onFiltersChange} onClose={() => {}} />
                </SheetContent>
              </Sheet>
            ) : (
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                  >
                    Filter to find your Matches
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl sm:max-w-4xl bg-[#B8CEC2] border-[#B8CEC2]/50">
                  <DialogHeader className="relative">
                    <DialogTitle className="text-xl font-semibold text-center mt-6">Find Your Perfect Mom Match</DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">
                      Filter your preferences to find moms who match your needs
                    </DialogDescription>
                  </DialogHeader>
                  <FilterSection onFiltersChange={onFiltersChange} onClose={() => setIsFilterOpen(false)} />
                </DialogContent>
              </Dialog>
            )}
            <HowItWorksModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
