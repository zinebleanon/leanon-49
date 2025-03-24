
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  FilterIcon, 
  X, 
  MoveRight, 
  RefreshCw, 
  MessageCircle, 
  Info 
} from 'lucide-react';
import FilterSection from './FilterSection';
import HowItWorksModal from './HowItWorksModal';
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroSectionProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  showFilters?: boolean;
  setShowFilters?: (show: boolean) => void;
}

const HeroSection = ({ 
  onFiltersChange, 
  showFilters = false, 
  setShowFilters = () => {} 
}: HeroSectionProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleHowItWorks = () => {
    setIsHowItWorksOpen(!isHowItWorksOpen);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
    if (setShowFilters) {
      setShowFilters(false);
    }
  };

  // Effect to show the filter section when showFilters changes
  // This is triggered by the floating button
  if (showFilters && !isFilterOpen) {
    setIsFilterOpen(true);
  }

  return (
    <>
      <section className="py-8 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-playfair text-primary mb-2">
                MumzAlly
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Connect with other moms in your area for support and friendship
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={toggleHowItWorks}
                className="flex-1 md:flex-none"
              >
                <Info className="mr-2 h-4 w-4" />
                How It Works
              </Button>
              
              {!isMobile && (
                <Button 
                  variant="outline" 
                  onClick={toggleFilter}
                  className="flex-1 md:flex-none"
                >
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filter Match
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-[#B8CEC2]/20 p-4 md:p-6 rounded-lg shadow-sm mb-4">
            <h2 className="text-xl font-semibold font-playfair mb-2">How MumzAlly Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-white rounded-full p-3 mb-4">
                  <RefreshCw size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Match Algorithm</h3>
                <p className="text-sm text-muted-foreground">
                  We match you with other moms based on location, children's ages, and interests
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-white rounded-full p-3 mb-4">
                  <MessageCircle size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Connect & Chat</h3>
                <p className="text-sm text-muted-foreground">
                  Send connection requests and start chatting with potential mom friends
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-white rounded-full p-3 mb-4">
                  <MoveRight size={24} className="text-primary" />
                </div>
                <h3 className="font-medium mb-2">Meet Up</h3>
                <p className="text-sm text-muted-foreground">
                  Arrange playdates, coffee meetups, or activities with your new mom friends
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {isMobile ? (
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetContent side="bottom" className="h-[90vh] pt-6 overflow-auto">
            <SheetHeader>
              <SheetTitle>Filter Match</SheetTitle>
              <FilterSection onFiltersChange={onFiltersChange} onClose={closeFilter} />
            </SheetHeader>
          </SheetContent>
        </Sheet>
      ) : (
        isFilterOpen && <FilterSection onFiltersChange={onFiltersChange} onClose={closeFilter} />
      )}
      
      <HowItWorksModal open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen} />
    </>
  );
};

export default HeroSection;
