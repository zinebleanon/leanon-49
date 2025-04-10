
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Send,
  AlertCircle,
  Tag,
  ArrowLeft,
  Image,
  X,
  Check
} from 'lucide-react';
import { DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AskQuestionFormProps {
  categories: { name: string; icon: JSX.Element }[];
  onClose?: () => void;
}

const categoryKeywords: Record<string, string[]> = {
  'Parenting': ['toddler', 'tantrum', 'discipline', 'child', 'behavior', 'parent', 'kids', 'children'],
  'Pregnancy': ['pregnant', 'trimester', 'baby', 'birth', 'ultrasound', 'expecting', 'maternity', 'nausea'],
  'Birth': ['labor', 'delivery', 'contractions', 'birth plan', 'midwife', 'water birth', 'c-section', 'epidural'],
  'Postpartum': ['recovery', 'after birth', 'postpartum', 'depression', 'newborn', 'fourth trimester', 'healing'],
  'Health': ['doctor', 'pediatrician', 'fever', 'sick', 'symptoms', 'medicine', 'vaccine', 'shots', 'health'],
  'Diversification': ['solid food', 'introduce food', 'baby food', 'puree', 'feeding', 'blw', 'weaning'],
  'Feeding & Breastfeeding': ['breastfeed', 'nursing', 'bottle', 'formula', 'latch', 'milk', 'pump', 'nipple'],
  'Shopping': ['gear', 'stroller', 'crib', 'car seat', 'clothes', 'toys', 'buy', 'purchase', 'recommend'],
  'Schools & Nurseries': ['preschool', 'daycare', 'school', 'nursery', 'education', 'learning', 'kindergarten'],
  'Nannies': ['nanny', 'babysitter', 'childcare', 'au pair', 'caregiver', 'sitter', 'childminder'],
  'Entertainment & Birthday': ['party', 'activity', 'birthday', 'holiday', 'event', 'celebration', 'gift', 'present'],
  'Others': [] // Empty array for Others category - will catch any unmatched keywords
};

const AskQuestionForm = ({ categories, onClose }: AskQuestionFormProps) => {
  const [details, setDetails] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{
    details?: string;
    category?: string;
    images?: string;
  }>({});
  const { toast } = useToast();

  useEffect(() => {
    if (details.length > 2) {
      const text = details.toLowerCase();
      
      const suggestions = Object.entries(categoryKeywords)
        .filter(([_, keywords]) => 
          keywords.some(keyword => text.includes(keyword.toLowerCase()))
        )
        .map(([category]) => category);
      
      const finalSuggestions = suggestions.length > 0 ? suggestions : ['Others'];
      
      setSuggestedCategories([...new Set(finalSuggestions)]);
    }
  }, [details]);

  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const validateForm = () => {
    const newErrors: {
      details?: string;
      category?: string;
      images?: string;
    } = {};
    
    if (!details.trim()) {
      newErrors.details = 'Question details are required';
    } else if (details.length < 20) {
      newErrors.details = 'Please provide more details (at least 20 characters)';
    }
    
    if (!selectedCategory) {
      newErrors.category = 'Please select a category';
    }
    
    if (images.length > 3) {
      newErrors.images = 'Maximum 3 images allowed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Question Submitted",
        description: `Your question with ${images.length > 0 ? images.length + ' images' : 'no images'} has been sent for review and will be published once approved by an admin.`,
      });
      
      setDetails('');
      setSelectedCategory('');
      setImages([]);
      
      if (onClose) {
        onClose();
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      const allImages = [...images, ...newImages].slice(0, 3);
      setImages(allImages);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleImageButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader className="relative">
        <div className="absolute left-0 top-0">
          {onClose && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          )}
        </div>
        <DialogTitle>Ask the Community</DialogTitle>
        <DialogDescription>
          Your question will be reviewed by our admins before being published to the community.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-2">
        <label htmlFor="question-details" className="text-sm font-medium flex justify-between">
          <span>Question Details</span>
          {details.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {details.length} characters
            </span>
          )}
        </label>
        <Textarea
          id="question-details"
          placeholder="What would you like to ask the community?"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={6}
          className="resize-none"
        />
        {errors.details && (
          <p className="text-destructive text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.details}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Add Images (optional)</label>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="relative w-24 h-24 rounded-md overflow-hidden border border-[#B8CEC2]"
              >
                <img 
                  src={image.preview} 
                  alt={`Uploaded ${index}`} 
                  className="w-full h-full object-cover" 
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
                >
                  <X className="h-3 w-3 text-foreground" />
                </button>
              </div>
            ))}
            
            {images.length < 3 && (
              <button
                type="button"
                onClick={handleImageButtonClick}
                className="w-24 h-24 border-2 border-dashed border-[#B8CEC2] rounded-md flex flex-col items-center justify-center hover:bg-[#B8CEC2]/10"
              >
                <Image className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground mt-1">Add Image</span>
              </button>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            multiple
          />
          
          <p className="text-xs text-muted-foreground">
            Upload up to 3 images (jpg, png) - max 5MB each
          </p>
          
          {errors.images && (
            <p className="text-destructive text-xs flex items-center gap-1 mt-1">
              <AlertCircle className="h-3 w-3" />
              {errors.images}
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        
        {suggestedCategories.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
              <Tag className="h-3 w-3" />
              Suggested categories based on your question:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedCategories.map((category) => (
                <Button
                  key={category}
                  type="button"
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${selectedCategory === category ? 'bg-[#FFD9A7] text-foreground' : 'bg-[#B8CEC2]/20 border-[#B8CEC2]/50 hover:bg-[#B8CEC2]/30'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {categories.find(c => c.name === category)?.icon}
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="max-h-60 bg-white">
            <ScrollArea className="h-[200px]">
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name} className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        
        {errors.category && (
          <p className="text-destructive text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.category}
          </p>
        )}
      </div>
      
      <div className="pt-4 flex justify-end gap-2">
        {onClose && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground gap-2">
          <Send className="h-4 w-4" />
          Submit Question
        </Button>
      </div>
    </form>
  );
};

export default AskQuestionForm;
