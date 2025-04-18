
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Gift, Package, DollarSign } from 'lucide-react';

interface DealItem {
  title: string;
  brand: string;
  discount: string;
  originalPrice: string;
  salePrice: string;
  image: string;
  isExclusive: boolean;
}

interface MarketplaceItem {
  title: string;
  seller: string;
  price: string;
  condition: string;
  image: string;
}

interface FeaturedDealsSectionProps {
  activeTab: string;
  featuredDeals: DealItem[];
  featuredItems: MarketplaceItem[];
  handleGetDeal: () => void;
}

const FeaturedDealsSection = ({ 
  activeTab, 
  featuredDeals, 
  featuredItems, 
  handleGetDeal 
}: FeaturedDealsSectionProps) => {
  return (
    <section className="py-16 px-6 md:px-8 bg-accent/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 id="featured-deals" className="text-3xl font-semibold font-playfair">
            {activeTab === 'deals' ? 'Featured Deals' : 'Featured Items'}
          </h2>
          <Button variant="ghost" className="rounded-full">View All</Button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {activeTab === 'deals' ? (
            featuredDeals.map((deal, index) => (
              <Card key={index} className="overflow-hidden warm-card hover:shadow-md transition-all group">
                <div className="aspect-[4/3] bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-primary/40" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{deal.brand}</span>
                    {deal.isExclusive && (
                      <Badge variant="default" className="bg-primary">Exclusive</Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-medium mb-2 font-playfair">{deal.title}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center">
                      <span className="text-muted-foreground line-through text-sm mr-2">
                        {deal.originalPrice}
                      </span>
                      <span className="font-semibold">{deal.salePrice}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={handleGetDeal}
                  >
                    <Gift className="mr-2 h-4 w-4" />
                    Get Deal
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            featuredItems.map((item, index) => (
              <Card key={index} className="overflow-hidden warm-card hover:shadow-md transition-all group">
                <div className="aspect-[4/3] bg-primary/10 flex items-center justify-center">
                  <Package className="h-12 w-12 text-primary/40" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">{item.seller}</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      {item.condition}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-medium mb-2 font-playfair">{item.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold text-lg">{item.price}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <DollarSign className="mr-2 h-4 w-4" />
                    View Item
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedDealsSection;
