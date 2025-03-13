
import { UserCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";
import { useState } from 'react';
import MessageForm from './MessageForm';

interface ConnectionRequest {
  id: number;
  name: string;
  age: number;
  location: string;
  compatibility: number;
}

const ConnectionRequests = () => {
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
      title: "Ally Connection Made!",
      description: `You've made a new MumzAlly with ${name}!`,
    });
  };

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };

  const handleDecline = (id: number) => {
    toast({
      description: "Ally request declined",
    });
  };

  return (
    <section className="py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Ally Requests</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
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
                    {request.name} wants to Ally
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
                          <svg width="18" height="16" viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                              d="M40,20 C40,11 35,4 28,1 C21,-2 14,2 10,6 C6,10 2,16 0,22 C13,40 27,56 40,68 Z M40,20 C40,11 45,4 52,1 C59,-2 66,2 70,6 C74,10 78,16 80,22 C67,40 53,56 40,68 Z" 
                              fill="#ea384c" 
                              stroke="#ea384c"
                              strokeWidth="1.5"
                            />
                          </svg>
                          Message {request.name}
                        </>
                      ) : (
                        <>
                          <svg width="18" height="16" viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                              d="M40,20 C40,11 35,4 28,1 C21,-2 14,2 10,6 C6,10 2,16 0,22 C13,40 27,56 40,68 Z" 
                              fill="#ea384c" 
                              stroke="#ea384c"
                              strokeWidth="1.5"
                            />
                            <path 
                              d="M40,20 C40,11 45,4 52,1 C59,-2 66,2 70,6 C74,10 78,16 80,22 C67,40 53,56 40,68 Z" 
                              fill="#e2e8f0" 
                              stroke="#94a3b8"
                              strokeWidth="1.5"
                            />
                          </svg>
                          Ally Back
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
