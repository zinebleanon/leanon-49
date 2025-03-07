
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Users, MessageCircle, Calendar, Map, Heart, Search, Filter, UserCircle, BabyIcon, Briefcase, MapPin, Flag } from 'lucide-react';

const MumzAlly = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [matchAnimation, setMatchAnimation] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
  useEffect(() => {
    // Simulate loading state for smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleHeartClick = (mumId: number) => {
    setMatchAnimation(true);
    
    // Simulate match and open chat after animation
    setTimeout(() => {
      setChatOpen(true);
    }, 1500);
  };
  
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'age', label: 'Your Age', icon: <UserCircle className="h-4 w-4" /> },
    { id: 'kids', label: 'Kids Age/Gender', icon: <BabyIcon className="h-4 w-4" /> },
    { id: 'location', label: 'Neighborhood', icon: <MapPin className="h-4 w-4" /> },
    { id: 'nationality', label: 'Nationality', icon: <Flag className="h-4 w-4" /> },
    { id: 'work', label: 'Work Status', icon: <Briefcase className="h-4 w-4" /> },
  ];
  
  const mumProfiles = [
    {
      id: 1,
      name: 'Sarah',
      age: 32,
      location: 'Downtown',
      kids: [{age: 3, gender: 'Boy'}, {age: 5, gender: 'Girl'}],
      nationality: 'Canadian',
      workStatus: 'Full-time',
      interests: ['Cooking', 'Hiking', 'Art'],
      bio: 'Working mom of two looking for weekend playdate buddies!',
      compatibility: 85
    },
    {
      id: 2,
      name: 'Jessica',
      age: 29,
      location: 'Westside',
      kids: [{age: 2, gender: 'Girl'}],
      nationality: 'American',
      workStatus: 'Stay-at-home',
      interests: ['Yoga', 'Reading', 'Gardening'],
      bio: 'First-time mom looking to connect with other moms in the area.',
      compatibility: 92
    },
    {
      id: 3,
      name: 'Mei',
      age: 34,
      location: 'Eastside',
      kids: [{age: 6, gender: 'Boy'}, {age: 4, gender: 'Boy'}],
      nationality: 'Chinese',
      workStatus: 'Part-time',
      interests: ['Swimming', 'Music', 'Baking'],
      bio: 'Proud mom of two boys who need playmates with lots of energy!',
      compatibility: 78
    }
  ];
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-12 md:py-20 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Find Your <span className="text-gradient">Mumz Ally</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Connect with moms based on your age, neighborhood, children's 
                  age and gender, nationality, and work status for meaningful friendships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full">
                    Find Your Allies
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full">
                    How It Works
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-purple-500/20 to-purple-300/5 p-1">
                  <div className="h-full w-full rounded-3xl bg-white/90 backdrop-blur-sm flex items-center justify-center p-8">
                    <Users className="h-32 w-32 text-purple-500/70" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-purple-500/10 rounded-full blur-xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="py-8 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Filter Allies</h2>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Advanced Filters
              </Button>
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by name, interests, etc." 
                  className="pl-10 rounded-full" 
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.icon && <span className="mr-2">{filter.icon}</span>}
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Ally Matching Visualization */}
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
                      <div className="absolute bottom-6 right-6" onClick={() => handleHeartClick(2)}>
                        <div className={cn(
                          "transform transition-all duration-500",
                          matchAnimation ? "scale-110" : ""
                        )}>
                          <Heart 
                            className="h-12 w-12 text-red-500 fill-red-500 cursor-pointer hover:scale-110 transition-transform" 
                            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {matchAnimation ? (
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
                      <div className="absolute bottom-6 left-6">
                        <div className={cn(
                          "transform transition-all duration-500",
                          matchAnimation ? "scale-110" : ""
                        )}>
                          <Heart 
                            className="h-12 w-12 text-red-500 fill-red-500 cursor-pointer hover:scale-110 transition-transform" 
                            style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
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
        
        {/* Ally Profiles Section */}
        <section className="py-12 px-6 md:px-8 bg-secondary/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Potential Allies For You
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mumProfiles.map((profile) => (
                <Card key={profile.id} className="overflow-hidden hover:shadow-md transition-all">
                  <div className="bg-gradient-to-r from-primary/10 to-purple-400/10 p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          <UserCircle className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{profile.name}</h3>
                          <p className="text-sm text-muted-foreground">{profile.age}, {profile.location}</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/10">
                        {profile.compatibility}% Match
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <p className="text-sm mb-4">{profile.bio}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <BabyIcon className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">
                          {profile.kids.map((kid, i) => (
                            <span key={i}>
                              {kid.age} y/o {kid.gender}
                              {i < profile.kids.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{profile.nationality}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{profile.workStatus}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {profile.interests.map((interest, i) => (
                        <Badge key={i} variant="outline" className="bg-secondary/50">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full mt-4 rounded-full"
                      onClick={() => handleHeartClick(profile.id)}
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAlly;
