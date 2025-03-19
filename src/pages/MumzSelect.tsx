
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
    gear: [
      {
        title: "Essential Baby Gear for New Parents",
        description: "The must-have gear items that make parenthood easier in the first year.",
        author: "Nadia Q.",
        link: "https://example.com/baby-gear",
        discountCode: "MUMZGEAR25",
        discountAmount: "25% off"
      },
      {
        title: "Travel-Friendly Gear for Families on the Go",
        description: "Compact, lightweight gear options that make traveling with children stress-free.",
        author: "Fatima R.",
        link: "https://example.com/travel-gear",
        discountCode: "TRAVELEASE",
        discountAmount: "15% off"
      }
    ],
    clothes: [
      {
        title: "Sustainable Children's Clothing Brands",
        description: "Eco-friendly clothing options that are gentle on your child's skin and the planet.",
        author: "Aisha N.",
        link: "https://example.com/sustainable-clothes",
        discountCode: "ECOKIDS20",
        discountAmount: "20% off"
      },
      {
        title: "Season-Transitional Wardrobe Essentials",
        description: "Versatile clothing pieces that work year-round in the UAE climate.",
        author: "Layla M.",
        link: "https://example.com/transitional-wardrobe",
        discountCode: "ALLYEAR15",
        discountAmount: "15% off + free shipping"
      }
    ],
    bedroom: [
      {
        title: "Creating a Montessori-Inspired Bedroom",
        description: "How to design a bedroom that encourages independence and learning through play.",
        author: "Sara T.",
        link: "https://example.com/montessori-bedroom",
        discountCode: "MONTESSORI10",
        discountAmount: "10% off furniture"
      },
      {
        title: "Sleep Solutions for Every Age",
        description: "Age-appropriate beds, mattresses, and sleep accessories for better rest.",
        author: "Reem J.",
        link: "https://example.com/sleep-solutions",
        discountCode: "SWEETDREAMS",
        discountAmount: "Buy a mattress, get sheets free"
      }
    ],
    feeding: [
      {
        title: "Best BPA-Free Feeding Essentials",
        description: "Safe, non-toxic feeding products from bottles to first utensils.",
        author: "Dr. Hala M.",
        link: "https://example.com/bpa-free",
        discountCode: "SAFEFEED",
        discountAmount: "25% off your first order"
      },
      {
        title: "Meal Prep Made Easy for Busy Parents",
        description: "Time-saving feeding products and storage solutions for homemade baby food.",
        author: "Maya K.",
        link: "https://example.com/meal-prep",
        discountCode: "MEALPLAN",
        discountAmount: "Free container with purchase"
      }
    ],
    bath: [
      {
        title: "Gentle Bath Products for Sensitive Skin",
        description: "Hypoallergenic bath essentials that protect your baby's delicate skin.",
        author: "Dr. Noor A.",
        link: "https://example.com/sensitive-skin",
        discountCode: "GENTLEBATH",
        discountAmount: "Buy 2 Get 1 Free"
      },
      {
        title: "Bath Time Fun: Educational Toys that Make Bathing Enjoyable",
        description: "Toys that turn bath time into learning time while keeping it fun.",
        author: "Zainab L.",
        link: "https://example.com/bath-toys",
        discountCode: "SPLASHLEARN",
        discountAmount: "20% off bath toy sets"
      }
    ],
    safety: [
      {
        title: "Home Safety Essentials for Growing Families",
        description: "Childproofing products that keep curious minds safe as they explore.",
        author: "Leila S.",
        link: "https://example.com/home-safety",
        discountCode: "SAFEHOME",
        discountAmount: "15% off safety bundles"
      },
      {
        title: "Car Safety: Choosing the Right Car Seat",
        description: "Expert guidance on selecting age-appropriate car seats and proper installation.",
        author: "Omar H.",
        link: "https://example.com/car-seats",
        discountCode: "SAFERIDE",
        discountAmount: "Free installation service"
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
            <Tabs defaultValue="gear" className="w-full">
              <TabsList className="mb-6 grid grid-cols-3 md:grid-cols-6 gap-2">
                <TabsTrigger value="gear">Gear</TabsTrigger>
                <TabsTrigger value="clothes">Clothes</TabsTrigger>
                <TabsTrigger value="bedroom">Bedroom</TabsTrigger>
                <TabsTrigger value="feeding">Feeding</TabsTrigger>
                <TabsTrigger value="bath">Bath</TabsTrigger>
                <TabsTrigger value="safety">Safety</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gear">
                {renderArticleCards('gear')}
              </TabsContent>
              
              <TabsContent value="clothes">
                {renderArticleCards('clothes')}
              </TabsContent>
              
              <TabsContent value="bedroom">
                {renderArticleCards('bedroom')}
              </TabsContent>
              
              <TabsContent value="feeding">
                {renderArticleCards('feeding')}
              </TabsContent>
              
              <TabsContent value="bath">
                {renderArticleCards('bath')}
              </TabsContent>
              
              <TabsContent value="safety">
                {renderArticleCards('safety')}
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
