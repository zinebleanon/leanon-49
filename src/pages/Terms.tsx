
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import useViewportHeight from '@/hooks/use-viewport-height';

const Terms = () => {
  useViewportHeight();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-12 md:py-16 mx-auto max-w-4xl">
        <Card className="bg-white/90 border-pastel-yellow/30 shadow-md">
          <CardHeader className="pb-2 bg-pastel-yellow/20">
            <CardTitle className="text-3xl md:text-4xl font-playfair text-center">
              Terms & Conditions
            </CardTitle>
            <CardDescription className="text-base text-center">
              Last updated: April 10, 2025
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6 pb-8">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">Referral Program Terms</h2>
                <p className="mb-3 text-muted-foreground">
                  By participating in the LeanOn Referral Program, you agree to the following terms and conditions:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To receive your 5 AED Mall of the Emirates gift card, your referred friend must sign up using your unique referral code and complete the registration process.</li>
                  <li>Each referral code can be used multiple times, but you can only earn one reward per unique new user.</li>
                  <li>Gift cards will be delivered to your registered email address within 14 days after your referred friend completes all requirements.</li>
                  <li>LeanOn reserves the right to modify or terminate the referral program at any time without prior notice.</li>
                  <li>Abuse of the referral program, including creating multiple accounts or fake referrals, will result in disqualification from the program.</li>
                  <li>Gift cards cannot be exchanged for cash or other products/services.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">General Terms of Use</h2>
                <p className="mb-3 text-muted-foreground">
                  By using the LeanOn platform, you acknowledge and agree to the following terms:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>You must be at least 18 years old to use this service.</li>
                  <li>You are responsible for maintaining the confidentiality of your account information.</li>
                  <li>LeanOn is not responsible for any user-generated content or interactions between users.</li>
                  <li>We reserve the right to terminate or suspend accounts that violate our community guidelines.</li>
                  <li>All content provided on the platform is for informational purposes only and should not be considered professional advice.</li>
                </ul>
              </section>
              
              <p className="text-sm text-muted-foreground pt-4 border-t border-gray-200">
                For questions about these terms, please contact us at support@leanon.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;
