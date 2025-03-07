
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const products = [
  {
    id: 1,
    name: "Neo Speaker",
    category: "Audio",
    price: "$299",
    description: "An elegant audio system that delivers exceptional clarity with minimalist design."
  },
  {
    id: 2,
    name: "Aura Timepiece",
    category: "Accessories",
    price: "$199",
    description: "Refined timekeeping with sophisticated materials and precise movement."
  },
  {
    id: 3,
    name: "Eclipse Lamp",
    category: "Lighting",
    price: "$129",
    description: "Sculptural lighting that creates a perfect balance of ambient illumination."
  }
];

const ProductShowcase = () => {
  const [activeProduct, setActiveProduct] = useState(0);
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
  
  return (
    <section 
      id="products" 
      ref={sectionRef}
      className="py-24 px-6 md:px-8 bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h2 
              className={cn(
                "text-3xl md:text-4xl font-semibold mb-4 transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              Crafted Products
            </h2>
            <p 
              className={cn(
                "text-lg text-muted-foreground max-w-xl transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: '100ms' }}
            >
              Discover our collection of meticulously designed products
            </p>
          </div>
          
          <Button 
            variant="ghost" 
            className={cn(
              "mt-4 md:mt-0 group transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '200ms' }}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div 
            className={cn(
              "aspect-square rounded-3xl overflow-hidden relative transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2/3 h-2/3 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-primary/10 to-transparent shadow-inner" />
              </div>
            </div>
            
            <div className="absolute bottom-8 left-8">
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm mb-2">
                Featured
              </Badge>
            </div>
          </div>
          
          <div>
            <div className="space-y-8">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={cn(
                    "p-6 rounded-2xl transition-all duration-500 cursor-pointer",
                    index === activeProduct ? "bg-background shadow-sm" : "hover:bg-background/50",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )}
                  style={{ transitionDelay: `${index * 100 + 400}ms` }}
                  onClick={() => setActiveProduct(index)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Badge className="mb-2">{product.category}</Badge>
                      <h3 className="text-xl font-medium">{product.name}</h3>
                    </div>
                    <span className="text-lg font-medium">{product.price}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{product.description}</p>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group px-0"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
