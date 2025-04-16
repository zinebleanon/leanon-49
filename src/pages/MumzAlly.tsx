import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useUserInfo } from '@/hooks/use-user-info';
import { useToast } from '@/hooks/use-toast';
import HeroSection from '@/components/mumzally/HeroSection';
import SwipeableProfiles from '@/components/mumzally/SwipeableProfiles';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User } from 'lucide-react';
import EditProfileDialog from '@/components/profile/EditProfileDialog';
import { ProfileSection } from '@/pages/Profile';
import { supabase } from '@/integrations/supabase/client';
import { useConnections } from '@/hooks/use-connections';

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
  const [profiles, setProfiles] = useState<MumzProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<MumzProfile[]>([]);
  const [sentConnections, setSentConnections] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
  const [editProfileSection, setEditProfileSection] = useState<ProfileSection>('all');
  const [useSimpleProfileForm, setUseSimpleProfileForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const { connections } = useConnections();

  const isProfileComplete = () => {
    return !!(
      userInfo?.name &&
      userInfo?.neighborhood &&
      userInfo?.kids &&
      userInfo?.kids.length > 0 &&
      userInfo?.nationality &&
      userInfo?.birthDate &&
      userInfo?.interests &&
      !userInfo?.profileNeedsUpdate
    );
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        setProfiles([]);
        setFilteredProfiles([]);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profiles. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [neighborhood, userInfo, toast]);

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

  const handleCompleteProfile = (simple = false) => {
    console.log("Opening profile dialog with simple mode:", simple);
    setEditProfileSection('all');
    setUseSimpleProfileForm(simple);
    setEditProfileDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        {!isProfileComplete() && (
          <Alert className="mb-4 bg-amber-50 border-amber-200">
            <AlertDescription className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <span className="font-semibold mb-1 block">Complete Your Profile</span>
                <span className="text-muted-foreground">
                  Add more information to your profile to help us connect you with compatible LeanMoms and make LeanMoms trust your Profile.
                </span>
              </div>
              <Button 
                onClick={() => handleCompleteProfile(true)}
                variant="warm" 
                className="whitespace-nowrap bg-pastel-yellow hover:bg-pastel-yellow/90 gap-2"
              >
                <User className="h-4 w-4" />
                Complete Your Profile
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <HeroSection
          onFiltersChange={handleFiltersChange}
          profiles={filteredProfiles}
          nearbyMoms={[]} // Empty array instead of nearbyMoms
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isProfileComplete={isProfileComplete()}
        />

        <SwipeableProfiles
          profiles={filteredProfiles}
          onLeanOn={handleLeanOn}
          onSkip={handleSkip}
          disableConnections={false}
        />
      </div>
      
      <EditProfileDialog
        isOpen={editProfileDialogOpen}
        onOpenChange={setEditProfileDialogOpen}
        mode="profile"
        title="Complete Your Profile"
        description="Fill in your profile details to connect with more LeanMoms"
        section={editProfileSection}
        simpleMode={useSimpleProfileForm}
      />
      
      <Footer />
    </div>
  );
};

export default MumzAlly;
