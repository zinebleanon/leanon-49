
// Push notification utility functions
import { toast } from "@/hooks/use-toast";

// Check if push notifications are supported in the browser
export const isPushNotificationSupported = () => {
  return "serviceWorker" in navigator && "PushManager" in window;
};

// Request notification permission
export const askNotificationPermission = async () => {
  if (!isPushNotificationSupported()) {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === "granted";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return false;
  }
};

// Subscribe to push notifications
export const subscribeToPushNotifications = async (userId: string, userName: string) => {
  if (!isPushNotificationSupported()) {
    toast({
      title: "Not Supported",
      description: "Push notifications are not supported in your browser.",
      variant: "destructive",
    });
    return null;
  }

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register('/service-worker.js');
    
    // Save user info in localStorage for personalization
    localStorage.setItem('notification_user_id', userId);
    localStorage.setItem('notification_user_name', userName);
    
    // Get push subscription
    let subscription = await registration.pushManager.getSubscription();
    
    // If no subscription exists, create one
    if (!subscription) {
      // This key would typically come from your backend
      // For demo purposes, we're using a placeholder
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U';
      
      // Convert the key to the format required by the browser
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
      
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
      
      // In a real app, you would send this subscription to your server
      console.log('New subscription created:', subscription);
      
      // Mock saving subscription to server
      toast({
        title: "Subscribed",
        description: `You're now subscribed to notifications, ${userName}!`,
      });
      
      return subscription;
    }
    
    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    toast({
      title: "Subscription Failed",
      description: "Could not subscribe to push notifications.",
      variant: "destructive",
    });
    return null;
  }
};

// Helper function to convert base64 to Uint8Array
// This is needed for the applicationServerKey
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Send a push notification from the admin panel
// In a real app, this would be done from your server
export const sendPushNotification = async (title: string, message: string, userGroup: string) => {
  // Mock sending notification
  if (Notification.permission === "granted") {
    // For demo purposes, we'll show a notification directly
    // In a real app, this would be triggered from the server
    const userName = localStorage.getItem('notification_user_name') || 'User';
    
    // Add personalization with user's name
    const personalizedMessage = message.includes('{userName}') 
      ? message.replace('{userName}', userName) 
      : `${userName}, ${message}`;
    
    const notification = new Notification(title, {
      body: personalizedMessage,
      icon: '/favicon.ico',
    });
    
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
    
    return true;
  }
  
  return false;
};
