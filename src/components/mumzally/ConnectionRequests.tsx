
import { UserCircle, MessageCircle, ExternalLink, MapPin, Baby, Users, MessageSquare, ArrowDown, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from 'react';
import BowRibbon from './BowRibbon';
import { useUserInfo } from '@/hooks/use-user-info';
import { Link } from 'react-router-dom';
import MessageDialog from './MessageDialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { trackConnection } from '@/utils/track-user-activity';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';

interface ConnectionRequest {
  id: number;
  name: string;
  age: number;
  location: string;
  kids: {age: number; gender: string}[];
  compatibility: number;
  activeInCommunity?: boolean;
  nationality: string;
  workStatus: string;
  interests: string[];
}

interface NearbyMom {
  id: number;
  name: string;
  age: number;
  location: string;
  kids: {age: number; gender: string}[];
  compatibility: number;
  activeInCommunity?: boolean;
}

interface ConnectionRequestsProps {
  dialogMode?: boolean;
  nearbyMoms?: NearbyMom[];
  simplifiedView?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ConnectionRequests = ({ 
  dialogMode = false, 
  nearbyMoms = [], 
  simplifiedView = false,
  open,
  onOpenChange
}: ConnectionRequestsProps) => {
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);
  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);
  const [rejectedRequests, setRejectedRequests] = useState<number[]>([]);
  const [leanBackMoms, setLeanBackMoms] = useState<ConnectionRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<ConnectionRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    const fetchConnectionRequests = async () => {
      if (!userInfo?.email) {
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch connection requests from Supabase
        const { data, error } = await supabase
          .from('connection_requests')
          .select('*')
          .eq('recipient_id', userInfo.email)
          .eq('status', 'pending');
        
        if (error) throw error;
        
        // No connection requests found in real DB
        setConnectionRequests([]);
        setSentRequests([]);
        setLeanBackMoms([]);
        
        // Get accepted requests
        const { data: acceptedData, error: acceptedError } = await supabase
          .from('connection_requests')
          .select('*')
          .eq('status', 'connected')
          .or(`recipient_id.eq.${userInfo.email},requester_id.eq.${userInfo.email}`);
          
        if (!acceptedError && acceptedData) {
          // We'd map these to leanBackMoms with full user profiles
          // but for now just create empty arrays
        }
      } catch (err) {
        console.error("Error fetching connection requests:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    const savedAcceptedRequests = localStorage.getItem('acceptedRequests');
    if (savedAcceptedRequests) {
      setAcceptedRequests(JSON.parse(savedAcceptedRequests));
    }
    
    const savedRejectedRequests = localStorage.getItem('rejectedRequests');
    if (savedRejectedRequests) {
      setRejectedRequests(JSON.parse(savedRejectedRequests));
    }

    const savedLeanBackMoms = localStorage.getItem('leanBackMoms');
    if (savedLeanBackMoms) {
      setLeanBackMoms(JSON.parse(savedLeanBackMoms));
    } else {
      localStorage.setItem('leanBackMoms', JSON.stringify([]));
    }
    
    fetchConnectionRequests();
  }, [userInfo?.email]);

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    if (!selectedRecipient) return;
    
    toast({
      title: "Message Sent",
      description: `Your message to ${selectedRecipient.name} has been sent.`,
    });
  };

  const handleAcceptRequest = async (id: number, name: string) => {
    if (!userInfo?.email) {
      toast({
        title: "Error",
        description: "You must be logged in to accept connection requests.",
        variant: "destructive"
      });
      return;
    }

    try {
      // In a real implementation, this would update the connection in the database
      // Placeholder for now
      console.log(`Accepting connection request with ID ${id}`);
      
      const updatedAccepted = [...acceptedRequests, id];
      setAcceptedRequests(updatedAccepted);
      localStorage.setItem('acceptedRequests', JSON.stringify(updatedAccepted));
      
      trackConnection(id.toString(), name);
      
      toast({
        title: "Connection Request Accepted",
        description: `You are now connected with ${name}!`,
      });
    } catch (err) {
      console.error("Error accepting connection request:", err);
      toast({
        title: "Error",
        description: "Failed to accept connection request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRejectRequest = async (id: number, name: string) => {
    if (!userInfo?.email) {
      toast({
        title: "Error",
        description: "You must be logged in to decline connection requests.",
        variant: "destructive"
      });
      return;
    }

    try {
      // In a real implementation, this would update the connection in the database
      // Placeholder for now
      console.log(`Rejecting connection request with ID ${id}`);
      
      const updatedRejected = [...rejectedRequests, id];
      setRejectedRequests(updatedRejected);
      localStorage.setItem('rejectedRequests', JSON.stringify(updatedRejected));
      
      toast({
        title: "Connection Request Declined",
        description: `You've declined ${name}'s connection request.`,
      });
    } catch (err) {
      console.error("Error rejecting connection request:", err);
      toast({
        title: "Error",
        description: "Failed to decline connection request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const filteredRequests = connectionRequests.filter(request => 
    !acceptedRequests.includes(request.id) && !rejectedRequests.includes(request.id)
  );

  const content = (
    <div className="mb-6">
      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="received" className="flex items-center gap-2">
            <ArrowDown className="h-4 w-4" />
            <span>Received</span>
            <Badge variant="secondary" className="ml-2">{filteredRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <ArrowUp className="h-4 w-4" />
            <span>Sent</span>
            <Badge variant="secondary" className="ml-2">{sentRequests.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden bg-white/90">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                        <UserCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <Link to={`/ally/profile/${request.id}`} className="font-medium hover:underline">
                          {request.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {request.age}, {request.location}
                          {request.activeInCommunity && (
                            <span className="ml-1 text-green-600">● Active</span>
                          )}
                        </p>
                      </div>
                      <Badge className="ml-auto bg-primary/50 text-foreground text-xs font-bold border-primary/30">
                        {request.compatibility}% Match
                      </Badge>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Baby className="h-4 w-4 text-amber-500" />
                        <span className="text-sm">
                          {request.kids.map((kid, i) => (
                            <span key={i}>
                              {kid.age} y/o {kid.gender}
                              {i < request.kids.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {request.interests.map((interest, i) => (
                          <Badge key={i} variant="outline" className="bg-secondary/50">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleRejectRequest(request.id, request.name)}
                      >
                        Decline
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleAcceptRequest(request.id, request.name)}
                      >
                        <BowRibbon className="w-8 h-5 mr-1" color="#FFD9A7" />
                        LeanBack
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center p-4">
              <Users className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium mb-1">No Pending Requests</h3>
              <p className="text-sm text-muted-foreground">
                You have no pending connection requests at the moment
              </p>
            </div>
          )}

          {leanBackMoms.length > 0 && (
            <div className="mt-8">
              <h3 className="font-medium text-lg mb-2">My LeanMoms</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {leanBackMoms.map((mom) => (
                  <Card key={mom.id} className="overflow-hidden bg-white/90">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                          <UserCircle className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <Link to={`/ally/profile/${mom.id}`} className="font-medium hover:underline">
                            {mom.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {mom.age}, {mom.location}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          onClick={() => handleMessageClick(mom.id, mom.name)}
                        >
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sent">
          {sentRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sentRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden bg-white/90">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                        <UserCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <Link to={`/ally/profile/${request.id}`} className="font-medium text-sm hover:underline">
                          {request.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {request.age}, {request.location}
                          {request.activeInCommunity && (
                            <span className="ml-1 text-green-600">● Active</span>
                          )}
                        </p>
                      </div>
                      <Badge className="ml-auto bg-primary/50 text-foreground text-xs font-bold border-primary/30">
                        {request.compatibility}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleMessageClick(request.id, request.name)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                      >
                        Pending
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center p-4">
              <Users className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium mb-1">No Sent Requests</h3>
              <p className="text-sm text-muted-foreground">
                You haven't sent any connection requests yet
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {selectedRecipient && (
        <MessageDialog 
          open={messageDialogOpen} 
          onOpenChange={setMessageDialogOpen} 
          conversation={{
            id: `conv-${selectedRecipient.id}`,
            participantId: selectedRecipient.id.toString(),
            participantName: selectedRecipient.name,
            lastMessage: "",
            lastMessageTimestamp: new Date().toISOString(),
            unreadCount: 0
          }}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );

  if (simplifiedView) {
    const pendingRequests = connectionRequests.filter(request => 
      !acceptedRequests.includes(request.id) && !rejectedRequests.includes(request.id)
    );
    
    return (
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {pendingRequests.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Pending Requests</h3>
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="border-transparent hover:bg-muted/30 transition-colors">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                          <UserCircle className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {request.name}
                          </h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="relative group"
                          onClick={() => handleMessageClick(request.id, request.name)}
                        >
                          <MessageSquare className="h-5 w-5 text-primary" />
                          <div className="absolute right-0 top-full mt-1 bg-white shadow-md rounded-md p-2 hidden group-hover:flex flex-col gap-1 z-10 min-w-28">
                            <Button 
                              variant="default" 
                              size="sm"
                              className="text-xs w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAcceptRequest(request.id, request.name);
                              }}
                            >
                              LeanBack
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-xs w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRejectRequest(request.id, request.name);
                              }}
                            >
                              Decline
                            </Button>
                          </div>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {leanBackMoms.length > 0 ? (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">My LeanMoms</h3>
                {leanBackMoms.map((mom) => (
                  <Card key={mom.id} className="border-transparent hover:bg-muted/30 transition-colors">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                          <UserCircle className="h-7 w-7 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {mom.name}
                          </h3>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMessageClick(mom.id, mom.name)}
                      >
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                <Users className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">No LeanMoms Yet</h3>
                <p className="text-sm text-muted-foreground">
                  LeanBack on connect requests to add moms to your LeanMoms list
                </p>
              </div>
            )}
          </>
        )}
        
        {selectedRecipient && (
          <MessageDialog 
            open={messageDialogOpen} 
            onOpenChange={setMessageDialogOpen} 
            conversation={{
              id: `conv-${selectedRecipient.id}`,
              participantId: selectedRecipient.id.toString(),
              participantName: selectedRecipient.name,
              lastMessage: "",
              lastMessageTimestamp: new Date().toISOString(),
              unreadCount: 0
            }}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    );
  }

  if (dialogMode) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-xl font-semibold mb-4">LeanOn Requests</DialogTitle>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <section className="py-8 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        {content}
      </div>
    </section>
  );
};

export default ConnectionRequests;
