
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToJoinSection from '@/components/HowToJoinSection';
import { useNavigate, Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import SelectHero from '@/components/mumzdeals/SelectHero';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const MumzSelect = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleJoinButtonClick = () => {
    setIsJoinModalOpen(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // Sample article data
  const articles = {
    toys: [
      {
        title: "Best Developmental Toys for Toddlers",
        description: "Discover the top toys that help develop fine motor skills and cognitive abilities.",
        author: "Sarah M.",
        link: "https://example.com/toddler-toys",
        discountCode: "MUMZTOYS20",
        discountAmount: "20% off"
      },
      {
        title: "Eco-Friendly Toys That Last",
        description: "Sustainable toy options that are good for the planet and built to withstand playtime.",
        author: "Jessica K.",
        link: "https://example.com/eco-toys",
        discountCode: "GREENTOY15",
        discountAmount: "15% off"
      }
    ],
    clothing: [
      {
        title: "Breathable Summer Clothes for Kids",
        description: "Keep your little ones cool and comfortable with these breathable fabric options.",
        author: "Aisha N.",
        link: "https://example.com/summer-clothes",
        discountCode: "SUMMER25",
        discountAmount: "25% off"
      },
      {
        title: "Growing with Your Child: Adjustable Clothing",
        description: "Clothing that adapts to your child's growth spurts, saving money and reducing waste.",
        author: "Maria L.",
        link: "https://example.com/adjustable-clothes",
        discountCode: "GROWWITHME",
        discountAmount: "Buy 2 Get 1 Free"
      }
    ],
    services: [
      {
        title: "Best Kid-Friendly Restaurants in UAE",
        description: "Family restaurants with play areas and healthy menu options for children.",
        author: "Fatima H.",
        link: "https://example.com/kid-restaurants",
        discountCode: "FAMILYMEAL",
        discountAmount: "Free kids meal with adult purchase"
      },
      {
        title: "Top-Rated Babysitting Services",
        description: "Reliable and experienced childcare options for when you need a break.",
        author: "Layla M.",
        link: "https://example.com/babysitting",
        discountCode: "FIRSTSIT",
        discountAmount: "50% off first booking"
      }
    ],
    health: [
      {
        title: "Pediatric Dentists: Making Visits Fun",
        description: "Dental practices specializing in making check-ups a positive experience for children.",
        author: "Dr. Noor A.",
        link: "https://example.com/dental-care",
        discountCode: "HAPPYSMILE",
        discountAmount: "Free first check-up"
      },
      {
        title: "Natural Remedies for Common Childhood Ailments",
        description: "Gentle, effective approaches to treating minor illnesses in children.",
        author: "Dana S.",
        link: "https://example.com/natural-remedies",
        discountCode: "NATURAL10",
        discountAmount: "10% off herbal products"
      }
    ]
  };

  const renderArticleCards = (category) => {
    return articles[category].map((article, index) => (
      <Card key={index} className="mb-6">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>By {article.author}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{article.description}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="text-sm p-2 bg-muted rounded-md w-full">
            <span className="font-semibold">Discount Code:</span> {article.discountCode} ({article.discountAmount})
          </div>
          <Button asChild variant="link" className="p-0">
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              Read full article and get discount
            </a>
          </Button>
        </CardFooter>
      </Card>
    ));
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/save">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mumz Save
            </Link>
          </Button>
        </div>
        
        <SelectHero />
        
        <section className="py-8 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="toys" className="w-full">
              <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2">
                <TabsTrigger value="toys">Toys & Games</TabsTrigger>
                <TabsTrigger value="clothing">Clothing</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="health">Health & Wellness</TabsTrigger>
              </TabsList>
              
              <TabsContent value="toys">
                {renderArticleCards('toys')}
              </TabsContent>
              
              <TabsContent value="clothing">
                {renderArticleCards('clothing')}
              </TabsContent>
              
              <TabsContent value="services">
                {renderArticleCards('services')}
              </TabsContent>
              
              <TabsContent value="health">
                {renderArticleCards('health')}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <HowToJoinSection onJoinClick={handleJoinButtonClick} />
      </main>
      
      <Footer />
      
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
      />
    </div>
  );
};

export default MumzSelect;
