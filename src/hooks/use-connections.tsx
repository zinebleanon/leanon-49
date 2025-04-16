
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
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUserInfo();
  const { toast } = useToast();

  useEffect(() => {
    if (!userInfo?.email) return;

    const fetchConnections = async () => {
      try {
        // Get pending requests where user is recipient
        const { data: pendingRequests, error: pendingError } = await supabase
          .from('connection_requests')
          .select('*')
          .eq('recipient_id', userInfo.email)
          .eq('status', 'pending');

        if (pendingError) throw pendingError;
        
        const pendingCount = pendingRequests?.length || 0;
        console.log('Pending requests count:', pendingCount);
        setPendingRequestsCount(pendingCount);

        // Get all connections for the user
        const { data: connectionData, error } = await supabase
          .from('connection_requests')
          .select('*')
          .or(`recipient_id.eq.${userInfo.email},requester_id.eq.${userInfo.email}`);

        if (error) throw error;
        setConnections(connectionData || []);
      } catch (err) {
        console.error('Error fetching connections:', err);
        toast({
          title: "Error",
          description: "Failed to load connections. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();

    // Subscribe to real-time updates for connection_requests
    const channel = supabase
      .channel('connection_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'connection_requests',
          filter: `recipient_id=eq.${userInfo.email}`,
        }, 
        (payload) => {
          console.log('Connection request changed:', payload);
          fetchConnections(); // Refresh data when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userInfo?.email, toast]);

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
    pendingRequestsCount,
    sendConnectionRequest,
    updateConnectionStatus
  };
}
