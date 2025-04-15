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
  
  const getLocationFromIP = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('geolocation')
      if (error) throw new Error('IP geolocation failed');
      return {
        latitude: data.lat,
        longitude: data.lon,
        city: data.city,
        region: data.regionName
      };
    } catch (error) {
      console.error('IP geolocation error:', error);
      return null;
    }
  };

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
        });
        
        const { latitude, longitude } = position.coords;
        const locationString = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        setNeighborhood(locationString);
        toast({
          title: "Location detected",
          description: "Your location has been detected using GPS.",
        });
      } catch (error) {
        console.error("Browser geolocation failed, trying IP-based location...");
        
        const ipLocation = await getLocationFromIP();
        if (ipLocation) {
          const locationString = ipLocation.city 
            ? `${ipLocation.city}, ${ipLocation.region}`
            : `${ipLocation.latitude.toFixed(5)}, ${ipLocation.longitude.toFixed(5)}`;
          
          setNeighborhood(locationString);
          toast({
            title: "Location detected",
            description: "Your location has been approximated using your IP address.",
          });
        } else {
          toast({
            title: "Location error",
            description: "Could not detect your location. Please enter it manually.",
            variant: "destructive"
          });
        }
      }
    } else {
      const ipLocation = await getLocationFromIP();
      if (ipLocation) {
        const locationString = ipLocation.city 
          ? `${ipLocation.city}, ${ipLocation.region}`
          : `${ipLocation.latitude.toFixed(5)}, ${ipLocation.longitude.toFixed(5)}`;
        
        setNeighborhood(locationString);
        toast({
          title: "Location detected",
          description: "Your location has been approximated using your IP address.",
        });
      } else {
        toast({
          title: "Location unavailable",
          description: "Could not detect your location. Please enter it manually.",
          variant: "destructive"
        });
      }
    }
    
    setIsDetectingLocation(false);
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
