
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import MessageDialog from '@/components/mumzally/MessageDialog';
import { useUserInfo } from '@/hooks/use-user-info';

const mockProfiles = [
  {
    id: 1,
    name: "Emma Thompson",
    age: 32,
    location: "Sunset District",
    kids: [{ age: 3, gender: "Girl" }, { age: 5, gender: "Boy" }],
    nationality: "American",
    workStatus: "Part-time",
    interests: ["Outdoor activities", "Cooking", "Reading"],
    bio: "Mom of two looking to connect with other families in the area.",
    compatibility: 92
  },
  {
    id: 2,
    name: "Sophia Chen",
    age: 29,
    location: "Mission District",
    kids: [{ age: 2, gender: "Girl" }],
    nationality: "Chinese-American",
    workStatus: "Full-time",
    interests: ["Arts and crafts", "Music", "Playgroups"],
    bio: "First-time mom looking for playdates and support.",
    compatibility: 88
  },
  {
    id: 3,
    name: "Aisha Ahmed",
    age: 34,
    location: "Dubai Marina",
    kids: [{ age: 4, gender: "Boy" }, { age: 7, gender: "Girl" }],
    nationality: "UAE",
    workStatus: "Stay-at-home",
    interests: ["Cooking", "Reading", "Swimming"],
    bio: "Looking to meet other moms in Dubai Marina area.",
    compatibility: 85
  },
  {
    id: 4,
    name: "Jessica Miller",
    age: 31,
    location: "Palm Jumeirah",
    kids: [{ age: 1, gender: "Boy" }],
    nationality: "British Expat",
    workStatus: "Full-time",
    interests: ["Baby groups", "Fitness", "Beach days"],
    bio: "New to Dubai, looking to build connections with other expat moms.",
    compatibility: 79
  }
];

interface FilterOptions {
  location?: string;
  kids?: Array<{
    ageRange?: string;
    gender?: string;
  }>;
  compatibilityThreshold?: number;
}

const MumzAlly = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const { userInfo } = useUserInfo();
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);
  const [nearbyMoms, setNearbyMoms] = useState<typeof mockProfiles>([]);

  useEffect(() => {
    filterProfilesByLocationAndKids();
  }, [userInfo]);

  const filterProfilesByLocationAndKids = (filters: FilterOptions = {}) => {
    const userLocation = userInfo?.location?.latitude && userInfo?.location?.longitude ? userInfo.location : null;
    const userNeighborhood = userInfo?.neighborhood || "";
    const userKids = userInfo?.kids || [];

    let locationMatches = [...mockProfiles];
    
    if (userLocation) {
      const nearby = mockProfiles.filter(profile => 
        profile.id === 3 || profile.id === 4
      );
      setNearbyMoms(nearby);
    } else if (userNeighborhood) {
      const nearby = mockProfiles.filter(profile => 
        profile.location === userNeighborhood
      );
      setNearbyMoms(nearby);
    }

    if (userKids.length > 0) {
      locationMatches = locationMatches.filter(profile => {
        const hasKidsMatch = userKids.some(userKid => {
          const userKidAge = userKid.birthDate 
            ? Math.floor((new Date().getTime() - new Date(userKid.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) 
            : 0;
            
          return profile.kids.some(profileKid => {
            return Math.abs(profileKid.age - userKidAge) <= 1;
          });
        });
        
        return hasKidsMatch;
      });
    }

    if (Object.keys(filters).length > 0) {
      if (filters.location && filters.location !== 'all') {
        locationMatches = locationMatches.filter(profile => 
          profile.location === filters.location
        );
      }
      
      if (filters.kids && filters.kids.length > 0) {
        locationMatches = locationMatches.filter(profile => {
          return filters.kids.some((kidFilter) => {
            if (!kidFilter.ageRange || kidFilter.ageRange === 'all') {
              return true;
            }
            
            return profile.kids.some(profileKid => {
              const ageMatch = kidFilter.ageRange === 'all' || 
                profileKid.age.toString() === kidFilter.ageRange;
              
              const genderMatch = !kidFilter.gender || kidFilter.gender === 'all' || 
                profileKid.gender === kidFilter.gender;
                
              return ageMatch && genderMatch;
            });
          });
        });
      }
      
      if (filters.compatibilityThreshold) {
        locationMatches = locationMatches.filter(profile => 
          profile.compatibility >= filters.compatibilityThreshold
        );
      }
    }

    locationMatches.sort((a, b) => b.compatibility - a.compatibility);
    
    setFilteredProfiles(locationMatches);
  };

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    console.log("Sending message to", selectedRecipient, "Text:", text, "Image:", image);
  };

  const handleFiltersChange = (filters: Record<string, any>) => {
    filterProfilesByLocationAndKids(filters);
  };

  return (
    <div className="min-h-screen bg-[#B8CEC2]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-24 pb-12 px-4">
        <HeroSection onFiltersChange={handleFiltersChange} profiles={filteredProfiles} nearbyMoms={nearbyMoms} />
      </main>
      
      <Footer />
      
      {selectedRecipient && (
        <MessageDialog 
          open={messageDialogOpen} 
          onOpenChange={setMessageDialogOpen} 
          conversation={{
            id: `conv-${selectedRecipient.id}`,
            participantId: selectedRecipient.id.toString(),
            participantName: selectedRecipient.name,
            lastMessage: "",
            lastMessageTimestamp: new Date().toISOString(),
            unreadCount: 0
          }}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default MumzAlly;
