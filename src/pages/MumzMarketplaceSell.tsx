
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SellItemForm from '@/components/mumzmarketplace/SellItemForm';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <Button 
              variant="outline" 
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <Link to="/marketplace">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Admin Approval Required</h3>
              <p className="text-yellow-700 text-sm mt-1">
                All listings require administrator approval before being published to the marketplace. 
                Your item will remain in "Pending Approval" status until reviewed.
              </p>
            </div>
          </div>
          <SellItemForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzMarketplaceSell;
