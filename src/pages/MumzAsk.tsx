
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AskQuestionForm from '@/components/mumzask/AskQuestionForm';
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
  PartyPopper,
  User,
  Clock,
  ChevronRight,
  CheckCircle,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MumzAsk = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [showAskForm, setShowAskForm] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
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
      id: 1,
      question: "How do I manage morning sickness during the first trimester?",
      detail: "I'm 8 weeks pregnant and struggling with severe morning sickness. I've tried ginger tea but it's not helping much. Are there any other natural remedies that worked for you?",
      askedBy: "Emma T.",
      askedAt: "2 days ago",
      answers: 24,
      category: "Pregnancy",
      answersData: [
        {
          id: 1,
          text: "I found that eating small, frequent meals helped a lot with my morning sickness. Try keeping crackers by your bed and eat a few before getting up in the morning. Also, stay hydrated but sip water slowly throughout the day rather than drinking large amounts at once.",
          answeredBy: "Dr. Sarah K.",
          isExpert: true,
          upvotes: 42,
          time: "1 day ago"
        },
        {
          id: 2,
          text: "Acupressure wristbands (like the ones for motion sickness) were a lifesaver for me! You can find them at most pharmacies. Also, vitamin B6 supplements helped me - but check with your doctor before taking any supplements.",
          answeredBy: "Michelle R.",
          isExpert: false,
          upvotes: 28,
          time: "2 days ago"
        }
      ]
    },
    {
      id: 2,
      question: "Can anyone recommend a good nursery in Dubai Marina?",
      detail: "We're moving to Dubai Marina next month and need to find a good nursery for our 3-year-old. Preferably one with outdoor space and a good curriculum. Any recommendations would be appreciated!",
      askedBy: "Olivia M.",
      askedAt: "3 days ago",
      answers: 18,
      category: "Schools/Nursery",
      answersData: [
        {
          id: 1,
          text: "We love Blossom Nursery in Dubai Marina. They have a great outdoor play area and follow the British EYFS curriculum. The staff are incredibly caring and professional. They also offer flexible timings which was really helpful for us.",
          answeredBy: "Jessica W.",
          isExpert: false,
          upvotes: 15,
          time: "2 days ago"
        },
        {
          id: 2,
          text: "Kids Harbor is another excellent option. They have a fantastic program and the teachers are all qualified with early childhood education degrees. My son has been going there for a year and we've been very happy with his progress.",
          answeredBy: "Aisha K.",
          isExpert: false,
          upvotes: 12,
          time: "1 day ago"
        }
      ]
    },
    {
      id: 3,
      question: "Looking for postpartum recovery tips after C-section",
      detail: "I had a C-section two weeks ago and I'm struggling with the recovery. Any tips from mumz who've been through this? Particularly interested in how to manage pain and take care of the incision site.",
      askedBy: "Jessica K.",
      askedAt: "1 week ago",
      answers: 32,
      category: "Postpartum",
      answersData: [
        {
          id: 1,
          text: "Rest as much as possible and don't hesitate to ask for help with household chores and baby care. When getting up from bed, roll to your side first, then use your arms to push yourself up. Use a pillow to support your incision when coughing or laughing. And wear high-waisted underwear to avoid irritating the incision.",
          answeredBy: "Midwife Rachel T.",
          isExpert: true,
          upvotes: 35,
          time: "6 days ago"
        },
        {
          id: 2,
          text: "A postpartum belly band was so helpful for me - it gave support to my core and made moving around much more comfortable. Also, keep the incision clean and dry, and watch for any signs of infection (increased redness, swelling, or discharge).",
          answeredBy: "Lina M.",
          isExpert: false,
          upvotes: 28,
          time: "5 days ago"
        }
      ]
    }
  ];

  const handleAskQuestion = () => {
    setShowAskForm(true);
  };

  const handleCloseAskForm = () => {
    setShowAskForm(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName === selectedCategory ? null : categoryName);
  };

  const toggleExpandQuestion = (id: number) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const handleUpvote = (questionId: number, answerId: number) => {
    toast({
      title: "Upvoted!",
      description: "You found this answer helpful.",
    });
  };
  
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
                Ask questions, get advice, and learn from experienced mumz.
              </p>
            </div>
            
            {/* Filter Categories (moved above search bar) */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {questionCategories.map((category) => (
                <Button 
                  key={category.name} 
                  variant={selectedCategory === category.name ? "default" : "outline"} 
                  size="sm" 
                  className="rounded-full flex items-center"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
            
            <div className="flex flex-col items-center gap-4 max-w-2xl mx-auto mb-16">
              <div className="relative w-full">
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
              
              <Button 
                size="lg" 
                className="rounded-full mt-2 w-full sm:w-auto"
                onClick={handleAskQuestion}
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Ask Mumz
              </Button>
            </div>
          </div>
        </section>
        
        {/* Ask Question Modal */}
        {showAskForm && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold">Ask a Question</h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleCloseAskForm}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <AskQuestionForm 
                  categories={questionCategories} 
                  onClose={handleCloseAskForm} 
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Recent Questions Section */}
        <section className="py-16 px-6 md:px-8 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold">Recent Questions</h2>
              <Button variant="ghost" className="rounded-full">View All</Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {recentQuestions
                .filter(item => !selectedCategory || item.category === selectedCategory)
                .map((item) => (
                <Card 
                  key={item.id} 
                  className={`p-6 bg-white/50 backdrop-blur-sm border-white/20 hover:shadow-md transition-all ${expandedQuestion === item.id ? 'md:col-span-2' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-200">
                      {item.category}
                    </Badge>
                    {expandedQuestion !== item.id && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                        <MessageSquare className="h-3 w-3" />
                        {item.answers} answers
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-medium mb-3">{item.question}</h3>
                  
                  {expandedQuestion === item.id ? (
                    <div className="space-y-6">
                      <div className="bg-background/50 p-4 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-4">{item.detail}</p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center">
                              <User className="h-3 w-3 text-primary" />
                            </div>
                            <span>{item.askedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.askedAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-primary" />
                          <h4 className="font-medium">Answers ({item.answers})</h4>
                        </div>
                        
                        {item.answersData.map((answer) => (
                          <div key={answer.id} className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-sm">{answer.answeredBy}</span>
                                  {answer.isExpert && (
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-200 text-xs">
                                      <CheckCircle className="h-3 w-3 mr-1" /> Expert
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">{answer.time}</span>
                              </div>
                            </div>
                            
                            <p className="text-sm mb-3">{answer.text}</p>
                            
                            <div className="flex justify-between items-center">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-xs flex items-center gap-1"
                                onClick={() => handleUpvote(item.id, answer.id)}
                              >
                                <ThumbsUp className="h-3 w-3" />
                                Helpful ({answer.upvotes})
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => toggleExpandQuestion(item.id)}
                      >
                        Show Less
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center">
                            <User className="h-3 w-3 text-primary" />
                          </div>
                          <span>{item.askedBy}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.askedAt}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center justify-center gap-2"
                        onClick={() => toggleExpandQuestion(item.id)}
                      >
                        Show Answers
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </Card>
              ))}
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
                <div className="bg-orange-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="h-10 w-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-medium mb-4">Expert Verified</h3>
                <p className="text-muted-foreground">
                  Answers from pediatricians, child psychologists, and certified parenting experts.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <ThumbsUp className="h-10 w-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-medium mb-4">Community Approved</h3>
                <p className="text-muted-foreground">
                  Wisdom from thousands of mumz who have been there and done that.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-500/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-orange-500" />
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
