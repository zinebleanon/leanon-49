
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Bell } from 'lucide-react';

interface StatusUpdateReminderProps {
  itemName: string;
  createdDate: string;
}

export const StatusUpdateReminder = ({ itemName, createdDate }: StatusUpdateReminderProps) => {
  const [lastReminded, setLastReminded] = useState<string | null>(null);
  
  useEffect(() => {
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
  }, [itemName, createdDate, lastReminded]);
  
  return null; // This is a non-visual component
};
