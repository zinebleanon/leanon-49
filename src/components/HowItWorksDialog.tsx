
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Info } from 'lucide-react';
import BowIcon from './ui/BowIcon';

interface HowItWorksDialogProps {
  className?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "warm";
  trackingName?: string;
}

const HowItWorksDialog = ({ className, buttonVariant = "outline", trackingName }: HowItWorksDialogProps) => {
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
          className={`rounded-full h-11 px-8 w-full sm:w-auto border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors flex items-center ${className}`}
          trackingName={trackingName}
        >
          <Info className="h-5 w-5 mr-2 flex-shrink-0 my-auto" /> 
          <span className="my-auto">How It Works</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20 p-6 pt-8 pb-8 max-h-[95vh] overflow-y-auto">
        <DialogHeader className="relative mb-2">
          <DialogTitle className="text-2xl text-center mb-4">
            How <span className="font-adlery text-gradient">LeanOn</span> Works
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Your complete mom community platform
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 mt-2">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br ${step.bgColor} border border-[#FFF8E7] shadow-sm`}
            >
              <div className="shrink-0 w-10 h-10 bg-[#FFD9A7] rounded-full p-2 flex items-center justify-center shadow-sm">
                <span className="font-medium text-foreground">{index + 1}</span>
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
