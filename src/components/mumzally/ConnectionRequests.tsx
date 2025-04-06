
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
}

interface NearbyMom {
  id: number;
  name: string;
  age: number;
  location: string;
  kids: {age: number; gender: string}[];
  compatibility: number;
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
  const { location, kids } = useUserInfo();

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

  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Store position in localStorage
          const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
          userInfo.location = {
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          
          toast({
            title: "Location Updated",
            description: "We'll now show you moms in your area!",
          });
        },
        (error) => {
          toast({
            title: "Location Access Denied",
            description: "You can still use filters to find moms in specific neighborhoods.",
            variant: "destructive"
          });
        }
      );
    }
  };

  // If in dialog mode, use a more compact layout
  if (dialogMode) {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Match Requests <span className="text-sm font-normal text-muted-foreground">({requests.length})</span></h3>
        
        {!location?.latitude && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Enable location for better matches</p>
                <p className="text-xs text-muted-foreground mb-2">See moms in your neighborhood</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-8 bg-white"
                  onClick={handleRequestLocation}
                >
                  Share my location
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {requests.map((request) => (
            <Card key={request.id} className="overflow-hidden bg-white/90">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                    <UserCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{request.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {request.age}, {request.location}
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
                    {acceptedRequests.includes(request.id) ? 'Message' : 'Accept'}
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
        <h2 className="text-2xl font-semibold mb-6 font-playfair">Moms Around You</h2>
        
        {!location?.latitude && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Enable location for better matches</p>
                <p className="text-sm text-muted-foreground mb-3">To see moms in your neighborhood, we need to know your location</p>
                <Button 
                  variant="outline" 
                  className="bg-white"
                  onClick={handleRequestLocation}
                >
                  Share my location
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Display nearby moms with kids of similar ages */}
        {nearbyMoms && nearbyMoms.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {nearbyMoms.map((mom) => (
              <Card key={mom.id} className="overflow-hidden bg-white/90">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                      <UserCircle className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link to={`/ally/profile/${mom.id}`} className="hover:underline">
                          {mom.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">{mom.age}, {mom.location}</p>
                    </div>
                    <Badge className="ml-auto bg-primary/50 text-foreground font-bold border-primary/30">
                      {mom.compatibility}%
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Baby className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">
                      {mom.kids.map((kid, i) => (
                        <span key={i}>
                          {kid.age} y/o {kid.gender}
                          {i < mom.kids.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="default" 
                      className="w-full"
                      onClick={() => handleAccept(mom.id, mom.name)}
                    >
                      <div className="flex items-center gap-2">
                        <BowRibbon isRightActive={true} className="w-12 h-8 mr-1" color="#FFD9A7" />
                        LeanBack
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mb-8 p-4 bg-white rounded-md shadow-sm text-center">
            <p className="text-muted-foreground">
              {location?.latitude
                ? "We don't see any moms near you with kids of similar ages yet."
                : "Enable location to see moms in your neighborhood."}
            </p>
          </div>
        )}
        
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
                    <h3 className="font-medium">{request.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {request.age}, {request.location}
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
                    See {request.name}'s profile
                    <ExternalLink className="h-3 w-3 ml-1" />
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
                          <BowRibbon isRightActive={true} className="w-12 h-8 mr-1" color="#FFD9A7" />
                          LeanBack
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
