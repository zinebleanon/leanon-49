
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useNotificationInit = () => {
  const { toast } = useToast();

  useEffect(() => {
    // Register service worker for push notifications
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.error('ServiceWorker registration failed: ', error);
          });
      });
    }

    // Show a welcome notification if permission is already granted
    if (Notification.permission === 'granted') {
      // Check if user has a stored name
      const userName = localStorage.getItem('notification_user_name') || 'User';
      
      // Only show this for demo purposes - in production you'd only show notifications
      // in response to actual events
      setTimeout(() => {
        if (Math.random() > 0.7) { // Only show occasionally for demo
          const notification = new Notification('Welcome to LeanOn', {
            body: `Hello ${userName}, welcome back to the LeanOn community!`,
            icon: '/favicon.ico'
          });
          
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        }
      }, 5000);
    }

    // When the app is visible, we'll handle any push notification clicks
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // The page is now visible, so we could do things like fetch new data
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [toast]);
};
