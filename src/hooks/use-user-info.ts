
import { useState, useEffect } from 'react';

interface UserInfo {
  name: string;
  email: string;
  neighborhood: string;
  phone: string;
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
  };
};
