
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserInfo } from './use-user-info';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

  useEffect(() => {
    if (!userInfo?.email) return;

    const fetchConnections = async () => {
      try {
        // Insert a test connection request for demonstration
        if (userInfo.email === 'test@example.com') {
          const testRequest = {
            requester_id: 'sarah@example.com',
            recipient_id: userInfo.email,
            status: 'pending' as const
          };

          const { error: existingError } = await supabase
            .from('connection_requests')
            .select('*')
            .eq('requester_id', testRequest.requester_id)
            .eq('recipient_id', testRequest.recipient_id)
            .single();

          if (existingError) {
            // No existing request found, insert the test request
            const { error } = await supabase
              .from('connection_requests')
              .insert(testRequest);

            if (error) {
              console.error('Error creating test connection:', error);
            }
          }
        }

        const { data, error } = await supabase
          .from('connection_requests')
          .select('*')
          .or(`requester_id.eq.${userInfo.email},recipient_id.eq.${userInfo.email}`);

        if (error) {
          console.error('Error fetching connections:', error);
          return;
        }

        setConnections(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Fetch connections error:', err);
        setLoading(false);
      }
    };

    fetchConnections();

    // Subscribe to changes in real-time
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
          fetchConnections(); // Refresh the connections list when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userInfo?.email]);

  const sendConnectionRequest = async (recipientEmail: string) => {
    if (!userInfo?.email) {
      toast({
        title: "Error",
        description: "You must be logged in to send a connection request.",
        variant: "destructive"
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('connection_requests')
        .insert({
          requester_id: userInfo.email,
          recipient_id: recipientEmail,
          status: 'pending'
        })
        .select()
        .single();

      if (error) {
        console.error('Error sending connection request:', error);
        toast({
          title: "Error",
          description: "Failed to send connection request.",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Connection Request Sent",
        description: `Request sent to ${recipientEmail}`,
      });

      setConnections(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Send connection request error:', err);
      return null;
    }
  };

  const updateConnectionStatus = async (connectionId: string, status: 'connected' | 'declined') => {
    if (!userInfo?.email) {
      toast({
        title: "Error",
        description: "You must be logged in to update connection status.",
        variant: "destructive"
      });
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('connection_requests')
        .update({ status })
        .eq('id', connectionId)
        .select()
        .single();

      if (error) {
        console.error('Error updating connection status:', error);
        toast({
          title: "Error",
          description: "Failed to update connection status.",
          variant: "destructive"
        });
        return null;
      }

      setConnections(prev => 
        prev.map(conn => 
          conn.id === connectionId ? { ...conn, status } : conn
        )
      );

      toast({
        title: "Connection Updated",
        description: `Connection status updated to ${status}`,
      });

      return data;
    } catch (err) {
      console.error('Update connection status error:', err);
      return null;
    }
  };

  return {
    connections,
    loading,
    sendConnectionRequest,
    updateConnectionStatus
  };
}
