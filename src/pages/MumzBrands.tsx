
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import BrandsHero from '@/components/mumzbrands/BrandsHero';
import BrandGrid from '@/components/mumzbrands/BrandGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MumzBrands = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'local' | 'international'>('all');
  
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
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/save">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mumz Save
            </Link>
          </Button>
        </div>
        
        <BrandsHero />
        
        <section className="py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-md shadow-sm">
                <Button
                  variant={activeCategory === 'all' ? 'default' : 'outline'}
                  className="rounded-l-md rounded-r-none"
                  onClick={() => setActiveCategory('all')}
                >
                  All Brands
                </Button>
                <Button
                  variant={activeCategory === 'local' ? 'default' : 'outline'}
                  className="rounded-none border-l-0 border-r-0"
                  onClick={() => setActiveCategory('local')}
                >
                  Local Brands
                </Button>
                <Button
                  variant={activeCategory === 'international' ? 'default' : 'outline'}
                  className="rounded-r-md rounded-l-none"
                  onClick={() => setActiveCategory('international')}
                >
                  International Brands
                </Button>
              </div>
            </div>
            
            <BrandGrid categoryFilter={activeCategory} />
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

export default MumzBrands;
