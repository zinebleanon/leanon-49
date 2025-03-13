
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { PackagePlus, Upload, Tag, BadgeDollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  condition: z.string().min(1, "Condition is required"),
  location: z.string().min(1, "Location is required"),
});

type FormValues = z.infer<typeof formSchema>;

const SellItemForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      condition: "",
      location: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      console.log("Submitted data:", { ...data, photos });
      toast.success("Item listed successfully!", {
        description: "Your item has been listed on the marketplace.",
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <SelectItem value="electronics">Electronics</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              disabled={isSubmitting}
            >
              <Tag className="mr-2 h-4 w-4" />
              {isSubmitting ? "Publishing..." : "List Item for Sale"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SellItemForm;
