
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Check,
  CreditCard,
  Star,
  ArrowLeft,
  Calendar,
  Lock
} from 'lucide-react';

const MumzAllySubscribe = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Successful",
        description: "Welcome to LeanOn Premium! You now have access to all exclusive deals.",
      });
      navigate('/save');
    }, 1500);
  };

  const handleBackToSave = () => {
    navigate('/save');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={handleBackToSave}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to LeanOn Save
          </Button>
          
          <div className="text-center mb-10">
            <Badge className="mb-2" variant="outline">Premium Access</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
              LeanOn Premium Subscription
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-playfair">
              Get exclusive access to the best deals for moms and kids across the UAE for just 20 AED per month.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-2 border-primary/20 bg-white/50 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold font-playfair">Premium Benefits</h2>
                <Badge variant="default" className="py-1 px-4">20 AED/month</Badge>
              </div>
              
              <ul className="space-y-4 mb-8 font-playfair">
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Exclusive deals from top UAE brands</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Early access to special offers</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Featured listings at the top of search results</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Priority placement in LeanOn Marketplace</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span>Cancel anytime</span>
                </li>
              </ul>
              
              <div className="warm-card rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-amber-500" />
                  <p className="text-sm">Join over 2,500 UAE moms already saving with premium membership</p>
                </div>
              </div>
            </Card>
            
            <div>
              <Card className="p-8 border-2 border-primary/20">
                <form onSubmit={handleSubscribe}>
                  <h3 className="text-xl font-semibold mb-6 font-playfair">Payment Information</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                        Name on Card
                      </label>
                      <Input 
                        id="cardName" 
                        placeholder="e.g. Sarah Ahmed" 
                        required 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          required 
                        />
                        <CreditCard className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                          Expiry Date
                        </label>
                        <div className="relative">
                          <Input 
                            id="expiry" 
                            placeholder="MM/YY" 
                            required 
                          />
                          <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium mb-1">
                          CVC
                        </label>
                        <div className="relative">
                          <Input 
                            id="cvc" 
                            placeholder="123" 
                            required 
                          />
                          <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full warm-button" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Subscribe for 20 AED/month
                      </>
                    )}
                  </Button>
                  
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    You can cancel your subscription at any time
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAllySubscribe;
