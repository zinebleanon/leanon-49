
import { UserCircle, BabyIcon, MapPin, Flag, Briefcase, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
      <div className="bg-gradient-to-r from-primary/10 to-amber-400/10 p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <UserCircle className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-muted-foreground">{age}, {location}</p>
            </div>
          </div>
          <Badge className="bg-primary/20 text-primary border-primary/10">
            {compatibility}% Match
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <p className="text-sm mb-4">{bio}</p>
        
        <div className="space-y-3">
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
            <span className="text-sm">{workStatus}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {interests.map((interest, i) => (
            <Badge key={i} variant="outline" className="bg-secondary/50">
              {interest}
            </Badge>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          {isFullyMatched && onMessageClick ? (
            <Button 
              variant="outline"
              className="rounded-full"
              onClick={handleMessageClick}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Message
            </Button>
          ) : (
            <div /> // Empty placeholder to maintain layout when message button is hidden
          )}
          
          <Button 
            className={`rounded-full ${isFullyMatched ? "col-span-1" : "col-span-2"}`}
            onClick={handleHeartClick}
          >
            <div className="flex items-center justify-center gap-2">
              <svg width="24" height="24" viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left half of heart */}
                <path 
                  d="M40,20 C40,11 35,4 28,1 C21,-2 14,2 10,6 C6,10 2,16 0,22 C13,40 27,56 40,68 Z" 
                  fill={userHeartActive ? "#ea384c" : "#e2e8f0"} 
                  stroke={userHeartActive ? "#ea384c" : "#94a3b8"}
                  strokeWidth="1.5"
                />
                {/* Right half of heart */}
                <path 
                  d="M40,20 C40,11 45,4 52,1 C59,-2 66,2 70,6 C74,10 78,16 80,22 C67,40 53,56 40,68 Z" 
                  fill={isFullyMatched ? "#ea384c" : "#e2e8f0"} 
                  stroke={isFullyMatched ? "#ea384c" : "#94a3b8"}
                  strokeWidth="1.5"
                />
              </svg>
              {isFullyMatched ? "Ally Matched!" : "Ally"}
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
