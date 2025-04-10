
import { useState, useEffect } from 'react';
import { useUserInfo } from './use-user-info';
import { useToast } from './use-toast';

export const useSettings = () => {
  const { 
    userInfo, 
    updateUserInfo, 
    toggleManualLocationUpdate, 
    toggleGeolocationForNeighborhood,
    updateNeighborhoodWithGeolocation,
    neighborhood
  } = useUserInfo();
  
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    pushNotifications: false,
    marketingEmails: false,
    profileVisibility: userInfo?.profileVisibility || 'public',
    locationSharing: userInfo?.locationSharing || true,
    manualLocationUpdate: userInfo?.manualLocationUpdate || false,
    useGeolocationForNeighborhood: userInfo?.useGeolocationForNeighborhood || false,
  });
  
  // Update settings from userInfo when it loads
  useEffect(() => {
    if (userInfo) {
      setSettings(prev => ({
        ...prev,
        profileVisibility: userInfo.profileVisibility || 'public',
        locationSharing: userInfo.locationSharing || true,
        manualLocationUpdate: userInfo.manualLocationUpdate || false,
        useGeolocationForNeighborhood: userInfo.useGeolocationForNeighborhood || false,
      }));
    }
  }, [userInfo]);
  
  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    // Also update in user info if relevant
    const userInfoUpdate: any = {};
    if (setting === 'profileVisibility' || setting === 'locationSharing') {
      userInfoUpdate[setting] = value;
      updateUserInfo(userInfoUpdate);
    } else if (setting === 'manualLocationUpdate') {
      // Update the manual location update setting
      toggleManualLocationUpdate(value as boolean);
    } else if (setting === 'useGeolocationForNeighborhood') {
      // Update the geolocation for neighborhood setting
      toggleGeolocationForNeighborhood(value as boolean);
    }
    
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    });
  };
  
  const handleActivateGeolocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Accessing your location",
        description: "Please allow location access when prompted.",
      });
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          
          // In a real app, we would use reverse geocoding here to get the address
          // For this demo, we'll update with coordinates and a placeholder
          const result = await updateUserInfo({
            location: { latitude, longitude },
            useGeolocationForNeighborhood: true
          });
          
          if (result) {
            setSettings(prev => ({
              ...prev,
              useGeolocationForNeighborhood: true
            }));
            
            toast({
              title: "Location updated",
              description: "Your current location has been saved. You can now use automatic geolocation for neighborhood updates.",
            });
          } else {
            toast({
              title: "Error",
              description: "There was a problem updating your location.",
              variant: "destructive",
            });
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Geolocation error",
            description: "Unable to access your location. Please check your browser permissions.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation services.",
        variant: "destructive",
      });
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };
  
  return {
    settings,
    handleSettingChange,
    handleActivateGeolocation,
    handleLogout
  };
};
