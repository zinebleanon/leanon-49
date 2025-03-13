
import { Button } from '@/components/ui/button';

interface CategorySectionProps {
  activeTab: string;
  dealCategories: string[];
  marketplaceCategories: string[];
}

const CategorySection = ({ activeTab, dealCategories, marketplaceCategories }: CategorySectionProps) => {
  return (
    <section className="py-8 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 font-playfair">
          Browse by Category
        </h2>
        
        <div className="flex flex-wrap gap-3">
          {activeTab === 'deals' ? 
            dealCategories.map((category) => (
              <Button key={category} variant="outline" size="sm" className="rounded-full">
                {category}
              </Button>
            )) : 
            marketplaceCategories.map((category) => (
              <Button key={category} variant="outline" size="sm" className="rounded-full">
                {category}
              </Button>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
