
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, X } from 'lucide-react';

interface ListedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  ageGroup: string;
  size: string;
  condition: string;
  price: string;
  createdDate: string;
  status: string;
  approved: boolean;
}

interface EditListingDialogProps {
  item: ListedItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedItem: ListedItem) => void;
}

const EditListingDialog = ({
  item,
  open,
  onOpenChange,
  onSave
}: EditListingDialogProps) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [condition, setCondition] = useState(item.condition);
  const [pricingType, setPricingType] = useState(
    item.price === 'Free' ? 'free' : 
    item.price === 'Contact MomSeller' ? 'contact' : 'paid'
  );
  const [price, setPrice] = useState(() => {
    if (item.price === 'Free' || item.price === 'Contact MomSeller') {
      return '';
    }
    return item.price.replace(' AED', '');
  });
  
  const conditions = ["New", "Like New", "Good", "Fair", "Well Loved"];
  
  const handleSave = () => {
    // Format the price based on pricing type
    const finalPrice = pricingType === 'free' 
      ? 'Free' 
      : pricingType === 'contact' 
        ? 'Contact MomSeller' 
        : `${price} AED`;
    
    const updatedItem = {
      ...item,
      title,
      description,
      condition,
      price: finalPrice
    };
    
    onSave(updatedItem);
  };
  
  const handlePricingTypeChange = (value: string) => {
    setPricingType(value);
    if (value === 'free') {
      setPrice('0');
    } else if (value === 'contact') {
      setPrice('Contact for Price');
    } else if (value === 'paid' && price === 'Contact for Price') {
      setPrice('');
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Listing</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select value={condition} onValueChange={setCondition} required>
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Pricing</Label>
            <RadioGroup value={pricingType} onValueChange={handlePricingTypeChange} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="free" id="pricing-free" />
                <Label htmlFor="pricing-free" className="cursor-pointer">Free</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paid" id="pricing-paid" />
                <Label htmlFor="pricing-paid" className="cursor-pointer">Paid</Label>
                
                {pricingType === "paid" && (
                  <div className="flex-1 ml-2">
                    <Input 
                      type="number" 
                      placeholder="Price in AED" 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required={pricingType === "paid"}
                      min="1"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contact" id="pricing-contact" />
                <Label htmlFor="pricing-contact" className="cursor-pointer">Contact MomSeller</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex items-center gap-1">
            <X className="h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;
