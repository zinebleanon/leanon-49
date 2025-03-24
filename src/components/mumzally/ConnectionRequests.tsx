
import { UserCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import { useState } from 'react';
import MessageForm from './MessageForm';
import BowRibbon from './BowRibbon';

interface ConnectionRequest {
  id: number;
  name: string;
  age: number;
  location: string;
  compatibility: number;
}

const MatchRequests = () => {
  const requests: ConnectionRequest[] = [
    {
      id: 1,
      name: "Sarah",
      age: 32,
      location: "Dubai Marina",
      compatibility: 85
    },
    {
      id: 2,
      name: "Emma",
      age: 29,
      location: "Palm Jumeirah",
      compatibility: 92
    }
  ];

  const [acceptedRequests, setAcceptedRequests] = useState<number[]>([]);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);

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

  return (
    <section className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 font-playfair">Match Requests</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                    <UserCircle className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{request.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.age}, {request.location}
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <Badge className="bg-primary/20 text-primary border-primary/10">
                      {request.compatibility}% Match
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    See {request.name}'s profile
                  </p>
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
                          <div className="w-6 h-5 mr-1">
                            <BowRibbon isActive={true} />
                          </div>
                          Message {request.name}
                        </>
                      ) : (
                        <>
                          <div className="w-6 h-5 mr-1">
                            <BowRibbon isRightActive={true} />
                          </div>
                          Match Back
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

export default MatchRequests;
