
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
import { supabase } from '@/integrations/supabase/client';

const MumzMarketplace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [marketplaceItems, setMarketplaceItems] = useState<any[]>([]);
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
    
    // Empty marketplace items for now - will be populated from database in future
    setMarketplaceItems([]);
    setFilteredItems([]);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Filter items based on search query and other filters
    const filtered = filterMarketplaceItems(marketplaceItems, {
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
  }, [searchQuery, selectedCategory, selectedBrand, selectedAgeGroup, selectedSize, selectedCondition, priceRange, marketplaceItems]);

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
          
          {/* If no items, show empty state */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No listings found</h3>
              <p className="text-muted-foreground">
                There are no preloved items listed yet. Be the first to list your items!
              </p>
            </div>
          ) : (
            <MarketplaceItemsGrid items={filteredItems} />
          )}
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
