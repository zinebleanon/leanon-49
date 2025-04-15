import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Image, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BowRibbon from './BowRibbon';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isFromCurrentUser: boolean;
  image?: string;
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

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  conversation: Conversation | null;
  onSendMessage: (text: string, image: string | null) => void;
}

const MessageDialog = ({ open, onOpenChange, conversation, onSendMessage }: MessageDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && conversation) {
      setIsLoading(true);
      setTimeout(() => {
        const mockMessages: Message[] = [
          {
            id: 'msg1',
            senderId: conversation.participantId,
            senderName: conversation.participantName,
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
            senderId: conversation.participantId,
            senderName: conversation.participantName,
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
        setIsLoading(false);
      }, 500);
    } else {
      setMessages([]);
      setNewMessage('');
      setSelectedImage(null);
      setImagePreview(null);
    }
  }, [open, conversation]);
  
  const handleSendMessage = () => {
    if ((!newMessage.trim() && !imagePreview) || !conversation) return;
    
    const newMessageObj: Message = {
      id: `msg${Date.now()}`,
      senderId: 'current-user',
      senderName: 'You',
      text: newMessage,
      timestamp: new Date().toISOString(),
      isFromCurrentUser: true,
      image: imagePreview || undefined
    };
    
    setMessages(prev => [...prev, newMessageObj]);
    
    onSendMessage(newMessage, imagePreview);
    
    setNewMessage('');
    setSelectedImage(null);
    setImagePreview(null);
    
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
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
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
  
  const cancelImageUpload = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (document.getElementById('message-image-input') instanceof HTMLInputElement) {
      (document.getElementById('message-image-input') as HTMLInputElement).value = '';
    }
  };
  
  const handleNameClick = () => {
    onOpenChange(false);
    navigate('/connections');
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[80vh] max-h-[700px] flex flex-col p-0 overflow-hidden bg-card">
        {conversation && (
          <>
            <DialogHeader className="p-4 border-b bg-muted/20 flex flex-row items-center justify-between">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-foreground p-2 h-auto"
                onClick={() => onOpenChange(false)}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Back</span>
              </Button>
              <DialogTitle className="flex items-center gap-2">
                <Avatar className="bg-[#FFD9A7] text-primary h-8 w-8">
                  <AvatarImage src={conversation.participantAvatar} />
                  <AvatarFallback className="bg-[#FFD9A7] text-primary font-medium">
                    {getInitials(conversation.participantName)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  className="font-semibold p-0 h-auto hover:bg-transparent"
                  onClick={handleNameClick}
                >
                  {conversation.participantName}
                </Button>
              </DialogTitle>
              <div className="w-[60px]"></div>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F1F1F1]/30">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                messages.map((message) => (
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
                ))
              )}
            </div>
            
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
                    onClick={() => document.getElementById('message-image-input')?.click()}
                    className="bg-[#B8CEC2]/70 text-foreground hover:bg-[#B8CEC2]/90 p-2 h-10 w-10"
                  >
                    <Image className="h-5 w-5" />
                    <input
                      id="message-image-input"
                      type="file"
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
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;
