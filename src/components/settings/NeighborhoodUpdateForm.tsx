
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Navigation } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NeighborhoodUpdateFormProps {
  initialNeighborhood: string;
  useGeolocation: boolean;
  onCancel: () => void;
  onSubmit: (neighborhood: string) => void;
  onToggleGeolocation: (enabled: boolean) => void;
}

const NeighborhoodUpdateForm = ({ 
  initialNeighborhood, 
  useGeolocation,
  onCancel, 
  onSubmit,
  onToggleGeolocation
}: NeighborhoodUpdateFormProps) => {
  const [neighborhood, setNeighborhood] = useState(initialNeighborhood);
  const { toast } = useToast();
  
  const handleSubmit = () => {
    if (!neighborhood) {
      toast({
        title: "Error",
        description: "Please enter your neighborhood or address.",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(neighborhood);
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-3">Update Your Neighborhood</h4>
      <div className="space-y-3 mb-4">
        <Input 
          type="text" 
          placeholder="Enter your neighborhood or address" 
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
        />
        
        <div className="flex items-center space-x-2">
          <Switch
            id="use-geolocation"
            checked={useGeolocation}
            onCheckedChange={onToggleGeolocation}
            className="data-[state=checked]:bg-pastel-yellow"
          />
          <label 
            htmlFor="use-geolocation" 
            className="text-sm cursor-pointer flex items-center"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Automatically determine my location from address
          </label>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {useGeolocation 
            ? "When enabled, we'll automatically set your pin location based on your address."
            : "When disabled, we'll only update your neighborhood name without changing your pin location."}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="warm" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NeighborhoodUpdateForm;
