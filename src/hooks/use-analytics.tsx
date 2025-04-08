
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView, trackEvent, setUserProperties } from "@/utils/analytics";

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views when the route changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return {
    trackEvent,
    setUserProperties,
  };
};
