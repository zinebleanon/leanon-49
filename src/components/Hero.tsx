
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import RibbonIcon from '@/components/ui/RibbonIcon';

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate('/sign-up');
  };
  
  return (
    <div className="relative overflow-hidden bg-background pt-[120px] md:pt-[120px] px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[70vh]">
        <div className="flex flex-col space-y-6 text-center md:text-left">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            <span className="block mb-2 md:mb-4">Support System </span>
            <span className="text-primary">For Every Mom</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0">
            Connect with mothers in your neighborhood, share experiences, and access deals on everything your family needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <Button 
              size="lg" 
              className="warm-button group relative overflow-hidden rounded-full px-8 shadow-md hover:shadow-lg" 
              onClick={handleJoinClick}
            >
              <RibbonIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" color="currentColor" />
              <span>Join & LeanOn</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full border-primary/30 text-primary hover:bg-primary/5 px-8" 
              onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-full max-w-[500px] aspect-[4/3]">
            <img 
              src="/lovable-uploads/f13b9daf-130a-4b25-971f-a1ae0385f800.png"
              alt="Mom community" 
              className="object-cover w-full h-full rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg max-w-[240px]">
              <img 
                src="/lovable-uploads/35ba163a-0115-4ea5-a330-fd8f9a6d1ca6.png"
                alt="Connecting moms" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -z-10 top-0 left-0 right-0 h-[70%] bg-gradient-to-b from-secondary/10 to-transparent" />
    </div>
  );
};

export default Hero;
