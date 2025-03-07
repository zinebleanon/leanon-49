
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingBag,
  Tag,
  DollarSign,
  Package,
  Star
} from 'lucide-react';

const MumzWorld = () => {
  const [isLoading, setIsLoading] = useState(true);
  
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
  
  const categories = [
    "Baby Clothes", "Toys", "Strollers", "Car Seats", "Feeding", 
    "Books", "Home", "Maternity", "Furniture", "Electronics"
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
                  Welcome to <span className="text-gradient">Mumz World</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Buy and sell gently used baby and children's items. Give items a second life
                  and find great deals for your growing family.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Shop Items
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full">
                    <Tag className="mr-2 h-4 w-4" />
                    Sell Items
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-orange-300/20 to-orange-200/5 p-1">
                  <div className="h-full w-full rounded-3xl bg-white/90 backdrop-blur-sm flex items-center justify-center p-8">
                    <ShoppingBag className="h-32 w-32 text-orange-400/70" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-400/10 rounded-full blur-xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-400/5 rounded-full blur-xl"></div>
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
              {categories.map((category) => (
                <Button key={category} variant="outline" size="sm" className="rounded-full">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Items Section */}
        <section className="py-16 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold">Featured Items</h2>
              <Button variant="ghost" className="rounded-full">View All</Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {featuredItems.map((item, index) => (
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
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzWorld;
