import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import FilterSection from '@/components/mumzally/FilterSection';
import ProfilesSection from '@/components/mumzally/ProfilesSection';
import ConnectionRequests from '@/components/mumzally/ConnectionRequests';
import LoadingScreen from '@/components/mumzally/LoadingScreen';
import { toast } from "@/hooks/use-toast";

const MumzAlly = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Simulate loading state for smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleHeartClick = (mumId: number) => {
    // Handle heart click logic
    toast({
      title: "Connection Request Sent",
      description: "You've sent a request to connect with another mum in your area!",
    });
  };
  
  // Comprehensive list of mum profiles with various attributes for filtering
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
  
  // Apply filters to profiles
  const applyFilters = (profiles, activeFilters) => {
    return profiles.filter(profile => {
      // Check age filter
      if (activeFilters.age) {
        const ageRange = activeFilters.age.split('-');
        const minAge = parseInt(ageRange[0]);
        const maxAge = ageRange[1].includes('+') ? 100 : parseInt(ageRange[1]);
        if (profile.age < minAge || profile.age > maxAge) return false;
      }
      
      // Check kids filter
      if (activeFilters.kids) {
        // Filter by kid age range
        if (activeFilters.kids.ageRange) {
          const hasMatchingKid = profile.kids.some(kid => {
            const ageRange = activeFilters.kids.ageRange.split('-');
            const minAge = parseInt(ageRange[0]);
            const maxAge = ageRange[1].includes('+') ? 100 : parseInt(ageRange[1]);
            return kid.age >= minAge && kid.age <= maxAge;
          });
          if (!hasMatchingKid) return false;
        }
        
        // Filter by kid gender
        if (activeFilters.kids.gender) {
          const hasMatchingKid = profile.kids.some(kid => 
            kid.gender === activeFilters.kids.gender
          );
          if (!hasMatchingKid) return false;
        }
      }
      
      // Check location filter
      if (activeFilters.location && profile.location !== activeFilters.location) {
        return false;
      }
      
      // Check nationality filter
      if (activeFilters.nationality && profile.nationality !== activeFilters.nationality) {
        return false;
      }
      
      // Check work status filter
      if (activeFilters.workStatus && profile.workStatus !== activeFilters.workStatus) {
        return false;
      }
      
      return true;
    });
  };
  
  // Get filtered profiles
  const filteredProfiles = Object.keys(filters).length > 0 
    ? applyFilters(allMumProfiles, filters)
    : allMumProfiles;
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-12 md:pb-16">
        <HeroSection />
        <ConnectionRequests />
        <FilterSection onFiltersChange={setFilters} />
        <ProfilesSection 
          profiles={filteredProfiles} 
          onHeartClick={handleHeartClick} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAlly;
