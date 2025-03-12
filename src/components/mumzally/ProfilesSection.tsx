
import ProfileCard, { Kid } from './ProfileCard';
import { toast } from "@/hooks/use-toast";

interface MumProfile {
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

interface ProfilesSectionProps {
  profiles: MumProfile[];
  onHeartClick: (id: number) => void;
}

const ProfilesSection = ({ profiles, onHeartClick }: ProfilesSectionProps) => {
  const handleHeartClick = (id: number) => {
    toast({
      title: "Connection Request Sent",
      description: "You've sent a request to become MumzAllies with someone in your neighborhood!",
    });
    
    onHeartClick(id);
  };
  
  return (
    <section className="py-8 md:py-12 px-4 md:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-12">
          Potential Allies In Your Neighborhood
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {profiles.map((profile) => (
            <ProfileCard 
              key={profile.id}
              {...profile}
              onHeartClick={handleHeartClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilesSection;
