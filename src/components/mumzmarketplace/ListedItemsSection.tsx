
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { StatusUpdateReminder } from './StatusUpdateReminder';

const ListedItemsSection = () => {
  const [listedItems, setListedItems] = useState<any[]>([]);
  const [pendingApprovalItems, setPendingApprovalItems] = useState<any[]>([]);
  
  useEffect(() => {
    const items = localStorage.getItem('listedItems');
    if (items) {
      const parsedItems = JSON.parse(items);
      const approved = parsedItems.filter((item: any) => item.approved);
      const pending = parsedItems.filter((item: any) => !item.approved);
      setListedItems(approved);
      setPendingApprovalItems(pending);
    }
  }, []);
  
  const handleStatusChange = (itemId: string, newStatus: string) => {
    const allItems = localStorage.getItem('listedItems');
    if (!allItems) return;
    
    const parsedItems = JSON.parse(allItems);
    const updatedItems = parsedItems.map((item: any) => {
      if (item.id === itemId) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    
    localStorage.setItem('listedItems', JSON.stringify(updatedItems));
    
    const updatedApproved = updatedItems.filter((item: any) => item.approved);
    setListedItems(updatedApproved);
    
    toast({
      title: "Status Updated",
      description: `Item status has been updated to ${newStatus}.`
    });
  };
  
  return (
    <div className="space-y-8">
      {pendingApprovalItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovalItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-md">
                  <StatusUpdateReminder itemName={item.title} createdDate={item.createdDate} isPending={true} />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold">{item.title}</h3>
                    <div className="flex flex-wrap gap-1">
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {listedItems.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Your Approved Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {listedItems.map((item) => (
                <div key={item.id} className="border p-4 rounded-md">
                  <StatusUpdateReminder itemName={item.title} createdDate={item.createdDate} />
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
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
                    <div>
                      <Select 
                        value={item.status} 
                        onValueChange={(value) => handleStatusChange(item.id, value)}
                      >
                        <SelectTrigger className="h-8 w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center p-8 border rounded-md bg-gray-50">
          <p className="text-muted-foreground">You don't have any approved listings yet.</p>
        </div>
      )}
    </div>
  );
};

export default ListedItemsSection;
