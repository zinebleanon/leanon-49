
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Bell, User, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import JoinCommunityModal from './JoinCommunityModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUserInfo } from '@/hooks/use-user-info';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const location = useLocation();
  const isMobile = useIsMobile();
  const { userInfo } = useUserInfo();
  
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Connect', path: '/ally' },
    { name: 'Ask', path: '/ask' },
    { name: 'Deals', path: '/brands' },
    { name: 'Preloved', path: '/marketplace' },
  ];

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
  };
  
  const isPathActive = (path: string) => {
    if (path === '/brands') {
      return location.pathname === path || 
             location.pathname === '/save' || 
             location.pathname.startsWith('/select/');
    }
    if (path === '/marketplace') {
      return location.pathname === path || 
             location.pathname.startsWith('/marketplace/');
    }
    return location.pathname === path;
  };
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 md:py-4 md:px-6',
        isScrolled ? 'bg-white shadow-sm' : 'bg-white'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-playfair font-medium tracking-tight animate-fade-in flex items-center"
        >
          <div className="flex items-center h-12 md:h-14 p-1 rounded-lg">
            <img 
              src="/lovable-uploads/e721b501-95df-45ef-b358-51c2c2fc8144.png" 
              alt="LeanOn Logo" 
              className="h-auto w-auto"
              style={{ 
                maxHeight: '100px',
                objectFit: 'contain'
              }}
              onLoad={(e) => console.log("Navbar logo loaded, dimensions:", 
                e.currentTarget.offsetWidth, "x", e.currentTarget.offsetHeight)}
              onError={(e) => console.error("Error loading navbar logo:", e)}
            />
          </div>
        </Link>
        
        <div className="flex items-center gap-3 md:gap-4">
          {userInfo ? (
            <>
              <Link
                to="/inbox"
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
                  isPathActive('/inbox')
                    ? "bg-primary/10 text-primary" 
                    : "bg-white shadow-sm hover:bg-primary/5 text-foreground/70 hover:text-foreground"
                )}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:bg-primary/5">
                    <User className="h-5 w-5 text-foreground/70" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link 
                        to={item.path}
                        className={cn(
                          "w-full cursor-pointer",
                          isPathActive(item.path) ? "bg-primary/10 text-primary" : ""
                        )}
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              variant="warm"
              size="sm"
              className="transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
              onClick={handleJoinButtonClick}
            >
              Join
            </Button>
          )}
        </div>
      </div>

      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
      />
    </header>
  );
};

export default Navbar;
