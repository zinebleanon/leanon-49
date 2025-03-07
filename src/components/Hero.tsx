
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, HelpCircle, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
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
      description: 'Connect with other moms for support, advice, and friendship.',
      icon: <Users className="h-6 w-6" />,
      color: 'from-orange-400/20 to-orange-300/5',
      path: '/ally'
    },
    { 
      id: 'ask',
      title: 'Mumz Ask', 
      description: 'Get answers to your parenting questions from experienced moms and experts.',
      icon: <HelpCircle className="h-6 w-6" />,
      color: 'from-amber-400/20 to-amber-300/5',
      path: '/ask'
    },
    { 
      id: 'save',
      title: 'Mumz Save', 
      description: 'Discover exclusive deals and savings on products for you and your family.',
      icon: <Bookmark className="h-6 w-6" />,
      color: 'from-yellow-400/20 to-yellow-300/5',
      path: '/save'
    }
  ];
  
  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-20 px-6 md:px-8 overflow-hidden"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-transparent z-0" 
        data-parallax="0.15"
      ></div>
      
      <div 
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl z-0" 
        data-parallax="0.2"
      ></div>
      
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl z-0" 
        data-parallax="0.1"
      ></div>
      
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="text-center mb-16">
          <p 
            className={cn(
              "text-sm md:text-base font-medium mb-4 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mx-auto w-fit",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Welcome to MumzAllies
          </p>
          
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-tight tracking-tight mb-6",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '100ms' }}
          >
            Motherhood together feels <span className="text-gradient">less alone</span>
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            Mumz need Mumz. Join us.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className={cn(
                "relative p-6 md:p-8 rounded-2xl bg-gradient-to-br",
                feature.color,
                "border border-white/10 shadow-lg hover:shadow-xl transition-all group",
                textStyles,
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex flex-col h-full">
                <div className="bg-white/10 rounded-full p-3 w-fit mb-4">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                
                <p className="text-muted-foreground mb-6">{feature.description}</p>
                
                <Link 
                  to={feature.path}
                  className="mt-auto group inline-flex items-center text-primary font-medium"
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
