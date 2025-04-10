
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { MessageCircle, Search, UserCheck, Tag, Info } from "lucide-react";

interface AskHowItWorksModalProps {
  className?: string;
}

const AskHowItWorksModal = ({ className }: AskHowItWorksModalProps) => {
  const steps = [
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Ask Questions",
      description: "Post your parenting questions to get advice and support from other moms who've been there.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Find Similar Questions",
      description: "See if other moms have already asked about your topic and browse existing answers.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <Tag className="w-6 h-6 text-primary" />,
      title: "Browse Categories",
      description: "Explore questions by categories like Parenting, Health, Feeding, and more to find relevant information.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <UserCheck className="w-6 h-6 text-primary" />,
      title: "Connect with Your Neighborhood",
      description: "Join local meetups, find help from nearby moms, or discover family-friendly events in your area.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className={`rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors flex items-center ${className}`}
        >
          <Info className="h-5 w-5 mr-2 flex-shrink-0 my-auto" /> 
          <span className="my-auto">How It Works</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20 p-6 pt-8 pb-8 max-h-[95vh] overflow-y-auto">
        <DialogHeader className="relative mb-2">
          <DialogTitle className="text-2xl text-center mb-4">
            How To Use LeanOn Community
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Get advice and support from other moms
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 mt-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br ${step.bgColor} border border-[#FFF8E7] shadow-sm`}
            >
              <div className="shrink-0 w-10 h-10 bg-[#FFD9A7] rounded-full p-2 flex items-center justify-center shadow-sm">
                <span className="font-medium text-foreground">{index + 1}</span>
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

export default AskHowItWorksModal;
