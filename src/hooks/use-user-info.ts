import { useState, useEffect } from 'react';

interface Kid {
  birthDate: string;
  gender: string;
}

interface UserInfo {
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  neighborhood: string;
  phone: string;
  profilePictureURL?: string;
  profileImage?: string;
  location?: {
    latitude: string;
    longitude: string;
  };
  workStatus?: string;
  nationality?: string;
  interests?: string;
  birthDate?: string;
  bio?: string;
  kids?: Kid[];
  referralCode?: string;
  profileVisibility?: 'public' | 'connections' | 'private';
  locationSharing?: boolean;
  manualLocationUpdate?: boolean; // Flag to indicate if location should be manually updated
  useGeolocationForNeighborhood?: boolean; // Flag to indicate if geolocation should be used for neighborhood updates
  profileNeedsUpdate?: boolean; // Flag to indicate if profile needs to be updated
}

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.error('Error parsing user info from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUserInfo = (updatedInfo: Partial<UserInfo>) => {
    try {
      const newUserInfo = { ...userInfo, ...updatedInfo };
      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      return true;
    } catch (error) {
      console.error('Error updating user info:', error);
      return false;
    }
  };

  const updateLocation = (latitude: string, longitude: string) => {
    try {
      if (!userInfo?.manualLocationUpdate) {
        return false; // If manual location update is not enabled, don't update
      }
      
      const newUserInfo = {
        ...userInfo,
        location: { latitude, longitude }
      };
      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      return true;
    } catch (error) {
      console.error('Error updating location:', error);
      return false;
    }
  };

  const toggleManualLocationUpdate = (enabled: boolean) => {
    try {
      const newUserInfo = { ...userInfo, manualLocationUpdate: enabled };
      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      return true;
    } catch (error) {
      console.error('Error toggling manual location update:', error);
      return false;
    }
  };

  const toggleGeolocationForNeighborhood = (enabled: boolean) => {
    try {
      const newUserInfo = { ...userInfo, useGeolocationForNeighborhood: enabled };
      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      return true;
    } catch (error) {
      console.error('Error toggling geolocation for neighborhood:', error);
      return false;
    }
  };

  const updateNeighborhoodWithGeolocation = async (address: string) => {
    try {
      // First, update the neighborhood immediately
      updateUserInfo({ neighborhood: address });
      
      // If geolocation isn't enabled, we're done
      if (!userInfo?.useGeolocationForNeighborhood) {
        return true;
      }

      // Request current position from browser
      return new Promise<boolean>((resolve) => {
        if (!navigator.geolocation) {
          console.warn("Geolocation is not supported by this browser");
          resolve(true); // We still updated the neighborhood name
          return;
        }
        
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Got real coordinates - update with precise location
            const coordinates = {
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString()
            };
            
            console.log("Got precise coordinates:", coordinates);
            
            // In a real app, we would use reverse geocoding to get real address
            // based on the coordinates, then update both values.
            // For now, we'll keep user's entered address but add the coordinates.
            
            const newUserInfo = {
              ...userInfo,
              neighborhood: address,
              location: coordinates
            };
            
            setUserInfo(newUserInfo);
            localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
            resolve(true);
          },
          (error) => {
            console.error("Geolocation error:", error.code, error.message);
            
            // Log a more detailed error based on the error code
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("Location permission denied by user");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information unavailable");
                break;
              case error.TIMEOUT:
                console.error("Location request timed out");
                break;
              default:
                console.error("Unknown geolocation error");
            }
            
            // Still return true since we updated the neighborhood
            resolve(true);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000, // Increased timeout for better results
            maximumAge: 0
          }
        );
      });
    } catch (error) {
      console.error('Error updating neighborhood with geolocation:', error);
      return false;
    }
  };

  const updateKid = (index: number, kidData: Partial<Kid>) => {
    if (!userInfo?.kids) return false;
    
    try {
      const updatedKids = [...userInfo.kids];
      updatedKids[index] = { ...updatedKids[index], ...kidData };
      
      const newUserInfo = { ...userInfo, kids: updatedKids };
      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      return true;
    } catch (error) {
      console.error('Error updating kid info:', error);
      return false;
    }
  };
  
  const addKid = (kidData: Kid) => {
    try {
      const updatedKids = userInfo?.kids ? [...userInfo.kids, kidData] : [kidData];
      
      const newUserInfo = { ...userInfo, kids: updatedKids };
      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      return true;
    } catch (error) {
      console.error('Error adding kid:', error);
      return false;
    }
  };
  
  const removeKid = (index: number) => {
    if (!userInfo?.kids) return false;
    
    try {
      const updatedKids = userInfo.kids.filter((_, i) => i !== index);
      
      const newUserInfo = { ...userInfo, kids: updatedKids };
      setUserInfo(newUserInfo);
      localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
      return true;
    } catch (error) {
      console.error('Error removing kid:', error);
      return false;
    }
  };

  const getKidsAges = () => {
    if (!userInfo?.kids) return [];
    
    return userInfo.kids.map(kid => {
      if (kid.birthDate) {
        const birthDate = new Date(kid.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        return { age, gender: kid.gender };
      }
      return { age: 0, gender: kid.gender };
    });
  };

  return {
    userInfo,
    isLoading,
    updateUserInfo,
    updateLocation,
    toggleManualLocationUpdate,
    toggleGeolocationForNeighborhood,
    updateNeighborhoodWithGeolocation,
    updateKid,
    addKid,
    removeKid,
    neighborhood: userInfo?.neighborhood || 'Dubai Marina',
    location: userInfo?.location,
    workStatus: userInfo?.workStatus,
    kids: userInfo?.kids || [],
    kidsAges: getKidsAges(),
    referralCode: userInfo?.referralCode,
    manualLocationUpdate: userInfo?.manualLocationUpdate || false,
    useGeolocationForNeighborhood: userInfo?.useGeolocationForNeighborhood || false,
    profileNeedsUpdate: userInfo?.profileNeedsUpdate || false,
  };
};
