
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import RibbonIcon from '@/components/ui/RibbonIcon';

const MumzAllySubscribe = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="flex flex-col items-center justify-center pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 border-2 border-primary/20 bg-white/50 backdrop-blur-sm text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <RibbonIcon className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-playfair">
              Welcome to
            </h1>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              LeanOn Community
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-playfair mb-8">
              Where Moms LeanOn Moms
            </p>
            
            <Button 
              className="w-full warm-button text-lg py-6"
              onClick={() => navigate('/ally')}
            >
              <RibbonIcon className="mr-2 h-5 w-5" />
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
