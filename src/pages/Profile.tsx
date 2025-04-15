
  const shareWhatsApp = () => {
    if (userInfo?.referralCode) {
      const message = `Hey mama
I've joined LeanOn a supportive space from Moms to Moms.
Use my referral code: ${userInfo.referralCode} to join, and you can invite other moms too! You'll get a 5 AED voucher for every friend who joins`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
    }
  };
