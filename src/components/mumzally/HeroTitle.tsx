
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroTitleProps {
  isProfileComplete?: boolean;
}

const HeroTitle = ({ isProfileComplete = false }: HeroTitleProps) => {
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate('/', {
      state: { 
        openProfileUpdate: true,
        section: 'all'
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold font-playfair mb-2">
        {isProfileComplete ? 'Find Your LeanMoms' : 'Complete Your Profile'}
      </h1>
      <p className="text-muted-foreground">
        {isProfileComplete 
          ? 'Connect with moms who share your interests and parenting journey'
          : (
            <span className="flex items-center gap-2">
              Complete your profile to start connecting with other moms.
              <button
                onClick={handleCompleteProfile}
                className="text-primary hover:underline font-medium"
              >
                Complete Profile
              </button>
            </span>
          )
        }
      </p>
    </div>
  );
};

export default HeroTitle;
