
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Copy, CheckCircle, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Brand {
  id: string;
  name: string;
  logo: string;
  category: 'local' | 'international';
  description: string;
  website: string;
  discountCode: string;
  discountValue: string;
  bgColor: string;
}

interface BrandDetailDialogProps {
  brand: Brand | null;
  isOpen: boolean;
  onClose: () => void;
}

const reviewSchema = z.object({
  rating: z.string().min(1, { message: "Please select a rating" }),
  review: z.string().min(5, { message: "Review must be at least 5 characters" }).max(500, { message: "Review must be less than 500 characters" })
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const BrandDetailDialog = ({ brand, isOpen, onClose }: BrandDetailDialogProps) => {
  const [codeCopied, setCodeCopied] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: '',
      review: ''
    }
  });
  
  if (!brand) return null;
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(brand.discountCode);
    setCodeCopied(true);
    
    toast({
      title: "Discount code copied!",
      description: `Use "${brand.discountCode}" to get ${brand.discountValue}`,
    });
    
    setTimeout(() => {
      setCodeCopied(false);
    }, 2000);
  };
  
  const visitWebsite = () => {
    window.open(brand.website, '_blank');
  };
  
  const onSubmitReview = (data: ReviewFormValues) => {
    console.log('Review submitted:', data);
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
    setShowReviewForm(false);
    form.reset();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full md:w-[95vw] p-4 md:p-6 rounded-lg bg-background border-border shadow-lg">
        <DialogHeader>
          <div 
            className="w-full h-32 rounded-lg flex items-center justify-center mb-4" 
            style={{ backgroundColor: `${brand.bgColor}50` }}
          >
            <img 
              src={brand.logo} 
              alt={brand.name} 
              className="h-24 object-contain p-4 bg-white/90 rounded-lg shadow-sm"
            />
          </div>
          <DialogTitle className="text-2xl text-center">{brand.name}</DialogTitle>
          <DialogDescription className="text-center">
            <span className="inline-block px-3 py-1 rounded-full text-xs bg-pastel-green/30 text-foreground">
              {brand.category === 'local' ? 'Local Brand' : 'International Brand'}
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[calc(90vh-220px)] pr-2 md:pr-4 pb-4">
          <div className="space-y-6 p-1">
            <div className="flex justify-center">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-300'}`} 
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">(124 reviews)</span>
              </div>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-foreground">{brand.description}</p>
              <p className="font-medium">As a LeanOn community member, you get access to exclusive discounts:</p>
              <div className="my-6 relative">
                <div className="bg-pastel-yellow/20 rounded-lg p-4 md:p-6 text-center border border-pastel-yellow">
                  <p className="text-lg font-bold mb-2">{brand.discountValue}</p>
                  <div className="flex items-center justify-center gap-2 bg-white rounded-full px-3 py-1.5 shadow-sm mx-auto max-w-[200px]">
                    <code className="font-bold text-sm">{brand.discountCode}</code>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-6 w-6 p-0 rounded-full" 
                      onClick={handleCopyCode}
                      aria-label="Copy discount code"
                    >
                      {codeCopied ? <CheckCircle className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 px-2">
              <Button 
                onClick={visitWebsite} 
                className="rounded-full w-full md:w-auto bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground"
              >
                Visit Website <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                className="rounded-full w-full md:w-auto"
                onClick={() => setShowReviewForm(!showReviewForm)}
                aria-expanded={showReviewForm}
                aria-controls="review-form"
              >
                Rate & Review
              </Button>
            </div>
            
            {showReviewForm && (
              <div id="review-form" className="border rounded-lg p-4 mt-4 bg-muted/20 border-pastel-yellow/30">
                <h4 className="font-medium mb-3">Write a Review</h4>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex space-x-2 py-2 overflow-x-auto"
                              aria-label="Rating"
                            >
                              {[1, 2, 3, 4, 5].map((rating) => (
                                <FormItem key={rating} className="flex items-center space-x-1">
                                  <FormControl>
                                    <RadioGroupItem 
                                      value={rating.toString()} 
                                      id={`rating-${rating}`} 
                                      aria-label={`${rating} stars`}
                                    >
                                      <span className="sr-only">{rating} stars</span>
                                    </RadioGroupItem>
                                  </FormControl>
                                  <Label
                                    htmlFor={`rating-${rating}`}
                                    className={`cursor-pointer p-1`}
                                  >
                                    <Star 
                                      className={`h-5 w-5 ${
                                        parseInt(field.value) >= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                      }`} 
                                    />
                                  </Label>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="review"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Review</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share your experience with this brand..." 
                              className="min-h-[100px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          setShowReviewForm(false);
                          form.reset();
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        size="sm" 
                        className="bg-pastel-green hover:bg-pastel-green/90 text-foreground"
                      >
                        Submit Review
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            <p className="text-xs text-center text-muted-foreground">
              Discount valid until December 31, 2025. Terms and conditions apply.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BrandDetailDialog;
