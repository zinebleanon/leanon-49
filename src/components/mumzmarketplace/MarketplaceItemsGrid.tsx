
import MarketplaceItemCard from './MarketplaceItemCard';

interface MarketplaceItemsGridProps {
  items: Array<{
    title: string;
    seller: string;
    price: string;
    condition: string;
    image?: string;
    status?: string;
    brand?: string;
    category?: string;
    ageGroup?: string;
    size?: string;
  }>;
  isLoading?: boolean;
}

const MarketplaceItemsGrid = ({ items, isLoading = false }: MarketplaceItemsGridProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Loading items...</p>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No items found</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or check back later</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <MarketplaceItemCard key={index} item={item} />
      ))}
    </div>
  );
};

export default MarketplaceItemsGrid;
