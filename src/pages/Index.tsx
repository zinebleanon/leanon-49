
const shareWhatsApp = () => {
  if (userInfo?.referralCode) {
    const message = `Join Me on LeanOn, the new supportive Online Community for Moms. Use my Referral code: ${userInfo.referralCode}. You can get yours also, Refer & Earn.\n\nDownload Now: https://leanon.app`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  }
};
