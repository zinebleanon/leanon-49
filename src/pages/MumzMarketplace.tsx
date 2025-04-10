
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import MarketplaceItemsGrid from '@/components/mumzmarketplace/MarketplaceItemsGrid';
import { Button } from '@/components/ui/button';
import { Search, Package } from 'lucide-react';
import MarketplaceHowItWorksDialog from '@/components/mumzmarketplace/MarketplaceHowItWorksDialog';

const MumzMarketplace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  const featuredItems = [
    {
      title: "Cybex Stroller (Like New)",
      seller: "Emma's Shop in Dubai Marina",
      price: "900 AED",
      condition: "Barely Used",
      image: "walker"
    },
    {
      title: "Plan Toys Wooden Set",
      seller: "Natural Kids Al Ain",
      price: "149 AED",
      condition: "New",
      image: "toys"
    },
    {
      title: "Baby Clothes Bundle (0-3m)",
      seller: "Second Life Sharjah",
      price: "120 AED",
      condition: "Good",
      image: "clothes"
    },
    {
      title: "Avent Baby Bottles (Set of 4)",
      seller: "Mom's Corner Abu Dhabi",
      price: "85 AED",
      condition: "Like New",
      image: "walker"
    }
  ];
  
  const textStyles = "transition-all duration-700 ease-smooth";
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-6 md:pb-10">
        <section className="py-3 md:py-8 px-4 md:px-8 bg-[#B8CEC2]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center md:text-left md:max-w-3xl mx-auto">
              <h1 className={`text-3xl md:text-5xl font-bold mb-8 md:mb-10 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
                  Preloved
                  <br />
                  from Moms to Moms
                </span>
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-6">
                <Button 
                  size="lg" 
                  className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                  asChild
                >
                  <Link to="/marketplace/find">
                    <Search className="mr-2 h-5 w-5 flex-shrink-0 my-auto" /> 
                    <span className="my-auto">Find a Preloved Item</span>
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
                  asChild
                >
                  <Link to="/marketplace/sell">
                    <Package className="mr-2 h-5 w-5 flex-shrink-0 my-auto" />
                    <span className="my-auto">List your Preloved Item</span>
                  </Link>
                </Button>

                <MarketplaceHowItWorksDialog />
              </div>
            </div>
          </div>
        </section>
        
        {/* Centered image section */}
        <div className="flex justify-center items-center bg-[#B8CEC2] px-4 md:px-8 py-0">
          <img 
            src="/lovable-uploads/15bbcc24-f4f2-41b8-85db-23c7baa535b3.png" 
            alt="Baby nursery with toys and furniture" 
            className="w-full max-w-3xl h-auto mx-auto object-contain"
          />
        </div>
        
        <section className="py-3 px-4 mt-12 bg-[#B8CEC2]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 font-playfair">Featured Items</h2>
            <MarketplaceItemsGrid items={featuredItems} />
          </div>
        </section>
      </main>
      
      <Footer />
      
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
      />
    </div>
  );
};

export default MumzMarketplace;
