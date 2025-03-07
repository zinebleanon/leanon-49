
import ProfileCard, { Kid } from './ProfileCard';

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
  return (
    <section className="py-12 px-6 md:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Potential Allies For You
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard 
              key={profile.id}
              {...profile}
              onHeartClick={onHeartClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilesSection;
