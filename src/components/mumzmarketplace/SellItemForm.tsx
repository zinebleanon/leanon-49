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
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet';
import { Check, X, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const [pendingApprovalItems, setPendingApprovalItems] = useState<any[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const storedMonth = localStorage.getItem('listingsMonth');
    
    if (storedMonth && parseInt(storedMonth) === currentMonth) {
      const count = localStorage.getItem('monthlyListingsCount');
      setMonthlyListingsCount(count ? parseInt(count) : 0);
    } else {
      localStorage.setItem('listingsMonth', currentMonth.toString());
      localStorage.setItem('monthlyListingsCount', '0');
      setMonthlyListingsCount(0);
    }
    
    const items = localStorage.getItem('listedItems');
    if (items) {
      const parsedItems = JSON.parse(items);
      const approved = parsedItems.filter((item: any) => item.approved);
      const pending = parsedItems.filter((item: any) => !item.approved);
      setListedItems(approved);
      setPendingApprovalItems(pending);
    }
    
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    setIsAdminMode(isAdmin);
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
    
    setTimeout(() => {
      const newItem = {
        id: Date.now().toString(),
        title,
        description,
        category,
        condition,
        price: isFreeItem ? 'Free' : `${price} AED`,
        location,
        createdDate: new Date().toISOString(),
        status: 'available',
        approved: false
      };
      
      const existingItems = localStorage.getItem('listedItems');
      const allItems = existingItems ? JSON.parse(existingItems) : [];
      const updatedItems = [...allItems, newItem];
      
      localStorage.setItem('listedItems', JSON.stringify(updatedItems));
      
      setPendingApprovalItems([...pendingApprovalItems, newItem]);
      
      const newCount = monthlyListingsCount + 1;
      localStorage.setItem('monthlyListingsCount', newCount.toString());
      setMonthlyListingsCount(newCount);
      
      toast({
        title: "Item Submitted for Review",
        description: "Your item has been submitted and is pending admin approval."
      });
      
      setTitle('');
      setDescription('');
      setCategory('');
      setCondition('');
      setPricingType('paid');
      setPrice('');
      setLocation('');
      setIsFreeItem(false);
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleStatusChange = (itemId: string, newStatus: string) => {
    const allItems = localStorage.getItem('listedItems');
    if (!allItems) return;
    
    const parsedItems = JSON.parse(allItems);
    const updatedItems = parsedItems.map((item: any) => {
      if (item.id === itemId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    
    localStorage.setItem('listedItems', JSON.stringify(updatedItems));
    
    const updatedApproved = updatedItems.filter((item: any) => item.approved);
    setListedItems(updatedApproved);
    
    toast({
      title: "Status Updated",
      description: `Item status has been updated to ${newStatus}.`
    });
  };
  
  const handleApprovalAction = (itemId: string, isApproved: boolean) => {
    const allItems = localStorage.getItem('listedItems');
    if (!allItems) return;
    
    const parsedItems = JSON.parse(allItems);
    const updatedItems = parsedItems.map((item: any) => {
      if (item.id === itemId) {
        return { ...item, approved: isApproved };
      }
      return item;
    });
    
    localStorage.setItem('listedItems', JSON.stringify(updatedItems));
    
    const approvedItems = updatedItems.filter((item: any) => item.approved);
    const pendingItems = updatedItems.filter((item: any) => !item.approved);
    
    setListedItems(approvedItems);
    setPendingApprovalItems(pendingItems);
    
    toast({
      title: isApproved ? "Item Approved" : "Item Rejected",
      description: isApproved 
        ? "The listing has been approved and is now visible in the marketplace."
        : "The listing has been rejected and will not be visible in the marketplace."
    });
  };
  
  const toggleAdminMode = () => {
    const newAdminStatus = !isAdminMode;
    setIsAdminMode(newAdminStatus);
    localStorage.setItem('isAdmin', newAdminStatus.toString());
    
    toast({
      title: newAdminStatus ? "Admin Mode Activated" : "Admin Mode Deactivated",
      description: newAdminStatus 
        ? "You now have access to approve or reject listings." 
        : "You no longer have admin privileges."
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={toggleAdminMode}
          className="flex items-center gap-1"
        >
          <ShieldCheck className="h-4 w-4" />
          {isAdminMode ? "Exit Admin Mode" : "Admin Mode"}
        </Button>
      </div>
      
      {isAdminMode && pendingApprovalItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Pending Approval ({pendingApprovalItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovalItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm">{item.description.substring(0, 100)}...</p>
                      <p className="text-sm text-muted-foreground mt-1">{item.price} • {item.condition} • {item.location}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600"
                        onClick={() => handleApprovalAction(item.id, true)}
                      >
                        <Check className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600"
                        onClick={() => handleApprovalAction(item.id, false)}
                      >
                        <X className="h-4 w-4 mr-1" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
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
                  <Select onValueChange={setCategory} value={category} required>
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
                  <Select onValueChange={setCondition} value={condition} required>
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
                  {isSubmitting ? "Submitting..." : "Submit for Review"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      
      {pendingApprovalItems.length > 0 && !isAdminMode && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovalItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-md">
                  <StatusUpdateReminder itemName={item.title} createdDate={item.createdDate} isPending={true} />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.price} • {item.condition}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {listedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Approved Listings</CardTitle>
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
