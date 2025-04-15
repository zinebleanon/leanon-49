
import React from 'react';
import { useUserInfo } from '@/hooks/use-user-info';

// Define the ProfileSection type that's being referenced
export type ProfileSection = 'all' | 'basic' | 'contact' | 'personal' | 'photo';

const Profile = () => {
  const { userInfo } = useUserInfo();

  const shareWhatsApp = () => {
    if (userInfo?.referralCode) {
      const message = `Hey mama
I've joined LeanOn a supportive space from Moms to Moms.
Use my referral code: ${userInfo.referralCode} to join, and you can invite other moms too! You'll get a 5 AED voucher for every friend who joins`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      {userInfo ? (
        <div className="space-y-4">
          <div className="p-4 bg-secondary/10 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Your Information</h2>
            <p className="mb-1">Name: {userInfo.firstName} {userInfo.lastName}</p>
            <p className="mb-1">Email: {userInfo.email}</p>
            {userInfo.phone && <p className="mb-1">Phone: {userInfo.phone}</p>}
            {userInfo.neighborhood && <p className="mb-1">Neighborhood: {userInfo.neighborhood}</p>}
          </div>
          
          {userInfo.referralCode && (
            <div className="p-4 bg-secondary/10 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Refer Friends</h2>
              <p className="mb-2">Your referral code: <strong>{userInfo.referralCode}</strong></p>
              <button
                onClick={shareWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                Share on WhatsApp
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile information...</p>
      )}
    </div>
  );
};

export default Profile;
