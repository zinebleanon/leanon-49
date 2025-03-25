import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Heart, Mail, Check, Plus, Minus, Calendar } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface JoinCommunityModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Kid {
  id: string;
  birthDate: Date | undefined;
  gender: string;
}

const neighborhoods = [
  "Dubai Marina", "JLT", "Downtown Dubai", "Palm Jumeirah", "Arabian Ranches",
  "Emirates Hills", "Mirdif", "Dubailand", "Silicon Oasis", "Business Bay",
  "Al Barsha", "Deira", "Bur Dubai", "The Springs", "The Meadows", "The Greens",
  "Jumeirah", "Umm Suqeim", "Discovery Gardens", "International City"
];

const nationalities = [
  "Emirati", "Indian", "Pakistani", "British", "American", "Egyptian", "Filipino",
  "Lebanese", "Jordanian", "South African", "Australian", "Canadian", "French",
  "German", "Italian", "Chinese", "Japanese", "Russian", "Turkish", "Iranian"
];

const JoinCommunityModal = ({ isOpen, onOpenChange }: JoinCommunityModalProps) => {
  const [step, setStep] = useState<'options' | 'form' | 'success'>('options');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: undefined as Date | undefined,
    neighborhood: '',
    nationality: '',
    workStatus: 'stay-home',
    interests: '',
  });
  const [kids, setKids] = useState<Kid[]>([
    { id: '1', birthDate: undefined, gender: '' }
  ]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.birthDate || !formData.neighborhood || !formData.nationality) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const isKidsInfoComplete = kids.every(kid => kid.birthDate && kid.gender);
    if (!isKidsInfoComplete) {
      toast({
        title: "Missing kids information",
        description: "Please provide birth date and gender for each child.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Form submitted:', { ...formData, kids });
    
    toast({
      title: "Welcome to MumzAlly!",
      description: "Thanks for joining our community! We'll be in touch soon.",
    });
    
    setStep('success');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, birthDate: date }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkStatusChange = (value: string) => {
    setFormData(prev => ({ ...prev, workStatus: value }));
  };

  const addKid = () => {
    setKids(prev => [...prev, { id: Date.now().toString(), birthDate: undefined, gender: '' }]);
  };

  const removeKid = (idToRemove: string) => {
    if (kids.length > 1) {
      setKids(prev => prev.filter(kid => kid.id !== idToRemove));
    }
  };

  const updateKidGender = (id: string, value: string) => {
    setKids(prev => 
      prev.map(kid => 
        kid.id === id ? { ...kid, gender: value } : kid
      )
    );
  };

  const updateKidBirthDate = (id: string, date: Date | undefined) => {
    setKids(prev => 
      prev.map(kid => 
        kid.id === id ? { ...kid, birthDate: date } : kid
      )
    );
  };

  const resetModal = () => {
    setStep('options');
    setFormData({
      name: '',
      email: '',
      birthDate: undefined,
      neighborhood: '',
      nationality: '',
      workStatus: 'stay-home',
      interests: '',
    });
    setKids([{ id: '1', birthDate: undefined, gender: '' }]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(resetModal, 300);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair mb-2 flex items-center gap-2">
            <Heart className="text-primary h-5 w-5" fill="currentColor" />
            Join Our Community
          </DialogTitle>
          <DialogDescription>
            Connect with other mumz, share experiences, and find support.
          </DialogDescription>
        </DialogHeader>

        {step === 'options' && (
          <div className="grid gap-4 py-4">
            <p className="text-center text-muted-foreground mb-4">
              Join our community of supportive mumz:
            </p>
            
            <Card 
              className="cursor-pointer hover:border-primary transition-all"
              onClick={() => setStep('form')}
            >
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 mt-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Join via Subscription</h3>
                <p className="text-sm text-muted-foreground">
                  Complete a simple form to join our community
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {step === 'form' && (
          <form onSubmit={handleFormSubmit} className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="Enter your name" 
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="grid gap-2">
              <Label>Birth Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.birthDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {formData.birthDate ? format(formData.birthDate, "PPP") : <span>Select your birth date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={formData.birthDate}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={(date) => date > new Date() || date < new Date("1940-01-01")}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Children Information</Label>
              {kids.map((kid, index) => (
                <div key={kid.id} className="grid grid-cols-12 gap-2 items-end pt-2 first:pt-0">
                  <div className="col-span-5">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !kid.birthDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {kid.birthDate ? format(kid.birthDate, "PPP") : <span>Birth date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={kid.birthDate}
                          onSelect={(date) => updateKidBirthDate(kid.id, date)}
                          initialFocus
                          disabled={(date) => date > new Date()}
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="col-span-5">
                    <Select 
                      value={kid.gender} 
                      onValueChange={(value) => updateKidGender(kid.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boy">Boy</SelectItem>
                        <SelectItem value="girl">Girl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 flex">
                    <Button 
                      type="button"
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeKid(kid.id)}
                      disabled={kids.length === 1}
                      className="ml-auto"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addKid}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Child
              </Button>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="neighborhood">Neighborhood</Label>
              <Select 
                value={formData.neighborhood} 
                onValueChange={(value) => handleSelectChange('neighborhood', value)}
              >
                <SelectTrigger id="neighborhood">
                  <SelectValue placeholder="Select your neighborhood" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map((neighborhood) => (
                    <SelectItem key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="nationality">Nationality</Label>
              <Select 
                value={formData.nationality} 
                onValueChange={(value) => handleSelectChange('nationality', value)}
              >
                <SelectTrigger id="nationality">
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nationality) => (
                    <SelectItem key={nationality} value={nationality}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Work Status</Label>
              <RadioGroup 
                value={formData.workStatus} 
                onValueChange={handleWorkStatusChange}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="stay-home" id="stay-home" />
                  <Label htmlFor="stay-home" className="cursor-pointer">Stay-Home Mom</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="working" id="working" />
                  <Label htmlFor="working" className="cursor-pointer">Working Mom</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="interests">Interests</Label>
              <Textarea 
                id="interests" 
                name="interests" 
                value={formData.interests} 
                onChange={handleInputChange} 
                placeholder="What are you interested in? (e.g., Cooking, Fitness, Reading)" 
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 justify-end pt-3">
              <Button type="button" variant="outline" onClick={() => setStep('options')}>
                Back
              </Button>
              <Button type="submit" variant="warm">Join Now</Button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h3 className="text-xl font-medium">Welcome to MumzAlly!</h3>
            
            <p className="text-muted-foreground">
              Thank you for joining our community. We'll be in touch soon with more information about upcoming events and activities in your neighborhood.
            </p>
            
            <Button 
              variant="warm" 
              className="mt-4" 
              onClick={() => handleOpenChange(false)}
            >
              Continue Exploring
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JoinCommunityModal;
