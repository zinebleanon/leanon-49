
import { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import ContactSellerDialog from "./ContactSellerDialog";
import { useNavigate } from 'react-router-dom';

interface MarketplaceItemCardProps {
  item: {
    title: string;
    seller: string;
    price: string;
    condition: string;
    image?: string;
    status?: string;
  };
}

const MarketplaceItemCard = ({ item }: MarketplaceItemCardProps) => {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  
  const handleSaveItem = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Item removed from saved items" : "Item saved",
      description: isSaved 
        ? `"${item.title}" has been removed from your saved items.` 
        : `"${item.title}" has been added to your saved items.`,
    });
  };
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "sold":
        return "bg-red-100 text-red-800";
      case "reserved":
        return "bg-yellow-100 text-yellow-800";
      case "available":
      default:
        return "bg-green-100 text-green-800";
    }
  };
  
  const handleContactClick = () => {
    // Open the contact dialog directly instead of just navigating
    setIsContactDialogOpen(true);
  };
  
  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-square relative overflow-hidden bg-muted">
          <img 
            src={item.image ? `/images/${item.image}.jpg` : "/placeholder.svg"} 
            alt={item.title}
            className="object-cover w-full h-full"
          />
          {item.status && (
            <div className="absolute top-2 right-2">
              <Badge className={`${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg truncate">{item.title}</h3>
          <p className="text-sm text-muted-foreground mb-2">{item.seller}</p>
          <div className="flex justify-between items-center">
            <span className="font-bold text-primary">{item.price}</span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{item.condition}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleContactClick}
            disabled={item.status === "sold"}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Contact
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSaveItem}
            className={isSaved ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </CardFooter>
      </Card>
      
      <ContactSellerDialog 
        open={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
        item={item}
      />
    </>
  );
};

export default MarketplaceItemCard;
