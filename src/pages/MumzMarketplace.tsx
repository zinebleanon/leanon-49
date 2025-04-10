import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import MarketplaceItemsGrid from '@/components/mumzmarketplace/MarketplaceItemsGrid';
import { Button } from '@/components/ui/button';
import { Search, Package, Filter } from 'lucide-react';
import MarketplaceHowItWorksDialog from '@/components/mumzmarketplace/MarketplaceHowItWorksDialog';
import MarketplaceFilterDialog from '@/components/mumzmarketplace/MarketplaceFilterDialog';
import { filterMarketplaceItems } from '@/components/mumzmarketplace/MarketplaceFilterUtils';
import { allMarketplaceItems } from '@/components/mumzmarketplace/MarketplaceDataProvider';

const approvedListings = [
  {
    title: "Cybex Stroller (Like New)",
    seller: "Emma's Shop in Dubai Marina",
    price: "900 AED",
    condition: "Barely Used",
    image: "walker",
    brand: "Cybex",
    category: "Strollers",
    ageGroup: "0-3 years",
    size: "One Size",
    status: "available",
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
    category: "Toys",
    ageGroup: "1-2 years",
    size: "One Size",
    status: "available",
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
    category: "Baby Clothes",
    ageGroup: "0-3 months",
    size: "0-3M",
    status: "available",
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
    category: "Feeding",
    ageGroup: "0-12 months",
    size: "One Size",
    status: "available",
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
    category: "Car Seats",
    ageGroup: "0-12 months",
    size: "One Size",
    status: "reserved",
    priceValue: 350,
    superMom: true
  },
  {
    title: "Wooden Baby Gym",
    seller: "Eco Mom Dubai",
    price: "Free",
    condition: "Good",
    image: "toys",
    brand: "Handmade",
    category: "Toys",
    ageGroup: "0-6 months",
    size: "One Size",
    status: "available",
    priceValue: 0,
    superMom: false
  },
  {
    title: "Baby Walker",
    seller: "Quality Kids Abu Dhabi",
    price: "Contact Seller",
    condition: "Like New",
    image: "walker",
    brand: "Chicco",
    category: "Baby Gear",
    ageGroup: "6-18 months",
    size: "One Size",
    status: "available",
    priceValue: null,
    superMom: true
  },
  {
    title: "Maternity Clothes Bundle (Size M)",
    seller: "Maternity Closet Dubai",
    price: "200 AED",
    condition: "Like New",
    image: "clothes",
    brand: "Mixed",
    category: "Maternity",
    ageGroup: "Adult",
    size: "M",
    status: "available",
    priceValue: 200,
    superMom: false
  }
];

const MumzMarketplace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter items based on search query and other filters
    const filtered = filterMarketplaceItems(approvedListings, {
      searchQuery,
      selectedCategory,
      selectedSubCategory: 'all',
      selectedBrand,
      selectedAgeGroup,
      selectedSize,
      selectedCondition,
      priceRange,
      superMomOnly: false
    });
    setFilteredItems(filtered);
  }, [searchQuery, selectedCategory, selectedBrand, selectedAgeGroup, selectedSize, selectedCondition, priceRange]);

  const handleFiltersChange = (filters: any) => {
    setSelectedCategory(filters.category || 'all');
    setSelectedBrand(filters.brand || 'all');
    setSelectedCondition(filters.condition || 'all');
    setSelectedAgeGroup(filters.ageGroup || 'all');
    setSelectedSize(filters.size || 'all');
    setPriceRange(filters.priceRange || [0, 1000]);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  const textStyles = "transition-all duration-700 ease-smooth";
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-4 pb-12 px-4">
        <div className="text-center md:text-left">
          <h1 className={`text-3xl md:text-5xl font-bold mb-4 md:mb-6 font-playfair ${textStyles} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#403E43] to-[#222222]">
              Preloved from Moms to Moms
            </span>
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-4">
            <MarketplaceHowItWorksDialog />
            
            <Button 
              size="lg" 
              className="rounded-full px-6 border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground active:opacity-95 transition-all"
              asChild
            >
              <Link to="/marketplace/sell">
                <Package className="mr-2 h-5 w-5 flex-shrink-0 my-auto" />
                <span className="my-auto">List your Preloved Item</span>
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 font-playfair">Available Listings</h2>
          
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setIsFilterDialogOpen(true)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            
            <MarketplaceFilterDialog 
              open={isFilterDialogOpen} 
              onOpenChange={setIsFilterDialogOpen}
              onFiltersChange={handleFiltersChange}
              initialFilters={{
                category: selectedCategory,
                brand: selectedBrand,
                condition: selectedCondition,
                ageGroup: selectedAgeGroup,
                size: selectedSize,
                priceRange: priceRange
              }}
            />
          </div>
          
          <MarketplaceItemsGrid items={filteredItems.length > 0 ? filteredItems : approvedListings} />
        </div>
      </main>
      
      <Footer />
      
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
      />
    </div>
  );
};

export default MumzMarketplace;
