
import { UserCircle, BabyIcon, MapPin, Flag, Briefcase, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  onHeartClick 
}: ProfileProps) => {
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
        
        <Button 
          className="w-full mt-4 rounded-full"
          onClick={() => onHeartClick(id)}
        >
          <Heart className="h-5 w-5 mr-2" fill="currentColor" />
          Let's try to Ally?
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
