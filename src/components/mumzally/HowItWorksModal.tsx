
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
    description: "Set up your profile with your interests, kids' details, and preferences.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <MapPin className="w-6 h-6 text-primary" />,
    title: "Find Local Moms",
    description: "Connect with moms in your neighborhood who share similar interests.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-primary" />,
    title: "It Starts With a Chat",
    description: "Begin by messaging other moms who seem like a good match for your family.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  },
  {
    icon: <Heart className="w-6 h-6 text-primary" />,
    title: "Build Friendships",
    description: "Create lasting friendships with other moms in your community.",
    bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
  }
];

interface HowItWorksModalProps {
  className?: string;
}

const HowItWorksModal = ({ className }: HowItWorksModalProps) => {
  return <HowItWorksDialog className={className} buttonVariant="warm" />;
};

export default HowItWorksModal;
