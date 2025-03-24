
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { UserCircle, MapPin, MessageCircle, Heart, ArrowLeft } from "lucide-react";

const steps = [
  {
    icon: <UserCircle className="w-6 h-6 text-primary" />,
    title: "Create Your Profile",
    description: "Set up your profile with your interests, kids' details, and preferences.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" // Match the Find/Ally background
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Find Local Mumz",
    description: "Connect with mumz in your neighborhood who share similar interests.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" // Match the Find/Ally background
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "It Starts With a Chat",
    description: "Begin by messaging other mumz who seem like a good match for your family.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" // Match the Ask background
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Build Friendships",
    description: "Create lasting friendships with other mumz in your community.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" // Match the community connection background
  }
];

interface HowItWorksModalProps {
  className?: string;
}

const HowItWorksModal = ({ className }: HowItWorksModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg" 
          className={`rounded-full w-full sm:w-auto mt-3 sm:mt-0 ${className}`}
        >
          How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20">
        <DialogHeader className="relative">
          <div className="flex items-center">
            <DialogClose asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-0 left-0 p-2 h-auto text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
            </DialogClose>
          </div>
          
          <div className="pt-8"></div>
          
          <DialogTitle className="text-2xl text-center mb-6">
            How <span className="text-gradient">Mumz Ally</span> Works
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg bg-gradient-to-br ${step.bgColor} border border-[#FFF8E7] shadow-sm`}
            >
              <div className="shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shadow-sm">
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

export default HowItWorksModal;
