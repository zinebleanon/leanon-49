
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { UserCircle, MapPin, MessageCircle, Heart, ArrowLeft, Info } from "lucide-react";
import HowItWorksDialog from "@/components/HowItWorksDialog";

const steps = [
  {
    icon: <UserCircle className="w-6 h-6 text-primary" />,
    title: "Create Your Profile",
    description: "Set up your profile with your interests, kids' details, and your location.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Find Local Moms",
    description: "Use the 'Find Moms Around' feature to discover moms near you who share similar interests and have children of similar ages.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "Connect & Chat",
    description: "Send a LeanOn request to moms you'd like to connect with, then start a conversation to plan meetups.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Meet In Person",
    description: "Arrange playdates, coffee meetups, or other activities to build real-world connections with local moms.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
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
          className={`rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors ${className}`}
        >
          <Info className="mr-2 h-5 w-5" /> How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-center mb-6">
            How To Find Moms Near You
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
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

export default HowItWorksModal;
