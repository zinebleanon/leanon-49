
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Sparkles, Shield, Zap, Clock, Eye } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Refined Design',
    description: 'Every element meticulously crafted to create a harmonious visual experience that feels intuitive.'
  },
  {
    icon: Shield,
    title: 'Exceptional Quality',
    description: 'Built with premium materials and rigorous attention to detail for a product that lasts.'
  },
  {
    icon: Zap,
    title: 'Powerful Performance',
    description: 'Advanced technology that delivers extraordinary results with remarkable efficiency.'
  },
  {
    icon: Clock,
    title: 'Timeless Appeal',
    description: 'A design philosophy that transcends trends, creating lasting value and satisfaction.'
  },
  {
    icon: Eye,
    title: 'Intuitive Experience',
    description: 'Thoughtfully designed interactions that feel natural and effortless from the first use.'
  }
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-24 px-6 md:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-semibold mb-4 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            Thoughtfully Refined Features
          </h2>
          <p 
            className={cn(
              "text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '100ms' }}
          >
            Every detail has been considered to elevate your experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "relative p-8 rounded-2xl border border-border/40 transition-all duration-500 group hover:shadow-sm",
                index === activeFeature ? "border-primary/20 bg-primary/[0.02]" : "",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <div className="absolute -z-10 inset-0 bg-gradient-to-b from-transparent to-primary/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/5 mb-6 transition-all duration-300 group-hover:scale-110">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
