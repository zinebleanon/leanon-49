import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle, Bookmark, Heart, Home, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import JoinCommunityModal from './JoinCommunityModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
    { name: 'Mumz Ally', icon: <Heart className="h-4 w-4 text-[#ea384c]" fill="#ea384c" />, path: '/ally' },
    { name: 'Mumz Ask', icon: <HelpCircle className="h-4 w-4" />, path: '/ask' },
    { 
      name: 'Shopping Hub', 
      icon: <ShoppingBag className="h-4 w-4" />, 
      path: '/save',
      children: [
        { name: 'MumzSave', icon: <Bookmark className="h-4 w-4" />, path: '/save' },
        { name: 'Marketplace', icon: <ShoppingBag className="h-4 w-4" />, path: '/marketplace' }
      ]
    },
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
    if (path === '/save' || path === '/marketplace') {
      return location.pathname === path || location.pathname.startsWith(path + '/');
    }
    return location.pathname === path;
  };
  
  const isGroupActive = (item: any) => {
    if (item.children) {
      return item.children.some((child: any) => isPathActive(child.path));
    }
    return isPathActive(item.path);
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
          <Heart className="text-[#ea384c] h-5 w-5 md:h-6 md:w-6" fill="#ea384c" />
          <span>MumzAlly</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {navItems.map((item) => {
            if (item.children) {
              return (
                <NavigationMenu key={item.name}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger 
                        className={cn(
                          "text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300",
                          isGroupActive(item)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/80 hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        {item.icon}
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 w-[220px]">
                          {item.children.map((child: any) => (
                            <li key={child.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={child.path}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                    isPathActive(child.path) ? "bg-primary/10" : ""
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    {child.icon}
                                    <span className="text-sm font-medium">{child.name}</span>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              );
            }
            
            return (
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
            );
          })}
          
          <Button
            variant="warm"
            className="transition-all duration-300 rounded-full"
            onClick={handleJoinButtonClick}
          >
            Join Us
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
            {navItems.filter(item => !item.children).map((item, index) => (
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
            
            {navItems.filter(item => item.children).map((item, index) => (
              <div key={item.name} className="space-y-1">
                <div className="text-base font-medium py-2 flex items-center gap-3 px-4 text-muted-foreground">
                  {item.icon}
                  {item.name}
                </div>
                <div className="pl-6 space-y-1">
                  {item.children.map((child: any, childIndex: number) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      className={cn(
                        "text-base font-medium py-2 flex items-center gap-3 animate-slide-up rounded-full px-4",
                        isPathActive(child.path)
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/80"
                      )}
                      style={{
                        animationDelay: `${(index + childIndex) * 0.05 + 0.1}s`,
                        WebkitTapHighlightColor: 'transparent'
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {child.icon}
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
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
              Join Us
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
