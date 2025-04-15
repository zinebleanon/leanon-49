
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserInfo } from './use-user-info';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  read_at?: string;
}

export function useMessages(conversationPartnerId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!userInfo?.email || !conversationPartnerId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_id.eq.${userInfo.email},receiver_id.eq.${conversationPartnerId}),and(sender_id.eq.${conversationPartnerId},receiver_id.eq.${userInfo.email})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      setMessages(data || []);
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('message_changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `sender_id=eq.${conversationPartnerId},receiver_id=eq.${userInfo.email}`
        }, 
        (payload) => {
          console.log('New message received:', payload);
          setMessages(current => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userInfo?.email, conversationPartnerId]);

  const sendMessage = async (receiverId: string, content: string, imageUrl?: string) => {
    if (!userInfo?.email) return null;

    const { data, error } = await supabase
      .from('messages')
      .insert({
        sender_id: userInfo.email,
        receiver_id: receiverId,
        content,
        image_url: imageUrl
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }

    // Update local state immediately
    setMessages(current => [...current, data]);
    return data;
  };

  return {
    messages,
    loading,
    sendMessage
  };
}
