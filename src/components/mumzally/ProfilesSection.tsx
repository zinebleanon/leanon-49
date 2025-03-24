
import ProfileCard, { Kid } from './ProfileCard';
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from '@/components/ui/card';

export interface MumzProfile {
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
  isFullyMatched?: boolean;
}

interface ProfilesSectionProps {
  profiles: MumzProfile[];
  onHeartClick: (id: number) => void;
  onMessageClick?: (id: number, name: string) => void;
}

const ProfilesSection = ({ profiles, onHeartClick, onMessageClick }: ProfilesSectionProps) => {
  const handleHeartClick = (id: number) => {
    toast({
      title: "LeanOn Request Sent",
      description: "You've sent a request to LeanOn with someone in your neighborhood!",
    });
    
    onHeartClick(id);
  };
  
  return (
    <section className="py-8 md:py-12 px-4 md:px-8 bg-[#B8CEC2]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold font-playfair">Recommended Match</h2>
          <Badge variant="outline" className="px-3 py-1 bg-[#FFD9A7]/50 border-[#FFD9A7]">
            {profiles.length} {profiles.length === 1 ? 'result' : 'results'} found
          </Badge>
        </div>
        
        {profiles.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {profiles.map((profile) => (
              <ProfileCard 
                key={profile.id}
                {...profile}
                onHeartClick={handleHeartClick}
                onMessageClick={onMessageClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-background rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-2">No matching profiles found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilesSection;
