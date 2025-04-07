
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Check, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Brand categories commonly used for baby products
const brandCategories = [
  "Baby Clothing",
  "Baby Gear",
  "Baby Accessories",
  "Nursery",
  "Feeding",
  "Diapering",
  "Bath & Skincare",
  "Toys & Play",
  "Maternity",
  "Health & Safety",
  "Other"
];

const localBrandSchema = z.object({
  brandName: z.string().min(2, { message: "Brand name must be at least 2 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  uniqueFeatures: z.string().min(10, { message: "Please describe what makes your brand unique" }),
  website: z.string().url({ message: "Please enter a valid website URL" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" })
});

type LocalBrandFormValues = z.infer<typeof localBrandSchema>;

// Sample brands for discovery section
const sampleBrands = [
  {
    id: '1',
    name: 'Little Dreamers',
    category: 'Baby Clothing',
    description: 'Organic cotton baby clothing made by local moms.',
    image: 'https://placehold.co/100x100'
  },
  {
    id: '2',
    name: 'Tiny Steps',
    category: 'Baby Accessories',
    description: 'Handcrafted baby accessories for every occasion.',
    image: 'https://placehold.co/100x100'
  },
  {
    id: '3',
    name: 'Natural Nursery',
    category: 'Nursery',
    description: 'Sustainable and eco-friendly nursery items.',
    image: 'https://placehold.co/100x100'
  },
  {
    id: '4',
    name: 'Baby Bliss',
    category: 'Bath & Skincare',
    description: 'Natural skincare products specially formulated for babies.',
    image: 'https://placehold.co/100x100'
  }
];

interface SupportLocalBrandsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportLocalBrandsDialog = ({ isOpen, onClose }: SupportLocalBrandsDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("discover");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { toast } = useToast();
  
  const form = useForm<LocalBrandFormValues>({
    resolver: zodResolver(localBrandSchema),
    defaultValues: {
      brandName: "",
      category: "",
      description: "",
      uniqueFeatures: "",
      website: "",
      contactEmail: ""
    }
  });
  
  const onSubmit = (data: LocalBrandFormValues) => {
    console.log("Form submitted:", data);
    
    // In a real app, this would send the data to an API
    toast({
      title: "Brand submitted for approval",
      description: "Thank you for submitting your brand. Our team will review it shortly.",
    });
    
    form.reset();
    onClose();
  };

  // Filter brands based on selected category
  const filteredBrands = selectedCategory 
    ? sampleBrands.filter(brand => brand.category === selectedCategory)
    : sampleBrands;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Support Mom's Local Brands</DialogTitle>
          <DialogDescription>
            Discover unique mom-owned brands or list your own local brand for the community.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="discover">Discover Mom's Brands</TabsTrigger>
            <TabsTrigger value="list">List Your Local Brand</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="space-y-4 mt-4">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Filter by Category</h3>
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="w-full md:w-[240px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {brandCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand) => (
                  <div 
                    key={brand.id} 
                    className="flex gap-3 p-3 rounded-lg border border-[#B8CEC2]/50 hover:bg-[#B8CEC2]/10"
                  >
                    <img src={brand.image} alt={brand.name} className="w-16 h-16 rounded-md object-cover" />
                    <div>
                      <h4 className="font-medium">{brand.name}</h4>
                      <p className="text-xs text-muted-foreground">{brand.category}</p>
                      <p className="text-sm mt-1">{brand.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-muted-foreground">No brands found in this category</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 bg-[#B8CEC2]/10 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[#B8CEC2] mt-1" />
                <div>
                  <h3 className="font-medium">Share Your Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Have you used products from any of these mom's local brands? Share your experience to help other parents make informed decisions.
                  </p>
                  <Button className="mt-2" variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-4 mt-4">
            <div className="bg-[#B8CEC2]/10 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[#B8CEC2] mt-1" />
                <div>
                  <h3 className="font-medium">List Your Local Brand</h3>
                  <p className="text-sm text-muted-foreground">
                    Showcase your brand to thousands of moms in our community. Once approved, your brand will be visible to all LeanOn users.
                  </p>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="brandName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {brandCategories.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your brand and what you offer" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="uniqueFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What Makes Your Brand Unique?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us what sets your brand apart" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://your-brand-website.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your-email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <p className="text-sm text-muted-foreground">
                    By submitting this form, your brand will be reviewed by our admin team. Once approved, it will be listed in our Mom's Local Brands directory.
                  </p>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                  <Button type="submit">Submit for Approval</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SupportLocalBrandsDialog;
