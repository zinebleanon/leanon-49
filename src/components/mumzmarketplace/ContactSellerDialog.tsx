
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Contact about "{item.title}"</DialogTitle>
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
                      className="min-h-[120px]" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button disabled={isSending} type="submit">
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <MessageCircle className="mr-2 h-4 w-4" /> 
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
