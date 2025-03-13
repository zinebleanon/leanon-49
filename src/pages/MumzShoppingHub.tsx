
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bookmark, ShoppingBag } from 'lucide-react';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';

const MumzShoppingHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine which tab is active based on the current route
  const activeTab = location.pathname === '/save' 
    ? 'save' 
    : location.pathname === '/marketplace' || location.pathname.startsWith('/marketplace/') 
      ? 'marketplace' 
      : 'save';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle tab changes
  const handleTabChange = (value: string) => {
    if (value === 'save') {
      navigate('/save');
    } else {
      navigate('/marketplace');
    }
  };
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 font-playfair">
              <span className="text-orange-500">Mumz Save</span>
            </h1>
            <p className="text-muted-foreground mb-6">
              Find amazing discounts and buy/sell children's items all in one place.
            </p>
            
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full max-w-md grid grid-cols-2 mb-6">
                <TabsTrigger value="save" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Discounts</span>
                </TabsTrigger>
                <TabsTrigger value="marketplace" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  <span>Marketplace</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="mb-8">
                {activeTab === 'save' && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <h3 className="text-lg font-medium mb-2 text-orange-700">About Discounts</h3>
                    <p className="text-muted-foreground">
                      Access exclusive discounts on top baby and children's brands across the UAE. 
                      Premium members enjoy early access to deals and additional savings. 
                      Browse by category or featured deals to find what you need at the best prices.
                    </p>
                  </div>
                )}
                
                {activeTab === 'marketplace' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-medium mb-2 text-blue-700">About Marketplace</h3>
                    <p className="text-muted-foreground">
                      Buy and sell gently used or new children's items directly from other parents in the UAE. 
                      Find high-quality items at great prices or sell items your children have outgrown. 
                      All transactions are secure and handled through our trusted platform.
                    </p>
                  </div>
                )}
              </div>
            </Tabs>
          </div>
          
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzShoppingHub;
