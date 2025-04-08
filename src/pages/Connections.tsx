import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectionRequests from '@/components/mumzally/ConnectionRequests';
import { useUserInfo } from '@/hooks/use-user-info';
import RecommendedMatches from '@/components/mumzally/RecommendedMatches';
import ProfilesSection from '@/components/mumzally/ProfilesSection';
import FilterSection from '@/components/mumzally/FilterSection';
// Import MessageDialog instead of MessageForm
import MessageDialog from '@/components/mumzally/MessageDialog';

const Connections = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);
  const { userInfo } = useUserInfo();

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    // This would typically send the message to the backend
    console.log("Sending message to", selectedRecipient, "Text:", text, "Image:", image);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-24 pb-24 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair">Connections</h1>
        </div>

        <div className="grid md:grid-cols-12 gap-4 h-[calc(100vh-250px)] min-h-[600px]">
          {/* Filters Section */}
          <div className="md:col-span-3">
            <FilterSection />
          </div>

          {/* Main Content Section */}
          <div className="md:col-span-9 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="bg-secondary rounded-md p-1 mb-4">
                <TabsTrigger value="recommended" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Recommended</TabsTrigger>
                <TabsTrigger value="requests" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Requests</TabsTrigger>
                <TabsTrigger value="profiles" className="data-[state=active]:bg-background data-[state=active]:text-foreground">Profiles</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-y-auto">
                <TabsContent value="recommended" className="m-0">
                  <RecommendedMatches onMessageClick={handleMessageClick} />
                </TabsContent>
                <TabsContent value="requests" className="m-0">
                  <ConnectionRequests dialogMode={true} />
                </TabsContent>
                <TabsContent value="profiles" className="m-0">
                  <ProfilesSection onMessageClick={handleMessageClick} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>

      {selectedRecipient && (
        <MessageDialog 
          open={messageDialogOpen} 
          onOpenChange={setMessageDialogOpen} 
          conversation={{
            id: `conv-${selectedRecipient.id}`,
            participantId: selectedRecipient.id.toString(),
            participantName: selectedRecipient.name,
            lastMessage: "",
            lastMessageTimestamp: new Date().toISOString(),
            unreadCount: 0
          }}
          onSendMessage={handleSendMessage}
        />
      )}

      <Footer />
    </div>
  );
};

export default Connections;
