
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Navigation, Loader2 } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation unavailable",
        description: "Your browser doesn't support geolocation.",
        variant: "destructive"
      });
      return;
    }
    
    setIsDetectingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would use reverse geocoding here
        // For now, we'll just display coordinates and set a simulated neighborhood
        const { latitude, longitude } = position.coords;
        
        // This is a simulation of reverse geocoding
        // You would typically call a service like Google Maps API to get the actual neighborhood
        const simulatedNeighborhood = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        
        setNeighborhood(simulatedNeighborhood);
        toast({
          title: "Location detected",
          description: "Your location has been detected. You can edit it if needed.",
        });
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        
        let errorMessage = "Could not detect your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        
        toast({
          title: "Location error",
          description: errorMessage,
          variant: "destructive"
        });
        setIsDetectingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };
  
  const handleSubmit = async () => {
    if (!neighborhood) {
      toast({
        title: "Error",
        description: "Please enter your neighborhood or address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(neighborhood);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border rounded-md p-4">
      <h4 className="font-medium mb-3">Update Your Neighborhood</h4>
      <div className="space-y-3 mb-4">
        <div className="flex gap-2">
          <Input 
            type="text" 
            placeholder="Enter your neighborhood or address" 
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={handleDetectLocation}
            disabled={isDetectingLocation}
          >
            {isDetectingLocation ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
          </Button>
        </div>
        
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
            Use my precise location
          </label>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {useGeolocation 
            ? "When enabled, we'll use your browser's location feature to precisely locate you."
            : "When disabled, we'll only update your neighborhood name without detecting your location."}
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="warm" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></div>
              Saving...
            </>
          ) : (
            'Save'
          )}
        </Button>
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NeighborhoodUpdateForm;
