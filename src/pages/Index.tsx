
import React from 'react';
import { useUserInfo } from '@/hooks/use-user-info';

// Utility function to capitalize the first letter of a string
const capitalizeFirstLetter = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const Index = () => {
  const { userInfo } = useUserInfo();
  
  const getCapitalizedFirstName = () => {
    if (!userInfo) {
      console.log('No userInfo available');
      return '';
    }
    
    // Log out the entire userInfo to see what's available
    console.log('UserInfo:', JSON.stringify(userInfo, null, 2));
    
    const firstName = userInfo.firstName || (userInfo.name ? userInfo.name.split(' ')[0] : '');
    const lastName = userInfo.lastName || (userInfo.name ? userInfo.name.split(' ')[1] : '');
    
    const formattedName = lastName 
      ? `${capitalizeFirstLetter(firstName)} ${capitalizeFirstLetter(lastName[0])}`.trim()
      : capitalizeFirstLetter(firstName);
    
    console.log('Formatted Name:', formattedName);
    
    return formattedName;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {getCapitalizedFirstName()}!</h1>
      {/* Rest of your Index page content would go here */}
    </div>
  );
};

export default Index;
