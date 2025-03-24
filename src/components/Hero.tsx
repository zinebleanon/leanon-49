
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Users, MessageCircle, Tag, ShoppingBag, BookOpen } from "lucide-react";

interface HeroProps {
  onJoinClick: () => void;
}

const Hero = ({ onJoinClick }: HeroProps) => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <span>LeanOn</span>{" "}
          <span className="text-gradient">Motherhood Together</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          The complete support ecosystem for moms in UAE
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <Link to="/ally" className="flex flex-col items-center p-4 rounded-lg hover:bg-white/20 transition-colors">
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <Users className="h-10 w-10 text-primary bg-[#FFD9A7] p-2 rounded-full" />
            </div>
            <h3 className="font-medium">Find Allies</h3>
          </Link>
          
          <Link to="/ask" className="flex flex-col items-center p-4 rounded-lg hover:bg-white/20 transition-colors">
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <MessageCircle className="h-10 w-10 text-primary bg-[#FFD9A7] p-2 rounded-full" />
            </div>
            <h3 className="font-medium">Ask Mumz</h3>
          </Link>
          
          <Link to="/save" className="flex flex-col items-center p-4 rounded-lg hover:bg-white/20 transition-colors">
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <Tag className="h-10 w-10 text-primary bg-[#FFD9A7] p-2 rounded-full" />
            </div>
            <h3 className="font-medium">Find Deals</h3>
          </Link>
          
          <Link to="/marketplace" className="flex flex-col items-center p-4 rounded-lg hover:bg-white/20 transition-colors">
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <ShoppingBag className="h-10 w-10 text-primary bg-[#FFD9A7] p-2 rounded-full" />
            </div>
            <h3 className="font-medium">Shop Preloved</h3>
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full"
            onClick={onJoinClick}
          >
            Join Our Community
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full"
            asChild
          >
            <a href="#features">
              Learn More
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
