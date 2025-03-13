
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToJoinSection from '@/components/HowToJoinSection';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import MarketplaceHero from '@/components/mumzmarketplace/MarketplaceHero';
import MarketplaceInfoSection from '@/components/mumzsave/MarketplaceInfoSection';
import CategorySection from '@/components/mumzsave/CategorySection';
import FeaturedDealsSection from '@/components/mumzsave/FeaturedDealsSection';

const MumzMarketplace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  const marketplaceCategories = [
    "Baby Clothes", "Toys", "Strollers", "Car Seats", "Feeding", 
    "Books", "Home", "Maternity", "Furniture", "Electronics"
  ];
  
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
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <MarketplaceHero />
        
        <CategorySection 
          activeTab="marketplace"
          dealCategories={[]}
          marketplaceCategories={marketplaceCategories}
        />
        
        <FeaturedDealsSection 
          activeTab="marketplace"
          featuredDeals={[]}
          featuredItems={featuredItems}
          handleGetDeal={() => {}}
        />
        
        <MarketplaceInfoSection />
        
        <HowToJoinSection onJoinClick={handleJoinButtonClick} />
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
