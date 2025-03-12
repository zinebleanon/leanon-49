
import { Button } from '@/components/ui/button';
import { Heart, Users, Mail, MapPin, Calendar } from 'lucide-react';

interface HowToJoinSectionProps {
  onJoinClick: () => void;
}

const HowToJoinSection = ({ onJoinClick }: HowToJoinSectionProps) => {
  const steps = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Sign Up",
      description: "Complete our subscription form with your email to join our community."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Connect",
      description: "Get matched with moms in your neighborhood based on your children's age and interests."
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: "Meet Up",
      description: "Join local events, playdates, or coffee meetups with nearby moms in your community."
    },
    {
      icon: <Calendar className="h-6 w-6 text-primary" />,
      title: "Stay Engaged",
      description: "Participate in regular activities and build lasting friendships with other moms."
    }
  ];

  return (
    <section className="py-16 px-6 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            How to Join <span className="text-gradient">Our Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Becoming part of our supportive network of moms is easy. Follow these simple steps to connect with other moms in your neighborhood.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card border rounded-lg p-6 h-full flex flex-col items-center text-center relative z-10 hover:shadow-md transition-shadow">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {index + 1}
                </div>
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4 mt-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-medium mb-2 font-playfair">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-primary/20 translate-y-8 -translate-x-1/2 z-0"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={onJoinClick} 
            variant="warm" 
            className="rounded-full px-6 text-base"
            size="lg"
          >
            <Heart className="mr-2 h-4 w-4" fill="currentColor" />
            Join Our Community
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowToJoinSection;
