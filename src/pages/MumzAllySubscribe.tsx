
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';

const MumzAllySubscribe = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToSave = () => {
    navigate('/save');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="flex flex-col items-center justify-center pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6 self-start" 
            onClick={handleBackToSave}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to LeanOn Save
          </Button>
          
          <Card className="p-12 border-2 border-primary/20 bg-white/50 backdrop-blur-sm text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="h-12 w-12 text-primary" fill="currentColor" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              Welcome to LeanOn Community
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-playfair mb-8">
              Where Moms LeanOn Moms
            </p>
            
            <Button 
              className="w-full warm-button text-lg py-6"
              onClick={() => navigate('/ally')}
            >
              <Heart className="mr-2 h-5 w-5" fill="currentColor" />
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
