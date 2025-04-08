
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HelpCircle, Tag, ShoppingBag, Home, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import HowItWorksDialog from './HowItWorksDialog';
import RibbonIcon from './ui/RibbonIcon';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  
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
  
  const handleJoinClick = () => {
    navigate('/sign-in');
  };
  
  const textStyles = "transition-all duration-700 ease-smooth";
  
  const features = [
    { 
      id: 'ally',
      title: 'Connect', 
      description: 'LeanOn Moms around you, with same age kids...',
      icon: <Users className="h-5 w-5 md:h-5 md:w-5" />,
      color: 'from-[#FFF8E7] to-[#FFF8E7]/80',
      path: '/ally'
    },
    { 
      id: 'ask',
      title: 'Ask', 
      description: '<span class="font-adlery">LeanOn</span> the community for experiences & recommendations.',
      icon: <HelpCircle className="h-5 w-5 md:h-6 md:w-6" />,
      color: 'from-[#FFF8E7] to-[#FFF8E7]/80',
      path: '/ask'
    },
    { 
      id: 'save',
      title: 'Deals', 
      description: '<span class="font-adlery">LeanOn</span> us to select brands & deals for you.',
      icon: <Tag className="h-5 w-5 md:h-6 md:w-6" />,
      color: 'from-[#FFF8E7] to-[#FFF8E7]/80',
      path: '/brands'
    },
    { 
      id: 'preloved',
      title: 'Preloved', 
      description: '<span class="font-adlery">LeanOn</span> Trusted Moms to buy second hand Items.',
      icon: <ShoppingBag className="h-5 w-5 md:h-6 md:w-6" />,
      color: 'from-[#FFF8E7] to-[#FFF8E7]/80',
      path: '/marketplace'
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
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4 font-playfair",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">Moms <span className="font-adlery">LeanOn</span> Moms</span>
          </h1>
          
          <p 
            className={cn(
              "text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-0 font-playfair",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            To Feel <span className="font-bold text-[#FFD9A7]">Less Alone</span>
          </p>
          
          <div 
            className={cn(
              "flex justify-center mt-1",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <img
              src="/lovable-uploads/f13b9daf-130a-4b25-971f-a1ae0385f800.png"
              alt="Moms supporting each other"
              className="w-[90%] md:w-[85%] lg:w-[80%] h-auto mx-auto"
            />
          </div>
          
          <div className={cn(
            "flex flex-col sm:flex-row justify-center gap-3 mb-8 md:mb-12",
            textStyles,
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: '400ms' }}>
            <Button 
              variant="ghost" 
              size="lg" 
              className="rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors"
              onClick={handleJoinClick}
            >
              <RibbonIcon className="mr-2 h-5 w-5" fill="currentColor" />
              Join & <span className="font-adlery">LeanOn</span>
            </Button>

            <HowItWorksDialog buttonVariant="ghost" className="" />
          </div>
        </div>
        
        <div className="pt-32 md:pt-48 lg:pt-64"></div>
        
        <div className="grid gap-4 md:grid-cols-4 md:gap-6">
          {features.map((feature) => (
            <Link 
              key={feature.id}
              to={feature.path}
              className={cn(
                "relative p-4 md:p-6 rounded-lg bg-gradient-to-br border shadow-sm",
                feature.color,
                "hover:shadow-md transition-all group border-[#FFF8E7]"
              )}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFD9A7] rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium font-playfair">{feature.title}</h3>
                </div>
                
                <p className="text-sm md:text-base text-muted-foreground" dangerouslySetInnerHTML={{ __html: feature.description }}></p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
