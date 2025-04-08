
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Mail, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserInfo } from '@/hooks/use-user-info';
import ConnectionRequests from '@/components/mumzally/ConnectionRequests';
import { toast } from '@/hooks/use-toast';
import MessageDialog from '@/components/mumzally/MessageDialog';

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('conversations');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const { userInfo } = useUserInfo();
  
  useEffect(() => {
    // Simulate loading conversations from an API
    const timeout = setTimeout(() => {
      const mockConversations: Conversation[] = [
        {
          id: 'conv1',
          participantId: 'user1',
          participantName: 'Sarah Johnson',
          participantAvatar: undefined,
          lastMessage: 'Hi there! How are you doing today?',
          lastMessageTimestamp: '2025-04-08T10:30:00Z',
          unreadCount: 2
        },
        {
          id: 'conv2',
          participantId: 'user2',
          participantName: 'Emily Carter',
          participantAvatar: undefined,
          lastMessage: 'Thanks for the playdate recommendation!',
          lastMessageTimestamp: '2025-04-07T15:45:00Z',
          unreadCount: 0
        },
        {
          id: 'conv3',
          participantId: 'user3',
          participantName: 'Michelle Lee',
          participantAvatar: undefined,
          lastMessage: 'Can you send me that recipe we talked about?',
          lastMessageTimestamp: '2025-04-05T09:15:00Z',
          unreadCount: 1
        }
      ];
      
      setConversations(mockConversations);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timeout);
  }, []);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
      });
    } else if (daysDiff === 1) {
      return 'Yesterday';
    } else if (daysDiff < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };
  
  const handleConversationClick = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessageDialogOpen(true);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 } 
          : conv
      )
    );
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    if (!selectedConversation) return;
    
    // Update the conversation with the new last message
    const displayMessage = text.trim() || (image ? 'Sent an image' : '');
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation.id 
          ? { 
              ...conv, 
              lastMessage: displayMessage,
              lastMessageTimestamp: new Date().toISOString()
            } 
          : conv
      )
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto pt-24 pb-24 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair">Inbox</h1>
        </div>
        
        <div className="grid md:grid-cols-12 gap-4 h-[calc(100vh-250px)] min-h-[600px]">
          {/* Conversations List */}
          <div className="md:col-span-4 flex flex-col border rounded-lg overflow-hidden bg-card">
            <div className="p-3 border-b bg-muted/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search conversations" 
                  className="pl-9"
                />
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 px-4 pt-3 bg-transparent">
                <TabsTrigger value="conversations">Conversations</TabsTrigger>
                <TabsTrigger value="leanmoms">My LeanMoms</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto px-2 py-3">
                <TabsContent value="conversations" className="m-0 h-full">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center p-4">
                      <Mail className="h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg mb-1">No conversations yet</h3>
                      <p className="text-muted-foreground text-sm">
                        Connect with other moms to start chatting
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {conversations.map((conversation) => (
                        <div 
                          key={conversation.id}
                          className={`p-3 rounded-md cursor-pointer transition-colors ${
                            selectedConversation?.id === conversation.id && messageDialogOpen
                              ? 'bg-primary/20' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => handleConversationClick(conversation)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="bg-[#FFD9A7] text-primary">
                                <AvatarImage src={conversation.participantAvatar} />
                                <AvatarFallback className="bg-[#FFD9A7] text-primary font-medium">
                                  {getInitials(conversation.participantName)}
                                </AvatarFallback>
                              </Avatar>
                              {conversation.unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                  {conversation.unreadCount}
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline">
                                <h3 className={`font-medium truncate ${conversation.unreadCount > 0 ? 'font-semibold' : ''}`}>
                                  {conversation.participantName}
                                </h3>
                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                  {formatDate(conversation.lastMessageTimestamp)}
                                </span>
                              </div>
                              <p className={`text-sm truncate ${
                                conversation.unreadCount > 0 
                                  ? 'text-foreground font-medium' 
                                  : 'text-muted-foreground'
                              }`}>
                                {conversation.lastMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="leanmoms" className="m-0 h-full">
                  <ConnectionRequests simplifiedView={true} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          {/* Message View */}
          <div className="md:col-span-8 flex flex-col border rounded-lg overflow-hidden bg-card">
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <Mail className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to view messages
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {selectedConversation && (
        <MessageDialog
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default Inbox;
