
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToJoinSection from '@/components/HowToJoinSection';
import { useNavigate, Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import FeaturedDealsSection from '@/components/mumzsave/FeaturedDealsSection';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DealsHowItWorksDialog from '@/components/mumzdeals/DealsHowItWorksDialog';
import DealsHero from '@/components/mumzdeals/DealsHero';

const MumzDeals = () => {
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

  const handleGetDeal = () => {
    window.open('#', '_blank');
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
    <div className="min-h-screen bg-[#B8CEC2]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-4 pb-12 px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/save">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mumz Save
            </Link>
          </Button>
          
          <DealsHero />
        </div>
        
        <div className="flex justify-center items-center mt-8">
          <img 
            src="/lovable-uploads/db360cb5-1f27-448e-a198-570b6a599830.png" 
            alt="Discount tag ribbon" 
            className="w-full max-w-2xl h-auto mx-auto object-contain my-0"
            loading="eager"
          />
        </div>
        
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

export default MumzDeals;
