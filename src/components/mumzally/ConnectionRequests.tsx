
import { UserCircle, MessageCircle, ExternalLink, MapPin, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import { useState } from 'react';
import MessageForm from './MessageForm';
import BowRibbon from './BowRibbon';
import { useUserInfo } from '@/hooks/use-user-info';
import { Link } from 'react-router-dom';

interface ConnectionRequest {
  id: number;
  name: string;
  age: number;
  location: string;
  compatibility: number;
  activeInCommunity?: boolean;
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
}

const ConnectionRequests = ({ dialogMode = false, nearbyMoms = [] }: ConnectionRequestsProps) => {
  const requests: ConnectionRequest[] = [
    {
      id: 1,
      name: "Sarah",
      age: 32,
      location: "Dubai Marina",
      compatibility: 85,
      activeInCommunity: true
    },
    {
      id: 2,
      name: "Emma",
      age: 29,
      location: "Palm Jumeirah",
      compatibility: 92,
      activeInCommunity: false
    }
  ];

  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);
  const { location } = useUserInfo();

  const handleAccept = (id: number, name: string) => {
    setAcceptedRequests(prev => [...prev, id]);
    toast({
      title: "Match Connection Made!",
      description: `You've made a new Match with ${name}!`,
    });
  };

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };

  const handleDecline = (id: number) => {
    toast({
      description: "Match request declined",
    });
  };

  // If in dialog mode, use a more compact layout
  if (dialogMode) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Match Requests <span className="text-sm font-normal text-muted-foreground">({requests.length})</span></h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {requests.map((request) => (
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
                    onClick={() => 
                      acceptedRequests.includes(request.id) 
                        ? handleMessageClick(request.id, request.name)
                        : handleAccept(request.id, request.name)
                    }
                  >
                    {acceptedRequests.includes(request.id) ? (
                      <>
                        <BowRibbon isActive={true} className="w-8 h-5 mr-1" color="#FFD9A7" />
                        Message
                      </>
                    ) : (
                      <>
                        <BowRibbon isLeftActive={false} isRightActive={true} className="w-8 h-5 mr-1" color="#FFD9A7" />
                        Accept
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {selectedRecipient && (
          <MessageForm 
            open={messageDialogOpen} 
            onOpenChange={setMessageDialogOpen} 
            recipient={selectedRecipient}
          />
        )}
      </div>
    );
  }

  // Regular full view for the main page
  return (
    <section className="py-8 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 font-playfair">Match Requests <span className="text-lg font-normal text-primary-foreground/80">({requests.length})</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
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
                    onClick={() => 
                      acceptedRequests.includes(request.id) 
                        ? handleMessageClick(request.id, request.name)
                        : handleAccept(request.id, request.name)
                    }
                  >
                    <div className="flex items-center gap-2">
                      {acceptedRequests.includes(request.id) ? (
                        <>
                          <BowRibbon isActive={true} className="w-12 h-8 mr-1" color="#FFD9A7" />
                          Message {request.name}
                        </>
                      ) : (
                        <>
                          <BowRibbon isLeftActive={false} isRightActive={true} className="w-12 h-8 mr-1" color="#FFD9A7" />
                          LeanOn
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {selectedRecipient && (
        <MessageForm 
          open={messageDialogOpen} 
          onOpenChange={setMessageDialogOpen} 
          recipient={selectedRecipient}
        />
      )}
    </section>
  );
};

export default ConnectionRequests;
