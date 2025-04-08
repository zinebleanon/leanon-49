
import { UserCircle, MessageCircle, ExternalLink, MapPin, Baby, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import { useState } from 'react';
import BowRibbon from './BowRibbon';
import { useUserInfo } from '@/hooks/use-user-info';
import { Link } from 'react-router-dom';
import MessageDialog from './MessageDialog';

interface ConnectionRequest {
  id: number;
  name: string;
  age: number;
  location: string;
  compatibility: number;
  activeInCommunity?: boolean;
  requestType: 'incoming' | 'outgoing' | 'connected';
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
}

const ConnectionRequests = ({ dialogMode = false, nearbyMoms = [], simplifiedView = false }: ConnectionRequestsProps) => {
  // Updated requests with requestType to differentiate between incoming, outgoing, and connected
  const requests: ConnectionRequest[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 32,
      location: "Dubai Marina",
      compatibility: 85,
      activeInCommunity: true,
      requestType: 'incoming' // This mom has sent you a request
    },
    {
      id: 2,
      name: "Emma Carter",
      age: 29,
      location: "Palm Jumeirah",
      compatibility: 92,
      activeInCommunity: false,
      requestType: 'connected' // You are already connected with this mom
    },
    {
      id: 3,
      name: "Lily Taylor",
      age: 31,
      location: "Downtown Dubai",
      compatibility: 78,
      activeInCommunity: true,
      requestType: 'outgoing' // You have sent a request to this mom
    }
  ];

  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    // This would typically send the message to the backend
    console.log("Sending message to", selectedRecipient, "Text:", text, "Image:", image);
  };

  const handleAcceptRequest = (id: number, name: string) => {
    toast({
      title: "LeanOn Request Accepted",
      description: `You are now connected with ${name}!`,
    });
    
    // Update the request status in a real app
    console.log(`Accepted request from ${name} (ID: ${id})`);
  };

  // If in simplified view mode (most straightforward UI)
  if (simplifiedView) {
    return (
      <div className="space-y-2">
        {requests.filter(req => req.requestType === 'connected').map((request) => (
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
              <Button 
                variant="ghost" 
                size="icon"
                className="text-primary"
                onClick={() => handleMessageClick(request.id, request.name)}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        ))}
        
        {requests.filter(req => req.requestType === 'connected').length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-center p-4">
            <Users className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">No LeanMoms yet</h3>
            <p className="text-sm text-muted-foreground">
              Connect with other moms to build your network
            </p>
          </div>
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

  // If in dialog mode, use a more compact layout
  if (dialogMode) {
    // Get incoming requests and connected moms
    const incomingRequests = requests.filter(req => req.requestType === 'incoming');
    const connectedMoms = requests.filter(req => req.requestType === 'connected');
    
    return (
      <div className="mb-6">
        {incomingRequests.length > 0 && (
          <>
            <h3 className="text-lg font-medium mb-3">LeanOn Requests <span className="text-sm font-normal text-muted-foreground">({incomingRequests.length})</span></h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {incomingRequests.map((request) => (
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
                        variant="outline" 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleMessageClick(request.id, request.name)}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        className="text-xs"
                        onClick={() => handleAcceptRequest(request.id, request.name)}
                      >
                        <BowRibbon isLeftActive={true} isRightActive={false} className="w-8 h-5 mr-1" color="#FFD9A7" />
                        Accept LeanOn
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
        
        <h3 className="text-lg font-medium mb-3">My LeanMoms <span className="text-sm font-normal text-muted-foreground">({connectedMoms.length})</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {connectedMoms.map((request) => (
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
                <div className="flex items-center justify-end">
                  <Button 
                    variant="default" 
                    size="sm"
                    className="text-xs"
                    onClick={() => handleMessageClick(request.id, request.name)}
                  >
                    <BowRibbon isActive={true} className="w-8 h-5 mr-1" color="#FFD9A7" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
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

  // Regular full view for the main page
  // Group requests by type
  const incomingRequests = requests.filter(req => req.requestType === 'incoming');
  const connectedMoms = requests.filter(req => req.requestType === 'connected');
  
  return (
    <section className="py-8 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        {incomingRequests.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6 font-playfair">
              New LeanOn Requests <span className="text-lg font-normal text-primary-foreground/80">({incomingRequests.length})</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {incomingRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                        <UserCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          <Link to={`/ally/profile/${request.id}`} className="hover:underline">
                            {request.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {request.age}, {request.location}
                          {request.activeInCommunity && (
                            <span className="ml-1 text-green-600">● Active in Community</span>
                          )}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <Badge className="bg-primary/50 text-foreground font-bold border-primary/30">
                          {request.compatibility}% Match
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-sm text-primary hover:text-primary/80 p-0 h-auto flex items-center gap-1"
                      >
                        <Link to={`/ally/profile/${request.id}`} className="flex items-center gap-1">
                          See {request.name}'s profile
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                      <div className="space-x-2">
                        <Button 
                          variant="outline" 
                          className="ml-auto"
                          onClick={() => handleMessageClick(request.id, request.name)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button 
                          variant="default" 
                          className="ml-auto"
                          onClick={() => handleAcceptRequest(request.id, request.name)}
                        >
                          <BowRibbon isLeftActive={true} isRightActive={false} className="w-10 h-6 mr-1" color="#FFD9A7" />
                          Accept LeanOn
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <h2 className="text-2xl font-semibold mb-6 font-playfair">My LeanMoms <span className="text-lg font-normal text-primary-foreground/80">({connectedMoms.length})</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedMoms.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                    <UserCircle className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      <Link to={`/ally/profile/${request.id}`} className="hover:underline">
                        {request.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {request.age}, {request.location}
                      {request.activeInCommunity && (
                        <span className="ml-1 text-green-600">● Active in Community</span>
                      )}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Badge className="bg-primary/50 text-foreground font-bold border-primary/30">
                      {request.compatibility}% Match
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-sm text-primary hover:text-primary/80 p-0 h-auto flex items-center gap-1"
                  >
                    <Link to={`/ally/profile/${request.id}`} className="flex items-center gap-1">
                      See {request.name}'s profile
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                  <Button 
                    variant="default" 
                    className="ml-auto"
                    onClick={() => handleMessageClick(request.id, request.name)}
                  >
                    <div className="flex items-center gap-2">
                      <BowRibbon isActive={true} className="w-12 h-8 mr-1" color="#FFD9A7" />
                      Message {request.name}
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
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
    </section>
  );
};

export default ConnectionRequests;
