
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

const howItWorksSteps = [
  {
    icon: <UserCircle className="w-6 h-6 text-primary" />,
    title: "Create Your Profile",
    description: "Set up your profile with your interests, kids' details, and preferences.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80"
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Find Local Mumz",
    description: "Connect with mumz in your neighborhood who share similar interests.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80"
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "Chat & Connect",
    description: "Begin by messaging other mumz who seem like a good match for your family.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80"
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Build Friendships",
    description: "Create lasting friendships with other mumz in your community.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80"
  }
];

const HowItWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full w-full sm:w-auto"
        >
          How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20">
        <DialogClose asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-4 left-4 p-2 h-auto text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            <span>Back</span>
          </Button>
        </DialogClose>
        
        <div className="pt-16 md:pt-12"></div>
        
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

export default HowItWorksDialog;
