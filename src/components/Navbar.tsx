
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'Mumz Ally', icon: <Users className="h-4 w-4" />, path: '/ally' },
    { name: 'Mumz Ask', icon: <HelpCircle className="h-4 w-4" />, path: '/ask' },
    { name: 'Mumz Save', icon: <Bookmark className="h-4 w-4" />, path: '/save' },
  ];
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8',
        isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tight animate-fade-in"
        >
          MumzAllies
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2 animated-underline"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          <Button
            className={cn(
              "transition-all duration-300 rounded-full",
              isScrolled ? "bg-primary text-primary-foreground" : "bg-white/90 text-foreground hover:bg-white"
            )}
          >
            Join Us
          </Button>
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col space-y-1">
            <span className={`block w-6 h-0.5 bg-current transform transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-current transform transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 glass-dark pt-20 animate-fade-in">
          <nav className="h-full flex flex-col px-6">
            <div className="flex flex-col space-y-6 py-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-lg font-medium py-2 flex items-center gap-3 animate-slide-up"
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
            
            <div className="mt-auto pb-10">
              <Button
                className="w-full py-6 rounded-full animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                Join Us
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
