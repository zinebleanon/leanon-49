import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import RecommendedMatches from '@/components/mumzally/RecommendedMatches';
import ConnectionRequests from '@/components/mumzally/ConnectionRequests';
import MessageDialog from '@/components/mumzally/MessageDialog';
import HowItWorksModal from '@/components/mumzally/HowItWorksModal';
import MatchingVisualization from '@/components/mumzally/MatchingVisualization';
import { useUserInfo } from '@/hooks/use-user-info';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample profile data
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

  // Effect to initially filter moms based on location and kids' ages
  useEffect(() => {
    filterProfilesByLocationAndKids();
  }, [userInfo]);

  const filterProfilesByLocationAndKids = (filters: FilterOptions = {}) => {
    // Get user's location and kids information
    const userLocation = userInfo?.location?.latitude && userInfo?.location?.longitude ? userInfo.location : null;
    const userNeighborhood = userInfo?.neighborhood || "";
    const userKids = userInfo?.kids || [];

    // Filter profiles by location
    let locationMatches = [...mockProfiles];
    
    // If we have geolocation data, filter by proximity (simplified)
    if (userLocation) {
      // Simulate filtering by geolocation (in a real app we'd calculate distance)
      const nearby = mockProfiles.filter(profile => 
        // For the sample, let's say these profiles are close based on their ID
        profile.id === 3 || profile.id === 4
      );
      setNearbyMoms(nearby);
    } else if (userNeighborhood) {
      // Filter by neighborhood/location name match
      const nearby = mockProfiles.filter(profile => 
        profile.location === userNeighborhood
      );
      setNearbyMoms(nearby);
    }

    // Filter by kids age similarity
    if (userKids.length > 0) {
      locationMatches = locationMatches.filter(profile => {
        // Check if any of the user's kids have similar ages to any of the profile's kids
        const hasKidsMatch = userKids.some(userKid => {
          const userKidAge = userKid.birthDate 
            ? Math.floor((new Date().getTime() - new Date(userKid.birthDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) 
            : 0;
            
          return profile.kids.some(profileKid => {
            // Age difference of 1 year or less is considered a match (changed from 2 years)
            return Math.abs(profileKid.age - userKidAge) <= 1;
          });
        });
        
        return hasKidsMatch;
      });
    }

    // Apply any additional filters from the filter UI
    if (Object.keys(filters).length > 0) {
      // Apply more specific filters
      if (filters.location && filters.location !== 'all') {
        locationMatches = locationMatches.filter(profile => 
          profile.location === filters.location
        );
      }
      
      if (filters.kids && filters.kids.length > 0) {
        locationMatches = locationMatches.filter(profile => {
          // For each kid filter that has values
          return filters.kids.some((kidFilter) => {
            // Skip if no filter criteria
            if (!kidFilter.ageRange || kidFilter.ageRange === 'all') {
              return true;
            }
            
            // Check if profile has kid matching this age range
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
      
      // Filter by compatibility threshold
      if (filters.compatibilityThreshold) {
        locationMatches = locationMatches.filter(profile => 
          profile.compatibility >= filters.compatibilityThreshold
        );
      }
      
      // More filters can be applied here...
    }

    // Sort by compatibility
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
    // Apply filters to the profiles
    filterProfilesByLocationAndKids(filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-24 pb-12 px-4">
        <HeroSection onFiltersChange={handleFiltersChange} profiles={filteredProfiles} nearbyMoms={nearbyMoms} />
        
        <section className="py-8">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold font-playfair">Recommended For You</h2>
              <Link to="/connections">
                <Button variant="outline">
                  See All
                </Button>
              </Link>
            </div>
            <RecommendedMatches profiles={filteredProfiles} onMessageClick={handleMessageClick} />
          </div>
        </section>
        
        <ConnectionRequests />
        
        <MatchingVisualization />
      </main>
      
      <Footer />
      
      <HowItWorksModal />
      
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
