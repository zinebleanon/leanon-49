
import { supabase } from "@/integrations/supabase/client";
import { trackUserActivity } from "./track-user-activity";

// Types of content interactions
export type InteractionType = 'view' | 'rate' | 'save' | 'share';

interface ContentInteractionData {
  contentId: number;
  contentTitle: string;
  rating?: number; // 1-5 stars
  interactionType: InteractionType;
}

export const trackContentInteraction = async (interaction: ContentInteractionData) => {
  // Track in user activities table for analytics
  return trackUserActivity({
    type: 'content_interaction', // Removed type assertion to fix the error
    description: `${interaction.interactionType === 'rate' ? 
      `Rated content (${interaction.rating} stars)` : 
      `${interaction.interactionType} content`}: ${interaction.contentTitle}`,
    metadata: { 
      contentId: interaction.contentId,
      interactionType: interaction.interactionType,
      rating: interaction.rating
    }
  });
};
