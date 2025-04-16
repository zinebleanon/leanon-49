import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Mail, Users, ShoppingBag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserInfo } from '@/hooks/use-user-info';
import ConnectionRequests from '@/components/mumzally/ConnectionRequests';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  type: 'connect' | 'preloved';
}

const Inbox = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [activeMessageTab, setActiveMessageTab] = useState('connect');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { userInfo } = useUserInfo();
  
  useEffect(() => {
    setTimeout(() => {
      setConversations([]);
      setIsLoading(false);
    }, 800);
  }, []);
  
  const filteredConversations = useMemo(() => {
    let filtered = conversations;
    
    if (activeTab === 'messages') {
      filtered = conversations.filter(conversation => 
        conversation.type === activeMessageTab
      );
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(conversation => 
        conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [conversations, searchQuery, activeTab, activeMessageTab]);
  
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
  
  const handleSearchSelect = (conversationId: string) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      console.log('Selected conversation:', conversation);
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto pt-24 pb-24 px-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-playfair">Inbox</h1>
        </div>
        
        <div className="grid md:grid-cols-12 gap-4 h-[calc(100vh-250px)] min-h-[600px]">
          <div className="md:col-span-12 flex flex-col border rounded-lg overflow-hidden bg-card">
            <div className="p-3 border-b bg-muted/30">
              <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input 
                      placeholder="Search conversations" 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.trim().length > 0) {
                          setIsSearchOpen(true);
                        }
                      }}
                      onFocus={() => {
                        if (searchQuery.trim().length > 0) {
                          setIsSearchOpen(true);
                        }
                      }}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-[300px] md:w-[400px]" align="start">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No conversations found</CommandEmpty>
                      <CommandGroup heading="Conversations">
                        {filteredConversations.map((conversation) => (
                          <CommandItem
                            key={conversation.id}
                            value={conversation.id}
                            onSelect={() => handleSearchSelect(conversation.id)}
                            className="flex items-center gap-2 p-2"
                          >
                            <Avatar className="h-8 w-8 bg-[#FFD9A7] text-primary">
                              <AvatarFallback className="text-sm">
                                {getInitials(conversation.participantName)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{conversation.participantName}</p>
                              <p className="text-xs text-muted-foreground truncate w-48">
                                {conversation.lastMessage}
                              </p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid grid-cols-2 px-4 pt-3 bg-transparent">
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="leanmoms">My Moms</TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-y-auto">
                <TabsContent value="messages" className="m-0 h-full px-0">
                  <Tabs value={activeMessageTab} onValueChange={setActiveMessageTab} className="w-full">
                    <TabsList className="grid grid-cols-2 w-full rounded-none border-b">
                      <TabsTrigger 
                        value="connect" 
                        className="flex items-center gap-1 data-[state=active]:bg-pastel-yellow data-[state=active]:text-foreground"
                      >
                        <Users className="h-4 w-4" />
                        <span>Connect</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="preloved" 
                        className="flex items-center gap-1 data-[state=active]:bg-pastel-yellow data-[state=active]:text-foreground"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>Preloved</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="px-2 py-3">
                      {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : filteredConversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                          <Mail className="h-12 w-12 text-muted-foreground mb-3" />
                          <h3 className="font-medium text-lg mb-1">No {activeMessageTab} messages</h3>
                          <p className="text-muted-foreground text-sm">
                            {activeMessageTab === 'connect' 
                              ? 'Connect with other moms to start chatting' 
                              : 'No marketplace messages found'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {filteredConversations.map((conversation) => (
                            <Card key={conversation.id} className="p-3 rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
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
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </Tabs>
                </TabsContent>
                
                <TabsContent value="leanmoms" className="m-0 h-full">
                  <ConnectionRequests simplifiedView={true} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Inbox;
