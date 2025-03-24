
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Send,
  AlertCircle
} from 'lucide-react';

interface AskQuestionFormProps {
  categories: { name: string; icon: JSX.Element }[];
  onClose?: () => void;
}

const AskQuestionForm = ({ categories, onClose }: AskQuestionFormProps) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errors, setErrors] = useState<{
    title?: string;
    details?: string;
    category?: string;
  }>({});
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {
      title?: string;
      details?: string;
      category?: string;
    } = {};
    
    if (!title.trim()) {
      newErrors.title = 'Question title is required';
    } else if (title.length < 10) {
      newErrors.title = 'Question title should be at least 10 characters';
    }
    
    if (!details.trim()) {
      newErrors.details = 'Question details are required';
    } else if (details.length < 20) {
      newErrors.details = 'Please provide more details (at least 20 characters)';
    }
    
    if (!selectedCategory) {
      newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Question Submitted",
        description: "Your question has been sent for review and will be published once approved by an admin.",
      });
      
      // Reset form
      setTitle('');
      setDetails('');
      setSelectedCategory('');
      
      // Close modal if onClose is provided
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-xl font-medium mb-4">Ask the Community</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Your question will be reviewed by our admins before being published to the community.
        </p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="question-title" className="text-sm font-medium">
          Question Title
        </label>
        <Input
          id="question-title"
          placeholder="What would you like to ask?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-destructive text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.title}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="question-details" className="text-sm font-medium">
          Question Details
        </label>
        <Textarea
          id="question-details"
          placeholder="Provide more context or details about your question..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
        />
        {errors.details && (
          <p className="text-destructive text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.details}
          </p>
        )}
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
          {categories.map((category) => (
            <Button
              key={category.name}
              type="button"
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              className="rounded-full flex items-center"
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>
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
