
import { BookOpen, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RibbonIcon from '@/components/ui/RibbonIcon';
import DealsHowItWorksDialog from '@/components/mumzdeals/DealsHowItWorksDialog';

interface GuideHerHeroProps {
  onOpenContentDialog?: () => void;
}

const GuideHerHero = ({ onOpenContentDialog }: GuideHerHeroProps) => {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
        <span className="text-black">Guide</span> <span className="text-orange-500">Her</span>
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        Personalized expert content for every stage of your motherhood journey
      </p>
      <div className="flex flex-wrap gap-4 mt-8">
        <DealsHowItWorksDialog />
        <Button 
          size="md"
          className="rounded-full h-11 px-8 w-full sm:w-auto border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all flex items-center active:scale-95"
          onClick={onOpenContentDialog}
        >
          <BookOpen className="h-5 w-5 mr-2 flex-shrink-0" />
          <span>Browse Content</span>
        </Button>
      </div>
    </div>
  );
};

export default GuideHerHero;
