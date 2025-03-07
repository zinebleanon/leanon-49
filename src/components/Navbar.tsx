
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

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
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-8',
        isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="/" 
          className="text-2xl font-medium tracking-tight animate-fade-in"
        >
          Nova
        </a>
        
        <div className="hidden md:flex items-center space-x-8">
          {['Features', 'Products', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors animated-underline"
            >
              {item}
            </a>
          ))}
          
          <Button
            className={cn(
              "transition-all duration-300 rounded-full",
              isScrolled ? "bg-primary text-primary-foreground" : "bg-white/90 text-foreground hover:bg-white"
            )}
          >
            Get Started
          </Button>
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? 
            <X className="h-6 w-6 animate-fade-in" /> : 
            <Menu className="h-6 w-6 animate-fade-in" />
          }
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 glass-dark pt-20 animate-fade-in">
          <nav className="h-full flex flex-col px-6">
            <div className="flex flex-col space-y-6 py-8">
              {['Features', 'Products', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-lg font-medium py-2 animate-slide-up"
                  style={{
                    animationDelay: `${['Features', 'Products', 'About', 'Contact'].indexOf(item) * 0.05}s`
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
            
            <div className="mt-auto pb-10">
              <Button
                className="w-full py-6 rounded-full animate-slide-up"
                style={{ animationDelay: '0.2s' }}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
