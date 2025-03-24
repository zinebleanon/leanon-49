
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { SendIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BowRibbon from './BowRibbon';

interface MessageFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipient: {
    id: number;
    name: string;
  };
}

type MessageFormValues = {
  message: string;
}

const MessageForm = ({ open, onOpenChange, recipient }: MessageFormProps) => {
  const [isSending, setIsSending] = useState(false);
  
  const form = useForm<MessageFormValues>({
    defaultValues: {
      message: ""
    }
  });
  
  const onSubmit = (data: MessageFormValues) => {
    setIsSending(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSending(false);
      
      toast({
        title: "Message sent",
        description: `Your message to ${recipient.name} has been sent successfully.`,
      });
      
      form.reset();
      onOpenChange(false);
    }, 800);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#FFF8E7] via-[#FFD9A7]/50 to-[#B8CEC2]/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <BowRibbon className="w-8 h-6 scale-[2.5]" isActive={true} />
            Message to {recipient.name}
          </DialogTitle>
          <DialogDescription>
            Send a message to start a conversation with your new LeanOn Ally
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={`Hi ${recipient.name}! I'm excited to connect with you...`} 
                      className="min-h-[120px] bg-white/80" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button 
                disabled={isSending} 
                type="submit" 
                variant="warm"
                className="text-foreground"
              >
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <SendIcon className="mr-2 h-4 w-4" /> 
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageForm;
