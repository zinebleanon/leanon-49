
import { Button } from '@/components/ui/button';
import { Heart, Users, Mail, MapPin, Calendar } from 'lucide-react';

interface HowToJoinSectionProps {
  onJoinClick: () => void;
}

const HowToJoinSection = ({ onJoinClick }: HowToJoinSectionProps) => {
  const steps = [
    {
      icon: <Mail className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
      title: "Sign Up",
      description: "Complete our subscription form with your email to join our community."
    },
    {
      icon: <Users className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
      title: "Connect",
      description: "Get matched with moms in your neighborhood based on your children's age and interests."
    },
    {
      icon: <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
      title: "Meet Up",
      description: "Join local events, playdates, or coffee meetups with nearby moms in your community."
    },
    {
      icon: <Calendar className="h-5 w-5 md:h-6 md:w-6 text-primary" />,
      title: "Stay Engaged",
      description: "Participate in regular activities and build lasting friendships with other moms."
    }
  ];

  return (
    <section className="py-10 md:py-16 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 font-playfair">
            How to Join <span className="text-gradient">Our Community</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Becoming part of our supportive network of moms is easy. Follow these simple steps to connect with other moms in your neighborhood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative p-4 md:p-6 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 border shadow-sm hover:shadow-md transition-all">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm md:text-base">
                {index + 1}
              </div>
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-4 mt-3 md:mt-4">
                {step.icon}
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-1 md:mb-2 font-playfair">{step.title}</h3>
              <p className="text-sm md:text-base text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={onJoinClick} 
            variant="warm" 
            size="lg"
            className="rounded-full px-6 w-full sm:w-auto"
          >
            <Heart className="mr-2 h-4 w-4" fill="currentColor" />
            Join & Lean On the Community
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowToJoinSection;
