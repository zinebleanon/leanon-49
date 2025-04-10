
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SellItemForm from '@/components/mumzmarketplace/SellItemForm';
import ListedItemsSection from '@/components/mumzmarketplace/ListedItemsSection';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import { AlertCircle, ArrowLeft, PlusCircle, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MumzMarketplaceSell = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("new-listing");
  
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
    <div className="min-h-screen bg-[#B8CEC2]">
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
          
          <Tabs 
            defaultValue="new-listing" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-6">
              <TabsTrigger value="new-listing" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                New Listing
              </TabsTrigger>
              <TabsTrigger value="active-listings" className="flex items-center gap-2">
                <ListChecks className="h-4 w-4" />
                Active Listings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="new-listing">
              <SellItemForm />
            </TabsContent>
            
            <TabsContent value="active-listings">
              <ListedItemsSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzMarketplaceSell;
