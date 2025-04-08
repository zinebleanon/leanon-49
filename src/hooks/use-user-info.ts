
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

  return {
    userInfo,
    isLoading,
    updateUserInfo,
    updateKid,
    addKid,
    removeKid,
    neighborhood: userInfo?.neighborhood || 'Dubai Marina', // Default to Dubai Marina if not set
    location: userInfo?.location,
    workStatus: userInfo?.workStatus,
    kids: userInfo?.kids || [],
  };
};
