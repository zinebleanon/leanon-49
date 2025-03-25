
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SellItemForm from '@/components/mumzmarketplace/SellItemForm';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';

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
          <SellItemForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzMarketplaceSell;
