
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import RibbonIcon from '@/components/ui/RibbonIcon';
import { useUserInfo } from '@/hooks/use-user-info';
import { Users, Info } from 'lucide-react';
import { Link } from "react-router-dom";

interface HeroSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  profiles?: any[];
  nearbyMoms?: any[];
}

const HeroSection = ({ onFiltersChange, profiles = [], nearbyMoms = [] }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const isMobile = useIsMobile();
  const { location } = useUserInfo();
  
  useEffect(() => {
    setIsVisible(true);
    if (!location || (!location.latitude && !location.longitude)) {
      setShowLocationPrompt(true);
    } else {
      setShowLocationPrompt(false);
    }
  }, [location]);

  const textStyles = "transition-all duration-700 ease-smooth";

  return (
    <section className="py-8 md:py-8 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              LeanOn Moms<br />Around You
            </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-6">
            {isMobile ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    size="lg" 
                    className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                  >
                    <RibbonIcon className="mr-2 h-5 w-5" color="#000000" />
                    Find LeanMoms Around
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh] bg-[#B8CEC2] rounded-t-xl">
                  {/* Content has been removed */}
                </SheetContent>
              </Sheet>
            ) : (
              <Button 
                size="lg" 
                className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <RibbonIcon className="mr-2 h-5 w-5" color="#000000" />
                Find LeanMoms Around
              </Button>
            )}

            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors"
              asChild
            >
              <Link to="/connections">
                <Users className="mr-2 h-5 w-5" />
                My LeanMoms
              </Link>
            </Button>
            
            <HowItWorksModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
