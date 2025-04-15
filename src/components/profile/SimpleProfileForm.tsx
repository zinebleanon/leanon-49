
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useUserInfo } from '@/hooks/use-user-info';
import { useToast } from '@/hooks/use-toast';
import EditProfileDialog from './EditProfileDialog';

interface SimpleProfileFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const SimpleProfileForm = ({ onSuccess, onCancel }: SimpleProfileFormProps) => {
  const { userInfo, updateUserInfo, kidsAges } = useUserInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddKidOpen, setIsAddKidOpen] = useState(false);
  
  const [workStatus, setWorkStatus] = useState(userInfo?.workStatus || 'full-time');
  const [nationality, setNationality] = useState(userInfo?.nationality || '');
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    userInfo?.birthDate ? new Date(userInfo.birthDate) : undefined
  );

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const updatedInfo = {
        workStatus,
        nationality,
        birthDate: birthDate ? birthDate.toISOString() : undefined,
      };
      
      const success = updateUserInfo(updatedInfo);
      
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

  const handleAddChild = () => {
    setIsAddKidOpen(true);
  };
  
  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Complete Your Profile</h2>
      <p className="text-center text-muted-foreground mb-6">Help us find Moms Around You</p>
      
      <Button 
        variant="outline" 
        className="w-full mb-6"
        onClick={onCancel}
      >
        <Clock className="mr-2 h-4 w-4" />
        Do this later
      </Button>
      
      <div className="space-y-6">
        <div>
          <Label className="font-medium">I am a:</Label>
          <RadioGroup 
            defaultValue={workStatus}
            onValueChange={setWorkStatus}
            className="flex gap-8 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="full-time" id="full-time" />
              <Label htmlFor="full-time">Full Time Mom</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="working" id="working" />
              <Label htmlFor="working">Working Mom</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="nationality" className="font-medium">Your Nationality</Label>
          <Input
            id="nationality"
            placeholder="Select your nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label className="font-medium">Your Birth Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-1 justify-start text-left font-normal"
              >
                {birthDate ? (
                  format(birthDate, "PPP")
                ) : (
                  <span className="text-muted-foreground">dd/mm/yyyy</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={setBirthDate}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div>
          <div className="flex justify-between items-center">
            <Label className="font-medium">Your Children</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleAddChild}
              className="text-primary hover:bg-primary/10"
            >
              + Add Child
            </Button>
          </div>
          
          {(!userInfo?.kids || userInfo.kids.length === 0) && (
            <p className="text-sm text-muted-foreground mt-2">No children added yet</p>
          )}
          
          {userInfo?.kids && userInfo.kids.length > 0 && (
            <div className="space-y-2 mt-2">
              {kidsAges.map((kid, index) => (
                <div key={index} className="flex justify-between bg-muted p-2 rounded border">
                  <span>Child {index + 1}</span>
                  <span className="text-sm text-muted-foreground">
                    {kid.gender}, {kid.age} {kid.age === 1 ? 'year' : 'years'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          className="w-full"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </div>

      {/* Child Edit Dialog */}
      <EditProfileDialog
        isOpen={isAddKidOpen}
        onOpenChange={setIsAddKidOpen}
        mode="kid"
        title="Add Child"
        description="Enter your child's information"
      />
    </div>
  );
};

export default SimpleProfileForm;
