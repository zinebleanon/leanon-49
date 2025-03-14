
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const PremiumSection = () => {
  return (
    <section className="py-16 px-6 md:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-2" variant="outline">Mumz Save Benefits</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Exclusive Benefits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-playfair">
            Enjoy these amazing features with Mumz Save - helping UAE moms find the best deals and offers for their families.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="p-8 border-2 border-primary/20 bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold font-playfair">Mumz Save Features</h3>
              <Badge variant="default" className="text-lg py-1 px-4 whitespace-nowrap">Free Access</Badge>
            </div>
            
            <ul className="space-y-4 mb-6 font-playfair">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Featured listings at the top of search results</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Priority placement in Mumz Marketplace</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Premium deals from top UAE brands</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Early access to special offers</span>
              </li>
            </ul>
          </Card>
          
          <div className="warm-card rounded-lg p-6">
            <div>
              <h4 className="text-lg font-medium mb-2 font-playfair">Join Our Community</h4>
              <p className="text-muted-foreground mb-4">
                Connect with other moms in the UAE and discover great savings opportunities for your family.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
