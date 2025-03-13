
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, CreditCard } from 'lucide-react';

interface PremiumSectionProps {
  handleSubscribe: () => void;
}

const PremiumSection = ({ handleSubscribe }: PremiumSectionProps) => {
  return (
    <section className="py-16 px-6 md:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-2" variant="outline">Premium Access</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Unlock Exclusive Benefits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-playfair">
            Subscribe to Mumz Save for just 20 AED per month and get featured listings, premium deals, and early access to the best offers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <Card className="p-8 border-2 border-primary/20 bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold font-playfair">Premium Membership</h3>
              <Badge variant="default" className="text-lg py-1 px-4 whitespace-nowrap">20 AED/month</Badge>
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
            
            <Button onClick={handleSubscribe} className="w-full warm-button" size="lg">
              <CreditCard className="mr-2 h-4 w-4" />
              Subscribe Now
            </Button>
          </Card>
          
          <div className="warm-card rounded-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 font-playfair">Get Started Today</h4>
                <Button onClick={handleSubscribe} className="warm-button">
                  Continue to Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
