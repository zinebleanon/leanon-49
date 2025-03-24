import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import ProfilesSection from '@/components/mumzally/ProfilesSection';
import MatchRequests from '@/components/mumzally/ConnectionRequests';
import { toast } from "@/hooks/use-toast";
import MessageForm from '@/components/mumzally/MessageForm';
import { useNavigate } from 'react-router-dom';

const MumzAlly = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedMum, setSelectedMum] = useState<{id: number, name: string} | null>(null);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);
  
  const currentUserProfile = {
    location: 'Dubai Marina',
    kids: [{age: 3, gender: 'Girl'}],
    workStatus: 'Part-time',
    interests: ['Yoga', 'Reading', 'Beach Days'],
    nationality: 'British Expat'
  };
  
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleHeartClick = (mumId: number) => {
    toast({
      title: "LeanOn Request Sent",
      description: "You've sent a request to connect with another mom in your area!",
    });
  };
  
  const handleMessageClick = (id: number, name: string) => {
    setSelectedMum({id, name});
    setIsMessageFormOpen(true);
  };
  
  const allMumProfiles = [
    {
      id: 1,
      name: 'Sarah',
      age: 32,
      location: 'Dubai Marina',
      kids: [{age: 3, gender: 'Boy'}, {age: 5, gender: 'Girl'}],
      nationality: 'Lebanese',
      workStatus: 'Full-time',
      interests: ['Cooking', 'Desert Safari', 'Art'],
      bio: 'Working mum in Dubai Marina looking for weekend playdate buddies!',
      compatibility: 85
    },
    {
      id: 2,
      name: 'Jessica',
      age: 29,
      location: 'Dubai Marina',
      kids: [{age: 2, gender: 'Girl'}, {age: 4, gender: 'Boy'}],
      nationality: 'British Expat',
      workStatus: 'Part-time',
      interests: ['Yoga', 'Reading', 'Beach Days'],
      bio: 'Dubai Marina resident looking to connect with nearby mumz.',
      compatibility: 92
    },
    {
      id: 3,
      name: 'Mei',
      age: 34,
      location: 'Palm Jumeirah',
      kids: [{age: 3, gender: 'Boy'}, {age: 5, gender: 'Boy'}],
      nationality: 'Chinese Expat',
      workStatus: 'Full-time',
      interests: ['Swimming', 'Music', 'Mall Trips'],
      bio: 'Living in Palm Jumeirah with two energetic boys who need playmates!',
      compatibility: 78
    },
    {
      id: 4,
      name: 'Aisha',
      age: 38,
      location: 'Downtown Dubai',
      kids: [{age: 7, gender: 'Girl'}],
      nationality: 'UAE',
      workStatus: 'Business Owner',
      interests: ['Painting', 'Local Culture', 'Museums'],
      bio: 'Emirati mom sharing local culture while raising a creative daughter.',
      compatibility: 65
    },
    {
      id: 5,
      name: 'Priya',
      age: 31,
      location: 'JBR',
      kids: [{age: 1, gender: 'Boy'}],
      nationality: 'Indian Expat',
      workStatus: 'Stay-at-home',
      interests: ['Baby Activities', 'Cooking', 'Photography'],
      bio: 'First-time mom looking to connect with other parents of toddlers.',
      compatibility: 88
    },
    {
      id: 6,
      name: 'Emily',
      age: 42,
      location: 'Arabian Ranches',
      kids: [{age: 10, gender: 'Girl'}, {age: 12, gender: 'Boy'}],
      nationality: 'American Expat',
      workStatus: 'Freelancer',
      interests: ['Family Outings', 'Book Club', 'Community Events'],
      bio: 'Arabian Ranches mom of pre-teens looking for family friends.',
      compatibility: 75
    }
  ];
  
  const calculateCompatibilityScore = (profile) => {
    let score = 0;
    
    if (profile.location === currentUserProfile.location) {
      score += 40;
    } else if (['Dubai Marina', 'JBR'].includes(profile.location) && 
               ['Dubai Marina', 'JBR'].includes(currentUserProfile.location)) {
      score += 30;
    }
    
    const kidAgeMatches = profile.kids.some(profileKid => 
      currentUserProfile.kids.some(userKid => 
        Math.abs(profileKid.age - userKid.age) <= 2
      )
    );
    
    if (kidAgeMatches) {
      score += 30;
    }
    
    if (profile.workStatus === currentUserProfile.workStatus) {
      score += 10;
    }
    
    const sharedInterests = profile.interests.filter(interest => 
      currentUserProfile.interests.includes(interest)
    );
    score += Math.min(sharedInterests.length * 5, 15);
    
    if (profile.nationality === currentUserProfile.nationality) {
      score += 5;
    }
    
    return score;
  };
  
  const rankedProfiles = [...allMumProfiles].map(profile => ({
    ...profile,
    compatibility: calculateCompatibilityScore(profile)
  })).sort((a, b) => b.compatibility - a.compatibility);
  
  const applyFilters = (profiles, activeFilters) => {
    return profiles.filter(profile => {
      if (activeFilters.age && activeFilters.age !== "all") {
        const ageRange = activeFilters.age.split('-');
        const minAge = parseInt(ageRange[0]);
        const maxAge = ageRange[1].includes('+') ? 100 : parseInt(ageRange[1]);
        if (profile.age < minAge || profile.age > maxAge) return false;
      }
      
      if (activeFilters.kids && Array.isArray(activeFilters.kids)) {
        for (const kidFilter of activeFilters.kids) {
          if ((!kidFilter.ageRange || kidFilter.ageRange === "all") && 
              (!kidFilter.gender || kidFilter.gender === "all")) {
            continue;
          }
          
          const hasMatchingKid = profile.kids.some(kid => {
            if (kidFilter.ageRange && kidFilter.ageRange !== "all") {
              const ageRange = kidFilter.ageRange.split('-');
              const minAge = parseInt(ageRange[0]);
              const maxAge = ageRange[1].includes('+') ? 100 : parseInt(ageRange[1]);
              if (kid.age < minAge || kid.age > maxAge) return false;
            }
            
            if (kidFilter.gender && kidFilter.gender !== "all" && kid.gender !== kidFilter.gender) {
              return false;
            }
            
            return true;
          });
          
          if (!hasMatchingKid) return false;
        }
      }
      
      if (activeFilters.location && activeFilters.location !== "all" && profile.location !== activeFilters.location) {
        return false;
      }
      
      if (activeFilters.nationality && activeFilters.nationality !== "all" && profile.nationality !== activeFilters.nationality) {
        return false;
      }
      
      if (activeFilters.workStatus && activeFilters.workStatus !== "all" && profile.workStatus !== activeFilters.workStatus) {
        return false;
      }
      
      if (activeFilters.compatibilityThreshold && profile.compatibility < activeFilters.compatibilityThreshold) {
        return false;
      }
      
      return true;
    });
  };
  
  const filteredProfiles = Object.keys(filters).length > 0 
    ? applyFilters(rankedProfiles, filters)
    : rankedProfiles;
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]/30">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-12 md:pb-16">
        <HeroSection onFiltersChange={setFilters} />
        <div className="flex justify-center bg-[#B8CEC2]">
          <img 
            src="/lovable-uploads/aad47488-6aaf-41bc-8d54-c6163b5cc62c.png" 
            alt="Moms connecting" 
            className="max-w-full md:max-w-lg h-auto mx-auto"
          />
        </div>
        <MatchRequests />
        <ProfilesSection 
          profiles={filteredProfiles} 
          onHeartClick={handleHeartClick}
          onMessageClick={handleMessageClick}
        />
      </main>
      
      {selectedMum && (
        <MessageForm 
          open={isMessageFormOpen} 
          onOpenChange={setIsMessageFormOpen} 
          recipient={selectedMum} 
        />
      )}
      
      <Footer />
    </div>
  );
};

export default MumzAlly;


