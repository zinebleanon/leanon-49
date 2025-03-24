
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Info } from 'lucide-react';
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
      bgColor: "bg-pastel-green/30"
    },
    {
      title: "Find & Connect",
      description: "Match with moms in your neighborhood based on shared interests and children's ages.",
      bgColor: "bg-pastel-yellow/30"
    },
    {
      title: "Ask & Share",
      description: "Exchange recommendations, experiences, and support with other moms.",
      bgColor: "bg-orange-200/50"
    },
    {
      title: "Access Deals & Preloved Market",
      description: "Get exclusive deals and buy/sell preloved items from trusted moms.",
      bgColor: "bg-pink-100/50"
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
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-6">
            How <span className="font-adlery text-gradient">LeanOn</span> Works
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg ${step.bgColor} border border-white/40 shadow-sm`}
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
