import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUserInfo } from '@/hooks/use-user-info';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface EditKidFormProps {
  kidIndex?: number; // Undefined for new kid
  onSuccess: () => void;
}

const kidFormSchema = z.object({
  birthDate: z.date({ required_error: "Birth date is required." }),
  gender: z.string({ required_error: "Gender is required." }).min(1, "Gender is required."),
});

type KidFormValues = z.infer<typeof kidFormSchema>;

const EditKidForm = ({ kidIndex, onSuccess }: EditKidFormProps) => {
  const { userInfo, updateKid, addKid } = useUserInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const isNewKid = kidIndex === undefined;
  const existingKid = !isNewKid && userInfo?.kids?.[kidIndex];
  
  let defaultValues: Partial<KidFormValues> = {
    gender: existingKid?.gender || '',
  };
  
  if (existingKid?.birthDate) {
    try {
      defaultValues.birthDate = new Date(existingKid.birthDate);
    } catch (error) {
      console.error('Error parsing birth date:', error);
    }
  }
  
  const form = useForm<KidFormValues>({
    resolver: zodResolver(kidFormSchema),
    defaultValues,
  });
  
  const onSubmit = async (data: KidFormValues) => {
    setIsLoading(true);
    
    try {
      const formattedData = {
        birthDate: data.birthDate.toISOString(),
        gender: data.gender
      };
      
      let success = false;
      
      if (isNewKid) {
        success = addKid(formattedData);
      } else if (kidIndex !== undefined) {
        success = updateKid(kidIndex, formattedData);
      }
      
      if (success) {
        toast({
          title: isNewKid ? "Kid added" : "Kid updated",
          description: isNewKid 
            ? "A new child has been added to your profile."
            : "Your child's information has been updated successfully.",
        });
        onSuccess();
      } else {
        toast({
          title: "Update failed",
          description: "There was a problem updating the information. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating kid info:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating the information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Birth Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "MMMM d, yyyy")
                      ) : (
                        <span>Select child's birth date</span>
                      )}
                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date().setFullYear(new Date().getFullYear() - 18)
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground mt-1">
                Please select your child's birth date. Must not be in the future.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : isNewKid ? "Add Child" : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditKidForm;
