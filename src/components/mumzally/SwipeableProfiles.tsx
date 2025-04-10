
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Baby, MapPin, Flag, Briefcase, Star, X, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { UserCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import BowRibbon from './BowRibbon';
import { Link } from 'react-router-dom';

interface Kid {
  age: number;
  gender: string;
}

interface NearbyMom {
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
}

interface SwipeableProfilesProps {
  profiles: NearbyMom[];
  onLeanOn: (id: number, name: string) => void;
  onSkip: (id: number) => void;
}

const SwipeableProfiles: React.FC<SwipeableProfilesProps> = ({ profiles, onLeanOn, onSkip }) => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [swiped, setSwiped] = useState<'left' | 'right' | null>(null);

  if (profiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-white rounded-lg shadow">
        <UserCircle className="h-20 w-20 text-primary/30 mb-4" />
        <h3 className="text-xl font-medium mb-2">No nearby moms found</h3>
        <p className="text-muted-foreground max-w-md">
          There don't seem to be any moms in your area yet. Try expanding your search area or check back later.
        </p>
      </div>
    );
  }

  if (currentProfileIndex >= profiles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-white rounded-lg shadow">
        <UserCircle className="h-20 w-20 text-primary/30 mb-4" />
        <h3 className="text-xl font-medium mb-2">You've viewed all nearby moms</h3>
        <p className="text-muted-foreground max-w-md mb-4">
          You've gone through all the profiles in your area. Check back later for new matches!
        </p>
        <Button 
          onClick={() => setCurrentProfileIndex(0)}
          className="mt-2"
        >
          Start Over
        </Button>
      </div>
    );
  }

  const currentProfile = profiles[currentProfileIndex];

  const handleLeanOn = () => {
    setSwiped('right');
    setTimeout(() => {
      onLeanOn(currentProfile.id, currentProfile.name);
      setCurrentProfileIndex(prev => prev + 1);
      setSwiped(null);
    }, 300);
  };

  const handleSkip = () => {
    setSwiped('left');
    setTimeout(() => {
      onSkip(currentProfile.id);
      setCurrentProfileIndex(prev => prev + 1);
      setSwiped(null);
    }, 300);
  };

  const cardClass = swiped === 'left' 
    ? 'transform -translate-x-full opacity-0 transition-all duration-300' 
    : swiped === 'right' 
      ? 'transform translate-x-full opacity-0 transition-all duration-300' 
      : 'transform transition-all duration-300';

  return (
    <div className="w-full max-w-md mx-auto px-4 relative">
      <div className={cardClass}>
        <Card className="overflow-hidden shadow-md bg-white">
          <div className="flex md:flex-row flex-col h-full">
            {/* Profile Image Section - 40% of the card */}
            <div className="w-full md:w-2/5 bg-[#FFD9A7]/20 flex items-center justify-center p-6">
              <div className="w-32 h-32 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                <UserCircle className="h-24 w-24 text-primary" />
              </div>
            </div>
            
            {/* Profile Details Section - 60% of the card */}
            <div className="w-full md:w-3/5 p-5">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h2 className="text-xl font-semibold">
                    <Link to={`/ally/profile/${currentProfile.id}`} className="hover:underline">
                      {currentProfile.name}
                    </Link>
                  </h2>
                  <p className="text-sm text-muted-foreground">{currentProfile.age} years old</p>
                </div>
                <Badge className="bg-primary/70 text-foreground font-bold border-primary/30">
                  {currentProfile.compatibility}% Match
                </Badge>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm">{currentProfile.location}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Baby className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm">
                    {currentProfile.kids.map((kid, i) => (
                      <span key={i}>
                        {kid.age} y/o {kid.gender}
                        {i < currentProfile.kids.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm">{currentProfile.nationality}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-amber-500 flex-shrink-0" />
                  <span className="text-sm">{currentProfile.workStatus}</span>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-medium">Interests</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest, i) => (
                    <Badge key={i} variant="outline" className="bg-secondary/30 text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-3 text-sm text-muted-foreground">
                <p>{currentProfile.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center p-4 gap-6 bg-gray-50">
            <Button 
              variant="outline"
              size="lg"
              className="rounded-full h-14 w-14 p-0 border-2"
              onClick={handleSkip}
            >
              <X className="h-6 w-6 text-muted-foreground" />
            </Button>
            
            <Button 
              variant="default"
              size="lg"
              className="rounded-full h-14 w-14 p-0"
              onClick={handleLeanOn}
            >
              <BowRibbon className="w-9 h-9" color="#FFD9A7" />
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Progress indicator */}
      <div className="flex justify-center mt-4 gap-1">
        {profiles.slice(0, Math.min(profiles.length, 5)).map((_, index) => (
          <div 
            key={index} 
            className={`h-1 rounded-full ${
              index === currentProfileIndex 
                ? 'w-8 bg-primary' 
                : index < currentProfileIndex 
                  ? 'w-4 bg-primary/30' 
                  : 'w-4 bg-gray-200'
            }`}
          />
        ))}
        {profiles.length > 5 && (
          <div className="h-1 w-4 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-400">+{profiles.length - 5}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeableProfiles;
