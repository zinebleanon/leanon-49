
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Info, ArrowLeft } from 'lucide-react';
import BowIcon from './ui/BowIcon';

interface HowItWorksDialogProps {
  className?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "warm";
}

const HowItWorksDialog = ({ className, buttonVariant = "outline" }: HowItWorksDialogProps) => {
  const howItWorksSteps = [
    {
      title: "Sign up",
      description: "Create your profile & join the <span class='font-adlery'>LeanOn</span> community.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" // Match the Find/Ally background
    },
    {
      title: "Find & Connect",
      description: "Match with moms in your neighborhood based on shared interests and children's ages.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" // Match the Find/Ally background
    },
    {
      title: "Ask & Share",
      description: "Exchange recommendations, experiences, and support with other moms.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" // Match the Ask background
    },
    {
      title: "Access Deals & Preloved Market",
      description: "Get exclusive deals and buy/sell preloved items from trusted moms.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" // Match the Deals/Preloved background
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant}
          size="lg" 
          className={`rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors ${className}`}
        >
          <Info className="mr-2 h-4 w-4" /> How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20">
        <DialogClose asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-2 left-2 p-2 h-auto text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </Button>
        </DialogClose>
        
        <div className="pt-8"></div>
        
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-6">
            How <span className="font-adlery text-gradient">LeanOn</span> Works
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br ${step.bgColor} border border-[#FFF8E7] shadow-sm`}
            >
              <div className="shrink-0 bg-white rounded-full p-2 w-8 h-8 flex items-center justify-center shadow-sm">
                <span className="font-medium text-primary">{index + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: step.description }}></p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksDialog;
