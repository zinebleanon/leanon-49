
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Send,
  AlertCircle,
  Tag,
  ArrowLeft,
  Search
} from 'lucide-react';
import { DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';

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

const popularQuestions: Record<string, string[]> = {
  'Parenting': [
    'How do I handle toddler tantrums in public?',
    'What are effective discipline strategies for a 3-year-old?',
    'How to deal with sibling rivalry?',
    'What's the best approach for nighttime potty training?'
  ],
  'Pregnancy': [
    'What foods should I avoid during pregnancy?',
    'How can I manage morning sickness in the first trimester?',
    'When should I start preparing the nursery?',
    'What pregnancy exercises are safe in the third trimester?'
  ],
  'Birth': [
    'What should be in my hospital bag for delivery?',
    'How do I create an effective birth plan?',
    'What are the signs of labor I should watch for?',
    'How long is recovery from a C-section?'
  ],
  'Postpartum': [
    'How to cope with postpartum depression?',
    'What's normal in postpartum recovery?',
    'When can I start exercising after birth?',
    'Tips for managing with a newborn while recovering?'
  ],
  'Health': [
    'When should I worry about my child's fever?',
    'What vaccinations are recommended for infants?',
    'How to soothe a teething baby?',
    'Signs that my child needs to see a doctor?'
  ],
  'Feeding & Breastfeeding': [
    'Best breastfeeding positions for newborns?',
    'How do I know if my baby is getting enough milk?',
    'Tips for increasing milk supply?',
    'How to deal with painful breastfeeding?'
  ],
  'Diversification': [
    'Recommendations for baby food introduction?',
    'When should I start introducing solid foods to my baby?',
    'Best first foods for babies?',
    'How to introduce potential allergens safely?'
  ],
  'Others': [
    'What are some self-care tips for new moms?',
    'How do you maintain a work-life balance as a parent?',
    'Recommendations for baby-friendly vacation spots?',
    'How to find a supportive mom group in my area?'
  ]
};

const AskQuestionForm = ({ categories, onClose }: AskQuestionFormProps) => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suggestedCategories, setSuggestedCategories] = useState<string[]>([]);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    details?: string;
    category?: string;
  }>({});
  const { toast } = useToast();

  useEffect(() => {
    if (title.length > 2) {
      setIsSearching(true);
      
      // Debounce the search to avoid too many updates
      const timer = setTimeout(() => {
        const text = `${title} ${details}`.toLowerCase();
        
        const suggestions = Object.entries(categoryKeywords)
          .filter(([_, keywords]) => 
            keywords.some(keyword => text.includes(keyword.toLowerCase()))
          )
          .map(([category]) => category);
        
        const finalSuggestions = suggestions.length > 0 ? suggestions : ['Others'];
        
        setSuggestedCategories([...new Set(finalSuggestions)]);
        
        // Find related questions based on title
        const allQuestions = Object.values(popularQuestions).flat();
        const related = allQuestions.filter(question => 
          question.toLowerCase().includes(title.toLowerCase())
        );
        
        // If no exact matches, try to find questions containing any word from the title
        if (related.length === 0 && title.length > 3) {
          const titleWords = title.toLowerCase().split(/\s+/).filter(word => word.length > 3);
          const fuzzyMatches = allQuestions.filter(question => 
            titleWords.some(word => question.toLowerCase().includes(word))
          );
          setRelatedQuestions([...new Set(fuzzyMatches)].slice(0, 5));
        } else {
          setRelatedQuestions([...new Set(related)].slice(0, 5));
        }
        
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setRelatedQuestions([]);
      setIsSearching(false);
    }
  }, [title, details]);

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
      
      setTitle('');
      setDetails('');
      setSelectedCategory('');
      
      if (onClose) {
        onClose();
      }
    }
  };

  const selectRelatedQuestion = (question: string) => {
    setTitle(question);
    
    // Find which category contains this question
    const categoryEntry = Object.entries(popularQuestions)
      .find(([_, questions]) => questions.includes(question));
    
    if (categoryEntry) {
      setSelectedCategory(categoryEntry[0]);
      
      // Also set a reasonable default for details based on the question
      if (!details) {
        setDetails(`I'm looking for advice about ${question.toLowerCase().replace(/\?$/, '')}. Any experiences or tips would be helpful.`);
      }
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
        <label htmlFor="question-title" className="text-sm font-medium flex justify-between">
          <span>Question Title</span>
          {title.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {title.length} characters
            </span>
          )}
        </label>
        <div className="relative">
          <Input
            id="question-title"
            placeholder="What would you like to ask?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={isSearching ? "pr-10" : ""}
          />
          {isSearching && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
          )}
        </div>
        {errors.title && (
          <p className="text-destructive text-xs flex items-center gap-1 mt-1">
            <AlertCircle className="h-3 w-3" />
            {errors.title}
          </p>
        )}
        
        {relatedQuestions.length > 0 && (
          <div className="mt-3 space-y-2 bg-muted/30 rounded-lg p-3 border border-muted">
            <p className="text-sm text-foreground font-medium flex items-center gap-1">
              <Search className="h-3.5 w-3.5" />
              Similar questions from the community:
            </p>
            <div className="flex flex-col gap-2">
              {relatedQuestions.map((question, i) => (
                <Button
                  key={i}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-sm text-left justify-start h-auto py-2 border-dashed border-muted hover:bg-accent"
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
