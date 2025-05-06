
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
import GuideHerHero from '@/components/mumzdeals/DealsHero';
import UnlockDiscountDialog from '@/components/mumzbrands/UnlockDiscountDialog';
import { useBrands } from '@/hooks/use-brands';

const MumzGuideHer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
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

  const handleOpenContentDialog = () => {
    setIsContentDialogOpen(true);
  };

  if (isLoading || brandsLoading) {
    return <LoadingSpinner />;
  }
  
  const contentCategories = [
    "Newborns", "Toddlers", "Preschoolers", "School-Age", "Tweens", 
    "Nutrition", "Health", "Education", "Development", "Self-Care"
  ];
  
  return (
    <div className="min-h-screen bg-[#EEE3DA]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-4 pb-12 px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/save">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mumz Save
            </Link>
          </Button>
          
          <GuideHerHero onOpenContentDialog={handleOpenContentDialog} />
        </div>
        
        <div className="flex justify-center items-center mt-8">
          <img 
            src="/lovable-uploads/35ba163a-0115-4ea5-a330-fd8f9a6d1ca6.png" 
            alt="Expert guidance for moms" 
            className="w-full max-w-2xl h-auto mx-auto object-contain rounded-lg shadow-md"
            loading="eager"
          />
        </div>
        
        <CategorySection 
          activeTab="content"
          dealCategories={[]}
          marketplaceCategories={[]}
          contentCategories={contentCategories}
        />
        
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 font-playfair">Featured Expert Content</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <div className="p-4">
                  <span className="text-xs text-orange-500 font-medium">Development • 2-3 Years</span>
                  <h3 className="text-lg font-medium my-2">Understanding Your Toddler's Emotional Development</h3>
                  <p className="text-sm text-muted-foreground mb-3">Expert tips to help navigate the emotional rollercoaster of toddlerhood with patience and understanding.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">By Dr. Sarah Johnson</span>
                    <Button variant="ghost" size="sm" className="text-primary">Read More</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <HowToJoinSection onJoinClick={handleJoinButtonClick} />
        
        {/* Content Dialog */}
        <UnlockDiscountDialog
          isOpen={isContentDialogOpen}
          onClose={() => setIsContentDialogOpen(false)}
          brands={brands}
          onBrandSelect={(brand) => console.log('Selected content:', brand)}
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

export default MumzGuideHer;
