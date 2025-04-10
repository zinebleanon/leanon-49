
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

const DealsHowItWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="md" 
          className="rounded-full px-4 border bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground active:opacity-95 transition-all flex items-center h-9"
        >
          <Info className="h-4 w-4 mr-1.5 flex-shrink-0" /> 
          <span>How It Works</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center mb-6">
            How Mumz Deals Work
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-start gap-4 p-4 rounded-lg bg-white">
            <div className="shrink-0 w-10 h-10 bg-amber-100 rounded-full p-2 flex items-center justify-center">
              <span className="font-medium text-amber-800">1</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Browse Deals</h3>
              <p className="text-sm text-muted-foreground">Explore exclusive offers and deals from our partner brands, carefully selected for moms like you.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-white">
            <div className="shrink-0 w-10 h-10 bg-amber-100 rounded-full p-2 flex items-center justify-center">
              <span className="font-medium text-amber-800">2</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Get Discount Codes</h3>
              <p className="text-sm text-muted-foreground">Claim special discount codes to use when shopping with our partner brands.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-white">
            <div className="shrink-0 w-10 h-10 bg-amber-100 rounded-full p-2 flex items-center justify-center">
              <span className="font-medium text-amber-800">3</span>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Shop & Save</h3>
              <p className="text-sm text-muted-foreground">Shop directly with our partner brands using your exclusive discount codes to enjoy special savings.</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DealsHowItWorksDialog;
