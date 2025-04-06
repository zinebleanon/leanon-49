
import { useState, useEffect } from 'react';

interface Kid {
  birthDate: string;
  gender: string;
}

interface UserInfo {
  name: string;
  email: string;
  neighborhood: string;
  phone: string;
  location?: {
    latitude: string;
    longitude: string;
  };
  workStatus?: string;
  nationality?: string;
  interests?: string;
  birthDate?: string;
  kids?: Kid[];
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

  return {
    userInfo,
    isLoading,
    neighborhood: userInfo?.neighborhood || 'Dubai Marina', // Default to Dubai Marina if not set
    location: userInfo?.location,
    workStatus: userInfo?.workStatus,
    kids: userInfo?.kids || [],
  };
};
