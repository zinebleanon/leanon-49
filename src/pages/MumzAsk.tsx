
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  HelpCircle, 
  MessageSquare, 
  ThumbsUp,
  UserCheck,
  Award,
  Baby,
  Heart,
  HeartPulse,
  GraduationCap,
  Users,
  PartyPopper
} from 'lucide-react';

const MumzAsk = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading state for smooth intro
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  const questionCategories = [
    { name: "Pregnancy", icon: <Baby className="h-4 w-4 mr-1" /> },
    { name: "Postpartum", icon: <Heart className="h-4 w-4 mr-1" /> },
    { name: "Health", icon: <HeartPulse className="h-4 w-4 mr-1" /> },
    { name: "Schools/Nursery", icon: <GraduationCap className="h-4 w-4 mr-1" /> },
    { name: "Nannys", icon: <Users className="h-4 w-4 mr-1" /> },
    { name: "Entertainment & Birthdays", icon: <PartyPopper className="h-4 w-4 mr-1" /> }
  ];
  
  const recentQuestions = [
    {
      question: "How do I manage morning sickness during the first trimester?",
      askedBy: "Emma T.",
      answers: 24,
      category: "Pregnancy"
    },
    {
      question: "Can anyone recommend a good nursery in Dubai Marina?",
      askedBy: "Olivia M.",
      answers: 18,
      category: "Schools/Nursery"
    },
    {
      question: "Looking for postpartum recovery tips after C-section",
      askedBy: "Jessica K.",
      answers: 32,
      category: "Postpartum"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get Answers with <span className="text-gradient">Mumz Ask</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Ask questions, get advice, and learn from experienced moms and parenting experts.
                No question is too big or small.
              </p>
            </div>
            
            <div className="relative max-w-2xl mx-auto mb-16">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="search"
                placeholder="Search for questions or topics..."
                className="w-full py-4 pl-12 pr-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="absolute right-1 top-1 rounded-full">
                Search
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {questionCategories.map((category) => (
                <Button 
                  key={category.name} 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full flex items-center"
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Recent Questions Section */}
        <section className="py-16 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold">Recent Questions</h2>
              <Button variant="ghost" className="rounded-full">View All</Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {recentQuestions.map((item, index) => (
                <Card key={index} className="p-6 bg-white/50 backdrop-blur-sm border-white/20 hover:shadow-md transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-pink-500/10 text-pink-700 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium mb-4">{item.question}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Asked by {item.askedBy}</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {item.answers} answers
                    </span>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button size="lg" className="rounded-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Ask a Question
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-12">
              Why Mumz Ask?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-pink-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="h-10 w-10 text-pink-500" />
                </div>
                <h3 className="text-xl font-medium mb-4">Expert Verified</h3>
                <p className="text-muted-foreground">
                  Answers from pediatricians, child psychologists, and certified parenting experts.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-pink-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <ThumbsUp className="h-10 w-10 text-pink-500" />
                </div>
                <h3 className="text-xl font-medium mb-4">Community Approved</h3>
                <p className="text-muted-foreground">
                  Wisdom from thousands of moms who have been there and done that.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-pink-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-pink-500" />
                </div>
                <h3 className="text-xl font-medium mb-4">Quality Answers</h3>
                <p className="text-muted-foreground">
                  Helpful, respectful responses that address your specific concerns.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MumzAsk;
