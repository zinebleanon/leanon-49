
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Tag } from 'lucide-react';

const MumzShoppingHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // Only show back button on specific sub-routes, not on main sections
  const shouldShowBackButton = !location.pathname.match(/^\/(marketplace|save|brands|select)$/);
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]">
      <Navbar />
      
      <main className="pt-20 pb-24 md:pb-16 px-4"> {/* Adjusted padding for mobile bottom nav */}
        <div className="max-w-7xl mx-auto">
          {shouldShowBackButton ? (
            <div className="flex items-center gap-3 mb-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button 
                variant={location.pathname.includes('/marketplace') ? "default" : "outline"}
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link to="/marketplace">
                  <Package className="h-4 w-4 mr-2" />
                  <span>Preloved Items</span>
                </Link>
              </Button>
              
              <Button 
                variant={location.pathname.includes('/deals') ? "default" : "outline"}
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link to="/deals">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>Deals</span>
                </Link>
              </Button>
              
              <Button 
                variant={location.pathname.includes('/brands') ? "default" : "outline"}
                size="sm"
                asChild
                className="rounded-full"
              >
                <Link to="/brands">
                  <Tag className="h-4 w-4 mr-2" />
                  <span>Brands</span>
                </Link>
              </Button>
            </div>
          )}
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzShoppingHub;
