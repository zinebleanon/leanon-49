
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Send,
  AlertCircle,
  Tag
} from 'lucide-react';
import { DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';

interface AskQuestionFormProps {
  categories: { name: string; icon: JSX.Element }[];
  onClose?: () => void;
}

// Example questions for each category to match against
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

// Previously asked questions to suggest
const popularQuestions: Record<string, string[]> = {
  'Parenting': [
    'How do I handle toddler tantrums in public?',
    'What are effective discipline strategies for a 3-year-old?'
  ],
  'Pregnancy': [
    'What foods should I avoid during pregnancy?',
    'How can I manage morning sickness in the first trimester?'
  ],
  'Feeding & Breastfeeding': [
    'Best breastfeeding positions for newborns?',
    'How do I know if my baby is getting enough milk?'
  ],
  'Diversification': [
    'Recommendations for baby food introduction?',
    'When should I start introducing solid foods to my baby?'
  ],
  'Others': [
    'What are some self-care tips for new moms?',
    'How do you maintain a work-life balance as a parent?'
  ]
};

const AskQuestionForm = ({ categories, onClose }: AskQuestionFormProps) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [errors, setErrors] = useState<{
    title?: string;
    details?: string;
    category?: string;
  }>({});
  const { toast } = useToast();

  useEffect(() => {
    // Find suggested categories based on question title and details
    const text = `${title} ${details}`.toLowerCase();
    
    const suggestions = Object.entries(categoryKeywords)
      .filter(([_, keywords]) => 
        keywords.some(keyword => text.includes(keyword.toLowerCase()))
      )
      .map(([category]) => category);
    
    // If no matches found, suggest "Others" category
    const finalSuggestions = suggestions.length > 0 ? suggestions : ['Others'];
    
    setSuggestedCategories([...new Set(finalSuggestions)]);
    
    // Find related questions from popular questions
    const related = Object.entries(popularQuestions)
      .filter(([category]) => 
        finalSuggestions.includes(category) || (selectedCategory && category === selectedCategory)
      )
      .flatMap(([_, questions]) => questions)
      .filter(question => 
        !title || question.toLowerCase().includes(title.toLowerCase())
      );
    
    setRelatedQuestions([...new Set(related)]);
  }, [title, details, selectedCategory]);

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

  const selectRelatedQuestion = (question: string) => {
    setTitle(question);
    
    // Try to determine category based on the question
    const category = Object.entries(popularQuestions)
      .find(([_, questions]) => questions.includes(question))?.[0];
    
    if (category) {
      setSelectedCategory(category);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle>Ask the Community</DialogTitle>
        <DialogDescription>
          Your question will be reviewed by our admins before being published to the community.
        </DialogDescription>
      </DialogHeader>
      
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
        
        {relatedQuestions.length > 0 && (
          <div className="mt-2 space-y-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Similar questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {relatedQuestions.map((question, i) => (
                <Button
                  key={i}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs text-left justify-start h-auto py-1 border-dashed border-gray-300"
                  onClick={() => selectRelatedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
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
        
        <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto">
          {categories.map((category) => (
            <Button
              key={category.name}
              type="button"
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              className={`rounded-full flex items-center ${selectedCategory === category.name ? 'bg-[#FFD9A7] text-foreground' : 'bg-white/80 border-[#B8CEC2]/50 hover:bg-[#B8CEC2]/30'}`}
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
