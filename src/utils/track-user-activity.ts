
import { supabase } from "@/integrations/supabase/client";

export type ActivityType = 
  | 'connection_made'
  | 'message_sent' 
  | 'post_created'
  | 'profile_updated'
  | 'deal_unlocked'
  | 'item_listed'
  | 'question_asked';

interface ActivityData {
  type: ActivityType;
  description: string;
  metadata?: Record<string, any>;
}

export const trackUserActivity = async (activity: ActivityData) => {
  try {
    const { error } = await supabase.from('user_activities').insert({
      activity_type: activity.type,
      description: activity.description,
      metadata: activity.metadata
    });

    if (error) {
      console.error('Error tracking user activity:', error);
    }
  } catch (err) {
    console.error('Failed to track user activity:', err);
  }
};

// Predefined activity tracking functions for common actions
export const trackConnection = (connectedUserId: string, connectedUserName: string) => {
  return trackUserActivity({
    type: 'connection_made',
    description: `Connected with ${connectedUserName}`,
    metadata: { connectedUserId }
  });
};

export const trackMessage = (recipientId: string, recipientName: string) => {
  return trackUserActivity({
    type: 'message_sent',
    description: `Sent a message to ${recipientName}`,
    metadata: { recipientId }
  });
};

export const trackPost = (postId: string, postTitle: string) => {
  return trackUserActivity({
    type: 'post_created',
    description: `Created post: ${postTitle}`,
    metadata: { postId }
  });
};

export const trackProfileUpdate = (updatedFields: string[]) => {
  return trackUserActivity({
    type: 'profile_updated',
    description: `Updated profile information`,
    metadata: { updatedFields }
  });
};

export const trackDealUnlock = (dealId: string, dealTitle: string) => {
  return trackUserActivity({
    type: 'deal_unlocked',
    description: `Unlocked deal: ${dealTitle}`,
    metadata: { dealId }
  });
};

export const trackItemListing = (itemId: string, itemTitle: string) => {
  return trackUserActivity({
    type: 'item_listed',
    description: `Listed item: ${itemTitle}`,
    metadata: { itemId }
  });
};

export const trackQuestion = (questionId: string, questionTitle: string) => {
  return trackUserActivity({
    type: 'question_asked',
    description: `Asked question: ${questionTitle}`,
    metadata: { questionId }
  });
};
