import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import ProfilesSection from '@/components/mumzally/ProfilesSection';
import { toast } from "@/hooks/use-toast";
import MessageForm from '@/components/mumzally/MessageForm';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '@/hooks/use-user-info';

const MumzAlly = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedMum, setSelectedMum] = useState<{id: number, name: string} | null>(null);
  const [isMessageFormOpen, setIsMessageFormOpen] = useState(false);
  const navigate = useNavigate();
  const { neighborhood, kids, workStatus } = useUserInfo();
  
  const currentUserProfile = {
    location: neighborhood || '',
    kids: kids?.map(kid => {
      if (!kid?.birthDate) {
        return { age: 3, gender: 'Girl' };
      }
      
      const birthDate = new Date(kid.birthDate);
      const now = new Date();
      const diffMs = now.getTime() - birthDate.getTime();
      const ageDate = new Date(diffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      
      return {
        age: isNaN(age) ? 3 : age,
        gender: kid.gender || 'Girl'
      };
    }) || [],
    workStatus: workStatus || 'Part-time',
    interests: ['Yoga', 'Reading', 'Beach Days'],
    nationality: 'British Expat'
  };
  
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
    
    const userLocation = currentUserProfile.location || '';
    if (profile.location === userLocation) {
      score += 40;
    } else if (['Dubai Marina', 'JBR'].includes(profile.location) && 
               ['Dubai Marina', 'JBR'].includes(userLocation)) {
      score += 30;
    }
    
    const userKids = currentUserProfile.kids || [];
    const kidAgeMatches = profile.kids.some(profileKid => 
      userKids.some(userKid => 
        Math.abs(profileKid.age - userKid.age) <= 2
      )
    );
    
    if (kidAgeMatches) {
      score += 30;
    }
    
    const userWorkStatus = currentUserProfile.workStatus || '';
    if (profile.workStatus === userWorkStatus) {
      score += 10;
    }
    
    const userInterests = currentUserProfile.interests || [];
    const sharedInterests = profile.interests.filter(interest => 
      userInterests.includes(interest)
    );
    score += Math.min(sharedInterests.length * 5, 15);
    
    const userNationality = currentUserProfile.nationality || '';
    if (profile.nationality === userNationality) {
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
        const maxAge = ageRange[1]?.includes('+') ? 100 : parseInt(ageRange[1]);
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
              const maxAge = ageRange[1]?.includes('+') ? 100 : parseInt(ageRange[1]);
              if (isNaN(minAge) || (kid.age < minAge || kid.age > maxAge)) return false;
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
  
  const defaultFilters = {
    location: neighborhood || 'Dubai Marina',
    kids: [
      {
        ageRange: currentUserProfile.kids && currentUserProfile.kids.length > 0 ? 
          currentUserProfile.kids[0].age.toString() : 
          "all",
        gender: "all"
      }
    ]
  };
  
  const activeFilters = Object.keys(filters).length > 0 ? filters : defaultFilters;
  const filteredProfiles = applyFilters(rankedProfiles, activeFilters);
  
  const findNearbyMomsWithSimilarAgedKids = () => {
    if (!neighborhood || !kids || kids.length === 0) return [];
    
    return rankedProfiles.filter(profile => {
      if (profile.location === neighborhood) {
        const userKidsAges = currentUserProfile.kids.map(kid => kid.age);
        const profileKidsAges = profile.kids.map(kid => kid.age);
        
        return userKidsAges.some(userKidAge => 
          profileKidsAges.some(profileKidAge => 
            Math.abs(userKidAge - profileKidAge) <= 2
          )
        );
      }
      
      const nearbyNeighborhoods = {
        'Dubai Marina': ['JBR', 'Palm Jumeirah'],
        'JBR': ['Dubai Marina', 'Palm Jumeirah'],
        'Palm Jumeirah': ['Dubai Marina', 'JBR'],
        'Downtown Dubai': ['Business Bay'],
        'Arabian Ranches': ['Dubai Hills']
      };
      
      const nearby = nearbyNeighborhoods[neighborhood] || [];
      if (nearby.includes(profile.location)) {
        const userKidsAges = currentUserProfile.kids.map(kid => kid.age);
        const profileKidsAges = profile.kids.map(kid => kid.age);
        
        return userKidsAges.some(userKidAge => 
          profileKidsAges.some(profileKidAge => 
            Math.abs(userKidAge - profileKidAge) <= 2
          )
        );
      }
      
      return false;
    }).slice(0, 3);
  };
  
  const nearbyMomsWithSimilarAgedKids = findNearbyMomsWithSimilarAgedKids();
  
  const recommendedProfiles = [...rankedProfiles]
    .filter(profile => {
      if (neighborhood) {
        if (profile.location === neighborhood) return true;
        
        const nearbyNeighborhoods = {
          'Dubai Marina': ['JBR', 'Palm Jumeirah'],
          'JBR': ['Dubai Marina', 'Palm Jumeirah'],
          'Palm Jumeirah': ['Dubai Marina', 'JBR'],
          'Downtown Dubai': ['Business Bay'],
          'Arabian Ranches': ['Dubai Hills']
        };
        
        const nearby = nearbyNeighborhoods[neighborhood] || [];
        return nearby.includes(profile.location);
      }
      return true;
    })
    .filter(profile => {
      if (!kids || !kids.length) return true;
      
      return kids.some(userKid => {
        if (!userKid || !userKid.birthDate) return true;
        
        const birthDate = new Date(userKid.birthDate);
        const now = new Date();
        const diffMs = now.getTime() - birthDate.getTime();
        const ageDate = new Date(diffMs);
        const userKidAge = Math.abs(ageDate.getUTCFullYear() - 1970);
        
        if (isNaN(userKidAge)) return true;
        
        return profile.kids.some(profileKid => 
          Math.abs(profileKid.age - userKidAge) <= 2
        );
      });
    })
    .slice(0, 3);
  
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
        <HeroSection 
          onFiltersChange={setFilters} 
          profiles={recommendedProfiles}
          nearbyMoms={nearbyMomsWithSimilarAgedKids}
        />
        <div className="flex justify-center bg-[#B8CEC2]">
          <img 
            src="/lovable-uploads/aad47488-6aaf-41bc-8d54-c6163b5cc62c.png" 
            alt="Moms connecting" 
            className="max-w-full md:max-w-lg h-auto mx-auto"
          />
        </div>
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
