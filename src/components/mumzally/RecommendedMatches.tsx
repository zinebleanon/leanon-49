
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Baby } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MumzProfile } from './ProfilesSection';
import { Link } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';
import { Button } from '@/components/ui/button';
import BowRibbon from './BowRibbon';
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

interface RecommendedMatchesProps {
  profiles: MumzProfile[];
}

const RecommendedMatches = ({ profiles }: RecommendedMatchesProps) => {
  const { neighborhood } = useUserInfo();
  const [sentConnections, setSentConnections] = useState<number[]>([]);
  
  if (!profiles || profiles.length === 0) {
    return (
      <div className="mb-6 text-center py-4">
        <h3 className="text-lg font-medium mb-2">No Recommended Matches</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or adding more information to your profile
        </p>
      </div>
    );
  }
  
  const handleSendConnection = (id: number, name: string) => {
    setSentConnections(prev => [...prev, id]);
    toast({
      title: "LeanOn Request Sent",
      description: `You've sent a connection request to ${name}!`,
    });
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Recommended for You</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Based on your {neighborhood || 'location'} and children's ages
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {profiles.map((profile) => (
          <Card key={profile.id} className="bg-white/90 hover:shadow-md transition-all">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium">
                  <Link to={`/ally/profile/${profile.id}`} className="hover:underline">
                    {profile.name}
                  </Link>
                </h4>
                <Badge className="ml-auto bg-primary/70 text-foreground font-bold border-primary/30">
                  {profile.compatibility}%
                </Badge>
              </div>
              
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-amber-500" />
                  <span>{profile.location}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Baby className="h-3 w-3 text-amber-500" />
                  <span>
                    {profile.kids && profile.kids.map((kid, i) => (
                      <span key={i}>
                        {kid.age} y/o {kid.gender}
                        {i < profile.kids.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <Button
                  variant="default"
                  size="sm"
                  className="text-xs py-1 h-8"
                  onClick={() => handleSendConnection(profile.id, profile.name)}
                  disabled={sentConnections.includes(profile.id)}
                >
                  <BowRibbon 
                    className="w-8 h-5 mr-1" 
                    isLeftActive={sentConnections.includes(profile.id)} 
                    isRightActive={false} 
                    color="#FFD9A7"
                  />
                  {sentConnections.includes(profile.id) ? 'Request Sent' : 'LeanOn'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedMatches;
