
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import MarketplaceItemsGrid from '@/components/mumzmarketplace/MarketplaceItemsGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Package } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MumzMarketplaceFind = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  const marketplaceCategories = [
    "Baby Clothes", "Toys", "Strollers", "Car Seats", "Feeding", 
    "Books", "Home", "Maternity", "Furniture", "Others"
  ];
  
  const popularBrands = [
    "Chicco", "Avent", "Graco", "Fisher-Price", "Pampers", 
    "Huggies", "Britax", "Medela", "Baby Einstein", "Munchkin"
  ];
  
  const allItems = [
    {
      title: "Cybex Stroller (Like New)",
      seller: "Emma's Shop in Dubai Marina",
      price: "900 AED",
      condition: "Barely Used",
      image: "walker",
      brand: "Cybex"
    },
    {
      title: "Plan Toys Wooden Set",
      seller: "Natural Kids Al Ain",
      price: "149 AED",
      condition: "New",
      image: "toys",
      brand: "Plan Toys"
    },
    {
      title: "Baby Clothes Bundle (0-3m)",
      seller: "Second Life Sharjah",
      price: "120 AED",
      condition: "Good",
      image: "clothes",
      brand: "Carter's"
    },
    {
      title: "Avent Baby Bottles (Set of 4)",
      seller: "Mom's Corner Abu Dhabi",
      price: "85 AED",
      condition: "Like New",
      image: "walker",
      brand: "Avent"
    },
    {
      title: "Graco Car Seat",
      seller: "Baby World Dubai",
      price: "350 AED",
      condition: "Good",
      image: "clothes",
      brand: "Graco"
    },
    {
      title: "Fisher-Price Play Gym",
      seller: "Kids Corner Sharjah",
      price: "120 AED",
      condition: "Like New",
      image: "toys",
      brand: "Fisher-Price"
    }
  ];
  
  // Filter items based on search query, category and brand
  const filteredItems = allItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      (item.title.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    const matchesBrand = selectedBrand === 'all' || 
      (item.brand?.toLowerCase() === selectedBrand.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesBrand;
  });
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]/30">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              size="sm"
              asChild
              className="flex items-center gap-2"
            >
              <Link to="/marketplace">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h1 className="text-2xl font-bold mb-6 font-playfair">Find an Item</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {marketplaceCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Brand</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {popularBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {filteredItems.length} items found
              </p>
              
              <Button 
                size="sm" 
                className="rounded-full border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
          
          <div>
            <MarketplaceItemsGrid items={filteredItems} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzMarketplaceFind;
