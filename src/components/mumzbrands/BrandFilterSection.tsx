
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BrandFilterSectionProps {
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: 'all' | 'local' | 'international') => void;
}

const BrandFilterSection = ({ onCategoryChange, onTypeChange }: BrandFilterSectionProps) => {
  const categories = [
    "All Categories", "Baby", "Toys", "Clothing", "Food", "Wellness", "Home"
  ];
  
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onCategoryChange(value);
  };
  
  return (
    <section className="py-4 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Browse Brands</h2>
          
          <Tabs defaultValue="all" onValueChange={(value) => onTypeChange(value as 'all' | 'local' | 'international')}>
            <TabsList>
              <TabsTrigger value="all">All Brands</TabsTrigger>
              <TabsTrigger value="local">Local</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="mb-6">
          <ToggleGroup type="single" value={selectedCategory} onValueChange={handleCategoryChange}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <ToggleGroupItem 
                  key={category} 
                  value={category}
                  className="rounded-full text-sm"
                >
                  {category}
                </ToggleGroupItem>
              ))}
            </div>
          </ToggleGroup>
        </div>
      </div>
    </section>
  );
};

export default BrandFilterSection;
