
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search, Filter, MessageCircle, BabyBottle, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import AskQuestionForm from '@/components/mumzask/AskQuestionForm';
import HowItWorksDialog from '@/components/HowItWorksDialog';
import { useIsMobile } from '@/hooks/use-mobile';

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
    { name: 'Breastfeeding', icon: <BabyBottle className="h-4 w-4 mr-2" /> },
    { name: 'Diversification', icon: <UtensilsCrossed className="h-4 w-4 mr-2" /> },
    { name: 'Shopping', icon: <ShoppingBag className="h-4 w-4 mr-2" /> },
    { name: 'Parenting', icon: <MessageCircle className="h-4 w-4 mr-2" /> }
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
      
      <main className="pt-20 md:pt-24 pb-12 md:pb-16">
        {/* Hero Section */}
        <section className="py-8 md:py-8 px-4 md:px-8 bg-[#B8CEC2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center md:text-left md:max-w-3xl mx-auto">
              <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
                  LeanOn <br /> <span className="font-adlery">&amp;</span> the Community
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
                        <Filter className="mr-2 h-4 w-4" /> Filter Questions
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[90vh] bg-[#B8CEC2] rounded-t-xl">
                      <div className="pt-6">
                        <h3 className="text-xl font-medium mb-4">Filter by Category</h3>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {categories.map((category) => (
                            <Button
                              key={category.name}
                              variant="outline"
                              size="sm"
                              className="rounded-full bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground border-[#FFD9A7]"
                            >
                              {category.icon}
                              {category.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="lg" 
                        className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                      >
                        <Filter className="mr-2 h-4 w-4" /> Filter Questions
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md sm:max-w-lg bg-[#B8CEC2] border-[#B8CEC2]/50">
                      <div className="pt-6">
                        <h3 className="text-xl font-medium mb-4">Filter by Category</h3>
                        <div className="flex flex-wrap gap-2 mb-8">
                          {categories.map((category) => (
                            <Button
                              key={category.name}
                              variant="outline"
                              size="sm"
                              className="rounded-full bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground border-[#FFD9A7]"
                            >
                              {category.icon}
                              {category.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <HowItWorksDialog buttonVariant="warm" />
              </div>
            </div>
          </div>
        </section>
        
        <div className="flex justify-center bg-[#B8CEC2]">
          <img 
            src="/lovable-uploads/f13b9daf-130a-4b25-971f-a1ae0385f800.png" 
            alt="Moms asking questions" 
            className="max-w-full md:max-w-lg h-auto mx-auto"
          />
        </div>
        
        {/* Search Section */}
        <section className="bg-[#B8CEC2]/20 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-500" />
              </div>
              <Input 
                type="search" 
                className="block w-full p-4 ps-10 bg-white/90 border border-[#B8CEC2]/30 rounded-lg"
                placeholder="Search questions from other moms..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground border-[#FFD9A7]"
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Questions Section */}
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-playfair">Ask Moms</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground">
                    Ask a Question
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <AskQuestionForm categories={categories} />
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="space-y-4">
              {/* Placeholder for question cards - you can replace this with your actual question components */}
              <div className="p-6 bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20">
                <h3 className="font-semibold mb-2">How do I handle toddler tantrums in public?</h3>
                <p className="text-sm text-muted-foreground mb-4">
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
              
              <div className="p-6 bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20">
                <h3 className="font-semibold mb-2">Best breastfeeding positions for newborns?</h3>
                <p className="text-sm text-muted-foreground mb-4">
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
              
              <div className="p-6 bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20">
                <h3 className="font-semibold mb-2">Recommendations for baby food introduction?</h3>
                <p className="text-sm text-muted-foreground mb-4">
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
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAsk;
