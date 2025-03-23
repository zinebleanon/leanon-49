
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heart, UserCircle, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";

const MatchingVisualization = () => {
  const [matchAnimation, setMatchAnimation] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [userHeartActive, setUserHeartActive] = useState(false);
  const [jessicaHeartActive, setJessicaHeartActive] = useState(false);
  
  // Check if both hearts are active to trigger the match
  useEffect(() => {
    if (userHeartActive && jessicaHeartActive) {
      setMatchAnimation(true);
      
      // Show Ally match notification
      toast({
        title: "You Are LeanOn Allies!",
        description: "You've made a new connection with Jessica",
      });
      
      // Simulate match and open chat after animation
      setTimeout(() => {
        setChatOpen(true);
      }, 1500);
    } else {
      setMatchAnimation(false);
      setChatOpen(false);
    }
  }, [userHeartActive, jessicaHeartActive]);
  
  return (
    <section className="py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-4">
          How to Find Your LeanOn Allies
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Connect with other mumz who share similar interests, parenting styles, and life stages in the UAE to build your support network.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center max-w-4xl mx-auto glass p-8 rounded-3xl">
          {/* User Profile */}
          <div className="relative">
            <div className="flex items-center justify-center w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-purple-300/20 border border-primary/10">
              <div className="relative w-64 h-64 bg-white rounded-full overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary mb-3 flex items-center justify-center">
                    <UserCircle className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">You</h3>
                  <p className="text-sm text-muted-foreground mb-3">35, Mom of two in Dubai</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Heart in the middle - better heart shape */}
          <div className="relative flex flex-col items-center">
            <div className="flex flex-col items-center">
              <div className="relative flex items-center">
                {/* Left half of heart - your side */}
                <div 
                  className="cursor-pointer transform hover:scale-105 transition-transform"
                  onClick={() => setUserHeartActive(!userHeartActive)}
                >
                  <svg width="40" height="68" viewBox="0 0 40 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M40,20 C40,11 35,4 28,1 C21,-2 14,2 10,6 C6,10 2,16 0,22 C13,40 27,56 40,68 Z" 
                      fill={userHeartActive ? "#ea384c" : "#e2e8f0"} 
                      stroke={userHeartActive ? "#ea384c" : "#94a3b8"}
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                
                {/* Right half of heart - Jessica's side */}
                <div 
                  className="cursor-pointer transform hover:scale-105 transition-transform"
                  onClick={() => setJessicaHeartActive(!jessicaHeartActive)}
                >
                  <svg width="40" height="68" viewBox="0 0 40 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M0,20 C0,11 5,4 12,1 C19,-2 26,2 30,6 C34,10 38,16 40,22 C27,40 13,56 0,68 Z" 
                      fill={jessicaHeartActive ? "#ea384c" : "#e2e8f0"} 
                      stroke={jessicaHeartActive ? "#ea384c" : "#94a3b8"}
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
              
              {(userHeartActive && jessicaHeartActive) && (
                <p className="text-primary font-medium mt-2 whitespace-nowrap">You Are LeanOn Allies!</p>
              )}
            </div>
          </div>
          
          {/* Jessica Profile */}
          <div className="relative">
            <div className="flex items-center justify-center w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-purple-300/20 border border-primary/10">
              <div className="relative w-64 h-64 bg-white rounded-full overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary mb-3 flex items-center justify-center">
                    <UserCircle className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Jessica</h3>
                  <p className="text-sm text-muted-foreground mb-3">29, Mom of one in Abu Dhabi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat visualization that appears after matching */}
        {chatOpen && (
          <div className="mt-16 max-w-xl mx-auto glass p-6 rounded-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Chat with Jessica</h3>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                New Ally
              </Badge>
            </div>
            <div className="space-y-4 mb-4">
              <div className="flex justify-start">
                <div className="bg-secondary/50 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                  <p className="text-sm">Hi! I noticed we both have young kids and live in the UAE. Would you be interested in a playdate at Dubai Mall this weekend?</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="rounded-full" />
              <Button size="icon" className="rounded-full shrink-0">
                <MessageCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MatchingVisualization;
