
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle, Tag, ShoppingBag, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import JoinCommunityModal from './JoinCommunityModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  
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
    { name: 'Find', icon: <Users className="h-4 w-4" />, path: '/ally' },
    { name: 'Ask', icon: <HelpCircle className="h-4 w-4" />, path: '/ask' },
    { name: 'Deals', icon: <Tag className="h-4 w-4" />, path: '/save' },
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
    if (path === '/save') {
      return location.pathname === path || 
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
        isScrolled ? 'glass py-2 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-playfair font-medium tracking-tight animate-fade-in flex items-center gap-1 md:gap-2"
        >
          <img 
            src="/lovable-uploads/1d9135c7-232d-4e08-8e9c-1c4953d0b1db.png" 
            alt="LeanOn Logo" 
            className="h-10 md:h-12 w-auto"
          />
        </Link>
        
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300",
                isPathActive(item.path)
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/80 hover:text-foreground hover:bg-secondary"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          <Button
            variant="warm"
            className="transition-all duration-300 rounded-full"
            onClick={handleJoinButtonClick}
          >
            Join & LeanOn the Community
          </Button>
        </div>
        
        <button 
          className="md:hidden flex items-center justify-center z-50 h-10 w-10 rounded-full"
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
      
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 glass-dark pt-16 transition-all duration-300",
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
                  "text-base font-medium py-2 flex items-center gap-3 animate-slide-up rounded-full px-4",
                  isPathActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/80"
                )}
                style={{
                  animationDelay: `${index * 0.05}s`,
                  WebkitTapHighlightColor: 'transparent'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pb-8">
            <Button
              variant="warm"
              className="w-full py-5 rounded-full animate-slide-up"
              style={{ 
                animationDelay: '0.2s',
                WebkitTapHighlightColor: 'transparent'
              }}
              onClick={handleJoinButtonClick}
            >
              Join & LeanOn the Community
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
