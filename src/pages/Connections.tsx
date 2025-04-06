
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserCircle, MapPin, Baby, MessageCircle, ExternalLink, ArrowLeft, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BowRibbon from '@/components/mumzally/BowRibbon';
import { toast } from "@/hooks/use-toast";
import MessageForm from '@/components/mumzally/MessageForm';

interface Connection {
  id: number;
  name: string;
  age: number;
  location: string;
  kids: {age: number; gender: string}[];
  nationality: string;
  compatibility: number;
  activeInCommunity?: boolean;
  lastActive?: string;
}

const Connections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{id: number, name: string} | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setConnections([
        {
          id: 2,
          name: "Jessica",
          age: 29,
          location: "Dubai Marina",
          kids: [{age: 2, gender: 'Girl'}, {age: 4, gender: 'Boy'}],
          nationality: "British Expat",
          compatibility: 92,
          activeInCommunity: true,
          lastActive: "Today"
        },
        {
          id: 5,
          name: "Priya",
          age: 31,
          location: "JBR",
          kids: [{age: 1, gender: 'Boy'}],
          nationality: "Indian Expat",
          compatibility: 88,
          activeInCommunity: false,
          lastActive: "3 days ago"
        }
      ]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleMessageClick = (id: number, name: string) => {
    setSelectedContact({ id, name });
    setMessageDialogOpen(true);
  };
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]/30">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-12 md:pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')} 
              className="bg-white/80 shadow-sm hover:bg-white"
            >
              <Home className="h-4 w-4 mr-2" />
              Main Menu
            </Button>
          </div>
          
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold font-playfair">My LeanMoms</h1>
            <p className="text-muted-foreground mt-2">
              These are the moms you've connected with through LeanOn. You can message them or view their profiles.
            </p>
          </div>
          
          {connections.length > 0 ? (
            <div className="grid gap-4">
              {connections.map((connection) => (
                <Card key={connection.id} className="overflow-hidden bg-white">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#FFD9A7] flex items-center justify-center shrink-0">
                          <UserCircle className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium flex items-center gap-2">
                            <Link to={`/ally/profile/${connection.id}`} className="hover:underline">
                              {connection.name}
                            </Link>
                            <Badge className="bg-primary/50 text-foreground text-xs font-bold border-primary/30">
                              {connection.compatibility}%
                            </Badge>
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            {connection.age}, {connection.location}
                            {connection.activeInCommunity && (
                              <span className="text-green-600">● Active</span>
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last active: {connection.lastActive}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-2 md:ml-auto md:items-center">
                        <div className="text-sm flex flex-col md:mr-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-amber-500" />
                            <span>{connection.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Baby className="h-3 w-3 text-amber-500" />
                            <span>
                              {connection.kids && connection.kids.map((kid, i) => (
                                <span key={i}>
                                  {kid.age} y/o {kid.gender}
                                  {i < connection.kids.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-sm"
                            asChild
                          >
                            <Link to={`/ally/profile/${connection.id}`} className="flex items-center gap-1">
                              <ExternalLink className="h-4 w-4" />
                              Profile
                            </Link>
                          </Button>
                          
                          <Button
                            variant="default"
                            size="sm"
                            className="text-sm"
                            onClick={() => handleMessageClick(connection.id, connection.name)}
                          >
                            <BowRibbon isActive={true} className="w-8 h-5 mr-1" color="#FFD9A7" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">No connections yet</h3>
              <p className="text-muted-foreground mb-4">
                When you connect with other moms using LeanOn, they'll appear here
              </p>
              <Button asChild variant="default">
                <Link to="/ally">Find Moms Around You</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      {selectedContact && (
        <MessageForm
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
          recipient={selectedContact}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Connections;
