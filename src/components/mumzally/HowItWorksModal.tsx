
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCircle, MapPin, MessageCircle, Heart } from "lucide-react";

const steps = [
  {
    icon: <UserCircle className="w-6 h-6 text-primary" />,
    title: "Create Your Profile",
    description: "Set up your profile with your interests, kids' details, and preferences.",
    bgColor: "bg-pastel-green/30"
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Find Local Mumz",
    description: "Connect with mumz in your neighborhood who share similar interests.",
    bgColor: "bg-pastel-yellow/30"
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "It Starts With a Chat",
    description: "Begin by messaging other mumz who seem like a good match for your family.",
    bgColor: "bg-orange-200/50"
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Build Friendships",
    description: "Create lasting friendships with other mumz in your community.",
    bgColor: "bg-pink-100/50"
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
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-6">
            How <span className="text-gradient">Mumz Ally</span> Works
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 p-4 rounded-lg ${step.bgColor} border border-white/40 shadow-sm`}
            >
              <div className="shrink-0 p-2 bg-background rounded-full shadow-sm">
                {step.icon}
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
