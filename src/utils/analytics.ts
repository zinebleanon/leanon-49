
// Google Analytics Utility Functions
// This file manages Google Analytics 4 integration

// Initialize Google Analytics
export const initializeGA = (measurementId: string): void => {
  // Skip if we're not in production environment
  if (import.meta.env.DEV) {
    console.log('Google Analytics initialization skipped in development mode');
    return;
  }

  // Skip if the script is already loaded
  if (document.querySelector(`script[src*="googletagmanager.com/gtag"]`)) {
    return;
  }

  // Create and add Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize the gtag function
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false, // We'll manually track page views
  });

  console.log('Google Analytics initialized');
};

// Track page views
export const trackPageView = (path: string): void => {
  if (!window.gtag || import.meta.env.DEV) return;

  window.gtag('event', 'page_view', {
    page_location: window.location.origin + path,
    page_path: path,
    page_title: document.title,
  });
};

// Track events
export const trackEvent = (
  eventName: string, 
  eventParams: Record<string, any> = {}
): void => {
  if (!window.gtag || import.meta.env.DEV) return;

  window.gtag('event', eventName, eventParams);
};

// Track user properties
export const setUserProperties = (
  properties: Record<string, any>
): void => {
  if (!window.gtag || import.meta.env.DEV) return;

  window.gtag('set', 'user_properties', properties);
};
