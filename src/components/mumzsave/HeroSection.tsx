
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Tag, ShoppingBag, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  handleBrowseDeals: () => void;
}

const HeroSection = ({ handleBrowseDeals }: HeroSectionProps) => {
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
          <div className="text-center p-4 bg-white/50 rounded-lg shadow-sm">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Find Them</h3>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-lg shadow-sm">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Ask Them</h3>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-lg shadow-sm">
            <Tag className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Moms Deals</h3>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-lg shadow-sm">
            <ShoppingBag className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Moms Preloved</h3>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            size="lg" 
            className="rounded-full bg-primary"
            asChild
          >
            <Link to="/select">
              <BookOpen className="mr-2 h-4 w-4" />
              Mumz Select
            </Link>
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full"
            asChild
          >
            <Link to="/marketplace">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Mumz Marketplace
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
