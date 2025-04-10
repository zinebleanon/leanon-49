
import { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
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

interface FilterPanelProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  selectedAgeGroup: string;
  setSelectedAgeGroup: (value: string) => void;
  selectedSize: string;
  setSelectedSize: (value: string) => void;
  selectedCondition: string;
  setSelectedCondition: (value: string) => void;
  priceRange: number[];
  setPriceRange: (value: number[]) => void;
  superMomOnly: boolean;
  setSuperMomOnly: (value: boolean) => void;
  handleResetFilters: () => void;
  activeFiltersCount: number;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  marketplaceCategories: string[];
  popularBrands: string[];
  ageGroups: string[];
  sizes: string[];
  conditions: string[];
  getSubCategories: () => string[];
}

const FilterPanel = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  selectedBrand,
  setSelectedBrand,
  selectedAgeGroup,
  setSelectedAgeGroup,
  selectedSize,
  setSelectedSize,
  selectedCondition,
  setSelectedCondition,
  priceRange,
  setPriceRange,
  superMomOnly,
  setSuperMomOnly,
  handleResetFilters,
  activeFiltersCount,
  showFilters,
  setShowFilters,
  marketplaceCategories,
  popularBrands,
  ageGroups,
  sizes,
  conditions,
  getSubCategories
}: FilterPanelProps) => {
  return (
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
      
      {/* Advanced filters */}
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
        
        {/* Age Group filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Age Group</label>
          <Select value={selectedAgeGroup} onValueChange={setSelectedAgeGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Select age group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Age Groups</SelectItem>
              {ageGroups.map((age) => (
                <SelectItem key={age} value={age}>{age}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Size filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Size</label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Condition filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Condition</label>
          <Select value={selectedCondition} onValueChange={setSelectedCondition}>
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              {conditions.map((condition) => (
                <SelectItem key={condition} value={condition}>{condition}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
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
          {/* Item count will be passed in from parent */}
        </p>
        
        <Button 
          size="sm" 
          className="rounded-full border bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground"
          onClick={handleResetFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;
