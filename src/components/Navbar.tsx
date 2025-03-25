import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle, Tag, ShoppingBag, Home, Inbox, Bell, Lock, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import JoinCommunityModal from './JoinCommunityModal';
import { useIsMobile } from '@/hooks/use-mobile';
import BowIcon from './ui/BowIcon';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import HowItWorksModal from './mumzally/HowItWorksModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3); // Example unread count
  const location = useLocation();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [isPartOfCommunity, setIsPartOfCommunity] = useState(false);
  
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
    { name: 'Find', icon: <Users className="h-4 w-4" />, path: '/ally', requiresAccess: true },
    { name: 'Ask', icon: <HelpCircle className="h-4 w-4" />, path: '/ask', requiresAccess: true },
    { name: 'Deals', icon: <Tag className="h-4 w-4" />, path: '/brands' },
    { name: 'Preloved', icon: <ShoppingBag className="h-4 w-4" />, path: '/marketplace' },
  ];

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleInfoButtonClick = () => {
    toast({
      title: "About LeanOn Community",
      description: "Join our community to connect with other moms, ask questions, and get access to exclusive deals and resources.",
    });
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
  
  const handleRestrictedNavClick = (e: React.MouseEvent, requiresAccess: boolean) => {
    if (requiresAccess && !isPartOfCommunity) {
      e.preventDefault();
      toast({
        title: "Access Restricted",
        description: "This feature is only available to community members. Please join to access.",
        variant: "destructive"
      });
      setTimeout(() => {
        setIsJoinModalOpen(true);
      }, 500);
    }
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
          <div className="flex items-center h-12 md:h-14 bg-white/90 p-1 rounded-lg shadow-sm">
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
            onClick={(e) => handleRestrictedNavClick(e, true)}
          >
            <Inbox className="h-5 w-5" />
            {unreadCount > 0 && isPartOfCommunity && (
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
                  "text-sm font-medium flex items-center gap-2 px-3 py-2 transition-all duration-300 relative",
                  isPathActive(item.path)
                    ? "text-primary" 
                    : "text-foreground/70 hover:text-foreground",
                  item.requiresAccess && !isPartOfCommunity && "opacity-70"
                )}
                onClick={(e) => handleRestrictedNavClick(e, !!item.requiresAccess)}
              >
                <span className={cn(
                  "absolute inset-0 bg-primary/5 rounded-full scale-0 transition-transform duration-300",
                  isPathActive(item.path) && "scale-100"
                )}></span>
                <span className="relative flex items-center gap-2">
                  {item.icon}
                  {item.name}
                  {item.requiresAccess && !isPartOfCommunity && (
                    <Lock className="h-3 w-3 ml-1" />
                  )}
                </span>
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
              <BowIcon className="mr-2 h-4 w-4" fill="currentColor" />
              {isPartOfCommunity ? 'Account' : 'Join & '}
              {!isPartOfCommunity && <span className="font-adlery">LeanOn</span>}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-primary/20 text-primary hover:bg-primary/5"
              onClick={handleInfoButtonClick}
            >
              <Info className="mr-2 h-4 w-4" />
              What's in there?
            </Button>
            
            <HowItWorksModal className="ml-2" />
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
                    : "text-foreground/80 bg-white/70 backdrop-blur-sm hover:bg-white hover:shadow-sm",
                  item.requiresAccess && !isPartOfCommunity && "opacity-70"
                )}
                style={{
                  borderRadius: "1rem",
                  padding: "0.75rem 1.25rem",
                  animationDelay: `${index * 0.05}s`,
                  WebkitTapHighlightColor: 'transparent'
                }}
                onClick={(e) => {
                  handleRestrictedNavClick(e, !!item.requiresAccess);
                  if (!item.requiresAccess || isPartOfCommunity) {
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
                {item.requiresAccess && !isPartOfCommunity && (
                  <Lock className="h-3 w-3 ml-1" />
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
              className="w-full py-5 rounded-full animate-slide-up shadow-md hover:shadow-lg mb-3"
              style={{ 
                animationDelay: '0.2s',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={handleJoinButtonClick}
            >
              <BowIcon className="mr-2 h-4 w-4" fill="currentColor" />
              {isPartOfCommunity ? 'Account' : 'Join & '}
              {!isPartOfCommunity && <span className="font-adlery">LeanOn</span>}
            </Button>
            
            <Button
              variant="outline"
              className="w-full py-5 rounded-full animate-slide-up shadow-sm border-primary/20 text-primary hover:bg-primary/5 mb-3"
              style={{ 
                animationDelay: '0.25s',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={handleInfoButtonClick}
            >
              <Info className="mr-2 h-4 w-4" />
              What's in there?
            </Button>
            
            <HowItWorksModal 
              className="w-full"
              buttonVariant="outline"
            />
          </div>
        </nav>
      </div>

      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
        onSuccess={() => {
          setIsPartOfCommunity(true);
          toast({
            title: "Welcome to the community!",
            description: "You now have access to all features.",
          });
        }}
      />
    </header>
  );
};

export default Navbar;
