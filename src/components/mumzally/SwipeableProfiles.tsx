
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/ui/icons';
import { UserCircle, MapPin, Baby, X, Heart, Users } from 'lucide-react';
import { MumzProfile } from '@/pages/MumzAlly';
import BowRibbon from './BowRibbon';
import { toast } from '@/hooks/use-toast';
import EditProfileDialog from '@/components/profile/EditProfileDialog';
import { useUserInfo } from '@/hooks/use-user-info';

interface ProfileProps {
  profiles: MumzProfile[];
  onLeanOn: (id: number, name: string) => void;
  onSkip: (id: number) => void;
  disableConnections?: boolean;
}

const SwipeableProfiles = ({ profiles, onLeanOn, onSkip, disableConnections = false }: ProfileProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initialX = useRef<number | null>(null);
  const [swiping, setSwiping] = useState(false);
  const { userInfo } = useUserInfo();

  // Check if we have profiles to display
  const noProfiles = profiles.length === 0;
  
  const goToNextProfile = () => {
    if (activeIndex < profiles.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleLeanOn = () => {
    const currentProfile = profiles[activeIndex];
    if (currentProfile) {
      onLeanOn(currentProfile.id, currentProfile.name);
      goToNextProfile();
    }
  };

  const handleSkip = () => {
    const currentProfile = profiles[activeIndex];
    if (currentProfile) {
      onSkip(currentProfile.id);
      goToNextProfile();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    initialX.current = e.touches[0].clientX;
    setSwiping(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
    if (initialX.current === null || index !== activeIndex) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = currentX - initialX.current;
    const card = cardRefs.current[index];
    
    if (card) {
      card.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.1}deg)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>, index: number) => {
    if (initialX.current === null || index !== activeIndex) return;
    
    const currentX = e.changedTouches[0].clientX;
    const diffX = currentX - initialX.current;
    const card = cardRefs.current[index];
    
    if (card) {
      if (diffX > 100) {
        // Swipe right: LeanOn
        card.style.transform = 'translateX(1000px) rotate(30deg)';
        handleLeanOn();
      } else if (diffX < -100) {
        // Swipe left: Skip
        card.style.transform = 'translateX(-1000px) rotate(-30deg)';
        handleSkip();
      } else {
        // Reset position
        card.style.transform = 'translateX(0) rotate(0)';
      }
    }
    
    initialX.current = null;
    setSwiping(false);
  };

  const isProfileComplete = () => {
    return !!(
      userInfo?.name &&
      userInfo?.neighborhood &&
      userInfo?.kids &&
      userInfo?.kids.length > 0 &&
      userInfo?.nationality &&
      userInfo?.birthDate &&
      userInfo?.interests &&
      !userInfo?.profileNeedsUpdate
    );
  };

  const handleCompleteProfile = () => {
    setEditProfileDialogOpen(true);
  };

  return (
    <div className="mt-6 relative pb-14">
      {!isProfileComplete() && !noProfiles && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-amber-800">
            Complete your profile to increase your chances of connecting with compatible moms!
          </p>
          <Button 
            onClick={handleCompleteProfile}
            variant="outline" 
            size="sm" 
            className="mt-2 bg-amber-100"
          >
            Complete Profile
          </Button>
        </div>
      )}
      
      {noProfiles ? (
        <div className="flex flex-col items-center justify-center bg-card p-10 rounded-xl shadow-md text-center">
          <Users className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Moms Found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            We don't have any moms to show you right now. Complete your profile to help us find the perfect LeanMoms for you!
          </p>
          <Button 
            onClick={handleCompleteProfile}
            className="bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground"
          >
            Complete Your Profile
          </Button>
        </div>
      ) : (
        <div className="relative h-[500px] md:max-w-lg mx-auto">
          {profiles.map((profile, index) => (
            <Card
              key={profile.id}
              ref={el => cardRefs.current[index] = el}
              className={`absolute top-0 left-0 right-0 mx-auto w-full max-w-md shadow-lg transition-all duration-300 ${
                index < activeIndex ? 'opacity-0 -z-10' : 
                index > activeIndex ? 'opacity-80 scale-95 -z-10' : 
                'z-10'
              } ${swiping && index === activeIndex ? 'transition-transform' : ''}`}
              onTouchStart={handleTouchStart}
              onTouchMove={(e) => handleTouchMove(e, index)}
              onTouchEnd={(e) => handleTouchEnd(e, index)}
            >
              <CardContent className="p-0">
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                        <UserCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium">
                          {profile.name}, {profile.age}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {profile.location}
                          {profile.activeInCommunity && (
                            <span className="ml-2 text-green-600 flex items-center">
                              ● Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-primary/50 text-black border-primary/30">
                      {profile.compatibility}% Match
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Kids</h4>
                      <div className="flex items-center flex-wrap gap-1">
                        {profile.kids.map((kid, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            <Baby className="h-3 w-3 mr-1" />
                            {kid.age} y/o {kid.gender}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Nationality</h4>
                      <p className="text-sm">{profile.nationality}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Work Status</h4>
                      <p className="text-sm">{profile.workStatus}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Interests</h4>
                      <div className="flex flex-wrap gap-1">
                        {profile.interests.map((interest, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Bio</h4>
                      <p className="text-sm text-muted-foreground">{profile.bio}</p>
                    </div>
                  </div>
                </div>
                
                {!disableConnections && (
                  <div className="border-t p-4 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full w-14 h-14 p-0"
                      onClick={handleSkip}
                    >
                      <X className="h-6 w-6 text-gray-500" />
                    </Button>
                    <Button
                      size="lg"
                      className="rounded-full w-14 h-14 p-0 bg-[#FFD9A7] hover:bg-[#FFD9A7]/90 text-foreground"
                      onClick={handleLeanOn}
                    >
                      <BowRibbon className="w-10 h-10" color="#AF8A5C" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {!noProfiles && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center -mb-6">
              <Badge variant="outline" className="bg-background">
                {activeIndex + 1} of {profiles.length}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <EditProfileDialog
        isOpen={editProfileDialogOpen}
        onOpenChange={setEditProfileDialogOpen}
        mode="profile"
        title="Complete Your Profile"
        description="Fill in your profile details to connect with more LeanMoms"
        section="all"
        simpleMode={true}
      />
    </div>
  );
};

export default SwipeableProfiles;
