import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  title: string;
  message: string;
  feature?: 'connect' | 'ask' | 'deals' | 'preloved';
  link?: string;
  read: boolean;
  created_at: string;
  user_id?: string; // Added to match DB schema
  type?: string;    // Added to match DB schema
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Ensure data conforms to Notification interface by providing defaults for missing fields
      const typedData = (data || []).map(item => ({
        ...item,
        feature: (item.type?.includes('_question') ? 'ask' : 
                 item.type?.includes('connect') ? 'connect' : 
                 item.type?.includes('deals') ? 'deals' : 
                 item.type?.includes('preloved') ? 'preloved' : 'ask') as 'connect' | 'ask' | 'deals' | 'preloved',
        link: item.link || ''
      })) as Notification[];

      setNotifications(typedData);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Error",
        description: "Failed to load notifications. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === id ? { ...notif, read: true } : notif
        )
      );

      // Removed the call to trackUserActivity as it's not defined
    } catch (error) {
      console.error('Error marking notification as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read.",
        variant: "destructive",
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      
      if (unreadNotifications.length === 0) return;

      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user?.id)
        .eq('read', false);

      if (error) throw error;

      setNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );

      toast({
        title: "Success",
        description: `Marked ${unreadNotifications.length} notifications as read`,
      });

      // Removed the call to trackUserActivity as it's not defined
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read.",
        variant: "destructive",
      });
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotifications(prev => prev.filter(notif => notif.id !== id));

      // Removed the call to trackUserActivity as it's not defined
    } catch (error) {
      console.error('Error deleting notification:', error);
      toast({
        title: "Error",
        description: "Failed to delete notification.",
        variant: "destructive",
      });
    }
  };

  // Subscribe to real-time notifications
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('public:notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newNotification = {
            ...(payload.new as any),
            feature: ((payload.new as any).type?.includes('_question') ? 'ask' : 
                     (payload.new as any).type?.includes('connect') ? 'connect' : 
                     (payload.new as any).type?.includes('deals') ? 'deals' : 
                     (payload.new as any).type?.includes('preloved') ? 'preloved' : 'ask') as 'connect' | 'ask' | 'deals' | 'preloved',
            link: (payload.new as any).link || ''
          } as Notification;
          
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return {
    notifications,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
};
