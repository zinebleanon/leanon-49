import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/mumzally/HeroSection';
import RecommendedMatches from '@/components/mumzally/RecommendedMatches';
import ConnectionRequests from '@/components/mumzally/ConnectionRequests';
// Import MessageDialog instead of MessageForm
import MessageDialog from '@/components/mumzally/MessageDialog';
import HowItWorksModal from '@/components/mumzally/HowItWorksModal';
import MatchingVisualization from '@/components/mumzally/MatchingVisualization';
import { useUserInfo } from '@/hooks/use-user-info';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const MumzAlly = () => {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const { userInfo } = useUserInfo();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-24 pb-12 px-4">
        <HeroSection openHowItWorks={() => setIsHowItWorksOpen(true)} />
        
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
            <RecommendedMatches />
          </div>
        </section>
        
        <ConnectionRequests />
        
        <MatchingVisualization />
      </main>
      
      <Footer />
      
      <HowItWorksModal open={isHowItWorksOpen} onOpenChange={setIsHowItWorksOpen} />
    </div>
  );
};

export default MumzAlly;
