import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ShieldCheck, Check, X, Upload, Image } from 'lucide-react';
import { StatusUpdateReminder } from './StatusUpdateReminder';
import { trackItemListing } from '@/utils/track-user-activity';
import { useMarketplaceListings } from '@/hooks/use-marketplace-listings';
import { supabase } from '@/integrations/supabase/client';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  condition: string;
  pricingType: string;
  price: string;
  ageGroup: string;
  size: string;
  isFreeItem: boolean;
  status: string;
  image: File | null;
  imagePreview: string | null;
}

const SellItemForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('');
  const [pricingType, setPricingType] = useState('paid');
  const [price, setPrice] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [size, setSize] = useState('');
  const [isFreeItem, setIsFreeItem] = useState(false);
  const [status, setStatus] = useState('available');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [monthlyListingsCount, setMonthlyListingsCount] = useState(0);
  const [listedItems, setListedItems] = useState<any[]>([]);
  const [pendingApprovalItems, setPendingApprovalItems] = useState<any[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const subCategories: Record<string, string[]> = {
    "baby-clothes": ["Newborn (0-3m)", "Infant (3-12m)", "Toddler (1-3y)", "Kids (3-8y)"],
    "toys": ["Educational", "Outdoor", "Plush", "Building", "Puzzles"],
    "strollers": ["Travel Systems", "Joggers", "Double Strollers", "Lightweight"],
    "car-seats": ["Infant", "Convertible", "Booster", "All-in-One"],
    "feeding": ["Bottles", "High Chairs", "Breast Pumps", "Baby Food Makers", "Utensils"],
    "books": ["Board Books", "Picture Books", "Educational", "Activity Books"],
    "home": ["Nursery Decor", "Bedding", "Bath", "Safety", "Air Purifiers"],
    "maternity": ["Clothing", "Nursing", "Pregnancy Care", "Postpartum"],
    "furniture": ["Cribs", "Bassinets", "Changing Tables", "Gliders", "Storage"],
    "others": ["Diapering", "Health & Safety", "Carriers", "Travel Accessories"]
  };

  const ageGroups = [
    "Newborn (0-3m)", 
    "Infant (3-12m)", 
    "Toddler (1-3y)", 
    "Preschool (3-5y)", 
    "Kids (5-8y)", 
    "Older Kids (8-12y)",
    "Teen (12+)",
    "Adult"
  ];

  const clothingSizes = [
    "Preemie", "Newborn", "0-3m", "3-6m", "6-9m", "9-12m", "12-18m", "18-24m",
    "2T", "3T", "4T", "5T", "6", "7", "8", "10", "12", "14", "16",
    "XS", "S", "M", "L", "XL", "XXL", "Not Applicable"
  ];
  
  const { createListing, updateListing, deleteListing } = useMarketplaceListings();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !subCategory || !brand || !condition || (!isFreeItem && pricingType === 'paid' && !price) || !ageGroup) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${Date.now()}_${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('marketplace-images')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('marketplace-images')
          .getPublicUrl(filePath);

        imageUrl = publicUrl;
      }

      const finalPrice = pricingType === 'free' 
        ? 'Free' 
        : pricingType === 'contact' 
          ? 'Contact MomSeller' 
          : `${price} AED`;

      const { error } = await createListing({
        title,
        description,
        category,
        sub_category: subCategory,
        brand,
        age_group: ageGroup,
        size: size || 'Not Applicable',
        condition,
        price: finalPrice,
        image_url: imageUrl
      });

      if (error) throw error;

      // Track the item listing activity
      trackItemListing(title, category);

      toast({
        title: "Item Submitted for Review",
        description: "Your item has been submitted and is pending admin approval."
      });

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setSubCategory('');
      setBrand('');
      setCondition('');
      setPricingType('paid');
      setPrice('');
      setAgeGroup('');
      setSize('');
      setIsFreeItem(false);
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting item:', error);
      toast({
        title: "Error",
        description: "Failed to submit item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
  
  useEffect(() => {
    setSubCategory('');
  }, [category]);
  
  const handlePricingTypeChange = (value: string) => {
    setPricingType(value);
    if (value === 'free') {
      setIsFreeItem(true);
      setPrice('0');
    } else if (value === 'contact') {
      setIsFreeItem(false);
      setPrice('Contact for Price');
    } else {
      setIsFreeItem(false);
      setPrice('');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
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
                    <div className="flex gap-4">
                      {item.image && (
                        <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm">{item.description.substring(0, 100)}...</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant="outline">{item.subCategory}</Badge>
                          <Badge variant="outline">{item.brand}</Badge>
                          <Badge variant="outline">{item.ageGroup}</Badge>
                          {item.size !== "Not Applicable" && (
                            <Badge variant="outline">Size: {item.size}</Badge>
                          )}
                          <Badge variant="outline">{item.condition}</Badge>
                          <Badge variant="outline">{item.price}</Badge>
                        </div>
                      </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ageGroup">Age Group</Label>
                  <Select onValueChange={setAgeGroup} value={ageGroup} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageGroups.map((age) => (
                        <SelectItem key={age} value={age}>{age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="size">Size (if applicable)</Label>
                  <Select onValueChange={setSize} value={size}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {clothingSizes.map((sizeOption) => (
                        <SelectItem key={sizeOption} value={sizeOption}>{sizeOption}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category && (
                  <div>
                    <Label htmlFor="subCategory">Sub-Category</Label>
                    <Select onValueChange={setSubCategory} value={subCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sub-category" />
                      </SelectTrigger>
                      <SelectContent>
                        {subCategories[category]?.map((subCat) => (
                          <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    placeholder="Enter brand name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image">Item Image</Label>
                <div className="mt-2">
                  {!imagePreview ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                      <Image className="h-8 w-8 text-gray-400 mb-2" />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <span className="text-blue-600 hover:text-blue-500">Upload an image</span>
                        <input
                          id="image-upload"
                          name="image-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full max-h-64 object-contain rounded-md" 
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2 bg-white"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
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
                          prefix="AED"
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
                  <div className="flex gap-4">
                    {item.image && (
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline">{item.price}</Badge>
                        <Badge variant="outline">{item.condition}</Badge>
                        <Badge variant="outline">{item.ageGroup}</Badge>
                        {item.size !== "Not Applicable" && (
                          <Badge variant="outline">Size: {item.size}</Badge>
                        )}
                        <Badge variant="outline">{item.subCategory}</Badge>
                        <Badge variant="outline">{item.brand}</Badge>
                      </div>
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
                    <div className="flex gap-4">
                      {item.image && (
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="outline">{item.price}</Badge>
                          <Badge variant="outline">{item.condition}</Badge>
                          <Badge variant="outline">{item.ageGroup}</Badge>
                          {item.size !== "Not Applicable" && (
                            <Badge variant="outline">Size: {item.size}</Badge>
                          )}
                          <Badge variant="outline">{item.subCategory}</Badge>
                          <Badge variant="outline">{item.brand}</Badge>
                        </div>
                      </div>
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
