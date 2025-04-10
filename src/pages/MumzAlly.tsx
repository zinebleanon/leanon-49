
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import MessageDialog from '@/components/mumzally/MessageDialog';
import SwipeableProfiles from '@/components/mumzally/SwipeableProfiles';
import { useUserInfo } from '@/hooks/use-user-info';
import { toast } from '@/hooks/use-toast';

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

interface KidFilter {
  ageRange?: string;
  gender?: string;
}

interface FilterOptions {
  searchTerm?: string;
  age?: string;
  kids?: KidFilter[];
  location?: string;
  nationality?: string;
  workStatus?: string;
  interests?: string[];
  compatibilityThreshold?: number;
}

const MumzAlly = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const { userInfo } = useUserInfo();
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);
  const [nearbyMoms, setNearbyMoms] = useState<typeof mockProfiles>([]);
  const [sentConnections, setSentConnections] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    findNearbyAndMatchedMoms();
  }, [userInfo]);

  const calculateKidAgeSimilarity = (userKids, profileKids) => {
    if (!userKids.length || !profileKids.length) return 0;
    
    let totalSimilarity = 0;
    userKids.forEach(userKid => {
      const userKidAge = userKid.birthDate 
        ? Math.floor((new Date().getTime() - new Date(userKid.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) 
        : 0;
        
      profileKids.forEach(profileKid => {
        const ageDiff = Math.abs(profileKid.age - userKidAge);
        // Give a score based on age difference: 1.0 for exact match, decreasing as difference increases
        totalSimilarity += ageDiff === 0 ? 1.0 : 1.0 / (ageDiff + 1);
      });
    });
    
    return totalSimilarity / (userKids.length * profileKids.length);
  };

  const findNearbyAndMatchedMoms = () => {
    const userLocation = userInfo?.location?.latitude && userInfo?.location?.longitude ? userInfo.location : null;
    const userNeighborhood = userInfo?.neighborhood || "";
    
    // First, identify nearby moms based on location
    if (userLocation) {
      // For demo purposes we're just using a fixed subset
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
    
    // Sort all profiles for the default view
    const userKids = userInfo?.kids || [];
    sortProfilesByRelevance(mockProfiles, userKids, userNeighborhood);
  };

  const sortProfilesByRelevance = (profiles, userKids, userNeighborhood) => {
    // Calculate and apply scores for sorting
    const rankedProfiles = profiles.map(profile => {
      // Score based on kid age similarity
      const kidAgeSimilarityScore = calculateKidAgeSimilarity(userKids, profile.kids);
      
      // Score based on location proximity
      const locationProximityScore = (userNeighborhood === profile.location) ? 1.0 : 0.5;
      
      // Combined score with compatibility
      const combinedScore = (
        (kidAgeSimilarityScore * 0.4) + 
        (locationProximityScore * 0.3) + 
        (profile.compatibility / 100 * 0.3)
      );
      
      return {
        ...profile,
        kidAgeSimilarityScore,
        locationProximityScore,
        combinedScore
      };
    });
    
    // Sort by combined score
    rankedProfiles.sort((a, b) => b.combinedScore - a.combinedScore);
    
    setFilteredProfiles(rankedProfiles);
  };

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    console.log("Sending message to", selectedRecipient, "Text:", text, "Image:", image);
  };

  const handleFiltersChange = (filters: FilterOptions) => {
    console.log("Applying filters:", filters);
    
    let matchedProfiles = [...mockProfiles];
    
    // Apply search term filter if provided
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.name.toLowerCase().includes(searchTermLower) ||
        profile.location.toLowerCase().includes(searchTermLower) ||
        profile.nationality.toLowerCase().includes(searchTermLower) ||
        profile.workStatus.toLowerCase().includes(searchTermLower) ||
        profile.interests.some(interest => interest.toLowerCase().includes(searchTermLower)) ||
        profile.bio.toLowerCase().includes(searchTermLower)
      );
      
      // Update search term state
      setSearchTerm(filters.searchTerm);
    } else {
      setSearchTerm('');
    }
    
    // Apply age filter if provided
    if (filters.age && filters.age !== 'all') {
      const [minAge, maxAge] = filters.age.includes('-') 
        ? filters.age.split('-').map(Number) 
        : [parseInt(filters.age.replace('+', '')), 100];
        
      matchedProfiles = matchedProfiles.filter(profile => {
        if (maxAge === 100) {  // Handle "41+" case
          return profile.age >= minAge;
        }
        return profile.age >= minAge && profile.age <= maxAge;
      });
    }
    
    // Apply kids filter if provided
    if (filters.kids && filters.kids.length > 0) {
      // Only apply filters that are not 'all'
      const activeKidFilters = filters.kids.filter(
        kid => kid.ageRange !== 'all' || kid.gender !== 'all'
      );
      
      if (activeKidFilters.length > 0) {
        matchedProfiles = matchedProfiles.filter(profile => {
          return activeKidFilters.some(kidFilter => {
            return profile.kids.some(profileKid => {
              const ageMatch = !kidFilter.ageRange || kidFilter.ageRange === 'all' || 
                profileKid.age.toString() === kidFilter.ageRange;
              
              const genderMatch = !kidFilter.gender || kidFilter.gender === 'all' || 
                profileKid.gender === kidFilter.gender;
                
              return ageMatch && genderMatch;
            });
          });
        });
      }
    }
    
    // Apply location filter if provided
    if (filters.location && filters.location !== 'all') {
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.location === filters.location
      );
    }
    
    // Apply nationality filter if provided
    if (filters.nationality && filters.nationality !== 'all') {
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.nationality === filters.nationality
      );
    }
    
    // Apply work status filter if provided
    if (filters.workStatus && filters.workStatus !== 'all') {
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.workStatus === filters.workStatus
      );
    }
    
    // Apply interests filter if provided
    if (filters.interests && filters.interests.length > 0) {
      matchedProfiles = matchedProfiles.filter(profile => 
        filters.interests.some(interest => profile.interests.includes(interest))
      );
    }
    
    // Apply compatibility threshold filter if provided
    if (filters.compatibilityThreshold) {
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.compatibility >= filters.compatibilityThreshold
      );
    }
    
    // Sort the filtered profiles by relevance
    const userKids = userInfo?.kids || [];
    const userNeighborhood = userInfo?.neighborhood || "";
    sortProfilesByRelevance(matchedProfiles, userKids, userNeighborhood);
  };

  const handleLeanOn = (id: number, name: string) => {
    setSentConnections(prev => [...prev, id]);
    toast({
      title: "LeanOn Request Sent",
      description: `You've sent a connection request to ${name}!`,
    });
  };
  
  const handleSkip = (id: number) => {
    console.log("Skipped profile:", id);
  };

  return (
    <div className="min-h-screen bg-[#B8CEC2]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-24 pb-12 px-4">
        <HeroSection 
          onFiltersChange={handleFiltersChange} 
          profiles={filteredProfiles} 
          nearbyMoms={nearbyMoms}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        {nearbyMoms.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold font-playfair mb-6 text-center">Moms Near You</h2>
            <SwipeableProfiles 
              profiles={nearbyMoms.filter(mom => !sentConnections.includes(mom.id))} 
              onLeanOn={handleLeanOn}
              onSkip={handleSkip}
            />
          </div>
        )}
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
