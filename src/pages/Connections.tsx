
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MessageDialog from '@/components/mumzally/MessageDialog';
import { UserCircle, MessageSquare, Search, X } from 'lucide-react';
import { useConnections } from '@/hooks/use-connections';
import { useMessages } from '@/hooks/use-messages';
import { useUserInfo } from '@/hooks/use-user-info';

const Connections = () => {
  const navigate = useNavigate();
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: string, name: string} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { userInfo } = useUserInfo();
  const { connections, loading } = useConnections();
  const { sendMessage } = useMessages(selectedRecipient?.id);

  // Filter only connected users
  const connectedUsers = connections.filter(conn => 
    conn.status === 'connected' &&
    (conn.requester_id === userInfo?.email || conn.recipient_id === userInfo?.email)
  );

  const handleMessageClick = (id: string, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = async (text: string, image: string | null) => {
    if (!selectedRecipient) return;
    await sendMessage(selectedRecipient.id, text, image || undefined);
  };

  const filteredUsers = connectedUsers.filter(conn => {
    const partnerId = conn.requester_id === userInfo?.id ? conn.recipient_id : conn.requester_id;
    // Note: In a real app, you would fetch user profiles to get names and locations
    return partnerId.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto pt-24 pb-24 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair">My LeanMoms</h1>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/ally')}
            className="ml-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-12 gap-4 h-[calc(100vh-250px)] min-h-[600px]">
          <div className="md:col-span-12 flex flex-col border rounded-lg overflow-hidden bg-card">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search moms by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredUsers.length > 0 ? (
                <div className="space-y-1">
                  {filteredUsers.map((conn) => {
                    const partnerId = conn.requester_id === userInfo?.id ? conn.recipient_id : conn.requester_id;
                    // Note: In a real app, you would display actual user data
                    return (
                      <Card key={conn.id} className="border-transparent hover:bg-muted/30 transition-colors">
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#FFD9A7] flex items-center justify-center">
                              <UserCircle className="h-7 w-7 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {partnerId} {/* Replace with actual user name */}
                              </h3>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMessageClick(partnerId, partnerId)} // Replace second parameter with actual user name
                          >
                            <MessageSquare className="h-5 w-5 text-primary" />
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                  {searchTerm ? (
                    <>
                      <UserCircle className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="font-medium mb-1">No moms found</h3>
                      <p className="text-sm text-muted-foreground">
                        Try different search terms
                      </p>
                    </>
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
            participantId: selectedRecipient.id,
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
