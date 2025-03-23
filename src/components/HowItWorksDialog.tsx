
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Info } from 'lucide-react';

interface HowItWorksDialogProps {
  className?: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "warm";
}

const HowItWorksDialog = ({ className, buttonVariant = "outline" }: HowItWorksDialogProps) => {
  const howItWorksSteps = [
    {
      title: "Connect with Moms",
      description: "Find and match with other moms in your neighborhood based on shared interests and children's ages."
    },
    {
      title: "Share Experiences",
      description: "Ask questions, share recommendations, and learn from other moms' experiences."
    },
    {
      title: "Access Deals & Resources",
      description: "Get exclusive access to curated deals, preloved items, and helpful parenting resources."
    },
    {
      title: "Build Your Support Network",
      description: "Create meaningful connections to make motherhood less isolating and more fulfilling."
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant} 
          size="lg" 
          className={`rounded-full px-6 ${className}`}
        >
          <Info className="mr-2 h-4 w-4" /> How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-6">
            How <span className="text-gradient">LeanOn</span> Works
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {howItWorksSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30"
            >
              <div className="shrink-0 bg-primary/10 rounded-full p-2 w-8 h-8 flex items-center justify-center">
                <span className="font-medium text-primary">{index + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HowItWorksDialog;
