
import { Card } from '@/components/ui/card';
import { Star, ShoppingBag } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12 font-playfair">
          What UAE Mumz Are Saving
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 warm-card">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 font-playfair">
              "I saved over 1,200 AED on baby essentials with the exclusive deals from Mumz Save. Found great offers at Babyshop in Mall of the Emirates!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="font-sans">
                <p className="font-medium">Fatima A.</p>
                <p className="text-sm text-muted-foreground">Saved 1,200 AED last month</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 warm-card">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 font-playfair">
              "The Mumzworld exclusive discounts helped me furnish my baby's nursery for half the price I expected to pay. Delivery across Dubai was fast too!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="font-sans">
                <p className="font-medium">Sarah M.</p>
                <p className="text-sm text-muted-foreground">Saved 3,500 AED on nursery</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 warm-card">
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-muted-foreground mb-6 font-playfair">
              "The premium membership paid for itself in one purchase! Found an exclusive deal on a Cybex car seat at FirstCry Abu Dhabi that saved me 800 AED."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="font-sans">
                <p className="font-medium">Layla K.</p>
                <p className="text-sm text-muted-foreground">Saved 800 AED on car seat</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
