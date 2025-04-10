
import { useState, useRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUserInfo } from '@/hooks/use-user-info';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Upload, User } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface EditProfileFormProps {
  onSuccess: () => void;
}

const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  neighborhood: z.string().min(1, { message: "Neighborhood is required." }),
  birthDate: z.date().optional(),
  workStatus: z.string().optional(),
  nationality: z.string().optional(),
  interests: z.string().optional(),
  bio: z.string().optional(),
  profilePictureURL: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const EditProfileForm = ({ onSuccess }: EditProfileFormProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePictureURL, setProfilePictureURL] = useState<string>(userInfo?.profilePictureURL || '');
  
  // Extract first and last name from the full name
  const getFirstAndLastName = () => {
    if (!userInfo?.name) return { firstName: '', lastName: '' };
    
    const nameParts = userInfo.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    return { firstName, lastName };
  };
  
  // Get first name and last name from existing name field
  const { firstName, lastName } = userInfo?.firstName && userInfo?.lastName 
    ? { firstName: userInfo.firstName, lastName: userInfo.lastName }
    : getFirstAndLastName();
  
  // Prepare default values for the form
  let defaultValues: Partial<ProfileFormValues> = {
    firstName,
    lastName,
    email: userInfo?.email || '',
    phone: userInfo?.phone || '',
    neighborhood: userInfo?.neighborhood || '',
    workStatus: userInfo?.workStatus || '',
    nationality: userInfo?.nationality || '',
    interests: userInfo?.interests || '',
    bio: userInfo?.bio || '',
    profilePictureURL: userInfo?.profilePictureURL || '',
  };
  
  // Handle the birthDate field which needs to be a Date object
  if (userInfo?.birthDate) {
    try {
      defaultValues.birthDate = new Date(userInfo.birthDate);
    } catch (error) {
      console.error('Error parsing birth date:', error);
    }
  }
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });
  
  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      // Combine first name and last name into full name
      const name = `${data.firstName} ${data.lastName}`;
      
      // Convert birthDate to ISO string if it exists
      const formattedData = {
        ...data,
        name,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate ? data.birthDate.toISOString() : undefined,
        profilePictureURL: profilePictureURL || data.profilePictureURL,
      };
      
      const success = updateUserInfo(formattedData);
      
      if (success) {
        toast({
          title: "Profile updated",
          description: "Your profile information has been updated successfully.",
        });
        onSuccess();
      } else {
        toast({
          title: "Update failed",
          description: "There was a problem updating your profile. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create URL for preview
      const imageUrl = URL.createObjectURL(file);
      setProfilePictureURL(imageUrl);
      
      toast({
        title: "Image uploaded",
        description: "Profile picture added successfully"
      });
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Profile Picture Upload */}
        <div className="space-y-2 flex flex-col items-center mb-4">
          <FormLabel className="self-start">Profile Picture</FormLabel>
          <Avatar className="w-24 h-24 cursor-pointer border-2 border-secondary/50" onClick={triggerFileInput}>
            {profilePictureURL || form.getValues().profilePictureURL ? (
              <AvatarImage src={profilePictureURL || form.getValues().profilePictureURL} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-secondary/20 flex items-center justify-center">
                <User className="h-8 w-8 text-secondary" />
              </AvatarFallback>
            )}
          </Avatar>
          <input 
            type="file" 
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="mt-2 text-xs flex items-center gap-1.5"
            onClick={triggerFileInput}
          >
            <Upload className="h-3.5 w-3.5" />
            {profilePictureURL || form.getValues().profilePictureURL ? 'Change Photo' : 'Upload Photo'}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Neighborhood</FormLabel>
              <FormControl>
                <Input placeholder="Enter your neighborhood" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
                      className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
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
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="workStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Work Status</FormLabel>
              <FormControl>
                <Input placeholder="E.g. Full-time, Stay-at-home parent, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input placeholder="Enter your nationality" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests</FormLabel>
              <FormControl>
                <Input placeholder="E.g. Cooking, Yoga, Reading, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell other moms about yourself..."
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
