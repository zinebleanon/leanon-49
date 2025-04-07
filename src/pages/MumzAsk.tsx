
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search, Filter, MessageCircle, Baby, ShoppingBag, UtensilsCrossed, School, Heart, CalendarDays, Users, User, Activity, HelpCircle, MessagesSquare, X, HeartHandshake } from 'lucide-react';
import AskQuestionForm from '@/components/mumzask/AskQuestionForm';
import NeighborhoodCommunity from '@/components/mumzask/NeighborhoodCommunity';
import { useIsMobile } from '@/hooks/use-mobile';
import HowItWorksModal from '@/components/mumzally/HowItWorksModal';
import RibbonIcon from '@/components/ui/RibbonIcon';

const MumzAsk = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<'general' | 'neighborhood'>('general');
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const categories = [
    { name: 'Parenting', icon: <Users className="h-4 w-4 mr-2" /> },
    { name: 'Pregnancy', icon: <Heart className="h-4 w-4 mr-2" /> },
    { name: 'Birth', icon: <Activity className="h-4 w-4 mr-2" /> },
    { name: 'Postpartum', icon: <User className="h-4 w-4 mr-2" /> },
    { name: 'Health', icon: <Activity className="h-4 w-4 mr-2" /> },
    { name: 'Diversification', icon: <UtensilsCrossed className="h-4 w-4 mr-2" /> },
    { name: 'Feeding & Breastfeeding', icon: <Baby className="h-4 w-4 mr-2" /> },
    { name: 'Shopping', icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
    { name: 'Schools & Nurseries', icon: <School className="h-4 w-4 mr-2" /> },
    { name: 'Nannies', icon: <User className="h-4 w-4 mr-2" /> },
    { name: 'Entertainment & Birthday', icon: <CalendarDays className="h-4 w-4 mr-2" /> },
    { name: 'Others', icon: <HelpCircle className="h-4 w-4 mr-2" /> }
  ];
  
  const neighborhoodCategories = [
    { name: 'Meetups', icon: <CalendarDays className="h-4 w-4 mr-2" /> },
    { name: 'Help & Support', icon: <HeartHandshake className="h-4 w-4 mr-2" /> },
  ];
  
  const textStyles = "transition-all duration-700 ease-smooth";
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]/30">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-6 md:pb-10">
        <section className="py-3 md:py-8 px-4 md:px-8 bg-[#B8CEC2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center md:text-left md:max-w-3xl mx-auto">
              <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
                  LeanOn the Community
                </span>
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                    >
                      <RibbonIcon className="mr-2 h-5 w-5" color="#000000" />
                      Ask LeanOn Community
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <AskQuestionForm categories={categories} onClose={() => {
                      const closeButton = document.querySelector('[aria-label="Close"]');
                      if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                      }
                    }} />
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Ask Your Neighborhood
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-lg">
                    <AskQuestionForm categories={neighborhoodCategories} onClose={() => {
                      const closeButton = document.querySelector('[aria-label="Close"]');
                      if (closeButton instanceof HTMLElement) {
                        closeButton.click();
                      }
                    }} />
                  </DialogContent>
                </Dialog>
                
                <HowItWorksModal />
              </div>
            </div>
          </div>
        </section>
        
        <div className="flex justify-center items-center bg-[#B8CEC2] px-4 md:px-8 pb-3">
          <img 
            src="/lovable-uploads/00a4dae1-217d-4bd7-ac01-2cd9c6427bb8.png" 
            alt="Diverse moms silhouettes illustration" 
            className="w-full max-w-3xl h-auto mx-auto object-contain"
          />
        </div>
        
        <div className="px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-end">
              {isMobile ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="mb-4 flex items-center gap-1"
                    >
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[90vh] bg-[#B8CEC2] rounded-t-xl">
                    <div className="pt-4">
                      <h3 className="text-xl font-medium mb-3">Filter by Category</h3>
                      <div className="relative mb-4">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <Search className="w-5 h-5 text-gray-500" />
                        </div>
                        <Input 
                          type="search" 
                          className="block w-full p-4 ps-10 bg-white/90 border border-[#B8CEC2]/30 rounded-lg"
                          placeholder="Enter keywords to narrow your search..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6 max-h-[60vh] overflow-y-auto">
                        {activeSection === 'general' ? 
                          categories.map((category) => (
                            <Button
                              key={category.name}
                              variant="outline"
                              size="sm"
                              className="rounded-full bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground border-[#FFD9A7]"
                            >
                              {category.icon}
                              {category.name}
                            </Button>
                          )) :
                          neighborhoodCategories.map((category) => (
                            <Button
                              key={category.name}
                              variant="outline"
                              size="sm"
                              className="rounded-full bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground border-[#FFD9A7]"
                            >
                              {category.icon}
                              {category.name}
                            </Button>
                          ))
                        }
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="mb-4 flex items-center gap-1"
                    >
                      <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md sm:max-w-lg bg-[#B8CEC2] border-[#B8CEC2]/50">
                    <div className="pt-4">
                      <h3 className="text-xl font-medium mb-3">Filter by Category</h3>
                      <div className="relative mb-4">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <Search className="w-5 h-5 text-gray-500" />
                        </div>
                        <Input 
                          type="search" 
                          className="block w-full p-4 ps-10 bg-white/90 border border-[#B8CEC2]/30 rounded-lg"
                          placeholder="Enter keywords to narrow your search..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6 max-h-[40vh] overflow-y-auto">
                        {activeSection === 'general' ? 
                          categories.map((category) => (
                            <Button
                              key={category.name}
                              variant="outline"
                              size="sm"
                              className="rounded-full bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground border-[#FFD9A7]"
                            >
                              {category.icon}
                              {category.name}
                            </Button>
                          )) :
                          neighborhoodCategories.map((category) => (
                            <Button
                              key={category.name}
                              variant="outline"
                              size="sm"
                              className="rounded-full bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground border-[#FFD9A7]"
                            >
                              {category.icon}
                              {category.name}
                            </Button>
                          ))
                        }
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
        
        <section className="py-3 px-4">
          <div className="max-w-4xl mx-auto">
            {activeSection === 'general' ? (
              <>
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-2xl font-bold font-playfair">Most Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-3">
                  <div className="p-5 bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20">
                    <h3 className="font-semibold mb-2">How do I handle toddler tantrums in public?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      My 2-year-old has started having major meltdowns whenever we're grocery shopping. I'm at my wit's end!
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-full h-7 px-3 text-xs">
                          <MessageCircle className="h-3 w-3 mr-1" /> 12 replies
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20">
                    <h3 className="font-semibold mb-2">Best breastfeeding positions for newborns?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      I'm a first-time mom struggling with breastfeeding my 2-week-old. Which positions work best for newborns?
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-full h-7 px-3 text-xs">
                          <MessageCircle className="h-3 w-3 mr-1" /> 8 replies
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">4 hours ago</span>
                    </div>
                  </div>
                  
                  <div className="p-5 bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20">
                    <h3 className="font-semibold mb-2">Recommendations for baby food introduction?</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      My baby is turning 6 months next week. Looking for tips on starting solid foods and what to try first.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="rounded-full h-7 px-3 text-xs">
                          <MessageCircle className="h-3 w-3 mr-1" /> 15 replies
                        </Button>
                      </div>
                      <span className="text-xs text-muted-foreground">1 day ago</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <NeighborhoodCommunity />
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAsk;
