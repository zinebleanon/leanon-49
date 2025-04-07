
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface BrandFilterSectionProps {
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: 'all' | 'local' | 'international') => void;
}

const BrandFilterSection = ({ onCategoryChange, onTypeChange }: BrandFilterSectionProps) => {
  const categories = [
    "All Categories", "Baby", "Toys", "Clothing", "Food", "Wellness", "Home", "Education", "Technology"
  ];
  
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const handleCategoryChange = (value: string) => {
    if (value) {
      setSelectedCategory(value);
      onCategoryChange(value);
    }
  };
  
  return (
    <section className="py-6 px-6 md:px-8 mb-4 bg-background shadow-sm rounded-b-lg" id="filter-section">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-playfair">Browse Brands</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input type="search" placeholder="Search brands..." className="pl-8" />
            </div>
            
            <Tabs 
              defaultValue="all" 
              onValueChange={(value) => onTypeChange(value as 'all' | 'local' | 'international')}
              className="border rounded-lg overflow-hidden p-0.5 bg-muted/20"
            >
              <TabsList className="grid w-full grid-cols-3 bg-transparent">
                <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white">All Brands</TabsTrigger>
                <TabsTrigger value="local" className="rounded-md data-[state=active]:bg-white">Local</TabsTrigger>
                <TabsTrigger value="international" className="rounded-md data-[state=active]:bg-white">International</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="relative md:hidden w-full mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input type="search" placeholder="Search brands..." className="pl-8" />
        </div>
        
        <ScrollArea className="w-full pb-2">
          <div className="mb-2">
            <ToggleGroup type="single" value={selectedCategory} onValueChange={handleCategoryChange}>
              <div className="flex space-x-2 pb-1">
                {categories.map((category) => (
                  <ToggleGroupItem 
                    key={category} 
                    value={category}
                    className="rounded-full text-sm whitespace-nowrap bg-background data-[state=on]:bg-[#B8CEC2]/60 data-[state=on]:text-foreground"
                  >
                    {category}
                  </ToggleGroupItem>
                ))}
              </div>
            </ToggleGroup>
          </div>
        </ScrollArea>
      </div>
    </section>
  );
};

export default BrandFilterSection;
