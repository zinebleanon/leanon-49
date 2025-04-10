
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

    // No longer showing automatic welcome notifications
    // The notification was removed as requested

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
