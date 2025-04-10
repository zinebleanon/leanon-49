
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info, Search, Package, MessageCircle, CheckCircle } from "lucide-react";

const MarketplaceHowItWorksDialog = () => {
  const steps = [
    {
      icon: <Search className="w-6 h-6 text-primary" />,
      title: "Find Preloved Items",
      description: "Browse through a variety of gently used children's items listed by other moms in the community.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <Package className="w-6 h-6 text-primary" />,
      title: "List Your Items",
      description: "Easily list your preloved items with photos, descriptions, and preferred price to find a new home for them.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "Connect With Sellers",
      description: "Message other moms directly to arrange pickup, delivery, or ask questions about listed items.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Trusted Community",
      description: "All marketplace interactions happen within our trusted community of verified moms for added safety and peace of mind.",
      bgColor: "from-[#FFF8E7] to-[#FFF8E7]/80" 
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="rounded-full px-6 border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground active:bg-[#FFD9A7]/90 transition-colors flex items-center"
        >
          <Info className="h-5 w-5 mr-2 flex-shrink-0 my-auto" /> 
          <span className="my-auto">How It Works</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-pastel-green/10 to-pastel-yellow/20">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl text-center mb-6">
            How To Use MumzMarketplace
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

export default MarketplaceHowItWorksDialog;
