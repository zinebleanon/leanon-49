
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface CategorySectionProps {
  activeTab: string; // 'deals' or 'marketplace' or 'content'
  dealCategories?: string[];
  marketplaceCategories?: string[];
  contentCategories?: string[];
}

const CategorySection = ({ 
  activeTab, 
  dealCategories = [], 
  marketplaceCategories = [],
  contentCategories = []
}: CategorySectionProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Determine which categories to display based on the active tab
  let categories = dealCategories;
  if (activeTab === 'marketplace') {
    categories = marketplaceCategories;
  } else if (activeTab === 'content') {
    categories = contentCategories;
  }

  const handleCategorySelect = (index: number) => {
    setSelectedCategory(index);
  };
  
  if (categories.length === 0) return null;

  return (
    <section className="py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 font-playfair">
          {activeTab === 'deals' && 'Browse by Category'}
          {activeTab === 'marketplace' && 'Shop by Category'}
          {activeTab === 'content' && 'Browse Content by Topic'}
        </h2>
        
        <div className="flex flex-wrap gap-2 md:gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(index)}
              className={cn(
                "py-2 px-4 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
                selectedCategory === index 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-accent text-accent-foreground hover:bg-accent/60"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
