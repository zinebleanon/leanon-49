
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { StatusUpdateReminder } from './StatusUpdateReminder';
import { Check, Clock, X, Tag, AlertTriangle, CheckCircle2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMarketplaceListings, MarketplaceListing } from '@/hooks/use-marketplace-listings';

const ListedItemsSection = () => {
  const navigate = useNavigate();
  const { listedItems, pendingApprovalItems, updateListing } = useMarketplaceListings();
  
  const handleStatusChange = async (itemId: string, newStatus: "available" | "sold" | "reserved") => {
    const { error } = await updateListing(itemId, { status: newStatus });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Status Updated",
      description: `Item status has been updated to ${newStatus}.`
    });
  };
  
  const closeItem = async (itemId: string) => {
    const { error } = await updateListing(itemId, { status: 'sold' });
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to close listing. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Listing Closed",
      description: "Your item has been marked as sold and the listing is now closed."
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Tag className="h-4 w-4 text-green-500" />;
      case 'sold':
        return <CheckCircle2 className="h-4 w-4 text-red-500" />;
      case 'reserved':
        return <Clock className="h-4 w-4 text-amber-500" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };
  
  const viewMessages = () => {
    navigate('/inbox');
    // Select the preloved tab when navigating
    localStorage.setItem('inboxActiveTab', 'messages');
    localStorage.setItem('inboxMessageTab', 'preloved');
  };
  
  return (
    <div className="space-y-8">
      {pendingApprovalItems.length > 0 && (
        <Card>
          <CardHeader className="bg-amber-50 border-b">
            <CardTitle className="text-xl flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Pending Approval
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {pendingApprovalItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-md hover:bg-gray-50 transition-colors">
                  <StatusUpdateReminder itemName={item.title} createdDate={item.created_at} isPending={true} />
                  <div className="flex gap-4">
                    {item.image_url && (
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline" className="bg-green-50">{item.price}</Badge>
                        <Badge variant="outline" className="bg-blue-50">{item.condition}</Badge>
                        <Badge variant="outline" className="bg-purple-50">{item.age_group}</Badge>
                        {item.size !== "Not Applicable" && (
                          <Badge variant="outline" className="bg-gray-50">Size: {item.size}</Badge>
                        )}
                        <Badge variant="outline">{item.sub_category}</Badge>
                        <Badge variant="outline">{item.brand}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm text-amber-700">Awaiting admin review</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {listedItems.length > 0 ? (
        <Card>
          <CardHeader className="bg-green-50 border-b flex flex-row justify-between items-center">
            <CardTitle className="text-xl flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              Your Listings
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={viewMessages}
            >
              <MessageSquare className="mr-2 h-3 w-3" />
              View Messages
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {listedItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-md hover:bg-gray-50 transition-colors">
                  <StatusUpdateReminder itemName={item.title} createdDate={item.created_at} />
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      {item.image_url && (
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-2">{item.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-green-50">{item.price}</Badge>
                          <Badge variant="outline" className="bg-blue-50">{item.condition}</Badge>
                          <Badge variant="outline" className="bg-purple-50">{item.age_group}</Badge>
                          {item.size !== "Not Applicable" && (
                            <Badge variant="outline" className="bg-gray-50">Size: {item.size}</Badge>
                          )}
                          <Badge variant="outline">{item.sub_category}</Badge>
                          <Badge variant="outline">{item.brand}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.status)}
                        <Select 
                          value={item.status} 
                          onValueChange={(value) => handleStatusChange(item.id, value as "available" | "sold" | "reserved")}
                        >
                          <SelectTrigger className="h-8 w-[140px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="reserved">Reserved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => closeItem(item.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Close Listing
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center p-8 border rounded-md bg-gray-50">
          <p className="text-muted-foreground">You don't have any listings yet.</p>
        </div>
      )}
    </div>
  );
};

export default ListedItemsSection;
