
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Tag, Package, BookOpen, Store, Info, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import HowItWorksDialog from '@/components/HowItWorksDialog';

interface HeroSectionProps {
  handleBrowseDeals: () => void;
}

const HeroSection = ({ handleBrowseDeals }: HeroSectionProps) => {
  const navigate = useNavigate();
  
  const handleSignInClick = () => {
    navigate('/sign-in');
  };
  
  const handleSignUpClick = () => {
    navigate('/sign-up');
  };
  
  return (
    <section className="py-4 md:py-6 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            <span className="text-foreground">Find the best recommendations</span>{" "}
            <span className="text-primary">with Mumz Save</span>
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white/50 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-primary bg-[#FFD9A7] p-1 rounded-full" />
              <h3 className="font-medium">Find</h3>
            </div>
          </div>
          <div className="p-4 bg-white/50 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-8 w-8 text-primary bg-[#FFD9A7] p-1 rounded-full" />
              <h3 className="font-medium">Ask</h3>
            </div>
          </div>
          <div className="p-4 bg-white/50 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary bg-[#FFD9A7] p-1 rounded-full" />
              <h3 className="font-medium">Preloved</h3>
            </div>
          </div>
          <div className="p-4 bg-white/50 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <Store className="h-8 w-8 text-primary bg-[#FFD9A7] p-1 rounded-full" />
              <h3 className="font-medium">Brands</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <HowItWorksDialog className="flex-shrink-0" />
          <div className="flex gap-2">
            <Button 
              size="lg" 
              className="rounded-full bg-primary flex items-center"
              onClick={handleSignInClick}
            >
              <User className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="flex-1 text-center">Sign In</span>
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              className="rounded-full flex items-center"
              onClick={handleSignUpClick}
            >
              <User className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="flex-1 text-center">Sign Up</span>
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full flex items-center"
            asChild
          >
            <Link to="/marketplace">
              <Package className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="flex-1 text-center">Preloved Items</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
