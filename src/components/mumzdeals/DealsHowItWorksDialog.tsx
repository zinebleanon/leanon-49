
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, Tag, ShoppingBag, Calendar, Bell } from "lucide-react";

const DealsHowItWorksDialog = () => {
  const steps = [
    {
      icon: <Tag className="w-6 h-6 text-primary" />,
      title: "Discover Exclusive Deals",
      description: "Browse through curated deals and offers specifically selected for moms and families.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-primary" />,
      title: "Shop by Category",
      description: "Find deals organized by categories like Baby Gear, Clothing, Toys, and more for easy navigation.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Limited-Time Offers",
      description: "Take advantage of time-sensitive deals that are regularly updated to ensure you get the best savings.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <Bell className="w-6 h-6 text-primary" />,
      title: "Get Deal Alerts",
      description: "Join the community to receive notifications about new deals that match your interests.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full px-6 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all"
        >
          <Info className="mr-2 h-5 w-5" /> How It Works
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-center mb-6">
            How To Use MumzDeals
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

export default DealsHowItWorksDialog;
