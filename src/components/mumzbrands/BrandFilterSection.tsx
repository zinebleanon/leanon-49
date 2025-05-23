
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

interface BrandFilterSectionProps {
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: 'all' | 'local' | 'international') => void;
}

const BrandFilterSection = ({ onCategoryChange, onTypeChange }: BrandFilterSectionProps) => {
  const categories = [
    "All Categories", "Baby", "Toys", "Clothing", "Food", "Wellness", "Home", "Education", "Technology"
  ];
  
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();
  
  const handleCategoryChange = (value: string) => {
    if (value) {
      setSelectedCategory(value);
      onCategoryChange(value);
    }
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, this would trigger search functionality
  };
  
  return (
    <section className="py-6 px-4 md:px-8 mb-4 bg-background shadow-sm rounded-b-lg sticky top-[72px] z-10" id="filter-section">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-playfair">Browse Brands</h2>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:flex w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input 
                type="search" 
                placeholder="Search brands..." 
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <Tabs 
              defaultValue="all" 
              onValueChange={(value) => onTypeChange(value as 'all' | 'local' | 'international')}
              className="border rounded-lg overflow-hidden p-0.5 bg-muted/20"
            >
              <TabsList className="grid w-full grid-cols-3 bg-transparent">
                <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white text-xs md:text-sm px-2 md:px-4">All Brands</TabsTrigger>
                <TabsTrigger value="local" className="rounded-md data-[state=active]:bg-white text-xs md:text-sm px-2 md:px-4">Local</TabsTrigger>
                <TabsTrigger value="international" className="rounded-md data-[state=active]:bg-white text-xs md:text-sm px-2 md:px-4">International</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="relative md:hidden w-full mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input 
            type="search" 
            placeholder="Search brands..." 
            className="pl-8"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        
        <ScrollArea className="w-full" type="scroll">
          <div className="mb-2 pb-2 overflow-x-auto">
            <ToggleGroup type="single" value={selectedCategory} onValueChange={handleCategoryChange} className="flex flex-nowrap">
              <div className="flex space-x-2 pb-1">
                {categories.map((category) => (
                  <ToggleGroupItem 
                    key={category} 
                    value={category}
                    className="rounded-full text-sm whitespace-nowrap bg-background data-[state=on]:bg-[#B8CEC2]/60 data-[state=on]:text-foreground flex-shrink-0"
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
