
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import useViewportHeight from '@/hooks/use-viewport-height';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the viewport height hook to fix iOS height issues
  useViewportHeight();
  
  useEffect(() => {
    // Simulate loading state for smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero onJoinClick={() => {}} />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
