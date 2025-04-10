
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import RibbonIcon from '@/components/ui/RibbonIcon';
import { useUserInfo } from '@/hooks/use-user-info';

const MumzAllySubscribe = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get the first name from userInfo and capitalize the first letter
  let firstName = userInfo?.firstName || userInfo?.name?.split(' ')[0] || '';
  if (firstName) {
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  return (
    <div className="min-h-screen bg-[#B8CEC2] overflow-x-hidden w-full">
      <Navbar />
      
      <main className="flex flex-col items-center justify-center pt-24 pb-16 px-4 md:px-8 w-full">
        <div className="w-full max-w-4xl mx-auto">
          <Card className="p-6 md:p-12 border-2 border-primary/20 bg-white/50 backdrop-blur-sm text-center">
            {firstName ? (
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-playfair">
                {firstName},<br />
                We Love to See You Here
              </h1>
            ) : (
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 font-playfair">
                Welcome to LeanOn Community
              </h1>
            )}
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-playfair mb-8">
              Where Moms LeanOn Moms
            </p>
            
            <Button 
              className="w-full max-w-md mx-auto warm-button text-base md:text-lg py-4 md:py-6"
              onClick={() => navigate('/ally')}
            >
              <RibbonIcon className="mr-2 h-4 w-4 md:h-5 md:w-5" color="#000000" />
              Explore the Community
            </Button>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAllySubscribe;
