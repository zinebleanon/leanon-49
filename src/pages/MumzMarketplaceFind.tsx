
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import MarketplaceItemsGrid from '@/components/mumzmarketplace/MarketplaceItemsGrid';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FilterPanel from '@/components/mumzmarketplace/FilterPanel';
import { 
  marketplaceCategories, 
  popularBrands,
  ageGroups,
  sizes,
  conditions,
  subCategories,
  allMarketplaceItems
} from '@/components/mumzmarketplace/MarketplaceDataProvider';
import { 
  filterMarketplaceItems, 
  getActiveFiltersCount 
} from '@/components/mumzmarketplace/MarketplaceFilterUtils';

const MumzMarketplaceFind = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const DEFAULT_PRICE_RANGE = [0, 1000];
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [superMomOnly, setSuperMomOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getSubCategories = () => {
    if (selectedCategory === 'all') {
      return [];
    }
    return subCategories[selectedCategory] || [];
  };
  
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setSelectedBrand('all');
    setSelectedAgeGroup('all');
    setSelectedSize('all');
    setSelectedCondition('all');
    setPriceRange(DEFAULT_PRICE_RANGE);
    setSuperMomOnly(false);
  };
  
  // Get filtered items based on current filter settings
  const filteredItems = filterMarketplaceItems(allMarketplaceItems, {
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    selectedAgeGroup,
    selectedSize,
    selectedCondition,
    priceRange,
    superMomOnly
  });
  
  // Count active filters
  const activeFiltersCount = getActiveFiltersCount({
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    selectedAgeGroup,
    selectedSize,
    selectedCondition,
    priceRange,
    superMomOnly,
    defaultPriceRange: DEFAULT_PRICE_RANGE
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
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
          
          <FilterPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubCategory={selectedSubCategory}
            setSelectedSubCategory={setSelectedSubCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedAgeGroup={selectedAgeGroup}
            setSelectedAgeGroup={setSelectedAgeGroup}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedCondition={selectedCondition}
            setSelectedCondition={setSelectedCondition}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            superMomOnly={superMomOnly}
            setSuperMomOnly={setSuperMomOnly}
            handleResetFilters={handleResetFilters}
            activeFiltersCount={activeFiltersCount}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            marketplaceCategories={marketplaceCategories}
            popularBrands={popularBrands}
            ageGroups={ageGroups}
            sizes={sizes}
            conditions={conditions}
            getSubCategories={getSubCategories}
          />
          
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              {filteredItems.length} items found
            </p>
            <MarketplaceItemsGrid items={filteredItems} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzMarketplaceFind;
