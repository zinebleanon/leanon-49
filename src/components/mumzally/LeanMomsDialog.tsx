
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle, MessageSquare } from 'lucide-react';
import MessageDialog from './MessageDialog';

interface LeanMom {
  id: number;
  name: string;
  age: number;
  location: string;
  compatibility: number;
  activeInCommunity?: boolean;
}

interface LeanMomsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  leanBackMoms: LeanMom[];
}

const LeanMomsDialog = ({ open, onOpenChange, leanBackMoms }: LeanMomsDialogProps) => {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<{id: number, name: string} | null>(null);

  const handleMessageClick = (id: number, name: string) => {
    setSelectedRecipient({ id, name });
    setMessageDialogOpen(true);
  };
  
  const handleSendMessage = (text: string, image: string | null) => {
    // This would typically send the message to the backend
    console.log("Sending message to", selectedRecipient, "Text:", text, "Image:", image);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>My LeanMoms</DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[70vh] overflow-y-auto pt-2">
            {leanBackMoms.length > 0 ? (
              <div className="space-y-2">
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
        </DialogContent>
      </Dialog>
      
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
    </>
  );
};

export default LeanMomsDialog;
