
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HowToJoinSection from '@/components/HowToJoinSection';
import { useNavigate, Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import FeaturedDealsSection from '@/components/mumzsave/FeaturedDealsSection';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DealsHowItWorksDialog from '@/components/mumzdeals/DealsHowItWorksDialog';
import DealsHero from '@/components/mumzdeals/DealsHero';

// Top brands data
const topBrands = [
  {
    id: '1',
    name: 'Bloom Baby',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    bgColor: '#E5F4EB'
  },
  {
    id: '2',
    name: 'TinyTots',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    bgColor: '#FFF5E1'
  },
  {
    id: '3',
    name: 'MotherCare UAE',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    bgColor: '#FFE6E8'
  },
  {
    id: '4',
    name: 'Baby Essentials',
    logo: '/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png',
    bgColor: '#FFF0E1'
  }
];

const MumzDeals = () => {
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

  const handleGetDeal = () => {
    window.open('#', '_blank');
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  const dealCategories = [
    "Baby Gear", "Clothing", "Toys", "Feeding", "Diapers", 
    "Health", "Maternity", "Books", "Home", "Services"
  ];
  
  const featuredDeals = [
    {
      title: "30% Off Babyzen YOYO Stroller",
      brand: "Mumzworld",
      discount: "30%",
      originalPrice: "2,499 AED",
      salePrice: "1,749 AED",
      image: "stroller",
      isExclusive: true
    },
    {
      title: "Buy One Get One Free Baby Clothes",
      brand: "Mothercare",
      discount: "50%",
      originalPrice: "199 AED",
      salePrice: "99 AED",
      image: "clothes",
      isExclusive: false
    },
    {
      title: "Nanit Pro Baby Monitor Bundle",
      brand: "FirstCry",
      discount: "25%",
      originalPrice: "999 AED",
      salePrice: "749 AED",
      image: "monitor",
      isExclusive: true
    }
  ];
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-4 pb-12 px-4">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/save">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mumz Save
            </Link>
          </Button>
          
          <DealsHero />
        </div>
        
        {/* Top Partner Brands Section */}
        <div className="max-w-3xl mx-auto mt-8 mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6 font-playfair">
            Top Partner Brands
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topBrands.map((brand) => (
              <Link to="/brands" key={brand.id}>
                <div 
                  className="bg-white/80 rounded-lg p-4 shadow-sm border border-pastel-yellow/10 hover:shadow-md transition-all flex flex-col items-center justify-center h-32"
                  style={{ backgroundColor: brand.bgColor }}
                >
                  <div className="bg-white/90 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-2 shadow-sm">
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-center">{brand.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Button 
              variant="outline" 
              className="rounded-full border-pastel-yellow/30"
              asChild
            >
              <Link to="/brands">
                View All Partner Brands
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center items-center mt-8">
          <img 
            src="/lovable-uploads/db360cb5-1f27-448e-a198-570b6a599830.png" 
            alt="Discount tag ribbon" 
            className="w-full max-w-2xl h-auto mx-auto object-contain my-0"
            loading="eager"
          />
        </div>
        
        <CategorySection 
          activeTab="deals"
          dealCategories={dealCategories}
          marketplaceCategories={[]}
        />
        
        <FeaturedDealsSection 
          activeTab="deals"
          featuredDeals={featuredDeals}
          featuredItems={[]}
          handleGetDeal={handleGetDeal}
        />
        
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

export default MumzDeals;
