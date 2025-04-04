
import { useState } from 'react';
import { useUserInfo } from '@/hooks/use-user-info';
import { UserCircle, MapPin, MessageCircle, Calendar, HeartHandshake, AlertCircle, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import RibbonIcon from '@/components/ui/RibbonIcon';

const NeighborhoodCommunity = () => {
  const { neighborhood, isLoading } = useUserInfo();
  const [activeTab, setActiveTab] = useState<'meetups' | 'events' | 'help'>('meetups');
  const { toast } = useToast();
  
  // Mock data for meetups, events, and help requests
  const meetups = [
    {
      id: 1,
      title: "Mommy & Me Yoga",
      host: "Jessica Kim",
      date: "Tomorrow, 10:00 AM",
      location: "Community Park",
      attendees: 5
    },
    {
      id: 2,
      title: "Toddler Playdate",
      host: "Sara Ahmed",
      date: "Saturday, 4:00 PM",
      location: "Central Playground",
      attendees: 3
    }
  ];
  
  const events = [
    {
      id: 1,
      title: "Family Fun Day",
      organizer: "Community Center",
      date: "Next Sunday, 11:00 AM",
      location: "Community Center",
      description: "Games, food, and activities for the whole family"
    },
    {
      id: 2,
      title: "Story Time for Kids",
      organizer: "Local Library",
      date: "Every Tuesday, 3:00 PM",
      location: "Public Library",
      description: "Interactive storytelling session for children under 5"
    }
  ];
  
  const helpRequests = [
    {
      id: 1,
      title: "Need emergency babysitter",
      requester: "Amina Khan",
      urgent: true,
      date: "Today",
      description: "I have a medical emergency and need someone to watch my toddler for 2 hours"
    },
    {
      id: 2,
      title: "Looking for pediatrician recommendations",
      requester: "Maria Rodriguez",
      urgent: false,
      date: "Yesterday",
      description: "We just moved to the area and need a good pediatrician for our 6-month-old"
    }
  ];
  
  const handleUrgentHelp = (id: number) => {
    toast({
      title: "Urgent Help Request Notification",
      description: "Notifications have been sent to neighbors in your area.",
    });
  };
  
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p>Loading your neighborhood...</p>
      </div>
    );
  }
  
  return (
    <section>
      <div className="bg-[#B8CEC2]/50 rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold font-playfair flex items-center">
          <MapPin className="mr-2 h-5 w-5 text-[#B8CEC2]" />
          Your {neighborhood} Community
        </h2>
        <p className="text-sm text-muted-foreground mb-2">
          Connect with moms in your neighborhood for local support and meetups
        </p>
      </div>
      
      <Tabs defaultValue="meetups" className="mb-4" onValueChange={(value) => setActiveTab(value as 'meetups' | 'events' | 'help')}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="meetups" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Meet-ups</span>
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Events</span>
          </TabsTrigger>
          <TabsTrigger value="help" className="flex items-center gap-1">
            <HeartHandshake className="h-4 w-4" />
            <span>Help & Support</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="meetups" className="mt-0">
          <div className="space-y-4">
            {meetups.map(meetup => (
              <Card key={meetup.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{meetup.title}</h3>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-sm flex items-center gap-1">
                      <UserCircle className="h-4 w-4" /> Hosted by: {meetup.host}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {meetup.date}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {meetup.location}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <Badge variant="outline" className="bg-[#B8CEC2]/30">
                      {meetup.attendees} Attending
                    </Badge>
                    <Button size="sm" className="bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground">
                      Join Meetup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="mt-0">
          <div className="space-y-4">
            {events.map(event => (
              <Card key={event.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-sm flex items-center gap-1">
                      <UserCircle className="h-4 w-4" /> Organized by: {event.organizer}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      <Calendar className="h-4 w-4" /> {event.date}
                    </p>
                    <p className="text-sm flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {event.location}
                    </p>
                    <p className="text-sm mt-1">{event.description}</p>
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button size="sm" className="bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground">
                      Interested
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="help" className="mt-0">
          <div className="space-y-4">
            {helpRequests.map(request => (
              <Card key={request.id} className={`overflow-hidden ${request.urgent ? 'border-red-300 bg-red-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg flex items-center gap-1">
                      {request.title}
                      {request.urgent && (
                        <Badge variant="destructive" className="ml-2 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Urgent
                        </Badge>
                      )}
                    </h3>
                    <span className="text-sm text-muted-foreground">{request.date}</span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <p className="text-sm flex items-center gap-1">
                      <UserCircle className="h-4 w-4" /> From: {request.requester}
                    </p>
                    <p className="text-sm mt-1">{request.description}</p>
                  </div>
                  <div className="flex justify-between mt-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs h-8"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    
                    {request.urgent && (
                      <Button 
                        size="sm" 
                        variant="destructive"
                        className="flex items-center gap-1"
                        onClick={() => handleUrgentHelp(request.id)}
                      >
                        <Bell className="h-3 w-3" />
                        Send Notifications
                      </Button>
                    )}
                    
                    <Button 
                      variant="default"
                      size="sm"
                      className="text-xs h-8 bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground"
                    >
                      <RibbonIcon className="w-10 h-6 mr-1" fill="#FFD9A7" size="1.5em" />
                      LeanOn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default NeighborhoodCommunity;
