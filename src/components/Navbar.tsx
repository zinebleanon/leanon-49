import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, HelpCircle, Tag, ShoppingBag, Inbox, Bell } from 'lucide-react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import JoinCommunityModal from './JoinCommunityModal';
import { useIsMobile } from '@/hooks/use-mobile';
import RibbonIcon from './ui/RibbonIcon';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { useUserInfo } from '@/hooks/use-user-info';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // Example unread count
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
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    { name: 'Home', icon: <Home className="h-4 w-4" />, path: '/' },
    { 
      name: 'Find', 
      icon: <RibbonIcon className="h-4 w-4" />, 
      path: '/ally',
      description: 'LeanOn Moms around you, with same age kids' 
    },
    { name: 'Ask', icon: <HelpCircle className="h-4 w-4" />, path: '/ask' },
    { name: 'Deals', icon: <Tag className="h-4 w-4" />, path: '/brands' },
    { name: 'Preloved', icon: <ShoppingBag className="h-4 w-4" />, path: '/marketplace' },
  ];

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
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
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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
          <Link
            to="/inbox"
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
              isPathActive('/inbox')
                ? "bg-primary/10 text-primary" 
                : "bg-white shadow-sm hover:bg-primary/5 text-foreground/70 hover:text-foreground"
            )}
          >
            <Inbox className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>
          
          <div className="hidden md:flex items-center space-x-4 bg-white rounded-full px-6 py-3 shadow-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium flex items-center gap-2 px-3 py-2 transition-all duration-300 relative group",
                  isPathActive(item.path)
                    ? "text-primary" 
                    : "text-foreground/70 hover:text-foreground"
                )}
                onClick={(e) => {
                  // Prevent navigation if user is not logged in and trying to access protected routes
                  if (!userInfo && item.path !== '/') {
                    e.preventDefault();
                    setIsJoinModalOpen(true);
                  }
                }}
              >
                <span className={cn(
                  "absolute inset-0 bg-primary/5 rounded-full scale-0 transition-transform duration-300",
                  isPathActive(item.path) && "scale-100"
                )}></span>
                <span className="relative flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </span>
                {item.description && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 bg-white rounded-md p-2 text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
                    {item.description}
                  </div>
                )}
                {isPathActive(item.path) && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                )}
              </Link>
            ))}
            
            <Button
              variant="warm"
              className="transition-all duration-300 rounded-full shadow-md hover:shadow-lg ml-2"
              onClick={handleJoinButtonClick}
            >
              <RibbonIcon className="mr-2 h-4 w-4" fill="currentColor" />
              Join & <span className="font-adlery">LeanOn</span>
            </Button>
          </div>
          
          <button 
            className="md:hidden flex items-center justify-center z-50 h-10 w-10 rounded-full bg-white shadow-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            role="button"
            tabIndex={0}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div className={cn("flex flex-col space-y-1 transition-all", isMobileMenuOpen ? "relative" : "")}>
              <span className={cn(
                "block w-5 h-0.5 bg-current transform transition-transform duration-300",
                isMobileMenuOpen ? "rotate-45 translate-y-1.5 absolute" : ""
              )}></span>
              <span className={cn(
                "block w-5 h-0.5 bg-current transition-opacity duration-300", 
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              )}></span>
              <span className={cn(
                "block w-5 h-0.5 bg-current transform transition-transform duration-300",
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5 absolute" : ""
              )}></span>
            </div>
          </button>
        </div>
      </div>
      
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 pt-16 transition-all duration-300 shadow-lg bg-pastel-green",
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto translate-y-0" 
            : "opacity-0 pointer-events-none translate-y-[-20px]"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="h-full flex flex-col px-4 overflow-auto -webkit-overflow-scrolling-touch">
          <div className="flex flex-col space-y-2 py-6">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-base font-medium py-3 flex items-center gap-3 animate-slide-up transition-all duration-300",
                  isPathActive(item.path)
                    ? "text-primary bg-white shadow-md"
                    : "text-foreground/80 bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-sm"
                )}
                style={{
                  borderRadius: "1rem",
                  padding: "0.75rem 1.25rem",
                  animationDelay: `${index * 0.05}s`,
                  WebkitTapHighlightColor: 'transparent'
                }}
                onClick={(e) => {
                  // Prevent navigation if user is not logged in and trying to access protected routes
                  if (!userInfo && item.path !== '/') {
                    e.preventDefault();
                    setIsJoinModalOpen(true);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                <span className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                  isPathActive(item.path) 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground/60"
                )}>
                  {item.icon}
                </span>
                {item.name}
                {item.description && (
                  <span className="ml-auto text-xs text-muted-foreground line-clamp-1 hidden sm:block">
                    {item.description}
                  </span>
                )}
                {isPathActive(item.path) && (
                  <span className="ml-auto bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-8 bg-pastel-yellow rounded-t-3xl py-6 px-4">
            <Button
              variant="warm"
              className="w-full py-5 rounded-full animate-slide-up shadow-md hover:shadow-lg"
              style={{ 
                animationDelay: '0.2s',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={handleJoinButtonClick}
            >
              <RibbonIcon className="mr-2 h-4 w-4" fill="currentColor" />
              Join & <span className="font-adlery">LeanOn</span>
            </Button>
          </div>
        </nav>
      </div>

      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
      />
    </header>
  );
};

export default Navbar;
