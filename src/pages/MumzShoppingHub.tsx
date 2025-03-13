
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
