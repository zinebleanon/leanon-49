
import React, { useState, useRef } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useUserInfo } from '@/hooks/use-user-info';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarIcon, Camera, Upload, User } from 'lucide-react';
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
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ProfileSection } from '@/pages/Profile';

interface EditProfileFormProps {
  onSuccess: () => void;
  section?: ProfileSection;
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

const EditProfileForm = ({ onSuccess, section = 'all' }: EditProfileFormProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profilePictureURL, setProfilePictureURL] = useState<string>(userInfo?.profilePictureURL || '');
  const [activeTab, setActiveTab] = useState(section !== 'all' ? mapSectionToTab(section) : 'basic-info');
  
  function mapSectionToTab(section: ProfileSection): string {
    switch (section) {
      case 'basic': return 'basic-info';
      case 'contact': return 'contact-info';
      case 'personal': return 'personal-details';
      case 'photo': return 'profile-photo';
      default: return 'basic-info';
    }
  }
  
  const getFirstAndLastName = () => {
    if (!userInfo?.name) return { firstName: '', lastName: '' };
    
    const nameParts = userInfo.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    return { firstName, lastName };
  };
  
  const { firstName, lastName } = userInfo?.firstName && userInfo?.lastName 
    ? { firstName: userInfo.firstName, lastName: userInfo.lastName }
    : getFirstAndLastName();
  
  let defaultValues: Partial<ProfileFormValues> = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: userInfo?.email || '',
    phone: userInfo?.phone || '',
    neighborhood: userInfo?.neighborhood || '',
    workStatus: userInfo?.workStatus || '',
    nationality: userInfo?.nationality || '',
    interests: userInfo?.interests || '',
    bio: userInfo?.bio || '',
    profilePictureURL: userInfo?.profilePictureURL || '',
  };
  
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
    mode: "onBlur" 
  });
  
  // Ensure form is reset with user data when it changes
  React.useEffect(() => {
    if (userInfo) {
      form.reset({
        firstName: firstName || '',
        lastName: lastName || '',
        email: userInfo.email || '',
        phone: userInfo.phone || '',
        neighborhood: userInfo.neighborhood || '',
        workStatus: userInfo.workStatus || '',
        nationality: userInfo.nationality || '',
        interests: userInfo.interests || '',
        bio: userInfo.bio || '',
        profilePictureURL: userInfo.profilePictureURL || '',
        birthDate: userInfo.birthDate ? new Date(userInfo.birthDate) : undefined,
      });
    }
  }, [userInfo, firstName, lastName, form]);
  
  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    
    try {
      const name = `${data.firstName} ${data.lastName}`;
      
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
  
  const handleSavePhoto = () => {
    if (profilePictureURL) {
      setIsLoading(true);
      
      try {
        const success = updateUserInfo({ 
          profilePictureURL,
        });
        
        if (success) {
          toast({
            title: "Profile photo updated",
            description: "Your profile photo has been updated successfully.",
          });
          onSuccess();
        } else {
          toast({
            title: "Update failed",
            description: "There was a problem updating your profile photo. Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error updating profile photo:', error);
        toast({
          title: "Update failed",
          description: "There was a problem updating your profile photo. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  if (section === 'photo') {
    return (
      <div className="space-y-4">
        <div className="space-y-2 flex flex-col items-center mb-4">
          <Avatar className="w-32 h-32 cursor-pointer border-2 border-secondary/50" onClick={triggerFileInput}>
            {profilePictureURL || userInfo?.profilePictureURL ? (
              <AvatarImage src={profilePictureURL || userInfo?.profilePictureURL} alt="Profile" />
            ) : (
              <AvatarFallback className="bg-secondary/20 flex items-center justify-center">
                <User className="h-12 w-12 text-secondary" />
              </AvatarFallback>
            )}
            <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 rounded-full flex items-center justify-center transition-opacity">
              <Camera className="h-12 w-12 text-white" />
            </div>
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
            {profilePictureURL || userInfo?.profilePictureURL ? 'Change Photo' : 'Upload Photo'}
          </Button>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleSavePhoto} 
            disabled={isLoading || (!profilePictureURL && !userInfo?.profilePictureURL)}
          >
            {isLoading ? "Saving..." : "Save Photo"}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="basic-info">Basic</TabsTrigger>
            <TabsTrigger value="contact-info">Contact</TabsTrigger>
            <TabsTrigger value="personal-details">Personal</TabsTrigger>
            <TabsTrigger value="profile-photo">Photo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic-info" className="space-y-4 py-2">
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
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
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
          </TabsContent>
          
          <TabsContent value="contact-info" className="space-y-4 py-2">
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
          </TabsContent>
          
          <TabsContent value="personal-details" className="space-y-4 py-2">
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
          </TabsContent>
          
          <TabsContent value="profile-photo" className="space-y-4 py-2">
            <div className="space-y-2 flex flex-col items-center mb-4">
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
          </TabsContent>
        </Tabs>
        
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
