
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
import { Check, Sparkles, Star, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

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

// Enhanced sample brands with better images and more information
const sampleBrands = [
  {
    id: '1',
    name: 'Little Dreamers',
    category: 'Baby Clothing',
    description: 'Organic cotton baby clothing made by local moms with eco-friendly materials.',
    image: '/lovable-uploads/8d090dc9-1dec-4d92-a60b-f0b63c73e375.png',
    rating: 4.8,
    reviewCount: 124,
    discountCode: 'LEANON15'
  },
  {
    id: '2',
    name: 'Tiny Steps',
    category: 'Baby Accessories',
    description: 'Handcrafted baby accessories for every occasion, designed with love by UAE moms.',
    image: '/lovable-uploads/aad47488-6aaf-41bc-8d54-c6163b5cc62c.png',
    rating: 4.6,
    reviewCount: 87,
    discountCode: 'LEANON10'
  },
  {
    id: '3',
    name: 'Natural Nursery',
    category: 'Nursery',
    description: 'Sustainable and eco-friendly nursery items made from natural materials.',
    image: '/lovable-uploads/9af559f0-e7cd-43a3-a625-8c67793f989b.png',
    rating: 4.9,
    reviewCount: 56,
    discountCode: 'LEANON20'
  },
  {
    id: '4',
    name: 'Baby Bliss',
    category: 'Bath & Skincare',
    description: 'Natural skincare products specially formulated for babies with sensitive skin.',
    image: '/lovable-uploads/bb4acf49-8869-49f7-9464-6e2f7d244c0e.png',
    rating: 4.7,
    reviewCount: 93,
    discountCode: 'LEANON12'
  }
];

interface SupportLocalBrandsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportLocalBrandsDialog = ({ isOpen, onClose }: SupportLocalBrandsDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>("discover");
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); 
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
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
  const filteredBrands = selectedCategory === "all"
    ? sampleBrands
    : sampleBrands.filter(brand => brand.category === selectedCategory);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">Support Mom's Local Brands</DialogTitle>
          <DialogDescription>
            Discover unique mom-owned brands or list your own local brand for the community.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="discover">Discover Mom's Brands</TabsTrigger>
            <TabsTrigger value="list">List Your Local Brand</TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="flex-1 flex flex-col overflow-hidden">
            <div className="mb-4 sticky top-0 z-10 bg-background pb-2 border-b">
              <h3 className="text-lg font-medium mb-2">Filter by Category</h3>
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="w-full md:w-[240px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {brandCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <ScrollArea className="flex-1 h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand) => (
                    <div 
                      key={brand.id} 
                      className="flex flex-col gap-3 p-4 rounded-lg border border-[#B8CEC2]/50 hover:shadow-md transition-shadow hover:bg-[#B8CEC2]/5"
                    >
                      <div className="flex gap-3">
                        <div className="bg-white p-2 rounded-md w-20 h-20 flex items-center justify-center">
                          <img src={brand.image} alt={brand.name} className="w-16 h-16 object-contain" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-lg">{brand.name}</h4>
                          <p className="text-xs text-muted-foreground">{brand.category}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex items-center gap-1 h-6 px-2 py-0 mt-1"
                            aria-label={`Rate ${brand.name}. Current rating: ${brand.rating} out of 5 stars based on ${brand.reviewCount} reviews`}
                          >
                            <div className="flex items-center">
                              <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium ml-1">{brand.rating}</span>
                            </div>
                            <span className="text-xs text-muted-foreground ml-2">({brand.reviewCount} reviews)</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm mt-1">{brand.description}</p>
                      <div className="mt-auto pt-2 flex items-center justify-between">
                        <div className="flex items-center bg-[#B8CEC2]/20 px-3 py-1 rounded-full">
                          <span className="text-xs font-medium">Code: <span className="font-bold">{brand.discountCode}</span></span>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full">
                          Visit <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground">No brands found in this category</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="mt-4 bg-[#B8CEC2]/10 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-[#B8CEC2] mt-1" />
                <div>
                  <h3 className="font-medium">Share Your Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Have you used products from any of these mom's local brands? Share your experience to help other parents make informed decisions.
                  </p>
                  <Button className="mt-2" variant="outline" size="sm" onClick={() => setIsReviewDialogOpen(true)}>
                    Write a Review
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-4 mt-0 flex-1 overflow-hidden">
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
            
            <ScrollArea className="h-[400px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-1">
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
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SupportLocalBrandsDialog;
