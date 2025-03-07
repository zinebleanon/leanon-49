
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Heart, UserCircle, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MatchingVisualization = () => {
  const [matchAnimation, setMatchAnimation] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [userHeartActive, setUserHeartActive] = useState(false);
  const [jessicaHeartActive, setJessicaHeartActive] = useState(false);
  
  // Check if both hearts are active to trigger the match
  useEffect(() => {
    if (userHeartActive && jessicaHeartActive) {
      setMatchAnimation(true);
      
      // Simulate match and open chat after animation
      setTimeout(() => {
        setChatOpen(true);
      }, 1500);
    } else {
      setMatchAnimation(false);
      setChatOpen(false);
    }
  }, [userHeartActive, jessicaHeartActive]);
  
  const handleHeartClick = (mumId: number) => {
    // Only handle hearts in the visualization area
    if (mumId === 0) {
      setUserHeartActive(!userHeartActive);
    } else if (mumId === 2) {
      setJessicaHeartActive(!jessicaHeartActive);
    }
  };
  
  return (
    <section className="py-12 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-4">
          How Ally Matching Works
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Find your perfect Mumz Ally by connecting with those who share similar interests, parenting styles, and life stages.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center max-w-4xl mx-auto glass p-8 rounded-3xl">
          <div className="relative">
            <div className="flex items-center justify-center w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-purple-300/20 border border-primary/10">
              <div className="relative w-64 h-64 bg-white rounded-full overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary mb-3 flex items-center justify-center">
                    <UserCircle className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">You</h3>
                  <p className="text-sm text-muted-foreground mb-3">35, Mom of two</p>
                  <div className="absolute bottom-6 left-6" onClick={() => handleHeartClick(0)}>
                    <div className={cn(
                      "transform transition-all duration-500",
                      (userHeartActive && jessicaHeartActive) ? "scale-110" : ""
                    )}>
                      <Heart 
                        className={cn(
                          "h-12 w-12 cursor-pointer hover:scale-110 transition-transform",
                          userHeartActive ? "text-red-500" : "text-gray-300",
                          (userHeartActive && jessicaHeartActive) ? "fill-red-500" : "fill-transparent"
                        )}
                        style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {(userHeartActive && jessicaHeartActive) ? (
            <div className="relative transform transition-all duration-500 animate-pulse">
              <Heart className="h-14 w-14 text-red-500 fill-red-500" />
            </div>
          ) : (
            <div className="relative">
              <div className="h-0.5 w-20 bg-dashed bg-primary/50 hidden lg:block"></div>
            </div>
          )}
          
          <div className="relative">
            <div className="flex items-center justify-center w-80 h-80 rounded-full bg-gradient-to-br from-primary/20 to-purple-300/20 border border-primary/10">
              <div className="relative w-64 h-64 bg-white rounded-full overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary mb-3 flex items-center justify-center">
                    <UserCircle className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">Jessica</h3>
                  <p className="text-sm text-muted-foreground mb-3">29, Mom of one</p>
                  <div className="absolute bottom-6 right-6" onClick={() => handleHeartClick(2)}>
                    <div className={cn(
                      "transform transition-all duration-500",
                      (userHeartActive && jessicaHeartActive) ? "scale-110" : ""
                    )}>
                      <Heart 
                        className={cn(
                          "h-12 w-12 cursor-pointer hover:scale-110 transition-transform",
                          jessicaHeartActive ? "text-red-500" : "text-gray-300",
                          (userHeartActive && jessicaHeartActive) ? "fill-red-500" : "fill-transparent"
                        )}
                        style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat visualization that appears after matching */}
        {chatOpen && (
          <div className="mt-8 max-w-xl mx-auto glass p-6 rounded-2xl animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Chat with Jessica</h3>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                New Match
              </Badge>
            </div>
            <div className="space-y-4 mb-4">
              <div className="flex justify-start">
                <div className="bg-secondary/50 rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                  <p className="text-sm">Hi! I noticed we both have young kids and live nearby. Would you be interested in a playdate at Central Park this weekend?</p>
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
