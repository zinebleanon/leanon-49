
import { useState } from 'react';
import { useUserInfo } from '@/hooks/use-user-info';
import { UserCircle, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RibbonIcon from '@/components/ui/RibbonIcon';

interface NeighborProps {
  id: number;
  name: string;
  distance: string;
  interests: string[];
  profileImage?: string;
}

const NeighborhoodCommunity = () => {
  const { neighborhood, isLoading } = useUserInfo();
  const [connectedNeighbors, setConnectedNeighbors] = useState<number[]>([]);
  
  // Mock data for neighbors - in a real app, this would come from the backend
  const neighbors: NeighborProps[] = [
    {
      id: 1,
      name: "Sara Ahmed",
      distance: "0.5 km away",
      interests: ["Toddler playdates", "Book club", "Swimming"],
    },
    {
      id: 2,
      name: "Jessica Kim",
      distance: "0.8 km away",
      interests: ["Yoga", "Outdoor activities", "Coffee meetups"],
    },
    {
      id: 3,
      name: "Amina Khan",
      distance: "1.2 km away",
      interests: ["Infant care", "Cooking", "Art & Craft"],
    },
    {
      id: 4,
      name: "Maria Rodriguez",
      distance: "1.5 km away",
      interests: ["Fitness", "Baby nutrition", "Photography"],
    }
  ];
  
  const toggleConnection = (id: number) => {
    setConnectedNeighbors(prev => 
      prev.includes(id) 
        ? prev.filter(neighborId => neighborId !== id) 
        : [...prev, id]
    );
  };
  
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p>Loading your neighborhood...</p>
      </div>
    );
  }
  
  return (
    <section>
      <div className="bg-[#B8CEC2]/50 rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold font-playfair flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-[#B8CEC2]" />
          Your {neighborhood} Community
        </h2>
        <p className="text-sm text-muted-foreground mb-2">
          Connect with moms in your neighborhood for local support and meetups
        </p>
      </div>
      
      <div className="grid gap-3 md:grid-cols-2">
        {neighbors.map(neighbor => (
          <Card key={neighbor.id} className="overflow-hidden hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FFD9A7] flex items-center justify-center flex-shrink-0">
                  <UserCircle className="h-8 w-8 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{neighbor.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {neighbor.distance}
                      </p>
                    </div>
                    
                    <Badge 
                      variant="outline" 
                      className="bg-[#B8CEC2]/30 text-xs"
                    >
                      Neighbor
                    </Badge>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-1">
                    {neighbor.interests.map((interest, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="bg-secondary/20 text-xs"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-8"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    
                    <Button 
                      variant={connectedNeighbors.includes(neighbor.id) ? "default" : "outline"}
                      size="sm"
                      className="text-xs h-8"
                      onClick={() => toggleConnection(neighbor.id)}
                    >
                      <RibbonIcon 
                        className="w-10 h-6 mr-1" 
                        fill={connectedNeighbors.includes(neighbor.id) ? "#FFD9A7" : "#e2e8f0"} 
                        size="1.5em"
                      />
                      {connectedNeighbors.includes(neighbor.id) ? "LeanOn" : "Connect"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default NeighborhoodCommunity;
