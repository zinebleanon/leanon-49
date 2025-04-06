
import { Button } from '@/components/ui/button';
import HowItWorksModal from './HowItWorksModal';
import { useEffect, useState } from 'react';
import FilterSection from './FilterSection';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import RibbonIcon from '@/components/ui/RibbonIcon';
import { useUserInfo } from '@/hooks/use-user-info';
import { toast } from "@/hooks/use-toast";
import RecommendedMatches from './RecommendedMatches';

interface HeroSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  profiles?: any[];
}

const HeroSection = ({ onFiltersChange, profiles = [] }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const isMobile = useIsMobile();
  const { location } = useUserInfo();
  
  useEffect(() => {
    setIsVisible(true);
    // Check if user has location set
    if (!location || !location.latitude) {
      setShowLocationPrompt(true);
    }
  }, [location]);

  const textStyles = "transition-all duration-700 ease-smooth";
  
  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Store position in localStorage
          const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
          userInfo.location = {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          
          setShowLocationPrompt(false);
          toast({
            title: "Location Updated",
            description: "We'll now show you moms in your area!",
          });
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "You can still use filters to find moms in specific neighborhoods.",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <section className="py-8 md:py-8 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Connect with <br /> Moms Around You
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
                    <RibbonIcon className="mr-2 h-5 w-5" color="#000000" />
                    Find Moms Around
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh] bg-[#B8CEC2] rounded-t-xl">
                  <div className="flex flex-col h-full">
                    <RecommendedMatches profiles={profiles.slice(0, 3)} />
                    <FilterSection onFiltersChange={onFiltersChange} onClose={() => {}} />
                  </div>
                </SheetContent>
              </Sheet>
            ) : (
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                  >
                    <RibbonIcon className="mr-2 h-5 w-5" color="#000000" />
                    Find Moms Around
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl sm:max-w-4xl bg-[#B8CEC2] border-[#B8CEC2]/50">
                  <DialogHeader className="relative">
                    <DialogTitle className="text-xl font-semibold text-center mt-6">Find Your Perfect Mom Match</DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">
                      Filter your preferences to find moms who match your needs
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-6">
                    <RecommendedMatches profiles={profiles.slice(0, 3)} />
                    <FilterSection onFiltersChange={onFiltersChange} onClose={() => setIsFilterOpen(false)} />
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <HowItWorksModal />
          </div>
        </div>
        
        {/* Location prompt dialog */}
        {showLocationPrompt && (
          <Dialog open={showLocationPrompt} onOpenChange={setShowLocationPrompt}>
            <DialogContent className="max-w-md bg-white">
              <DialogHeader>
                <DialogTitle>Enable Location for Better Matches</DialogTitle>
                <DialogDescription className="pt-2">
                  To find moms in your neighborhood, we need access to your location. This helps us connect you with moms who are nearby.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 pt-2">
                <Button onClick={handleRequestLocation} className="bg-[#B8CEC2] hover:bg-[#B8CEC2]/90 text-foreground">
                  Share My Location
                </Button>
                <Button variant="outline" onClick={() => setShowLocationPrompt(false)}>
                  Not Now
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
