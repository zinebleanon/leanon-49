
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToJoinSection from '@/components/HowToJoinSection';
import { useNavigate, Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DealsHowItWorksDialog from '@/components/mumzdeals/DealsHowItWorksDialog';
import GuideHerHero from '@/components/mumzdeals/DealsHero';
import UnlockDiscountDialog from '@/components/mumzbrands/UnlockDiscountDialog';
import { useBrands } from '@/hooks/use-brands';
import SelectHero from '@/components/mumzdeals/SelectHero';

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
  
  // Content categories based on the provided image
  const contentCategories = [
    "Health Care & Professional support",
    "Emotional, Mental & Physical wellbeing",
    "Parenting Guidance",
    "Childcare & Schooling",
    "Kids Entertainment"
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <div className="max-w-7xl mx-auto pt-8 pb-12 px-4 md:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/save">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mumz Save
            </Link>
          </Button>
          
          <GuideHerHero onOpenContentDialog={handleOpenContentDialog} />
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-1">
              <CategorySection 
                activeTab="content"
                contentCategories={contentCategories}
              />
            </div>
            
            <div className="md:col-span-2">
              <SelectHero />
              
              <div className="mt-8 bg-card rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-semibold mb-6 font-playfair">Featured Expert Content</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white/70">
                      <div className="h-48 bg-accent/20 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary/60" />
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-orange-500 font-medium">Parenting Guidance • 2-3 Years</span>
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
            </div>
          </div>
          
          <HowToJoinSection onJoinClick={handleJoinButtonClick} className="mt-12" />
        </div>
        
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
