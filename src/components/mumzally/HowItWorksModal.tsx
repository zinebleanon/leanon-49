
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserCircle, MapPin, CalendarCheck, Heart } from "lucide-react";

const steps = [
  {
    icon: <UserCircle className="w-6 h-6 text-primary" />,
    title: "Create Your Profile",
    description: "Set up your profile with your interests, kids' details, and preferences."
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Find Local Mumz",
    description: "Connect with mumz in your neighborhood who share similar interests."
  },
  {
    icon: <CalendarCheck className="w-6 h-6 text-primary" />,
    title: "Schedule Meetups",
    description: "Arrange playdates, coffee meetups, or join local activities together."
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Build Friendships",
    description: "Create lasting friendships with other mumz in your community."
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-6">
            How <span className="text-gradient">Mumz Ally</span> Works
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30"
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
