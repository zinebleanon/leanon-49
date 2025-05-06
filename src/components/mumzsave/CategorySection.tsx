
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Activity, Heart, Baby, School, Film } from 'lucide-react';

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

  // Get category icon based on index
  const getCategoryIcon = (index: number) => {
    if (activeTab !== 'content') return null;
    
    switch (index) {
      case 0:
        return <Activity className="h-5 w-5 text-rose-400" />;
      case 1:
        return <Heart className="h-5 w-5 text-blue-400" />;
      case 2:
        return <Baby className="h-5 w-5 text-pink-400" />;
      case 3:
        return <School className="h-5 w-5 text-yellow-400" />;
      case 4:
        return <Film className="h-5 w-5 text-amber-400" />;
      default:
        return <Activity className="h-5 w-5 text-rose-400" />;
    }
  };

  // Color mapping for content categories based on the provided image
  const getCategoryColor = (category: string, index: number) => {
    if (activeTab !== 'content') return {};
    
    const colors = [
      'bg-[#FFE6D9] hover:bg-[#FFE6D9]/80 text-foreground', // Peach for Health Care
      'bg-[#D9F4FF] hover:bg-[#D9F4FF]/80 text-foreground', // Light Blue for Emotional/Mental/Physical
      'bg-[#F9D9FF] hover:bg-[#F9D9FF]/80 text-foreground', // Light Pink for Parenting Guidance
      'bg-[#FFFF8F] hover:bg-[#FFFF8F]/80 text-foreground', // Yellow for Childcare & Schooling
      'bg-[#FFD700] hover:bg-[#FFD700]/80 text-foreground', // Gold yellow for Kids Entertainment
    ];
    
    return colors[index % colors.length];
  };

  return (
    <section className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 font-playfair">
        {activeTab === 'deals' && 'Browse by Category'}
        {activeTab === 'marketplace' && 'Shop by Category'}
        {activeTab === 'content' && 'Browse Content by Topic'}
      </h2>
      
      <div className="flex flex-col gap-2">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategorySelect(index)}
            className={cn(
              "py-3 px-4 rounded-md text-sm font-medium transition-colors w-full text-left flex items-center gap-3",
              selectedCategory === index 
                ? "ring-2 ring-primary" 
                : "",
              getCategoryColor(category, index)
            )}
          >
            {getCategoryIcon(index)}
            <span>{category}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
