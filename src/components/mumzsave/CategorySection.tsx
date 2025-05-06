
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

  // Color mapping for content categories based on the provided image
  const getCategoryColor = (category: string, index: number) => {
    if (activeTab !== 'content') return {};
    
    const colors = [
      'bg-[#FFE6D9] text-black', // Peach for Health Care
      'bg-[#D9F4FF] text-black', // Light Blue for Emotional/Mental/Physical
      'bg-[#F9D9FF] text-black', // Light Pink for Parenting Guidance
      'bg-[#FFFF8F] text-black', // Yellow for Childcare & Schooling
      'bg-[#FFD700] text-black', // Gold yellow for Kids Entertainment
    ];
    
    return colors[index % colors.length];
  };

  return (
    <section className="py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 font-playfair">
          {activeTab === 'deals' && 'Browse by Category'}
          {activeTab === 'marketplace' && 'Shop by Category'}
          {activeTab === 'content' && 'Browse Content by Topic'}
        </h2>
        
        <div className="flex flex-col gap-2 md:gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategorySelect(index)}
              className={cn(
                "py-3 px-4 rounded-md text-sm md:text-base font-medium transition-colors w-full text-left",
                selectedCategory === index 
                  ? "ring-2 ring-primary/50" 
                  : "hover:opacity-90",
                getCategoryColor(category, index)
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
