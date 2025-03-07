
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

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
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-8 items-center z-10">
        <div className="max-w-2xl">
          <p 
            className={cn(
              "text-sm md:text-base font-medium mb-4 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 w-fit",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Introducing Nova
          </p>
          
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight md:leading-tight tracking-tight mb-6",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '100ms' }}
          >
            Simplicity is the <span className="text-gradient">ultimate sophistication</span>
          </h1>
          
          <p 
            className={cn(
              "text-lg md:text-xl text-muted-foreground mb-8 max-w-lg",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            Discover a new standard in design, where every detail has been meticulously refined to create an experience that feels intuitive and exceptional.
          </p>
          
          <div 
            className={cn(
              "flex flex-col sm:flex-row gap-4",
              textStyles,
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <Button size="lg" className="rounded-full px-8 py-6">
              Explore Products
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 py-6 group">
              Learn More
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        <div 
          className={cn(
            "relative",
            textStyles,
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="aspect-square max-w-md mx-auto relative">
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-secondary/80 to-secondary/20 shadow-xl animate-float overflow-hidden flex items-center justify-center">
              <div className="absolute inset-2 rounded-2xl bg-white/80 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                <div className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 shadow-inner"></div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
