
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bookmark, 
  Tag, 
  ShoppingBag, 
  Gift, 
  PercentCircle,
  Star,
  DollarSign,
  Package
} from 'lucide-react';

const MumzSave = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('deals'); // 'deals' or 'marketplace'
  
  useEffect(() => {
    // Simulate loading state for smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
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
      title: "30% Off Premium Stroller",
      brand: "BabyComfort",
      discount: "30%",
      originalPrice: "$299.99",
      salePrice: "$209.99",
      image: "stroller",
      isExclusive: true
    },
    {
      title: "Buy One Get One Free Baby Clothes",
      brand: "TinyThreads",
      discount: "50%",
      originalPrice: "$49.99",
      salePrice: "$24.99",
      image: "clothes",
      isExclusive: false
    },
    {
      title: "Baby Monitor Ultimate Bundle",
      brand: "SafeView",
      discount: "25%",
      originalPrice: "$189.99",
      salePrice: "$142.49",
      image: "monitor",
      isExclusive: true
    }
  ];
  
  const featuredItems = [
    {
      title: "Baby Walker (Like New)",
      seller: "Emma's Shop",
      price: "$45",
      condition: "Barely Used",
      image: "walker"
    },
    {
      title: "Wooden Toys Set",
      seller: "Natural Kids",
      price: "$29",
      condition: "New",
      image: "toys"
    },
    {
      title: "Baby Clothes Bundle (0-3m)",
      seller: "Second Life",
      price: "$35",
      condition: "Good",
      image: "clothes"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="text-gradient">Mumz Save</span> & Mumz World
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Discover exclusive deals on top brands for your family and connect with other moms to buy and sell items. 
                  Everything you need - from exclusive discounts to a thriving marketplace.
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
                <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-blue-500/20 to-blue-300/5 p-1">
                  <div className="h-full w-full rounded-3xl bg-white/90 backdrop-blur-sm flex items-center justify-center p-8">
                    {activeTab === 'deals' ? (
                      <PercentCircle className="h-32 w-32 text-blue-500/70" />
                    ) : (
                      <ShoppingBag className="h-32 w-32 text-orange-400/70" />
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-8 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">
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
        
        {/* Featured Content Section */}
        <section className="py-16 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold">
                {activeTab === 'deals' ? 'Featured Deals' : 'Featured Items'}
              </h2>
              <Button variant="ghost" className="rounded-full">View All</Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {activeTab === 'deals' ? (
                featuredDeals.map((deal, index) => (
                  <Card key={index} className="overflow-hidden bg-white/50 backdrop-blur-sm border-white/20 hover:shadow-md transition-all group">
                    <div className="aspect-video bg-blue-100/50 flex items-center justify-center">
                      <ShoppingBag className="h-16 w-16 text-blue-500/40" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">{deal.brand}</span>
                        {deal.isExclusive && (
                          <Badge variant="default" className="bg-blue-500">Exclusive</Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-medium mb-2">{deal.title}</h3>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200">
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
                  <Card key={index} className="overflow-hidden bg-white/50 backdrop-blur-sm border-white/20 hover:shadow-md transition-all group">
                    <div className="aspect-video bg-orange-100/50 flex items-center justify-center">
                      <Package className="h-16 w-16 text-orange-400/40" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">{item.seller}</span>
                        <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-200">
                          {item.condition}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-medium mb-2">{item.title}</h3>
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
        
        {/* Additional Section - Based on Active Tab */}
        {activeTab === 'deals' ? (
          <section className="py-16 px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-12">
                What Moms Are Saving
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6 bg-white/50 backdrop-blur-sm border-white/20">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6">
                      "I saved over $300 on baby essentials with the exclusive deals from Mumz Save. The quality of products is excellent and the savings are incredible!"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Jennifer L.</p>
                        <p className="text-sm text-muted-foreground">Saved $320 last month</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="py-16 px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-semibold text-center mb-12">
                How Mumz World Works
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-orange-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <Tag className="h-10 w-10 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-4">List Your Items</h3>
                  <p className="text-muted-foreground">
                    Take photos, set your price, and create listings for items your family no longer needs.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="h-10 w-10 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-4">Shop & Browse</h3>
                  <p className="text-muted-foreground">
                    Find gently used items at a fraction of retail price from other moms in your community.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="h-10 w-10 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-4">Save & Earn</h3>
                  <p className="text-muted-foreground">
                    Save money on things you need and earn money from things you don't need anymore.
                  </p>
                </div>
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
