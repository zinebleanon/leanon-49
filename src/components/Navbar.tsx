
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle, Bookmark, Heart, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import JoinCommunityModal from './JoinCommunityModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);
  
  const navItems = [
    { name: 'Home', icon: <Home className="h-4 w-4" />, path: '/' },
    { name: 'Mumz Ally', icon: <Users className="h-4 w-4" />, path: '/ally' },
    { name: 'Mumz Ask', icon: <HelpCircle className="h-4 w-4" />, path: '/ask' },
    { name: 'Mumz Save', icon: <Bookmark className="h-4 w-4" />, path: '/save' },
  ];

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
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
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "text-sm font-medium flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300",
                location.pathname === item.path
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
            Join Us
          </Button>
        </div>
        
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col space-y-1">
            <span className={`block w-5 h-0.5 bg-current transform transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-0.5 bg-current transform transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 glass-dark pt-16 animate-fade-in">
          <nav className="h-full flex flex-col px-4">
            <div className="flex flex-col space-y-4 py-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-base font-medium py-2 flex items-center gap-3 animate-slide-up rounded-full px-4",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80"
                  )}
                  style={{
                    animationDelay: `${index * 0.05}s`
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
                style={{ animationDelay: '0.2s' }}
                onClick={handleJoinButtonClick}
              >
                Join Us
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* Join Community Modal */}
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
      />
    </header>
  );
};

export default Navbar;
