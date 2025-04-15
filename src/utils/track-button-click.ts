
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const trackButtonClick = async (buttonName: string, pagePath: string) => {
  const user = supabase.auth.user();
  
  if (user) {
    try {
      const { error } = await supabase
        .from('button_clicks')
        .insert({
          user_id: user.id,
          button_name: buttonName,
          page_path: pagePath
        });
      
      if (error) {
        console.error('Error tracking button click:', error);
      }
    } catch (err) {
      console.error('Unexpected error tracking button click:', err);
    }
  }
};

export const useButtonTracking = () => {
  const { user } = useAuth();
  
  const track = (buttonName: string) => {
    if (user) {
      const pagePath = window.location.pathname;
      trackButtonClick(buttonName, pagePath);
    }
  };
  
  return { track };
};
