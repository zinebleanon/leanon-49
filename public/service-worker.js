
// This is a simple service worker for handling push notifications
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Ensure the new service worker activates immediately
});

self.addEventListener('activate', (event) => {
  return self.clients.claim(); // Take control of all clients
});

// Handle push events (when a notification is received)
self.addEventListener('push', function(event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = {
        title: 'New Notification',
        message: event.data.text()
      };
    }
  }

  // Try to personalize the message if we have user info
  // In a real implementation, this would come from the push payload
  // but for demo purposes we're using localStorage in the main thread
  const options = {
    body: data.message || 'You have a new notification',
    icon: data.icon || '/favicon.ico',
    badge: '/favicon.ico',
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'LeanOn Notification', options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // Open the app and focus it
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(windowClients => {
      // Check if there's already a window and focus it
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If not, open a new window
      if (clients.openWindow) {
        const url = event.notification.data.url || '/';
        return clients.openWindow(url);
      }
    })
  );
});
