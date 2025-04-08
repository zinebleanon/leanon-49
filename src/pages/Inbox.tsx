
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Mail, Users, Send, Image } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserInfo } from '@/hooks/use-user-info';
import ConnectionRequests from '@/components/mumzally/ConnectionRequests';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isFromCurrentUser: boolean;
  image?: string; // Optional image URL
}

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('conversations');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { userInfo } = useUserInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    if (selectedConversation) {
      // Simulate loading messages for the selected conversation
      const mockMessages: Message[] = [
        {
          id: 'msg1',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          text: 'Hi there! How are you doing today?',
          timestamp: '2025-04-08T10:30:00Z',
          isFromCurrentUser: false
        },
        {
          id: 'msg2',
          senderId: 'current-user',
          senderName: 'You',
          text: "I'm good, thanks for asking! How about you?",
          timestamp: '2025-04-08T10:32:00Z',
          isFromCurrentUser: true
        },
        {
          id: 'msg3',
          senderId: 'user1',
          senderName: 'Sarah Johnson',
          text: "I'm doing great! Just wondering if you'd like to meet up for coffee sometime this week?",
          timestamp: '2025-04-08T10:35:00Z',
          isFromCurrentUser: false
        },
        {
          id: 'msg4',
          senderId: 'current-user',
          senderName: 'You',
          text: "Here's a photo of the new recipe I tried yesterday",
          timestamp: '2025-04-08T10:36:00Z',
          isFromCurrentUser: true,
          image: '/lovable-uploads/f13b9daf-130a-4b25-971f-a1ae0385f800.png'
        }
      ];
      
      setMessages(mockMessages);
      
      // Mark conversation as read
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation 
            ? { ...conv, unreadCount: 0 } 
            : conv
        )
      );
    }
  }, [selectedConversation]);
  
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
    if ((!newMessage.trim() && !selectedImage) || !selectedConversation) return;
    
    const selectedConv = conversations.find(c => c.id === selectedConversation);
    if (!selectedConv) return;
    
    // Add new message to the conversation
    const newMessageObj: Message = {
      id: `msg${Date.now()}`,
      senderId: 'current-user',
      senderName: 'You',
      text: newMessage,
      timestamp: new Date().toISOString(),
      isFromCurrentUser: true
    };
    
    // If there's a selected image, add it to the message
    if (imagePreview) {
      newMessageObj.image = imagePreview;
    }
    
    setMessages(prev => [...prev, newMessageObj]);
    
    // Update the conversation with the new last message
    const displayMessage = newMessage.trim() || (selectedImage ? 'Sent an image' : '');
    
    setConversations(prev => 
      prev.map(conv => 
        conv.id === selectedConversation 
          ? { 
              ...conv, 
              lastMessage: displayMessage,
              lastMessageTimestamp: new Date().toISOString()
            } 
          : conv
      )
    );
    
    // Clear message input and image preview
    setNewMessage('');
    setSelectedImage(null);
    setImagePreview(null);
    
    // Show toast notification
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully."
    });
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const cancelImageUpload = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
                            selectedConversation === conversation.id 
                              ? 'bg-primary/20' 
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => setSelectedConversation(conversation.id)}
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
            {!selectedConversation ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Mail className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="font-medium text-lg mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the list to view messages
                </p>
              </div>
            ) : (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b bg-muted/20 flex items-center">
                  <Avatar className="bg-[#FFD9A7] text-primary mr-3">
                    <AvatarImage src={conversations.find(c => c.id === selectedConversation)?.participantAvatar} />
                    <AvatarFallback className="bg-[#FFD9A7] text-primary font-medium">
                      {getInitials(conversations.find(c => c.id === selectedConversation)?.participantName || '')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">
                      {conversations.find(c => c.id === selectedConversation)?.participantName}
                    </h3>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F1F1F1]/30">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.isFromCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isFromCurrentUser 
                            ? 'bg-[#B8CEC2] text-foreground rounded-tr-none' 
                            : 'bg-white border border-[#FFD9A7]/20 rounded-tl-none'
                        }`}
                      >
                        {message.text && (
                          <p className="text-sm mb-2">{message.text}</p>
                        )}
                        
                        {message.image && (
                          <div className="mt-1 mb-2">
                            <img 
                              src={message.image} 
                              alt="Sent image" 
                              className="rounded-md max-h-[200px] w-auto object-contain"
                            />
                          </div>
                        )}
                        
                        <p className="text-xs text-muted-foreground text-right">
                          {formatDate(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-3 border-t bg-white">
                  {imagePreview && (
                    <div className="mb-2 relative bg-muted/10 p-2 rounded-md">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium">Image preview</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={cancelImageUpload}
                          className="h-6 w-6 p-0"
                        >
                          ✕
                        </Button>
                      </div>
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-20 w-auto object-contain rounded-md"
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type a message..."
                      className="min-h-[50px] resize-none border-[#B8CEC2]/30"
                    />
                    <div className="flex flex-col gap-2 self-end">
                      <Button 
                        type="button"
                        onClick={triggerImageUpload}
                        className="bg-[#B8CEC2]/70 text-foreground hover:bg-[#B8CEC2]/90 p-2 h-10 w-10"
                      >
                        <Image className="h-5 w-5" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageSelect}
                          accept="image/*"
                          className="hidden"
                        />
                      </Button>
                      <Button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() && !selectedImage}
                        className="bg-[#B8CEC2] text-foreground hover:bg-[#B8CEC2]/90 p-2 h-10 w-10"
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
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
