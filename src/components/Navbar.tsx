import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, HelpCircle, Tag, ShoppingBag, Mail, Bell, Menu, Users, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import JoinCommunityModal from './JoinCommunityModal';
import { useIsMobile } from '@/hooks/use-mobile';
import RibbonIcon from './ui/RibbonIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserInfo } from '@/hooks/use-user-info';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const [notificationCount, setNotificationCount] = useState(2);
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
    { name: 'Home', icon: <Home className="h-5 w-5" />, path: '/' },
    { 
      name: 'Connect', 
      icon: <Users className="h-5 w-5" />, 
      path: '/ally',
      description: 'LeanOn Moms around you, in the same neighborhood, with same age kids' 
    },
    { name: 'Ask', icon: <HelpCircle className="h-5 w-5" />, path: '/ask' },
    { name: 'Deals', icon: <Tag className="h-5 w-5" />, path: '/brands' },
    { name: 'Preloved', icon: <ShoppingBag className="h-5 w-5" />, path: '/marketplace' },
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

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
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
          <Link
            to="/inbox"
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
              isPathActive('/inbox')
                ? "bg-primary/10 text-primary" 
                : "bg-white shadow-sm hover:bg-primary/5 text-foreground/70 hover:text-foreground"
            )}
          >
            <Mail className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>
          
          <Link
            to="/notifications"
            className={cn(
              "relative flex items-center justify-center w-10 h-10 rounded-full transition-all",
              isPathActive('/notifications')
                ? "bg-primary/10 text-primary" 
                : "bg-white shadow-sm hover:bg-primary/5 text-foreground/70 hover:text-foreground"
            )}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                {notificationCount}
              </span>
            )}
          </Link>
          
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar>
                    <AvatarImage src={userInfo.profileImage} alt={userInfo.name || "User"} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getInitials(userInfo.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/connections">My Connections</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => {
                    localStorage.removeItem('userInfo');
                    window.location.href = '/';
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="warm"
              size="sm"
              className="transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
              onClick={handleJoinButtonClick}
            >
              <RibbonIcon className="mr-2 h-4 w-4" fill="currentColor" />
              Join
            </Button>
          )}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 md:relative md:bottom-auto md:mt-2 bg-white border-t border-gray-200 md:border-none shadow-lg md:shadow-none z-40">
        <div className="flex justify-around items-center max-w-xl mx-auto px-2 py-2 md:py-3 md:bg-white md:rounded-full md:shadow-sm">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-full transition-all duration-300 relative group",
                isPathActive(item.path)
                  ? "text-primary" 
                  : "text-foreground/70 hover:text-foreground"
              )}
              onClick={(e) => {
                if (!userInfo && item.path !== '/') {
                  e.preventDefault();
                  setIsJoinModalOpen(true);
                }
              }}
            >
              <span className={cn(
                "p-1.5 rounded-full", 
                isPathActive(item.path) ? "bg-primary/10" : ""
              )}>
                {item.icon}
              </span>
              <span className="text-xs font-medium">{item.name}</span>
              {item.description && (
                <div className="absolute left-1/2 -translate-x-1/2 top-0 -mt-14 bg-white rounded-md p-2 text-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
                  {item.description}
                </div>
              )}
            </Link>
          ))}
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
