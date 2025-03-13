
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SellItemForm from '@/components/mumzmarketplace/SellItemForm';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MumzMarketplaceSell = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" asChild className="mb-4">
              <Link to="/marketplace">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2 font-playfair">
              <span className="text-orange-500">Sell</span> <span className="text-black">on Mumz World Marketplace</span>
            </h1>
            <p className="text-muted-foreground mb-8">
              List your gently used children's items for sale and connect with UAE moms looking for quality items.
            </p>
          </div>
          
          <SellItemForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzMarketplaceSell;
