
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToJoinSection from '@/components/HowToJoinSection';
import { useNavigate, Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DealsHowItWorksDialog from '@/components/mumzdeals/DealsHowItWorksDialog';
import DealsHero from '@/components/mumzdeals/DealsHero';
import UnlockDiscountDialog from '@/components/mumzbrands/UnlockDiscountDialog';
import { useBrands } from '@/hooks/use-brands';

const MumzDeals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { brands, isLoading: brandsLoading } = useBrands();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
  };

  const handleOpenDiscountDialog = () => {
    setIsDiscountDialogOpen(true);
  };

  if (isLoading || brandsLoading) {
    return <LoadingSpinner />;
  }
  
  const dealCategories = [
    "Baby Gear", "Clothing", "Toys", "Feeding", "Diapers", 
    "Health", "Maternity", "Books", "Home", "Services"
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
          
          <DealsHero onOpenDiscountDialog={handleOpenDiscountDialog} />
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
        
        <HowToJoinSection onJoinClick={handleJoinButtonClick} />
        
        {/* Browse Discounts Dialog */}
        <UnlockDiscountDialog
          isOpen={isDiscountDialogOpen}
          onClose={() => setIsDiscountDialogOpen(false)}
          brands={brands}
          onBrandSelect={(brand) => console.log('Selected brand:', brand)}
        />
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
