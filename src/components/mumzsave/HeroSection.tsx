
import { Button } from '@/components/ui/button';
import { ShoppingBag, PercentCircle } from 'lucide-react';

interface HeroSectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleBrowseDeals: () => void;
}

const HeroSection = ({ activeTab, setActiveTab, handleBrowseDeals }: HeroSectionProps) => {
  return (
    <section className="py-12 md:py-20 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
              <span className="text-orange-500">Mumz</span> <span className="text-black">Save, Sell & Buy</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 font-playfair">
              Discover exclusive deals on top UAE brands for your family and connect with other moms to declutter your home by selling unused children's items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className={`rounded-full ${activeTab === 'deals' ? 'bg-primary' : 'bg-primary/70'}`}
                onClick={handleBrowseDeals}
              >
                <PercentCircle className="mr-2 h-4 w-4" />
                Browse Deals
              </Button>
              <Button 
                variant={activeTab === 'marketplace' ? 'default' : 'outline'} 
                size="lg" 
                className="rounded-full"
                onClick={() => setActiveTab('marketplace')}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Mumz World Marketplace
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
