
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import FilterSection from '@/components/mumzally/FilterSection';
import MatchingVisualization from '@/components/mumzally/MatchingVisualization';
import ProfilesSection from '@/components/mumzally/ProfilesSection';
import LoadingScreen from '@/components/mumzally/LoadingScreen';

const MumzAlly = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading state for smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleHeartClick = (mumId: number) => {
    // This function is now just a proxy to pass to child components
    // The actual heart click logic is in the MatchingVisualization component
  };
  
  const mumProfiles = [
    {
      id: 1,
      name: 'Sarah',
      age: 32,
      location: 'Dubai Marina',
      kids: [{age: 3, gender: 'Boy'}, {age: 5, gender: 'Girl'}],
      nationality: 'Emirati',
      workStatus: 'Full-time',
      interests: ['Cooking', 'Desert Safari', 'Art'],
      bio: 'Working mom of two looking for weekend playdate buddies in Dubai!',
      compatibility: 85
    },
    {
      id: 2,
      name: 'Jessica',
      age: 29,
      location: 'Abu Dhabi',
      kids: [{age: 2, gender: 'Girl'}],
      nationality: 'British Expat',
      workStatus: 'Stay-at-home',
      interests: ['Yoga', 'Reading', 'Beach Days'],
      bio: 'First-time mom looking to connect with other moms in the UAE.',
      compatibility: 92
    },
    {
      id: 3,
      name: 'Mei',
      age: 34,
      location: 'Sharjah',
      kids: [{age: 6, gender: 'Boy'}, {age: 4, gender: 'Boy'}],
      nationality: 'Chinese Expat',
      workStatus: 'Part-time',
      interests: ['Swimming', 'Music', 'Mall Trips'],
      bio: 'Proud mom of two boys who need playmates with lots of energy!',
      compatibility: 78
    }
  ];
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <HeroSection />
        <FilterSection />
        <MatchingVisualization />
        <ProfilesSection profiles={mumProfiles} onHeartClick={handleHeartClick} />
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAlly;
