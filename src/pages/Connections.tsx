
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUserInfo } from '@/hooks/use-user-info';
import MessageDialog from '@/components/mumzally/MessageDialog';
import { UserCircle, MessageSquare } from 'lucide-react';

interface LeanMom {
  id: number;
  name: string;
  age: number;
  location: string;
  compatibility: number;
  activeInCommunity?: boolean;
}

const Connections = () => {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);
  const { userInfo } = useUserInfo();
  const [leanBackMoms, setLeanBackMoms] = useState<LeanMom[]>([]);
  
  useEffect(() => {
    const savedLeanBackMoms = localStorage.getItem('leanBackMoms');
    if (savedLeanBackMoms) {
      setLeanBackMoms(JSON.parse(savedLeanBackMoms));
    }
  }, []);

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    console.log("Sending message to", selectedRecipient, "Text:", text, "Image:", image);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-24 pb-24 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair">My LeanMoms</h1>
        </div>

        <div className="grid md:grid-cols-12 gap-4 h-[calc(100vh-250px)] min-h-[600px]">
          <div className="md:col-span-12 flex flex-col border rounded-lg overflow-hidden bg-card">
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {leanBackMoms.length > 0 ? (
                <div className="space-y-1">
                  {leanBackMoms.map((mom) => (
                    <Card key={mom.id} className="border-transparent hover:bg-muted/30 transition-colors">
                      <CardContent className="p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                            <UserCircle className="h-7 w-7 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {mom.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {mom.location}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMessageClick(mom.id, mom.name)}
                        >
                          <MessageSquare className="h-5 w-5 text-primary" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                  <UserCircle className="h-10 w-10 text-muted-foreground mb-2" />
                  <h3 className="font-medium mb-1">No LeanMoms Yet</h3>
                  <p className="text-sm text-muted-foreground">
                    LeanBack on connect requests to add moms to your LeanMoms list
                  </p>
                </div>
              )}
            </div>
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
