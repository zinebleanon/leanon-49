
import MarketplaceItemCard from './MarketplaceItemCard';

interface MarketplaceItemsGridProps {
  items: Array<{
    title: string;
    seller: string;
    price: string;
    condition: string;
    image?: string;
    status?: string;
  }>;
}

const MarketplaceItemsGrid = ({ items }: MarketplaceItemsGridProps) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No items found</p>
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
