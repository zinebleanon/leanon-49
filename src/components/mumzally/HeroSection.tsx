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
import ConnectionRequests from './ConnectionRequests';
import { Filter, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("nearby");
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
  
  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
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

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  const renderDialogContent = () => (
    <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="nearby">Moms Around You</TabsTrigger>
          <TabsTrigger value="requests">Match Requests</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="nearby" className="mt-0">
        <div className="sticky top-0 z-10 bg-[#B8CEC2] pt-2 pb-4">
          <Button 
            onClick={handleShowFilters} 
            variant="outline" 
            className="w-full bg-white text-foreground hover:bg-white/90 flex items-center justify-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        
        {showFilters && (
          <div className="mb-4">
            <FilterSection onFiltersChange={onFiltersChange} onClose={() => setShowFilters(false)} />
          </div>
        )}
        
        {!location?.latitude ? (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-muted-foreground">
              Enable location to see moms in your neighborhood
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-xs h-8 bg-white"
              onClick={handleRequestLocation}
            >
              Share my location
            </Button>
          </div>
        ) : nearbyMoms && nearbyMoms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {nearbyMoms.map((mom) => (
              <RecommendedMatches key={`nearby-${mom.id}`} profiles={[mom]} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground mb-4">
            No moms with kids of similar ages found nearby
          </p>
        )}
        
        {profiles && profiles.length > 0 && (
          <RecommendedMatches profiles={profiles.slice(0, 3)} />
        )}
      </TabsContent>
      
      <TabsContent value="requests" className="mt-0">
        <ConnectionRequests dialogMode={true} />
      </TabsContent>
    </Tabs>
  );

  return (
    <section className="py-8 md:py-8 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center md:text-left md:max-w-3xl mx-auto">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Connect with LeanMoms<br className="hidden md:inline" /> Around You
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
                    Find LeanMoms Around
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[90vh] bg-[#B8CEC2] rounded-t-xl">
                  <div className="flex flex-col h-full">
                    {renderDialogContent()}
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
                    Find LeanMoms Around
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl sm:max-w-4xl bg-[#B8CEC2] border-[#B8CEC2]/50">
                  <DialogHeader className="relative">
                    <DialogTitle className="text-xl font-semibold text-center mt-6">Find Your Perfect Mom Match</DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground">
                      Recommended moms based on your location and children's ages
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-6">
                    {renderDialogContent()}
                  </div>
                </DialogContent>
              </Dialog>
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
