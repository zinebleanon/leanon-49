
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import BrandsHero from '@/components/mumzbrands/BrandsHero';
import useViewportHeight from '@/hooks/use-viewport-height';
import SupportLocalBrandsDialog from '@/components/mumzbrands/SupportLocalBrandsDialog';
import UnlockDiscountDialog from '@/components/mumzbrands/UnlockDiscountDialog';
import BrandDetailDialog from '@/components/mumzbrands/BrandDetailDialog';
import { useBrands, Brand } from '@/hooks/use-brands';

const MumzBrands = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLocalBrandsDialogOpen, setIsLocalBrandsDialogOpen] = useState(false);
  const [isDiscountDialogOpen, setIsDiscountDialogOpen] = useState(false);
  const [isBrandDetailDialogOpen, setIsBrandDetailDialogOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  
  const navigate = useNavigate();
  const { brands, isLoading } = useBrands();
  
  useViewportHeight();
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  const handleOpenBrandDetail = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsBrandDetailDialogOpen(true);
  };
  
  const handleOpenDiscountDialog = () => {
    setIsDiscountDialogOpen(true);
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-[#B8CEC2]">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-6 md:pb-10 overflow-visible">
        <BrandsHero 
          onOpenDialog={() => setIsLocalBrandsDialogOpen(true)} 
          onOpenDiscountDialog={handleOpenDiscountDialog}
        />
        
        <div className="flex justify-center items-center bg-[#B8CEC2] px-4 md:px-8 py-0 mt-[-90px]">
          <img 
            src="/lovable-uploads/db360cb5-1f27-448e-a198-570b6a599830.png" 
            alt="Discount tag ribbon" 
            className="w-full max-w-2xl h-auto mx-auto object-contain my-0"
            loading="eager"
          />
        </div>
        
        <SupportLocalBrandsDialog 
          isOpen={isLocalBrandsDialogOpen}
          onClose={() => setIsLocalBrandsDialogOpen(false)}
        />
        
        <UnlockDiscountDialog
          isOpen={isDiscountDialogOpen}
          onClose={() => setIsDiscountDialogOpen(false)}
          brands={brands}
          onBrandSelect={handleOpenBrandDetail}
        />
        
        <BrandDetailDialog
          brand={selectedBrand}
          isOpen={isBrandDetailDialogOpen}
          onClose={() => setIsBrandDetailDialogOpen(false)}
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

export default MumzBrands;
