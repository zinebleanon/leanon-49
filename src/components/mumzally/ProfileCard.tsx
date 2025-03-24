
import { UserCircle, BabyIcon, MapPin, Flag, Briefcase, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import BowRibbon from './BowRibbon';
import { Link } from 'react-router-dom';

export interface Kid {
  age: number;
  gender: string;
}

export interface ProfileProps {
  id: number;
  name: string;
  age: number;
  location: string;
  kids: Kid[];
  nationality: string;
  workStatus: string;
  interests: string[];
  bio: string;
  compatibility: number;
  onHeartClick: (id: number) => void;
  onMessageClick?: (id: number, name: string) => void;
  isFullyMatched?: boolean;
}

const ProfileCard = ({ 
  id, 
  name, 
  age, 
  location, 
  kids, 
  nationality, 
  workStatus, 
  interests, 
  bio, 
  compatibility, 
  onHeartClick,
  onMessageClick,
  isFullyMatched = false
}: ProfileProps) => {
  const [userHeartActive, setUserHeartActive] = useState(false);

  const handleHeartClick = () => {
    setUserHeartActive(!userHeartActive);
    onHeartClick(id);
  };

  const handleMessageClick = () => {
    if (onMessageClick) {
      onMessageClick(id, name);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#FFD9A7] flex items-center justify-center">
            <UserCircle className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">
              <Link to={`/ally/profile/${id}`} className="hover:underline">
                {name}
              </Link>
            </h3>
            <p className="text-sm text-muted-foreground">{age}, {location}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Badge className="bg-primary/70 text-foreground font-bold border-primary/30">
              {compatibility}% Match
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2">
            <BabyIcon className="h-4 w-4 text-amber-500" />
            <span className="text-sm">
              {kids.map((kid, i) => (
                <span key={i}>
                  {kid.age} y/o {kid.gender}
                  {i < kids.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-500" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-amber-500" />
            <span className="text-sm">{nationality}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-amber-500" />
            <span className="text-sm">Profession: {workStatus}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {interests.map((interest, i) => (
            <Badge key={i} variant="outline" className="bg-secondary/50">
              {interest}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-sm text-primary hover:text-primary/80 p-0 h-auto flex items-center gap-1"
          >
            See {name}'s profile
          </Button>
          <Button 
            variant="default" 
            className="ml-auto"
            onClick={handleHeartClick}
          >
            <div className="flex items-center gap-2">
              <BowRibbon 
                className="w-16 h-10" 
                isLeftActive={userHeartActive} 
                isRightActive={!userHeartActive} 
              />
              LeanBack
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
