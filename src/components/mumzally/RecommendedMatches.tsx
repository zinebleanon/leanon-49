
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Baby, UserCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { MumzProfile } from './ProfilesSection';
import { Link } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';
import { Button } from '@/components/ui/button';
import BowRibbon from './BowRibbon';
import { useState } from 'react';

export interface RecommendedMatchesProps {
  profiles?: MumzProfile[];
  onMessageClick?: (id: number, name: string) => void;
}

const RecommendedMatches = ({ profiles = [], onMessageClick }: RecommendedMatchesProps) => {
  const { neighborhood } = useUserInfo();
  const [sentConnections, setSentConnections] = useState<number[]>([]);
  const [acceptedConnections, setAcceptedConnections] = useState<number[]>([2]); // Example: Mom with ID 2 has accepted
  
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
  
  // Add active community status to example profiles
  const enhancedProfiles = profiles.map(profile => ({
    ...profile,
    activeInCommunity: profile.id % 2 === 0 // Example: Every second profile is active
  }));
  
  const handleSendConnection = (id: number, name: string) => {
    setSentConnections(prev => [...prev, id]);
    // No toast notification here
  };

  const handleMessageButtonClick = (id: number, name: string) => {
    if (onMessageClick) {
      onMessageClick(id, name);
    }
  };
  
  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {enhancedProfiles.map((profile) => {
          const isConnectionSent = sentConnections.includes(profile.id);
          const isConnectionAccepted = acceptedConnections.includes(profile.id);
          const isFullyConnected = isConnectionSent && isConnectionAccepted;
          
          return (
            <Card key={profile.id} className="bg-white/90 hover:shadow-md transition-all">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                    <UserCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      <Link to={`/ally/profile/${profile.id}`} className="hover:underline">
                        {profile.name}
                      </Link>
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {profile.location}
                      {profile.activeInCommunity && (
                        <span className="ml-1 text-green-600">● Active</span>
                      )}
                    </p>
                  </div>
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
                
                <div className="flex justify-between mt-3">
                  {onMessageClick && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs py-1 px-0 h-8 text-primary hover:text-primary/80"
                      onClick={() => handleMessageButtonClick(profile.id, profile.name)}
                    >
                      Message
                    </Button>
                  )}
                  {!onMessageClick && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs py-1 px-0 h-8 text-primary hover:text-primary/80"
                      asChild
                    >
                      <Link to={`/ally/profile/${profile.id}`}>View Profile</Link>
                    </Button>
                  )}
                  
                  <Button
                    variant="default"
                    size="sm"
                    className="text-xs py-1 h-8"
                    onClick={() => handleSendConnection(profile.id, profile.name)}
                    disabled={isConnectionSent || isFullyConnected}
                  >
                    <BowRibbon 
                      className="w-8 h-5 mr-1" 
                      isLeftActive={isConnectionSent} 
                      isRightActive={isConnectionAccepted} 
                      isActive={isFullyConnected}
                      color="#FFD9A7"
                    />
                    {isFullyConnected ? 'Connected' : 
                     isConnectionSent ? 'Request Sent' : 
                     isConnectionAccepted ? 'LeanBack' : 'LeanOn'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedMatches;
