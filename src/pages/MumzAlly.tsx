
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, MessageCircle, Calendar, Map, Star } from 'lucide-react';

const MumzAlly = () => {
  const [isLoading, setIsLoading] = useState(true);
  
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
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  const communityFeatures = [
    {
      icon: <Users className="h-10 w-10 text-purple-500" />,
      title: "Mom Groups",
      description: "Join groups based on your children's ages, interests, or location."
    },
    {
      icon: <MessageCircle className="h-10 w-10 text-purple-500" />,
      title: "Chat Support",
      description: "Connect with other moms in real-time conversations."
    },
    {
      icon: <Calendar className="h-10 w-10 text-purple-500" />,
      title: "Meetups",
      description: "Organize or join local meetups with other moms and families."
    },
    {
      icon: <Map className="h-10 w-10 text-purple-500" />,
      title: "Local Community",
      description: "Find moms in your neighborhood to build real-life connections."
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Connect with Your <span className="text-gradient">Mumz Ally</span> Community
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Build meaningful connections with other moms who understand your journey.
                  Share experiences, find support, and make lifelong friendships.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full">
                    Join a Group
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full">
                    Browse Events
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
        
        {/* Features Section */}
        <section className="py-16 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12">
              How Mumz Ally Supports You
            </h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {communityFeatures.map((feature, index) => (
                <Card key={index} className="p-6 bg-white/50 backdrop-blur-sm border-white/20 hover:shadow-md transition-all">
                  <div className="bg-purple-500/10 p-3 rounded-full w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12">
              What Moms Are Saying
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 bg-white/50 backdrop-blur-sm border-white/20">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">
                    "Mumz Ally has been a lifesaver for me as a new mom. I've found friends who understand exactly what I'm going through and provide incredible support."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Sarah J.</p>
                      <p className="text-sm text-muted-foreground">Mom of 2</p>
                    </div>
                  </div>
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
