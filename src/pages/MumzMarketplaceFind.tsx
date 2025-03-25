
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import MarketplaceItemsGrid from '@/components/mumzmarketplace/MarketplaceItemsGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, Package, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";
import {
  Switch
} from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group";

const MumzMarketplaceFind = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [superMomOnly, setSuperMomOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
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
  
  // Define subcategories for each main category
  const subCategories = {
    "Baby Clothes": ["Newborn (0-3m)", "Infant (3-12m)", "Toddler (1-3y)", "Kids (3-8y)"],
    "Toys": ["Educational", "Outdoor", "Plush", "Building", "Puzzles"],
    "Strollers": ["Travel Systems", "Joggers", "Double Strollers", "Lightweight"],
    "Car Seats": ["Infant", "Convertible", "Booster", "All-in-One"],
    "Feeding": ["Bottles", "High Chairs", "Breast Pumps", "Baby Food Makers", "Utensils"],
    "Books": ["Board Books", "Picture Books", "Educational", "Activity Books"],
    "Home": ["Nursery Decor", "Bedding", "Bath", "Safety", "Air Purifiers"],
    "Maternity": ["Clothing", "Nursing", "Pregnancy Care", "Postpartum"],
    "Furniture": ["Cribs", "Bassinets", "Changing Tables", "Gliders", "Storage"],
    "Others": ["Diapering", "Health & Safety", "Carriers", "Travel Accessories"]
  };
  
  // Get the appropriate subcategories based on selected main category
  const getSubCategories = () => {
    if (selectedCategory === 'all') {
      return [];
    }
    return subCategories[selectedCategory] || [];
  };
  
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
      brand: "Cybex",
      priceValue: 900,
      superMom: true
    },
    {
      title: "Plan Toys Wooden Set",
      seller: "Natural Kids Al Ain",
      price: "149 AED",
      condition: "New",
      image: "toys",
      brand: "Plan Toys",
      priceValue: 149,
      superMom: false
    },
    {
      title: "Baby Clothes Bundle (0-3m)",
      seller: "Second Life Sharjah",
      price: "120 AED",
      condition: "Good",
      image: "clothes",
      brand: "Carter's",
      priceValue: 120,
      superMom: true
    },
    {
      title: "Avent Baby Bottles (Set of 4)",
      seller: "Mom's Corner Abu Dhabi",
      price: "85 AED",
      condition: "Like New",
      image: "walker",
      brand: "Avent",
      priceValue: 85,
      superMom: false
    },
    {
      title: "Graco Car Seat",
      seller: "Baby World Dubai",
      price: "350 AED",
      condition: "Good",
      image: "clothes",
      brand: "Graco",
      priceValue: 350,
      superMom: true
    },
    {
      title: "Fisher-Price Play Gym",
      seller: "Kids Corner Sharjah",
      price: "120 AED",
      condition: "Like New",
      image: "toys",
      brand: "Fisher-Price",
      priceValue: 120,
      superMom: false
    }
  ];
  
  // Filter items based on search query, category, subcategory, brand, price range and superMom
  const filteredItems = allItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      (item.title.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    const matchesSubCategory = selectedSubCategory === 'all' || 
      (item.title.toLowerCase().includes(selectedSubCategory.toLowerCase()));
    
    const matchesBrand = selectedBrand === 'all' || 
      (item.brand?.toLowerCase() === selectedBrand.toLowerCase());
    
    const matchesPrice = item.priceValue >= priceRange[0] && item.priceValue <= priceRange[1];
    
    const matchesSuperMom = !superMomOnly || item.superMom;
    
    return matchesSearch && matchesCategory && matchesSubCategory && matchesBrand && matchesPrice && matchesSuperMom;
  });
  
  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedSubCategory !== 'all') count++;
    if (selectedBrand !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (superMomOnly) count++;
    if (searchQuery) count++;
    return count;
  };
  
  const activeFiltersCount = getActiveFiltersCount();
  
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 1000]);
    setSuperMomOnly(false);
  };
  
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
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold font-playfair">Find an Item</h1>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 md:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 text-xs bg-primary text-white rounded-full w-5 h-5 inline-flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
                
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleResetFilters}
                    className="flex items-center gap-1"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
            
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
              
              <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select value={selectedCategory} onValueChange={(value) => {
                  setSelectedCategory(value);
                  setSelectedSubCategory('all'); // Reset subcategory when category changes
                }}>
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
              
              <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
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
            
            {/* Advanced filters - shown when filters are expanded on mobile or always visible on desktop */}
            <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4 border-t pt-4 mt-4`}>
              
              {/* Sub-category filter - only shown when a main category is selected */}
              {selectedCategory !== 'all' && getSubCategories().length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Sub-Category</label>
                  <Select value={selectedSubCategory} onValueChange={setSelectedSubCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sub-Categories</SelectItem>
                      {getSubCategories().map((subCategory) => (
                        <SelectItem key={subCategory} value={subCategory}>{subCategory}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              {/* Price range slider */}
              <div>
                <div className="flex justify-between">
                  <label className="block text-sm font-medium mb-2">Price Range (AED)</label>
                  <span className="text-sm font-medium">{priceRange[0]} - {priceRange[1]} AED</span>
                </div>
                <Slider
                  value={priceRange}
                  min={0}
                  max={1000}
                  step={50}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
              </div>
              
              {/* SuperMom switch */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">SuperMom sellers only</label>
                <Switch
                  checked={superMomOnly}
                  onCheckedChange={setSuperMomOnly}
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-muted-foreground">
                {filteredItems.length} items found
              </p>
              
              <ToggleGroup type="single" variant="outline">
                <Button 
                  size="sm" 
                  className="rounded-full border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground"
                  onClick={handleResetFilters}
                >
                  Clear Filters
                </Button>
              </ToggleGroup>
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
