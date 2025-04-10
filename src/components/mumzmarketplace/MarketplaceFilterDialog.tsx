
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Check, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFiltersChange: (filters: any) => void;
  initialFilters: {
    category: string;
    brand: string;
    condition: string;
    priceRange: number[];
  };
}

const MarketplaceFilterDialog = ({
  open,
  onOpenChange,
  onFiltersChange,
  initialFilters
}: FilterDialogProps) => {
  const [category, setCategory] = useState(initialFilters.category || 'all');
  const [brand, setBrand] = useState(initialFilters.brand || 'all');
  const [condition, setCondition] = useState(initialFilters.condition || 'all');
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange || [0, 1000]);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Categories and brands options
  const categories = ['Strollers', 'Toys', 'Baby Clothes', 'Feeding', 'Car Seats', 'Baby Gear', 'Maternity'];
  const brands = ['Cybex', 'Plan Toys', 'Carter\'s', 'Avent', 'Graco', 'Chicco', 'Handmade', 'Mixed'];
  const conditions = ['New', 'Like New', 'Good', 'Barely Used'];

  useEffect(() => {
    // Update filter count
    let count = 0;
    if (category !== 'all') count++;
    if (brand !== 'all') count++;
    if (condition !== 'all') count++;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    
    setActiveFiltersCount(count);
  }, [category, brand, condition, priceRange]);

  useEffect(() => {
    // Update local state when initialFilters change
    setCategory(initialFilters.category || 'all');
    setBrand(initialFilters.brand || 'all');
    setCondition(initialFilters.condition || 'all');
    setPriceRange(initialFilters.priceRange || [0, 1000]);
  }, [initialFilters]);

  const handleApplyFilters = () => {
    onFiltersChange({
      category,
      brand,
      condition,
      priceRange
    });
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setCategory('all');
    setBrand('all');
    setCondition('all');
    setPriceRange([0, 1000]);
    
    onFiltersChange({
      category: 'all',
      brand: 'all',
      condition: 'all',
      priceRange: [0, 1000]
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Filter Items</span>
            {activeFiltersCount > 0 && (
              <Badge variant="outline" className="ml-2">
                {activeFiltersCount} active filters
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select value={brand} onValueChange={setBrand}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map(b => (
                  <SelectItem key={b} value={b}>{b}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select value={condition} onValueChange={setCondition}>
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                {conditions.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Price Range (AED)</Label>
              <span className="text-sm text-muted-foreground">
                {priceRange[0]} - {priceRange[1]} AED
              </span>
            </div>
            <Slider
              value={priceRange}
              min={0}
              max={1000}
              step={50}
              onValueChange={setPriceRange}
              className="mt-2"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleResetFilters} className="flex items-center gap-1">
            <X className="h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleApplyFilters} className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MarketplaceFilterDialog;
