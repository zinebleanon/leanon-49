
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

interface SimpleProfileFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const SimpleProfileForm = ({ onSuccess, onCancel }: SimpleProfileFormProps) => {
  const { userInfo, updateUserInfo } = useUserInfo();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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
    // This will redirect to the full profile form with the kids section open
    onSuccess();
  };
  
  return (
    <div className="bg-pastel-yellow/20 rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Complete Your Profile</h2>
      <p className="text-center text-gray-600 mb-6">Help us find Moms Around You</p>
      
      <Button 
        variant="outline" 
        className="w-full mb-6 bg-pastel-yellow/30 hover:bg-pastel-yellow/40 border-pastel-yellow/40 text-gray-700"
        onClick={onCancel}
      >
        <Clock className="mr-2 h-4 w-4" />
        Do this later
      </Button>
      
      <div className="space-y-6">
        <div>
          <Label className="text-gray-700 font-medium">I am a:</Label>
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
          <Label htmlFor="nationality" className="text-gray-700 font-medium">Your Nationality</Label>
          <Input
            id="nationality"
            placeholder="Select your nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            className="mt-1 bg-pastel-yellow/30 border-pastel-yellow/40"
          />
        </div>
        
        <div>
          <Label className="text-gray-700 font-medium">Your Birth Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full mt-1 justify-start text-left font-normal bg-white border-gray-200"
              >
                {birthDate ? (
                  format(birthDate, "PPP")
                ) : (
                  <span className="text-gray-500">dd/mm/yyyy</span>
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
            <Label className="text-gray-700 font-medium">Your Children</Label>
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
            <p className="text-sm text-gray-500 mt-2">No children added yet</p>
          )}
          
          {userInfo?.kids && userInfo.kids.length > 0 && (
            <div className="space-y-2 mt-2">
              {userInfo.kids.map((kid, index) => (
                <div key={index} className="flex justify-between bg-white p-2 rounded border border-gray-200">
                  <span>Child {index + 1}</span>
                  <span className="text-sm text-gray-500">
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
    </div>
  );
};

export default SimpleProfileForm;
