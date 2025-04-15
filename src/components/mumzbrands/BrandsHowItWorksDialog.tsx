
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Info, ShoppingBag, BadgePercent, HeartHandshake, Link as LinkIcon } from "lucide-react";

interface BrandsHowItWorksDialogProps {
  className?: string;
  trackingName?: string;
}

const BrandsHowItWorksDialog = ({ className, trackingName }: BrandsHowItWorksDialogProps) => {
  const steps = [
    {
      icon: <BadgePercent className="w-6 h-6 text-primary" />,
      title: "Exclusive Discounts",
      description: "Browse and access special discounts from both international and local brands for LeanOn community members.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-primary" />,
      title: "Support Local Businesses",
      description: "Discover and support mom-owned local brands that offer unique products and services.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <ShoppingBag className="w-6 h-6 text-primary" />,
      title: "Shop With Confidence",
      description: "All featured brands are vetted and trusted by our community of moms.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <LinkIcon className="w-6 h-6 text-primary" />,
      title: "Direct Brand Access",
      description: "Get direct links to brand websites and exclusive discount codes to use at checkout.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className={`rounded-full h-11 px-8 w-full sm:w-auto border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors flex items-center ${className || ""}`}
          trackingName={trackingName}
        >
          <Info className="h-5 w-5 mr-2 flex-shrink-0 my-auto" /> 
          <span className="my-auto">How It Works</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20 p-6 pt-8 pb-8 max-h-[95vh] overflow-y-auto">
        <DialogHeader className="relative mb-2">
          <DialogTitle className="text-2xl text-center mb-4">
            How LeanDeals Works
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Discover great brands with exclusive discounts
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

export default BrandsHowItWorksDialog;
