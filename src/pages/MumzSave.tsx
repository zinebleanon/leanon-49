import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Bookmark, 
  Tag, 
  ShoppingBag, 
  Gift, 
  PercentCircle,
  Star,
  DollarSign,
  Package,
  Check,
  CreditCard
} from 'lucide-react';

const MumzSave = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('deals'); // 'deals' or 'marketplace'
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubscribe = () => {
    toast({
      title: "Redirecting to Payment",
      description: "Setting up your premium subscription...",
    });
  };
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  const dealCategories = [
    "Baby Gear", "Clothing", "Toys", "Feeding", "Diapers", 
    "Health", "Maternity", "Books", "Home", "Services"
  ];
  
  const marketplaceCategories = [
    "Baby Clothes", "Toys", "Strollers", "Car Seats", "Feeding", 
    "Books", "Home", "Maternity", "Furniture", "Electronics"
  ];
  
  const featuredDeals = [
    {
      title: "30% Off Babyzen YOYO Stroller",
      brand: "Mumzworld",
      discount: "30%",
      originalPrice: "2,499 AED",
      salePrice: "1,749 AED",
      image: "stroller",
      isExclusive: true
    },
    {
      title: "Buy One Get One Free Baby Clothes",
      brand: "Mothercare",
      discount: "50%",
      originalPrice: "199 AED",
      salePrice: "99 AED",
      image: "clothes",
      isExclusive: false
    },
    {
      title: "Nanit Pro Baby Monitor Bundle",
      brand: "FirstCry",
      discount: "25%",
      originalPrice: "999 AED",
      salePrice: "749 AED",
      image: "monitor",
      isExclusive: true
    }
  ];
  
  const featuredItems = [
    {
      title: "Cybex Stroller (Like New)",
      seller: "Emma's Shop in Dubai Marina",
      price: "900 AED",
      condition: "Barely Used",
      image: "walker"
    },
    {
      title: "Plan Toys Wooden Set",
      seller: "Natural Kids Al Ain",
      price: "149 AED",
      condition: "New",
      image: "toys"
    },
    {
      title: "Baby Clothes Bundle (0-3m)",
      seller: "Second Life Sharjah",
      price: "120 AED",
      condition: "Good",
      image: "clothes"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <section className="py-12 md:py-20 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                  <span className="text-gradient">Mumz Save, Sell & Buy</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 font-playfair">
                  Discover exclusive deals on top UAE brands for your family and connect with other moms to declutter your home by selling unused children's items.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className={`rounded-full ${activeTab === 'deals' ? 'bg-primary' : 'bg-primary/70'}`}
                    onClick={() => setActiveTab('deals')}
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
              
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 p-1">
                  <div className="h-full w-full rounded-3xl bg-white/90 backdrop-blur-sm flex items-center justify-center p-8">
                    {activeTab === 'deals' ? (
                      <PercentCircle className="h-32 w-32 text-primary/70" />
                    ) : (
                      <ShoppingBag className="h-32 w-32 text-primary/70" />
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

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
              
              <div className="space-y-6">
                <div className="warm-card rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium font-playfair">Featured Listings</h4>
                      <p className="text-muted-foreground font-playfair">Get your items seen first with priority placement in search results</p>
                    </div>
                  </div>
                </div>
                
                <div className="warm-card rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Tag className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium font-playfair">Featured Listings</h4>
                      <p className="text-muted-foreground font-playfair">Get your items seen first in the UAE marketplace</p>
                    </div>
                  </div>
                </div>
                
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
          </div>
        </section>
        
        <section className="py-8 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 font-playfair">
              Browse by Category
            </h2>
            
            <div className="flex flex-wrap gap-3">
              {activeTab === 'deals' ? 
                dealCategories.map((category) => (
                  <Button key={category} variant="outline" size="sm" className="rounded-full">
                    {category}
                  </Button>
                )) : 
                marketplaceCategories.map((category) => (
                  <Button key={category} variant="outline" size="sm" className="rounded-full">
                    {category}
                  </Button>
                ))
              }
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 md:px-8 bg-accent/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold font-playfair">
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
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {deal.discount} OFF
                        </Badge>
                        <div className="flex items-center">
                          <span className="text-muted-foreground line-through text-sm mr-2">
                            {deal.originalPrice}
                          </span>
                          <span className="font-semibold">{deal.salePrice}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
        
        {activeTab === 'deals' ? (
          <section className="py-16 px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-12 font-playfair">
                What UAE Moms Are Saving
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
        ) : (
          <section className="py-12 px-6 md:px-8 bg-white/50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8 font-playfair text-center">
                How Mumz World UAE Marketplace Works
              </h2>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center px-2">
                  <div className="bg-primary/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <Tag className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base font-medium mb-1 font-playfair">List Items</h3>
                  <p className="text-xs text-muted-foreground font-playfair">
                    Post photos of unused kids gear across all emirates.
                  </p>
                </div>
                
                <div className="text-center px-2">
                  <div className="bg-primary/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base font-medium mb-1 font-playfair">Shop & Browse</h3>
                  <p className="text-xs text-muted-foreground font-playfair">
                    Find quality used items at fraction of retail prices.
                  </p>
                </div>
                
                <div className="text-center px-2">
                  <div className="bg-primary/10 rounded-full p-3 w-14 h-14 flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-base font-medium mb-1 font-playfair">Save & Declutter</h3>
                  <p className="text-xs text-muted-foreground font-playfair">
                    Save dirhams while decluttering your UAE home.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button size="sm" className="rounded-full">
                  <Package className="mr-2 h-4 w-4" />
                  Start Selling
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzSave;
