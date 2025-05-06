
import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Activity, Heart, Baby, School, Film, ChevronDown, ChevronUp, ListCheck } from 'lucide-react';
import { contentCategories } from '@/components/mumzdeals/ContentCategories';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CategorySectionProps {
  activeTab: string; // 'deals' or 'marketplace' or 'content'
  dealCategories?: string[];
  marketplaceCategories?: string[];
  contentCategories?: string[];
  onCategorySelect?: (category: string, index: number) => void;
  onSubcategorySelect?: (category: string, subcategory: string, checked: boolean) => void;
  selectedSubcategories?: Record<string, string[]>;
}

const CategorySection = ({ 
  activeTab, 
  dealCategories = [], 
  marketplaceCategories = [],
  contentCategories: propContentCategories = [],
  onCategorySelect,
  onSubcategorySelect,
  selectedSubcategories = {}
}: CategorySectionProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Determine which categories to display based on the active tab
  let categories = dealCategories;
  if (activeTab === 'marketplace') {
    categories = marketplaceCategories;
  } else if (activeTab === 'content') {
    categories = propContentCategories;
  }

  const handleCategorySelect = (index: number) => {
    setSelectedCategory(index);
    if (onCategorySelect && categories[index]) {
      onCategorySelect(categories[index], index);
    }
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
      case 5:
        return <ListCheck className="h-5 w-5 text-green-400" />;
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
      'bg-[#FDE1D3] hover:bg-[#FDE1D3]/80 text-foreground', // Soft Peach for Kids Essentials Checklist
    ];
    
    return colors[index % colors.length];
  };

  const toggleCategoryExpansion = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Find the corresponding content category object
  const findContentCategory = (categoryName: string) => {
    return contentCategories.find(cat => cat.name === categoryName);
  };

  // Check if subcategory is selected
  const isSubcategorySelected = (category: string, subcategory: string): boolean => {
    return selectedSubcategories[category]?.includes(subcategory) || false;
  };

  // Handle subcategory selection
  const handleSubcategoryChange = (category: string, subcategory: string, checked: boolean) => {
    if (onSubcategorySelect) {
      onSubcategorySelect(category, subcategory, checked);
    }
  };

  // Calculate how many filters are applied per category
  const getActiveFiltersCount = (category: string): number => {
    return selectedSubcategories[category]?.length || 0;
  };

  return (
    <section className="bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 font-playfair">
        {activeTab === 'deals' && 'Browse by Category'}
        {activeTab === 'marketplace' && 'Shop by Category'}
        {activeTab === 'content' && 'Filter by Topic'}
      </h2>
      
      <div className="flex flex-col gap-2">
        {categories.map((category, index) => {
          const contentCategory = activeTab === 'content' ? findContentCategory(category) : null;
          const activeFiltersCount = getActiveFiltersCount(category);
          
          return (
            <div key={index} className="rounded-md overflow-hidden border border-transparent">
              <button
                className={cn(
                  "py-3 px-4 rounded-t-md text-sm font-medium transition-colors w-full text-left flex items-center gap-3",
                  selectedCategory === index ? "ring-2 ring-primary" : "",
                  getCategoryColor(category, index)
                )}
                onClick={() => {
                  handleCategorySelect(index);
                  if (contentCategory) {
                    toggleCategoryExpansion(category);
                  }
                }}
              >
                {getCategoryIcon(index)}
                <div className="flex flex-1 justify-between items-center">
                  <span>{category}</span>
                  {activeFiltersCount > 0 && (
                    <Badge variant="outline" className="ml-2 bg-white/50 text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </div>
                {contentCategory && (
                  <div className="ml-auto">
                    {expandedCategory === category ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                )}
              </button>
              
              {contentCategory && expandedCategory === category && (
                <div className="pl-12 pr-4 py-2 space-y-2 bg-white border-t border-gray-100">
                  {contentCategory.subcategories.map((subcategory, subIndex) => (
                    <div key={subIndex} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${category}-${subcategory.name}`}
                        checked={isSubcategorySelected(category, subcategory.name)}
                        onCheckedChange={(checked) => 
                          handleSubcategoryChange(category, subcategory.name, checked === true)
                        }
                      />
                      <Label 
                        htmlFor={`${category}-${subcategory.name}`}
                        className="text-xs cursor-pointer"
                      >
                        {subcategory.name}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySection;
