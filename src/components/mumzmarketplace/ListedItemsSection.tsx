
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatusUpdateReminder } from './StatusUpdateReminder';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, PlusCircle, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import EditListingDialog from './EditListingDialog';

interface ListedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  brand: string;
  ageGroup: string;
  size: string;
  condition: string;
  price: string;
  createdDate: string;
  status: string;
  approved: boolean;
}

const ListedItemsSection = () => {
  const [listedItems, setListedItems] = useState<ListedItem[]>([]);
  const [pendingApprovalItems, setPendingApprovalItems] = useState<ListedItem[]>([]);
  const [editingItem, setEditingItem] = useState<ListedItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  useEffect(() => {
    const items = localStorage.getItem('listedItems');
    if (items) {
      const parsedItems = JSON.parse(items);
      const approved = parsedItems.filter((item: ListedItem) => item.approved);
      const pending = parsedItems.filter((item: ListedItem) => !item.approved);
      setListedItems(approved);
      setPendingApprovalItems(pending);
    }
  }, []);
  
  const handleStatusChange = (itemId: string, newStatus: string) => {
    const allItems = localStorage.getItem('listedItems');
    if (!allItems) return;
    
    const parsedItems = JSON.parse(allItems);
    const updatedItems = parsedItems.map((item: ListedItem) => {
      if (item.id === itemId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    
    localStorage.setItem('listedItems', JSON.stringify(updatedItems));
    
    const updatedApproved = updatedItems.filter((item: ListedItem) => item.approved);
    setListedItems(updatedApproved);
    
    toast({
      title: "Status Updated",
      description: `Item status has been updated to ${newStatus}.`
    });
  };
  
  const handleEditClick = (item: ListedItem) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteItem = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      const allItems = localStorage.getItem('listedItems');
      if (!allItems) return;
      
      const parsedItems = JSON.parse(allItems);
      const updatedItems = parsedItems.filter((item: ListedItem) => item.id !== itemId);
      
      localStorage.setItem('listedItems', JSON.stringify(updatedItems));
      
      const updatedApproved = updatedItems.filter((item: ListedItem) => item.approved);
      const updatedPending = updatedItems.filter((item: ListedItem) => !item.approved);
      
      setListedItems(updatedApproved);
      setPendingApprovalItems(updatedPending);
      
      toast({
        title: "Listing Deleted",
        description: "Your listing has been removed from the marketplace."
      });
    }
  };
  
  const handleSaveEdit = (updatedItem: ListedItem) => {
    const allItems = localStorage.getItem('listedItems');
    if (!allItems) return;
    
    const parsedItems = JSON.parse(allItems);
    const updatedItems = parsedItems.map((item: ListedItem) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    
    localStorage.setItem('listedItems', JSON.stringify(updatedItems));
    
    const updatedApproved = updatedItems.filter((item: ListedItem) => item.approved);
    setListedItems(updatedApproved);
    
    setIsEditDialogOpen(false);
    setEditingItem(null);
    
    toast({
      title: "Listing Updated",
      description: "Your listing has been successfully updated."
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="active">
        <TabsList className="w-full md:w-[300px]">
          <TabsTrigger value="active">Active Listings</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {listedItems.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="mb-4 flex justify-center">
                <PlusCircle className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Active Listings Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start selling your preloved items by creating your first listing.
              </p>
              <Button asChild>
                <Link to="/marketplace/sell" className="inline-flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create New Listing
                </Link>
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {listedItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <StatusUpdateReminder itemName={item.title} createdDate={item.createdDate} />
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          <Badge variant="outline">{item.price}</Badge>
                          <Badge variant="outline">{item.condition}</Badge>
                          <Badge variant="outline">{item.ageGroup}</Badge>
                          {item.size !== "Not Applicable" && (
                            <Badge variant="outline">Size: {item.size}</Badge>
                          )}
                          <Badge variant="outline">{item.subCategory}</Badge>
                          <Badge variant="outline">{item.brand}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Select 
                          value={item.status} 
                          onValueChange={(value) => handleStatusChange(item.id, value)}
                        >
                          <SelectTrigger className="h-8 w-[130px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="reserved">Reserved</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="flex gap-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 px-2 w-[130px]"
                            onClick={() => handleEditClick(item)}
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit Listing
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending">
          {pendingApprovalItems.length === 0 ? (
            <Card className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No Pending Listings</h3>
              <p className="text-muted-foreground">
                You don't have any listings awaiting approval at the moment.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {pendingApprovalItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="pt-6">
                    <StatusUpdateReminder itemName={item.title} createdDate={item.createdDate} isPending={true} />
                    <div className="flex flex-col gap-2">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <Badge variant="outline">{item.price}</Badge>
                        <Badge variant="outline">{item.condition}</Badge>
                        <Badge variant="outline">{item.ageGroup}</Badge>
                        {item.size !== "Not Applicable" && (
                          <Badge variant="outline">Size: {item.size}</Badge>
                        )}
                        <Badge variant="outline">{item.subCategory}</Badge>
                        <Badge variant="outline">{item.brand}</Badge>
                        <Badge variant="secondary">Pending Approval</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {editingItem && (
        <EditListingDialog 
          item={editingItem}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ListedItemsSection;
