
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tag, ShoppingBag, Store } from 'lucide-react';

interface CategorySectionProps {
  activeTab: 'deals' | 'marketplace';
  dealCategories: string[];
  marketplaceCategories: string[];
}

const CategorySection = ({ activeTab, dealCategories, marketplaceCategories }: CategorySectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  
  const categories = activeTab === 'deals' ? dealCategories : marketplaceCategories;
  
  return (
    <section className="py-6 px-6 md:px-8" id="categories">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Browse Categories</h2>
          
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" asChild className="text-sm">
              <Link to="/deals">
                <Tag className="mr-1 h-4 w-4" />
                All Deals
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="text-sm">
              <Link to="/brands">
                <Store className="mr-1 h-4 w-4" />
                All Brands
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryClick(category)}
              className="rounded-full text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
