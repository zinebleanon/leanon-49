
import { useState, useEffect } from "react";
import { Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  isPushNotificationSupported, 
  askNotificationPermission,
  subscribeToPushNotifications 
} from "@/utils/pushNotifications";
import { useUserInfo } from "@/hooks/use-user-info";

interface NotificationSubscriberProps {
  className?: string;
}

const NotificationSubscriber = ({ className }: NotificationSubscriberProps) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permissionState, setPermissionState] = useState<NotificationPermission | null>(null);
  const { toast } = useToast();
  const { userInfo } = useUserInfo();
  
  // Check initial notification permission status
  useEffect(() => {
    if (isPushNotificationSupported()) {
      setPermissionState(Notification.permission);
      
      // Check if already subscribed
      navigator.serviceWorker.ready
        .then(registration => registration.pushManager.getSubscription())
        .then(subscription => {
          setIsSubscribed(!!subscription);
        })
        .catch(error => {
          console.error("Error checking subscription:", error);
        });
    }
  }, []);
  
  const handleSubscription = async () => {
    if (!isPushNotificationSupported()) {
      toast({
        title: "Not Supported",
        description: "Push notifications are not supported in your browser.",
        variant: "destructive",
      });
      return;
    }
    
    if (!userInfo) {
      toast({
        title: "Sign in Required",
        description: "Please sign in to receive personalized notifications.",
        variant: "destructive",
      });
      return;
    }
    
    if (isSubscribed) {
      // Unsubscribe logic would go here in a real application
      // For demo, we'll just toggle the state
      setIsSubscribed(false);
      toast({
        title: "Unsubscribed",
        description: "You've unsubscribed from notifications.",
      });
      return;
    }
    
    // Request permission if not already granted
    if (permissionState !== "granted") {
      const permissionResult = await askNotificationPermission();
      setPermissionState(permissionResult ? "granted" : "denied");
      
      if (!permissionResult) {
        toast({
          title: "Permission Denied",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Try to subscribe
    const userId = userInfo.email || "user123"; // Use email as unique ID or fallback
    const userName = userInfo.name || "User"; // Use name or fallback
    
    const subscription = await subscribeToPushNotifications(userId, userName);
    
    if (subscription) {
      setIsSubscribed(true);
    }
  };
  
  if (!isPushNotificationSupported()) {
    return null; // Don't show the button if not supported
  }
  
  return (
    <Button
      variant={isSubscribed ? "warm" : "outline"}
      size="sm"
      className={`flex items-center gap-2 ${className}`}
      onClick={handleSubscription}
    >
      {isSubscribed ? (
        <>
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications On</span>
        </>
      ) : (
        <>
          <BellOff className="h-4 w-4" />
          <span className="hidden sm:inline">Enable Notifications</span>
        </>
      )}
    </Button>
  );
};

export default NotificationSubscriber;
