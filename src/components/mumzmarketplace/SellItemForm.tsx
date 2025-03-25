
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { PackagePlus, Upload, Tag, BadgeDollarSign, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priceType: z.enum(["free", "paid"]),
  price: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  location: z.string().min(1, "Location is required"),
}).refine((data) => {
  // If priceType is "paid", then price is required
  if (data.priceType === "paid") {
    return !!data.price;
  }
  return true;
}, {
  message: "Price is required for paid items",
  path: ["price"],
});

type FormValues = z.infer<typeof formSchema>;

const SellItemForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [itemsListedThisMonth, setItemsListedThisMonth] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const MONTHLY_LISTING_LIMIT = 3;
  
  useEffect(() => {
    // In a real application, this would fetch from a database
    // For this demo, we'll use localStorage to persist between page refreshes
    const checkListingLimit = () => {
      const currentMonth = new Date().getMonth();
      const storedMonth = localStorage.getItem('listingMonth');
      const storedCount = localStorage.getItem('listingCount');
      
      if (storedMonth && parseInt(storedMonth) === currentMonth && storedCount) {
        const count = parseInt(storedCount);
        setItemsListedThisMonth(count);
        setIsLimitReached(count >= MONTHLY_LISTING_LIMIT);
      } else {
        // Reset counter for new month
        localStorage.setItem('listingMonth', currentMonth.toString());
        localStorage.setItem('listingCount', '0');
        setItemsListedThisMonth(0);
        setIsLimitReached(false);
      }
    };
    
    checkListingLimit();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priceType: "paid",
      price: "",
      category: "",
      condition: "",
      location: "",
    },
  });

  const priceType = form.watch("priceType");

  const onSubmit = async (data: FormValues) => {
    if (isLimitReached) {
      toast.error("Monthly listing limit reached", {
        description: "You can only list up to 3 items per month.",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      console.log("Submitted data:", { ...data, photos });
      
      // Update the listing count in localStorage
      const newCount = itemsListedThisMonth + 1;
      localStorage.setItem('listingCount', newCount.toString());
      setItemsListedThisMonth(newCount);
      setIsLimitReached(newCount >= MONTHLY_LISTING_LIMIT);
      
      toast.success("Item listed successfully!", {
        description: `Your item has been listed on the marketplace. You have ${MONTHLY_LISTING_LIMIT - newCount} listings left this month.`,
      });
      setIsSubmitting(false);
      navigate("/marketplace");
    }, 1500);
  };

  const handlePhotoUpload = () => {
    // Simulate photo upload - in a real app, this would connect to file storage
    const mockPhotos = [
      "https://via.placeholder.com/150",
      ...photos
    ];
    setPhotos(mockPhotos);
    toast.info("Photo uploaded!");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PackagePlus className="h-6 w-6 text-primary" />
          <span>List an Item for Sale</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLimitReached ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Monthly listing limit reached</AlertTitle>
            <AlertDescription>
              You can only list up to {MONTHLY_LISTING_LIMIT} items per month. Your limit will reset at the beginning of next month.
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Monthly listing limit</AlertTitle>
            <AlertDescription>
              You have used {itemsListedThisMonth} of your {MONTHLY_LISTING_LIMIT} available listings this month.
            </AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Baby Walker - Barely Used" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your item a clear, descriptive title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your item in detail (brand, age, features, condition details, etc.)"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priceType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Pricing</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="free" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Free
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="paid" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Paid
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {priceType === "paid" && (
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (AED)</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <BadgeDollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="number" placeholder="150" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
              
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="baby-clothes">Baby Clothes</SelectItem>
                      <SelectItem value="toys">Toys</SelectItem>
                      <SelectItem value="strollers">Strollers</SelectItem>
                      <SelectItem value="car-seats">Car Seats</SelectItem>
                      <SelectItem value="feeding">Feeding</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="maternity">Maternity</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="like-new">Like New</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="needs-repair">Needs Repair</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dubai">Dubai</SelectItem>
                        <SelectItem value="abu-dhabi">Abu Dhabi</SelectItem>
                        <SelectItem value="sharjah">Sharjah</SelectItem>
                        <SelectItem value="ajman">Ajman</SelectItem>
                        <SelectItem value="al-ain">Al Ain</SelectItem>
                        <SelectItem value="ras-al-khaimah">Ras Al Khaimah</SelectItem>
                        <SelectItem value="fujairah">Fujairah</SelectItem>
                        <SelectItem value="umm-al-quwain">Umm Al Quwain</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border rounded-md p-4 bg-background/50">
              <FormLabel className="block mb-2">Photos</FormLabel>
              <div className="flex flex-wrap gap-2 mb-4">
                {photos.map((photo, index) => (
                  <div key={index} className="w-16 h-16 relative overflow-hidden rounded border">
                    <img src={photo} alt={`Item preview ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {photos.length === 0 && (
                  <div className="text-sm text-muted-foreground italic">
                    No photos added yet
                  </div>
                )}
              </div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePhotoUpload}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Photos
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Upload clear photos of your item (max 5 photos)
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting || isLimitReached}
            >
              <Tag className="mr-2 h-4 w-4" />
              {isSubmitting ? "Publishing..." : "List Item for Sale"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {isLimitReached && (
        <CardFooter className="bg-muted/50 border-t">
          <p className="text-sm text-center w-full text-muted-foreground">
            Your monthly listing limit has been reached. The limit will reset on the 1st of next month.
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default SellItemForm;
