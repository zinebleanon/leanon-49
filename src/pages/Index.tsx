
import React from 'react';
import { useUserInfo } from '@/hooks/use-user-info';

const Index = () => {
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

  // This is just a placeholder for the index page content
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to LeanOn</h1>
      <p className="mb-4">A supportive space from Moms to Moms.</p>
      
      {userInfo?.referralCode && (
        <div className="p-4 bg-secondary/10 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Share LeanOn with other moms</h2>
          <p className="mb-4">Your referral code: <strong>{userInfo.referralCode}</strong></p>
          <button
            onClick={shareWhatsApp}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Share on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;
