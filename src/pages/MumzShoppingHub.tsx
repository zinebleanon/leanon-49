
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import useViewportHeight from '@/hooks/use-viewport-height';

const MumzShoppingHub = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use viewport height hook to handle iOS Safari issues
  useViewportHeight();
  
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
      
      <main className="pt-20 pb-24 md:pb-16 px-4 safe-bottom"> {/* Added safe-bottom class */}
        <div className="max-w-7xl mx-auto">
          {shouldShowBackButton && (
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
          )}
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzShoppingHub;
