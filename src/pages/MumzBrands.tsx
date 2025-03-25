
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import BrandsHero from '@/components/mumzbrands/BrandsHero';
import BrandFilterSection from '@/components/mumzbrands/BrandFilterSection';
import BrandsGrid from '@/components/mumzbrands/BrandsGrid';
import CategorySection from '@/components/mumzsave/CategorySection';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Brand {
  id: string;
  name: string;
  logo: string;
  category: 'local' | 'international';
  description: string;
  website: string;
  discountCode: string;
  discountValue: string;
  bgColor: string;
}

const MumzBrands = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [brandType, setBrandType] = useState<'all' | 'local' | 'international'>('all');
  const [brandCategory, setBrandCategory] = useState('All Categories');
  const navigate = useNavigate();
  
  useEffect(() => {
    setIsVisible(true);
    // Increase the loading time slightly to ensure all content is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const brands: Brand[] = [
    {
      id: '1',
      name: 'Pampers',
      logo: '/lovable-uploads/8d090dc9-1dec-4d92-a60b-f0b63c73e375.png',
      category: 'international',
      description: 'Pampers is a well-known brand of baby and toddler products marketed by Procter & Gamble. They offer diapers, training pants, and baby wipes designed for babies and toddlers of various ages and sizes.',
      website: 'https://www.pampers.com',
      discountCode: 'LEANON15',
      discountValue: '15% off all products',
      bgColor: '#f2f7fd'
    },
    {
      id: '2',
      name: 'Mothercare',
      logo: '/lovable-uploads/aad47488-6aaf-41bc-8d54-c6163b5cc62c.png',
      category: 'international',
      description: 'Mothercare is a British retailer that specializes in products for expectant mothers and children up to 8 years old. They provide a wide range of maternity and children\'s clothing, furniture, and accessories.',
      website: 'https://www.mothercare.com',
      discountCode: 'LEANON20',
      discountValue: '20% off first purchase',
      bgColor: '#f8f4ff'
    },
    {
      id: '3',
      name: 'Mumzworld',
      logo: '/lovable-uploads/1d9135c7-232d-4e08-8e9c-1c4953d0b1db.png',
      category: 'local',
      description: 'Mumzworld is the Middle East\'s leading e-commerce platform for all things mother, baby, and child. They offer everything from diapers to toys, feeding essentials, car seats, strollers, and more.',
      website: 'https://www.mumzworld.com',
      discountCode: 'LEANON10',
      discountValue: '10% off entire order',
      bgColor: '#fff5f5'
    },
    {
      id: '4',
      name: 'Babyshop',
      logo: '/lovable-uploads/9af559f0-e7cd-43a3-a625-8c67793f989b.png',
      category: 'local',
      description: 'Babyshop is a premier children\'s retailer offering a wide range of products including clothing, toys, nursery items, and accessories for children from newborn to 16 years old.',
      website: 'https://www.babyshopstores.com',
      discountCode: 'LEANON25',
      discountValue: '25% off selected items',
      bgColor: '#f0f9ff'
    },
    {
      id: '5',
      name: 'FirstCry',
      logo: '/lovable-uploads/bb4acf49-8869-49f7-9464-6e2f7d244c0e.png',
      category: 'international',
      description: 'FirstCry is Asia\'s largest online store for baby and kids products. They offer a comprehensive range including diapers, toys, clothes, footwear, and more for children from newborn to teens.',
      website: 'https://www.firstcry.com',
      discountCode: 'LEANON12',
      discountValue: '12% off on orders above 200 AED',
      bgColor: '#fffbea'
    },
    {
      id: '6',
      name: 'OshKosh',
      logo: '/lovable-uploads/cff1d041-e202-4a39-8f31-c3fea11a1405.png',
      category: 'international',
      description: 'OshKosh B\'gosh is an American children\'s apparel company known for its denim overalls, but now offering a complete line of clothing for children from newborn to 14 years old.',
      website: 'https://www.oshkosh.com',
      discountCode: 'LEANON30',
      discountValue: '30% off your purchase',
      bgColor: '#f0fff4'
    }
  ];
  
  useEffect(() => {
    // Filter brands based on selected category and type
    let filtered = [...brands];
    
    if (brandType !== 'all') {
      filtered = filtered.filter(brand => brand.category === brandType);
    }
    
    if (brandCategory !== 'All Categories') {
      // This is a simplified example - in a real app, you'd have category data in each brand
      // This filter would be more specific
    }
    
    setFilteredBrands(filtered);
  }, [brandType, brandCategory]);
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const dealCategories = ['Baby', 'Toddler', 'Kids', 'Mom', 'Home', 'Toys', 'Education'];
  const marketplaceCategories = ['Clothing', 'Strollers', 'Car Seats', 'Toys', 'Books'];
  
  return (
    <div className="min-h-screen bg-[#B8CEC2]/30">
      <Navbar />
      
      <main className="pt-12 md:pt-16 pb-6 md:pb-10">
        {/* Hero Section */}
        <BrandsHero />
        
        {/* Centered image section - with optimized size */}
        <div className="flex justify-center items-center bg-[#B8CEC2] px-4 md:px-8 py-1">
          <img 
            src="/lovable-uploads/87341e97-733d-45f5-a260-432f58c283b8.png" 
            alt="Premium brands" 
            className="w-full max-w-2xl h-auto mx-auto object-contain"
            loading="eager"
          />
        </div>
        
        <CategorySection 
          activeTab="deals"
          dealCategories={dealCategories}
          marketplaceCategories={marketplaceCategories}
        />
        
        <BrandFilterSection 
          onCategoryChange={setBrandCategory}
          onTypeChange={setBrandType}
        />
        
        <section className="py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <BrandsGrid brands={filteredBrands} />
          </div>
        </section>
      </main>
      
      <Footer />
      
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
      />
    </div>
  );
};

export default MumzBrands;
