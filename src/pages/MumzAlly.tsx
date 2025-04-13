import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import MessageDialog from '@/components/mumzally/MessageDialog';
import SwipeableProfiles from '@/components/mumzally/SwipeableProfiles';
import { useUserInfo } from '@/hooks/use-user-info';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, AlertCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

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
  searchTerm?: string;
  nationality?: string;
  workStatus?: string;
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
  const { toast } = useToast();

  const isProfileComplete = () => {
    if (!userInfo) return false;
    
    return !!(
      userInfo.name && 
      userInfo.neighborhood && 
      userInfo.kids && 
      userInfo.kids.length > 0
    );
  };

  const profileCompleteStatus = isProfileComplete();

  const MAX_CONNECTIONS_FOR_INCOMPLETE_PROFILE = 2;
  const hasReachedConnectionLimit = !profileCompleteStatus && sentConnections.length >= MAX_CONNECTIONS_FOR_INCOMPLETE_PROFILE;

  useEffect(() => {
    filterProfilesByLocationAndKids();
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
        totalSimilarity += ageDiff === 0 ? 1.0 : 1.0 / (ageDiff + 1);
      });
    });
    
    return totalSimilarity / (userKids.length * profileKids.length);
  };

  const filterProfilesByLocationAndKids = (filters: FilterOptions = {}) => {
    const userLocation = userInfo?.location?.latitude && userInfo?.location?.longitude ? userInfo.location : null;
    const userNeighborhood = userInfo?.neighborhood || "";
    const userKids = userInfo?.kids || [];

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

    let matchedProfiles = [...mockProfiles];
    
    if (filters.searchTerm) {
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        profile.location.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        profile.nationality.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        profile.workStatus.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        profile.interests.some(interest => interest.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        profile.bio.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    if (filters.location && filters.location !== 'all') {
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.location === filters.location
      );
    }
    
    if (filters.nationality && filters.nationality !== 'all') {
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.nationality === filters.nationality
      );
    }
    
    if (filters.workStatus && filters.workStatus !== 'all') {
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.workStatus === filters.workStatus
      );
    }
    
    if (filters.kids && filters.kids.length > 0) {
      matchedProfiles = matchedProfiles.filter(profile => {
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
      matchedProfiles = matchedProfiles.filter(profile => 
        profile.compatibility >= filters.compatibilityThreshold
      );
    }

    const rankedProfiles = matchedProfiles.map(profile => {
      const kidAgeSimilarityScore = calculateKidAgeSimilarity(userKids, profile.kids);
      
      const locationProximityScore = (userNeighborhood === profile.location) ? 1.0 : 0.5;
      
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
    
    rankedProfiles.sort((a, b) => b.combinedScore - a.combinedScore);
    
    setFilteredProfiles(rankedProfiles);
  };

  const handleMessageClick = (id: number, name: string) => {
    if (!profileCompleteStatus) {
      toast({
        title: "Profile Update Required",
        description: "Please complete your profile to unlock messaging.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    console.log("Sending message to", selectedRecipient, "Text:", text, "Image:", image);
  };

  const handleFiltersChange = (filters: Record<string, any>) => {
    if (filters.searchTerm !== undefined) {
      setSearchTerm(filters.searchTerm);
    }
    
    filterProfilesByLocationAndKids(filters);
  };

  const handleLeanOn = (id: number, name: string) => {
    if (hasReachedConnectionLimit) {
      toast({
        title: "Connection Limit Reached",
        description: `You can connect with up to ${MAX_CONNECTIONS_FOR_INCOMPLETE_PROFILE} moms before completing your profile.`,
        variant: "destructive"
      });
      return;
    }
    
    setSentConnections(prev => [...prev, id]);
    
    if (!profileCompleteStatus && sentConnections.length === MAX_CONNECTIONS_FOR_INCOMPLETE_PROFILE - 1) {
      toast({
        title: "Connection limit approaching",
        description: "Complete your profile to connect with more moms!",
        variant: "default"
      });
    }
  };
  
  const handleSkip = (id: number) => {
    console.log("Skipped profile:", id);
  };

  return (
    <div className="min-h-screen bg-[#B8CEC2]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-24 pb-12 px-4">
        {!profileCompleteStatus && (
          <Card className="mb-6 bg-white/90 border-amber-200 shadow-md">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="bg-amber-100 rounded-full p-3">
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-lg font-semibold mb-1">Limited Access Mode</h3>
                  <p className="text-muted-foreground mb-3">
                    You have limited access to the Connect features. Complete your profile to unlock
                    full access to messaging and nearby moms features.
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Button asChild variant="warm" className="gap-2">
                      <Link to="/profile">
                        <User className="h-4 w-4" />
                        Complete Your Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      
        <HeroSection 
          onFiltersChange={handleFiltersChange} 
          profiles={filteredProfiles} 
          nearbyMoms={[]} // Always pass empty array to HeroSection - we'll show nearby moms in separate section only for complete profiles
          showTinderView={true}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        {profileCompleteStatus && nearbyMoms.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold font-playfair mb-6 text-center">
              LeanMoms Near You
            </h2>
            <SwipeableProfiles 
              profiles={nearbyMoms.filter(mom => !sentConnections.includes(mom.id))} 
              onLeanOn={handleLeanOn}
              onSkip={handleSkip}
              disableConnections={hasReachedConnectionLimit}
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
