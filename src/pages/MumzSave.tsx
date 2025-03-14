
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToJoinSection from '@/components/HowToJoinSection';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import HeroSection from '@/components/mumzsave/HeroSection';
import PremiumSection from '@/components/mumzsave/PremiumSection';
import CategorySection from '@/components/mumzsave/CategorySection';
import FeaturedDealsSection from '@/components/mumzsave/FeaturedDealsSection';
import TestimonialSection from '@/components/mumzsave/TestimonialSection';

const MumzSave = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGetDeal = () => {
    // Direct access to deals without subscription
    window.open('#', '_blank');
  };

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
  };

  const handleBrowseDeals = () => {
    const dealsSection = document.querySelector('#featured-deals');
    if (dealsSection) {
      dealsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  const dealCategories = [
    "Baby Gear", "Clothing", "Toys", "Feeding", "Diapers", 
    "Health", "Maternity", "Books", "Home", "Services"
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
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <HeroSection 
          handleBrowseDeals={handleBrowseDeals}
        />

        <PremiumSection />
        
        <CategorySection 
          activeTab="deals"
          dealCategories={dealCategories}
          marketplaceCategories={[]}
        />
        
        <FeaturedDealsSection 
          activeTab="deals"
          featuredDeals={featuredDeals}
          featuredItems={[]}
          handleGetDeal={handleGetDeal}
        />
        
        <TestimonialSection />
        
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
