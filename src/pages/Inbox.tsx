
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useUserInfo } from '@/hooks/use-user-info';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  read: boolean;
}

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
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
  
  useEffect(() => {
    if (activeConversation) {
      // Simulate loading messages for the active conversation
      const mockMessages: Message[] = [
        {
          id: 'msg1',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          content: 'Hi there! How are you doing today?',
          timestamp: '2025-04-08T10:30:00Z',
          read: false
        },
        {
          id: 'msg2',
          senderId: 'currentUser',
          senderName: userInfo?.name || 'You',
          content: 'I'm doing well, thanks for asking! How about you?',
          timestamp: '2025-04-08T10:35:00Z',
          read: true
        },
        {
          id: 'msg3',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          content: 'Great! I was wondering if you'd like to arrange a playdate for our kids this weekend?',
          timestamp: '2025-04-08T10:40:00Z',
          read: false
        }
      ];
      
      setMessages(mockMessages);
      
      // Mark conversation as read
      setConversations(prev => 
        prev.map(conv => 
          conv.id === activeConversation ? { ...conv, unreadCount: 0 } : conv
        )
      );
    } else {
      setMessages([]);
    }
  }, [activeConversation, userInfo?.name]);
  
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
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !activeConversation) return;
    
    // Add the new message to the list
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      senderId: 'currentUser',
      senderName: userInfo?.name || 'You',
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages(prev => [...prev, newMsg]);
    
    // Update the conversation with the new last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation 
          ? { 
              ...conv, 
              lastMessage: newMessage,
              lastMessageTimestamp: new Date().toISOString()
            } 
          : conv
      )
    );
    
    // Clear the input
    setNewMessage('');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto pt-24 pb-24 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair">Inbox</h1>
        </div>
        
        <div className="grid md:grid-cols-7 gap-4 h-[calc(100vh-250px)] min-h-[400px]">
          <div className="md:col-span-3 flex flex-col border rounded-lg overflow-hidden">
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
                <TabsTrigger value="requests">Connection Requests</TabsTrigger>
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
                            activeConversation === conversation.id 
                              ? 'bg-primary/10' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => setActiveConversation(conversation.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar>
                                <AvatarImage src={conversation.participantAvatar} />
                                <AvatarFallback className="bg-primary/20 text-primary">
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
                
                <TabsContent value="requests" className="m-0 h-full">
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <Users className="h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="font-medium text-lg mb-1">No connection requests</h3>
                    <p className="text-muted-foreground text-sm">
                      When other moms want to connect with you, you'll see their requests here
                    </p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          
          <div className="md:col-span-4 border rounded-lg flex flex-col overflow-hidden">
            {!activeConversation ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Mail className="h-16 w-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-medium mb-2">Your messages</h2>
                <p className="text-muted-foreground max-w-xs">
                  Select a conversation to see your messages or start a new one by connecting with a mom.
                </p>
              </div>
            ) : (
              <>
                <div className="p-3 border-b flex items-center gap-3">
                  {conversations.find(c => c.id === activeConversation) && (
                    <>
                      <Avatar>
                        <AvatarImage src={conversations.find(c => c.id === activeConversation)?.participantAvatar} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {getInitials(conversations.find(c => c.id === activeConversation)?.participantName || '')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {conversations.find(c => c.id === activeConversation)?.participantName}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${
                        message.senderId === 'currentUser'
                          ? 'bg-primary text-primary-foreground rounded-t-lg rounded-l-lg'
                          : 'bg-muted rounded-t-lg rounded-r-lg'
                      } p-3`}>
                        <p>{message.content}</p>
                        <div className={`text-xs mt-1 ${
                          message.senderId === 'currentUser' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {formatDate(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 border-t">
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={newMessage.trim() === ''}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Inbox;
