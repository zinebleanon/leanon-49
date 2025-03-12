
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Users, HelpCircle, Bookmark, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleParallax = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        const elements = sectionRef.current.querySelectorAll('[data-parallax]');
        
        elements.forEach(element => {
          const speed = Number(element.getAttribute('data-parallax')) || 0.1;
          if (element instanceof HTMLElement) {
            element.style.transform = `translateY(${scrollY * speed}px)`;
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);
  
  const textStyles = "transition-all duration-700 ease-smooth";
  
  const features = [
    { 
      id: 'ally',
      title: 'Mumz Ally', 
      description: 'Find your lifetime Allies in Motherhood.',
      icon: <Users className="h-5 w-5 md:h-6 md:w-6" />,
      color: 'from-orange-100 to-orange-50',
      path: '/ally'
    },
    { 
      id: 'ask',
      title: 'Mumz Ask', 
      description: 'Community of mumz supporting each other questions, doubt and needs genuinely without judgment.',
      icon: <HelpCircle className="h-5 w-5 md:h-6 md:w-6" />,
      color: 'from-amber-100 to-amber-50',
      path: '/ask'
    },
    { 
      id: 'save',
      title: 'Mumz Save', 
      description: 'Discover exclusive discount on your favorite brands. Items to sell and buy around Mumz World.',
      icon: <Bookmark className="h-5 w-5 md:h-6 md:w-6" />,
      color: 'from-yellow-100 to-yellow-50',
      path: '/save'
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="relative pt-28 pb-12 md:py-20 px-4 md:px-8 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 
            className={cn(
              "text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-playfair",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Motherhood together feels <span className="text-gradient">less alone</span>
          </h1>
          
          <p 
            className={cn(
              "text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            Mumz need Mumz. Join us.
          </p>
          
          <div className={cn(
            "flex flex-col sm:flex-row justify-center gap-3 mb-8 md:mb-12",
            textStyles,
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: '300ms' }}>
            <Button 
              variant="warm" 
              size="lg" 
              className="rounded-full px-6 w-full sm:w-auto"
              onClick={onJoinClick}
            >
              <Heart className="mr-2 h-4 w-4" fill="currentColor" /> Join Our Community
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full px-6 w-full sm:w-auto mt-3 sm:mt-0"
            >
              Learn More
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {features.map((feature) => (
            <Link 
              key={feature.id}
              to={feature.path}
              className={cn(
                "relative p-4 md:p-6 rounded-lg bg-gradient-to-br border shadow-sm",
                feature.color,
                "hover:shadow-md transition-all group"
              )}
            >
              <div className="flex flex-col h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  {feature.icon}
                </div>
                
                <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2 font-playfair">{feature.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{feature.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
