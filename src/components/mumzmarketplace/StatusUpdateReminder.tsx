
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Bell, AlertTriangle } from 'lucide-react';

interface StatusUpdateReminderProps {
  itemName: string;
  createdDate: string;
  isPending?: boolean;
}

export const StatusUpdateReminder = ({ itemName, createdDate, isPending = false }: StatusUpdateReminderProps) => {
  const [lastReminded, setLastReminded] = useState<string | null>(null);
  
  useEffect(() => {
    // If the item is pending approval, don't set up reminders yet
    if (isPending) return;
    
    // Check if it's time to remind the user
    const checkReminderStatus = () => {
      const now = new Date();
      const itemCreatedDate = new Date(createdDate);
      const lastRemindedDate = lastReminded ? new Date(lastReminded) : null;
      
      // Calculate if a month has passed since creation or last reminder
      const oneMonthLater = new Date(lastRemindedDate || itemCreatedDate);
      oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
      
      if (now >= oneMonthLater) {
        // Send reminder notification
        toast({
          title: "Item Status Update Needed",
          description: `Please update the status of your listing "${itemName}". Is it still available?`,
          action: (
            <div className="flex items-center">
              <Bell className="h-4 w-4 mr-1" />
              <span>Update Now</span>
            </div>
          ),
        });
        
        // Update the last reminded date
        setLastReminded(now.toISOString());
        localStorage.setItem(`reminder_${itemName}`, now.toISOString());
      }
    };
    
    // Get last reminded date from localStorage
    const storedReminderDate = localStorage.getItem(`reminder_${itemName}`);
    if (storedReminderDate) {
      setLastReminded(storedReminderDate);
    }
    
    // Check on component mount
    checkReminderStatus();
    
    // Set up a daily check (in a real app this would be handled by backend)
    const intervalId = setInterval(checkReminderStatus, 86400000); // 24 hours
    
    return () => clearInterval(intervalId);
  }, [itemName, createdDate, lastReminded, isPending]);
  
  if (isPending) {
    return (
      <div className="flex items-center justify-center bg-amber-50 text-amber-800 p-2 mb-3 rounded-md">
        <AlertTriangle className="h-4 w-4 mr-2" />
        <span className="text-sm">Pending admin approval</span>
      </div>
    );
  }
  
  return null; // Non-visual component for approved items
};
