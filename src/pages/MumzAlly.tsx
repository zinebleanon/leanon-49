
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUserInfo } from '@/hooks/use-user-info';
import { useToast } from '@/hooks/use-toast';
import HeroSection from '@/components/mumzally/HeroSection';
import SwipeableProfiles from '@/components/mumzally/SwipeableProfiles';
import RecommendedMatches from '@/components/mumzally/RecommendedMatches';
import { Button } from '@/components/ui/button';
import { Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Kid {
  age: number;
  gender: string;
}

export interface MumzProfile {
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
  activeInCommunity?: boolean;
}

const MumzAlly = () => {
  const { userInfo, neighborhood } = useUserInfo();
  const [nearbyMoms, setNearbyMoms] = useState<MumzProfile[]>([]);
  const [profiles, setProfiles] = useState<MumzProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<MumzProfile[]>([]);
  const [sentConnections, setSentConnections] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const exampleProfiles: MumzProfile[] = [
      {
        id: 1,
        name: 'Layla K',
        age: 32,
        location: neighborhood || 'Downtown Dubai',
        kids: [{ age: 2, gender: 'girl' }],
        nationality: 'Emirati',
        workStatus: 'full-time',
        interests: ['Cooking', 'Reading'],
        bio: 'Hi! I\'m Layla, a full-time mom who loves cooking and reading.',
        compatibility: 85,
      },
      {
        id: 2,
        name: 'Fatima A',
        age: 28,
        location: neighborhood || 'Dubai Marina',
        kids: [{ age: 1, gender: 'boy' }],
        nationality: 'Lebanese',
        workStatus: 'working',
        interests: ['Fitness', 'Travel'],
        bio: 'Hey there! I\'m Fatima, a working mom passionate about fitness and travel.',
        compatibility: 92,
      },
      {
        id: 3,
        name: 'Aisha M',
        age: 35,
        location: neighborhood || 'Jumeirah',
        kids: [{ age: 3, gender: 'girl' }, { age: 5, gender: 'boy' }],
        nationality: 'Saudi',
        workStatus: 'full-time',
        interests: ['Crafts', 'Gardening'],
        bio: 'Hello! I\'m Aisha, a full-time mom who enjoys crafts and gardening.',
        compatibility: 78,
      },
      {
        id: 4,
        name: 'Noura S',
        age: 29,
        location: neighborhood || 'Arabian Ranches',
        kids: [{ age: 2, gender: 'boy' }],
        nationality: 'Egyptian',
        workStatus: 'working',
        interests: ['Movies', 'Music'],
        bio: 'Hi! I\'m Noura, a working mom who loves movies and music.',
        compatibility: 88,
      },
      {
        id: 5,
        name: 'Hessa R',
        age: 31,
        location: neighborhood || 'Emirates Hills',
        kids: [{ age: 4, gender: 'girl' }],
        nationality: 'Qatari',
        workStatus: 'full-time',
        interests: ['Fashion', 'Beauty'],
        bio: 'Hey there! I\'m Hessa, a full-time mom passionate about fashion and beauty.',
        compatibility: 95,
      },
      {
        id: 6,
        name: 'Mariam T',
        age: 27,
        location: neighborhood || 'Mirdif',
        kids: [{ age: 1, gender: 'boy' }],
        nationality: 'Omani',
        workStatus: 'working',
        interests: ['Photography', 'Art'],
        bio: 'Hello! I\'m Mariam, a working mom who enjoys photography and art.',
        compatibility: 82,
      },
    ];

    setProfiles(exampleProfiles);

    const nearby = exampleProfiles.filter(profile => profile.location === neighborhood);
    setNearbyMoms(nearby);
    setFilteredProfiles(exampleProfiles);
  }, [neighborhood]);

  useEffect(() => {
    if (searchTerm) {
      const searchResults = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfiles(searchResults);
    } else {
      setFilteredProfiles(profiles);
    }
  }, [searchTerm, profiles]);

  const handleLeanOn = (id: number, name: string) => {
    if (sentConnections.includes(id)) {
      toast({
        title: "Already Requested",
        description: `You have already sent a connection request to ${name}.`,
      });
      return;
    }

    setSentConnections(prev => [...prev, id]);
    toast({
      title: "LeanOn Request Sent",
      description: `Your LeanOn request has been sent to ${name}.`,
    });
  };

  const handleSkip = (id: number) => {
    console.log(`Skipped profile with ID ${id}`);
  };

  const handleFiltersChange = (filters: Record<string, any>) => {
    setSearchTerm(filters.searchTerm || '');
    console.log('filters', filters);
  };

  const isProfileComplete = () => {
    return !!(
      userInfo?.name &&
      userInfo?.neighborhood &&
      userInfo?.kids &&
      userInfo?.kids.length > 0
    );
  };

  const handleCompleteProfile = () => {
    navigate('/', { 
      state: { 
        openProfileUpdate: true, 
        fromMumzAlly: true 
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        {!isProfileComplete() && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-center">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-1">Limited Access Mode</h3>
              <p className="text-muted-foreground mb-3">
                You have limited access to the Connect features. Complete your profile to unlock
                full access to messaging and nearby moms features.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button 
                  onClick={handleCompleteProfile}
                  variant="warm"
                  className="flex-1 flex items-center justify-center gap-2 bg-pantone-yellow text-foreground hover:bg-pantone-yellow/90 hover:text-foreground border-pantone-yellow"
                >
                  <User className="h-4 w-4" />
                  Complete Your Profile
                </Button>
              </div>
            </div>
          </div>
        )}

        <HeroSection
          onFiltersChange={handleFiltersChange}
          profiles={filteredProfiles}
          nearbyMoms={nearbyMoms}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {isProfileComplete() && (
          <SwipeableProfiles
            profiles={filteredProfiles}
            onLeanOn={handleLeanOn}
            onSkip={handleSkip}
            disableConnections={!isProfileComplete()}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MumzAlly;
