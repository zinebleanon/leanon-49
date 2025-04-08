
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { MessageCircle, ArrowLeft, SendIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BowRibbon from '../mumzally/BowRibbon';

interface ContactSellerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: {
    title: string;
    seller: string;
  };
}

type ContactFormValues = {
  message: string;
}

const ContactSellerDialog = ({ open, onOpenChange, item }: ContactSellerDialogProps) => {
  const [isSending, setIsSending] = useState(false);
  
  const form = useForm<ContactFormValues>({
    defaultValues: {
      message: ""
    }
  });
  
  const onSubmit = (data: ContactFormValues) => {
    setIsSending(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSending(false);
      
      toast({
        title: "Message sent",
        description: `Your message about "${item.title}" has been sent to ${item.seller}.`,
      });
      
      form.reset();
      onOpenChange(false);
    }, 800);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-[#B8CEC2]/40 via-[#FFD9A7]/30 to-[#FDB3A4]/20 border-[#FFD9A7]/50">
        <DialogHeader className="relative">
          <DialogClose asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-0 left-0 p-2 h-auto text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Button>
          </DialogClose>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2 pt-8">
            <BowRibbon className="w-8 h-6 scale-[2.5]" color="#FFD9A7" />
            Contact about "{item.title}"
          </DialogTitle>
          <DialogDescription>
            Send a message to {item.seller} about this item
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
                      placeholder={`Hi! I'm interested in your "${item.title}" listing. Is it still available?`} 
                      className="min-h-[120px] bg-white/80 border-[#B8CEC2]/30" 
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
                className="bg-gradient-to-r from-[#B8CEC2] via-[#FFD9A7] to-[#FDB3A4] hover:opacity-90 text-foreground"
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

export default ContactSellerDialog;
