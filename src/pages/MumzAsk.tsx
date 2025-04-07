
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search, Filter, MessageCircle, Baby, ShoppingBag, UtensilsCrossed, School, Heart, CalendarDays, Users, User, Activity, HelpCircle, MessagesSquare, X, HeartHandshake, Ticket, Tent, Smile } from 'lucide-react';
import AskQuestionForm from '@/components/mumzask/AskQuestionForm';
import NeighborhoodCommunity from '@/components/mumzask/NeighborhoodCommunity';
import { useIsMobile } from '@/hooks/use-mobile';
import AskHowItWorksModal from '@/components/mumzask/AskHowItWorksModal';
import RibbonIcon from '@/components/ui/RibbonIcon';
import CommunityMessages from '@/components/mumzask/CommunityMessages';

const MumzAsk = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
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
    { name: 'Events', icon: <Ticket className="h-4 w-4 mr-2" /> },
    { name: 'Kids Camps', icon: <Tent className="h-4 w-4 mr-2" /> },
    { name: 'Kids Activities', icon: <Smile className="h-4 w-4 mr-2" /> },
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
              <h1 className={`text-3xl md:text-5xl font-bold mb-8 md:mb-10 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
                  LeanOn the Community
                </span>
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-6">
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
                
                <AskHowItWorksModal />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-3 px-4">
          <div className="max-w-4xl mx-auto">
            <CommunityMessages 
              categories={categories}
              neighborhoodCategories={neighborhoodCategories}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAsk;
