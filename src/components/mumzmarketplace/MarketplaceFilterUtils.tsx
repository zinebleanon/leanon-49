
import { MarketplaceItem } from './MarketplaceDataProvider';

interface FilterOptions {
  searchQuery: string;
  selectedCategory: string;
  selectedSubCategory: string;
  selectedBrand: string;
  selectedAgeGroup: string;
  selectedSize: string;
  selectedCondition: string;
  priceRange: number[];
  superMomOnly: boolean;
}

export const filterMarketplaceItems = (items: MarketplaceItem[], options: FilterOptions): MarketplaceItem[] => {
  const {
    searchQuery,
    selectedCategory,
    selectedSubCategory,
    selectedBrand,
    selectedAgeGroup,
    selectedSize,
    selectedCondition,
    priceRange,
    superMomOnly
  } = options;

  return items.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.seller.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      (item.category?.toLowerCase() === selectedCategory.toLowerCase());
    
    const matchesSubCategory = selectedSubCategory === 'all' || 
      (item.title.toLowerCase().includes(selectedSubCategory.toLowerCase()));
    
    const matchesBrand = selectedBrand === 'all' || 
      (item.brand?.toLowerCase() === selectedBrand.toLowerCase());
    
    const matchesAgeGroup = selectedAgeGroup === 'all' ||
      (item.ageGroup?.includes(selectedAgeGroup));
      
    const matchesSize = selectedSize === 'all' ||
      (item.size === selectedSize);
      
    const matchesCondition = selectedCondition === 'all' ||
      (item.condition?.includes(selectedCondition));
    
    const matchesPrice = item.priceValue !== null ? 
      (item.priceValue >= priceRange[0] && item.priceValue <= priceRange[1]) : true;
    
    const matchesSuperMom = !superMomOnly || item.superMom;
    
    return matchesSearch && matchesCategory && matchesSubCategory && matchesBrand && 
           matchesPrice && matchesSuperMom && matchesAgeGroup && matchesSize && matchesCondition;
  });
};

export const getActiveFiltersCount = (options: Omit<FilterOptions, 'priceRange'> & { 
  priceRange: number[],
  defaultPriceRange: number[]
}): number => {
  let count = 0;
  if (options.selectedCategory !== 'all') count++;
  if (options.selectedSubCategory !== 'all') count++;
  if (options.selectedBrand !== 'all') count++;
  if (options.selectedAgeGroup !== 'all') count++;
  if (options.selectedSize !== 'all') count++;
  if (options.selectedCondition !== 'all') count++;
  
  // Check if price range has been modified from default
  if (options.priceRange[0] > options.defaultPriceRange[0] || 
      options.priceRange[1] < options.defaultPriceRange[1]) {
    count++;
  }
  
  if (options.superMomOnly) count++;
  if (options.searchQuery) count++;
  return count;
};
