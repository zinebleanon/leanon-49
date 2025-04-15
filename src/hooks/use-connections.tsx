
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserInfo } from './use-user-info';

interface Connection {
  id: string;
  recipient_id: string;
  requester_id: string;
  status: 'pending' | 'declined' | 'connected';
  created_at: string;
}

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!userInfo?.id) return;

    const fetchConnections = async () => {
      const { data, error } = await supabase
        .from('connection_requests')
        .select('*')
        .or(`requester_id.eq.${userInfo.id},recipient_id.eq.${userInfo.id}`);

      if (error) {
        console.error('Error fetching connections:', error);
        return;
      }

      setConnections(data || []);
      setLoading(false);
    };

    fetchConnections();

    // Subscribe to changes
    const channel = supabase
      .channel('connection_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'connection_requests' 
        }, 
        (payload) => {
          console.log('Connection change received:', payload);
          fetchConnections();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userInfo?.id]);

  const sendConnectionRequest = async (recipientId: string) => {
    if (!userInfo?.id) return null;

    const { data, error } = await supabase
      .from('connection_requests')
      .insert({
        requester_id: userInfo.id,
        recipient_id: recipientId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending connection request:', error);
      return null;
    }

    return data;
  };

  const updateConnectionStatus = async (connectionId: string, status: 'connected' | 'declined') => {
    if (!userInfo?.id) return null;

    const { data, error } = await supabase
      .from('connection_requests')
      .update({ status })
      .eq('id', connectionId)
      .select()
      .single();

    if (error) {
      console.error('Error updating connection status:', error);
      return null;
    }

    return data;
  };

  return {
    connections,
    loading,
    sendConnectionRequest,
    updateConnectionStatus
  };
}
