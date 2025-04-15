import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

const categoryKeywords: Record<string, string[]> = {
  'Parenting': ['toddler', 'tantrum', 'discipline', 'child', 'behavior', 'parent', 'kids', 'children'],
  'Pregnancy': ['pregnant', 'trimester', 'baby', 'birth', 'ultrasound', 'expecting', 'maternity', 'nausea'],
  'Birth': ['labor', 'delivery', 'contractions', 'birth plan', 'midwife', 'water birth', 'c-section', 'epidural'],
  'Postpartum': ['recovery', 'after birth', 'postpartum', 'depression', 'newborn', 'fourth trimester', 'healing'],
  'Health': ['doctor', 'pediatrician', 'fever', 'sick', 'symptoms', 'medicine', 'vaccine', 'shots', 'health'],
  'Sleep': ['sleeping', 'nap', 'bedtime', 'routine', 'night', 'wake', 'tired', 'rest', 'dream', 'insomnia'],
  'Teething': ['teeth', 'tooth', 'gum', 'drool', 'pain', 'chew', 'oral', 'teether', 'bite', 'sore'],
  'Diversification': ['solid food', 'introduce food', 'baby food', 'puree', 'feeding', 'blw', 'weaning'],
  'Feeding & Breastfeeding': ['breastfeed', 'nursing', 'bottle', 'formula', 'latch', 'milk', 'pump', 'nipple'],
  'Shopping': ['gear', 'stroller', 'crib', 'car seat', 'clothes', 'toys', 'buy', 'purchase', 'recommend'],
  'Schools & Nurseries': ['preschool', 'daycare', 'school', 'nursery', 'education', 'learning', 'kindergarten'],
  'Nannies': ['nanny', 'babysitter', 'childcare', 'au pair', 'caregiver', 'sitter', 'childminder'],
  'Entertainment & Birthday': ['party', 'activity', 'birthday', 'holiday', 'event', 'celebration', 'gift', 'present'],
  'Others': [] // Empty array for Others category - will catch any unmatched keywords
};

interface AskQuestionFormProps {
  categories: { name: string; icon: React.ReactNode }[];
  isNeighborhood?: boolean;
  onClose: () => void;
}

const AskQuestionForm = ({ categories, isNeighborhood = false, onClose }: AskQuestionFormProps) => {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !question || !category) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to ask your question.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const questionData = {
        title,
        content: question,
        category,
        is_neighborhood: isNeighborhood,
        user_id: user?.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: 'active',
      };

      const { error } = await supabase
        .from('community_questions')
        .insert([questionData]);

      if (error) throw error;

      toast({
        title: "Question submitted",
        description: "Your question has been posted to the community.",
        variant: "default",
      });

      setTitle('');
      setQuestion('');
      setCategory('');
      onClose();
    } catch (error) {
      console.error('Error submitting question:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-2">
      <div className="space-y-2 mb-4">
        <h2 className="text-xl font-semibold leading-none tracking-tight">
          {isNeighborhood ? 'Ask Your Neighborhood' : 'Ask the Community'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isNeighborhood 
            ? 'Get advice and support from mums in your neighborhood.' 
            : 'Get advice and support from our community of mums.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                {categories.map((cat, idx) => (
                  <SelectItem 
                    key={idx} 
                    value={cat.name}
                    className="flex items-center cursor-pointer py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      {cat.icon}
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Brief title for your question"
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Describe your question in detail..."
            rows={5}
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Question'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export { AskQuestionForm };
