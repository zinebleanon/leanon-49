
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToJoinSection from '@/components/HowToJoinSection';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import HeroSection from '@/components/mumzsave/HeroSection';
import PremiumSection from '@/components/mumzsave/PremiumSection';
import CategorySection from '@/components/mumzsave/CategorySection';
import FeaturedDealsSection from '@/components/mumzsave/FeaturedDealsSection';
import TestimonialSection from '@/components/mumzsave/TestimonialSection';
import MarketplaceInfoSection from '@/components/mumzsave/MarketplaceInfoSection';

const MumzSave = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('deals');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubscribe = () => {
    toast({
      title: "Redirecting to Payment",
      description: "Setting up your premium subscription...",
    });
  };

  const handleGetDeal = () => {
    toast({
      title: "Subscription Required",
      description: "Redirecting to subscription payment...",
    });
    setTimeout(() => {
      navigate('/ally/subscribe');
    }, 1000);
  };

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
  };

  const handleBrowseDeals = () => {
    const dealsSection = document.querySelector('#featured-deals');
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab('deals');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  const dealCategories = [
    "Baby Gear", "Clothing", "Toys", "Feeding", "Diapers", 
    "Health", "Maternity", "Books", "Home", "Services"
  ];
  
  const marketplaceCategories = [
    "Baby Clothes", "Toys", "Strollers", "Car Seats", "Feeding", 
    "Books", "Home", "Maternity", "Furniture", "Electronics"
  ];
  
  const featuredDeals = [
    {
      title: "30% Off Babyzen YOYO Stroller",
      brand: "Mumzworld",
      discount: "30%",
      originalPrice: "2,499 AED",
      salePrice: "1,749 AED",
      image: "stroller",
      isExclusive: true
    },
    {
      title: "Buy One Get One Free Baby Clothes",
      brand: "Mothercare",
      discount: "50%",
      originalPrice: "199 AED",
      salePrice: "99 AED",
      image: "clothes",
      isExclusive: false
    },
    {
      title: "Nanit Pro Baby Monitor Bundle",
      brand: "FirstCry",
      discount: "25%",
      originalPrice: "999 AED",
      salePrice: "749 AED",
      image: "monitor",
      isExclusive: true
    }
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
        <HeroSection 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          handleBrowseDeals={handleBrowseDeals}
        />

        <PremiumSection handleSubscribe={handleSubscribe} />
        
        <CategorySection 
          activeTab={activeTab}
          dealCategories={dealCategories}
          marketplaceCategories={marketplaceCategories}
        />
        
        <FeaturedDealsSection 
          activeTab={activeTab}
          featuredDeals={featuredDeals}
          featuredItems={featuredItems}
          handleGetDeal={handleGetDeal}
        />
        
        {activeTab === 'deals' ? (
          <TestimonialSection />
        ) : (
          <MarketplaceInfoSection />
        )}
        
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

export default MumzSave;
