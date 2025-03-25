
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { StatusUpdateReminder } from './StatusUpdateReminder';

const SellItemForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [pricingType, setPricingType] = useState('paid');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [isFreeItem, setIsFreeItem] = useState(false);
  const [status, setStatus] = useState('available');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [monthlyListingsCount, setMonthlyListingsCount] = useState(0);
  const [listedItems, setListedItems] = useState<any[]>([]);
  
  useEffect(() => {
    // Load monthly listings count from localStorage
    const currentMonth = new Date().getMonth();
    const storedMonth = localStorage.getItem('listingsMonth');
    
    if (storedMonth && parseInt(storedMonth) === currentMonth) {
      const count = localStorage.getItem('monthlyListingsCount');
      setMonthlyListingsCount(count ? parseInt(count) : 0);
    } else {
      // Reset count for new month
      localStorage.setItem('listingsMonth', currentMonth.toString());
      localStorage.setItem('monthlyListingsCount', '0');
      setMonthlyListingsCount(0);
    }
    
    // Load previously listed items
    const items = localStorage.getItem('listedItems');
    if (items) {
      setListedItems(JSON.parse(items));
    }
  }, []);
  
  const handlePricingTypeChange = (value: string) => {
    setPricingType(value);
    if (value === 'free') {
      setIsFreeItem(true);
      setPrice('0');
    } else {
      setIsFreeItem(false);
      setPrice('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (monthlyListingsCount >= 3) {
      toast({
        title: "Monthly Limit Reached",
        description: "You can only list up to 3 items per month.",
        variant: "destructive"
      });
      return;
    }
    
    if (!title || !description || !category || !condition || (!isFreeItem && !price) || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create new item
      const newItem = {
        id: Date.now().toString(),
        title,
        description,
        category,
        condition,
        price: isFreeItem ? 'Free' : `${price} AED`,
        location,
        createdDate: new Date().toISOString(),
        status: 'available'
      };
      
      // Update monthly listings count
      const newCount = monthlyListingsCount + 1;
      localStorage.setItem('monthlyListingsCount', newCount.toString());
      setMonthlyListingsCount(newCount);
      
      // Update listed items
      const updatedItems = [...listedItems, newItem];
      localStorage.setItem('listedItems', JSON.stringify(updatedItems));
      setListedItems(updatedItems);
      
      toast({
        title: "Item Listed Successfully",
        description: "Your item has been added to the marketplace."
      });
      
      setIsSubmitting(false);
      navigate('/marketplace');
    }, 1500);
  };
  
  const handleStatusChange = (itemId: string, newStatus: string) => {
    const updatedItems = listedItems.map(item => {
      if (item.id === itemId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    
    localStorage.setItem('listedItems', JSON.stringify(updatedItems));
    setListedItems(updatedItems);
    
    toast({
      title: "Status Updated",
      description: `Item status has been updated to ${newStatus}.`
    });
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">List your Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Item Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Baby Stroller in excellent condition" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Provide details about your item..." 
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baby-clothes">Baby Clothes</SelectItem>
                      <SelectItem value="toys">Toys</SelectItem>
                      <SelectItem value="strollers">Strollers</SelectItem>
                      <SelectItem value="car-seats">Car Seats</SelectItem>
                      <SelectItem value="feeding">Feeding</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="maternity">Maternity</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select onValueChange={setCondition} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="well-loved">Well Loved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Pricing</Label>
                <div className="flex items-center space-x-4">
                  <Select onValueChange={handlePricingTypeChange} value={pricingType}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select pricing" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {!isFreeItem && (
                    <div className="flex-1">
                      <Input 
                        type="number" 
                        placeholder="Price in AED" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required={!isFreeItem}
                        min="1"
                        prefix="AED"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="e.g., Dubai Marina, Abu Dhabi" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Monthly Listings: {monthlyListingsCount}/3
                </p>
                <Button 
                  type="submit" 
                  disabled={isSubmitting || monthlyListingsCount >= 3}
                >
                  {isSubmitting ? "Listing..." : "List Item"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {listedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Listed Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listedItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-md">
                  <StatusUpdateReminder itemName={item.title} createdDate={item.createdDate} />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.price} • {item.condition}</p>
                    </div>
                    <div>
                      <Select 
                        value={item.status} 
                        onValueChange={(value) => handleStatusChange(item.id, value)}
                      >
                        <SelectTrigger className="h-8 w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SellItemForm;
