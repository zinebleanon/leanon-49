import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import { ArrowLeft, Search, Star, StarHalf, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBrands } from '@/hooks/use-brands';
import { contentCategories as allContentCategories } from '@/components/mumzdeals/ContentCategories';
import { useToast } from '@/hooks/use-toast';
import { trackContentInteraction } from '@/utils/track-content-interaction';
import { useAuth } from '@/hooks/use-auth';

// Mock content data structure
interface ContentItem {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
  subcategory: string;
  ageGroup: string;
  averageRating?: number;
  userRating?: number;
  totalRatings?: number;
}

const MumzGuideHer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>({});
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const { brands, isLoading: brandsLoading } = useBrands();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Mock content data
  const [allContent, setAllContent] = useState<ContentItem[]>([
    {
      id: 1,
      title: "Understanding Your Toddler's Emotional Development",
      description: "Expert tips to help navigate the emotional rollercoaster of toddlerhood with patience and understanding.",
      author: "Dr. Sarah Johnson",
      category: "Parenting Guidance",
      subcategory: "Emotional & Social development",
      ageGroup: "2-3 Years",
      averageRating: 4.5,
      totalRatings: 28
    },
    {
      id: 2,
      title: "Sleep Training Methods for Infants",
      description: "Different approaches to help your baby sleep through the night, with pros and cons of each method.",
      author: "Dr. Michael Chen",
      category: "Health Care & Professional support",
      subcategory: "Sleep",
      ageGroup: "0-1 Year",
      averageRating: 4.2,
      totalRatings: 45
    },
    {
      id: 3,
      title: "Choosing the Right Preschool",
      description: "Key factors to consider when selecting a preschool that fits your child's personality and learning style.",
      author: "Emma Rodriguez",
      category: "Childcare & Schooling",
      subcategory: "School",
      ageGroup: "3-4 Years",
      averageRating: 4.8,
      totalRatings: 16
    },
    {
      id: 4,
      title: "Postpartum Recovery: Physical and Mental",
      description: "A holistic approach to bouncing back after childbirth, addressing both body and mind.",
      author: "Dr. Lisa Patel",
      category: "Emotional, Mental & Physical wellbeing",
      subcategory: "Postpartum",
      ageGroup: "New Moms",
      averageRating: 4.7,
      totalRatings: 32
    },
    {
      id: 5,
      title: "Newborn Essentials Checklist",
      description: "Complete guide to everything you'll need for your newborn's first three months.",
      author: "Dr. Rachel Green",
      category: "Kids Essentials Checklist",
      subcategory: "Newborn Essentials",
      ageGroup: "0-3 Months",
      averageRating: 4.9,
      totalRatings: 42
    },
    {
      id: 7,
      title: "Travel Essentials for Toddlers",
      description: "Must-have items to make traveling with your toddler easier and more enjoyable.",
      author: "James Wilson",
      category: "Kids Essentials Checklist",
      subcategory: "Travel Items",
      ageGroup: "1-4 Years",
      averageRating: 4.3,
      totalRatings: 24
    }
  ]);
  
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>(allContent);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter content based on selected category, subcategories, and search keyword
    let filtered = [...allContent];
    
    // If we have a selected category, filter by it
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Filter by selected subcategories across all categories
    if (Object.keys(selectedSubcategories).length > 0) {
      filtered = filtered.filter(item => {
        // If this category has no selected subcategories, keep the item
        if (!selectedSubcategories[item.category]?.length) return true;
        
        // Otherwise, check if the item's subcategory is in the selected subcategories
        return selectedSubcategories[item.category].includes(item.subcategory);
      });
    }

    // Filter by search keyword if present
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) || 
        item.description.toLowerCase().includes(keyword) || 
        item.author.toLowerCase().includes(keyword) ||
        item.ageGroup.toLowerCase().includes(keyword)
      );
    }
    
    setFilteredContent(filtered);
  }, [selectedCategory, selectedSubcategories, searchKeyword, allContent]);

  if (isLoading || brandsLoading) {
    return <LoadingSpinner />;
  }
  
  // Content categories names
  const contentCategoryNames = allContentCategories.map(cat => cat.name);
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  
  // Handle subcategory selection
  const handleSubcategorySelect = (category: string, subcategory: string, checked: boolean) => {
    setSelectedSubcategories(prev => {
      const updatedSubcategories = { ...prev };
      
      if (!updatedSubcategories[category]) {
        updatedSubcategories[category] = [];
      }
      
      if (checked) {
        // Add the subcategory if it's not already in the list
        if (!updatedSubcategories[category].includes(subcategory)) {
          updatedSubcategories[category] = [...updatedSubcategories[category], subcategory];
        }
      } else {
        // Remove the subcategory
        updatedSubcategories[category] = updatedSubcategories[category].filter(sub => sub !== subcategory);
        
        // Remove the category key if there are no subcategories left
        if (updatedSubcategories[category].length === 0) {
          delete updatedSubcategories[category];
        }
      }
      
      return updatedSubcategories;
    });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedSubcategories({});
    setSearchKeyword('');
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-amber-400 text-amber-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-amber-400 text-amber-400" />);
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };

  // Handle rating
  const handleRating = (contentItem: ContentItem, newRating: number) => {
    if (!user) {
      setIsJoinModalOpen(true);
      return;
    }

    // Update local state with user's rating
    setAllContent(prevContent => prevContent.map(item => {
      if (item.id === contentItem.id) {
        // Calculate new average based on existing ratings + new rating
        const totalRatings = (item.totalRatings || 0) + (item.userRating ? 0 : 1);
        const oldRatingSum = (item.averageRating || 0) * (item.totalRatings || 0);
        const newRatingSum = oldRatingSum - (item.userRating || 0) + newRating;
        const newAverage = newRatingSum / totalRatings;

        return {
          ...item,
          userRating: newRating,
          averageRating: newAverage,
          totalRatings
        };
      }
      return item;
    }));

    // Track this interaction
    trackContentInteraction({
      contentId: contentItem.id,
      contentTitle: contentItem.title,
      rating: newRating,
      interactionType: 'rate'
    });

    toast({
      title: "Rating submitted",
      description: `You rated "${contentItem.title}" ${newRating} stars.`,
      duration: 3000,
    });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <div className="max-w-7xl mx-auto pt-8 pb-12 px-4 md:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/save">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mumz Save
            </Link>
          </Button>
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-1">
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="search"
                    placeholder="Search by keyword..."
                    className="pl-10"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <CategorySection 
                activeTab="content"
                contentCategories={contentCategoryNames}
                onCategorySelect={handleCategorySelect}
                onSubcategorySelect={handleSubcategorySelect}
                selectedSubcategories={selectedSubcategories}
              />
            </div>
            
            <div className="md:col-span-2">
              <div className="mt-0 bg-card rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold font-playfair">
                    {selectedCategory || "Featured"} Expert Content
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {filteredContent.length} {filteredContent.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                
                {filteredContent.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No content matches your current filters</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={clearAllFilters}
                    >
                      Clear all filters
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredContent.map((item) => (
                      <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white/70">
                        <div className="h-48 bg-accent/20 flex items-center justify-center">
                          {/* Placeholder for content images */}
                          <div className="h-12 w-12 text-primary/60 flex items-center justify-center">
                            <span className="text-lg font-medium text-primary/60">Content</span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex flex-wrap gap-1 mb-2">
                            <span className="text-xs text-orange-500 font-medium">{item.category}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 font-medium">{item.subcategory}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500 font-medium">{item.ageGroup}</span>
                          </div>
                          <h3 className="text-lg font-medium my-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                          
                          <div className="flex flex-col space-y-3">
                            {/* Rating display */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="flex mr-1">
                                  {renderStars(item.averageRating || 0)}
                                </div>
                                <span className="text-xs text-gray-500">
                                  ({item.totalRatings || 0} {item.totalRatings === 1 ? 'rating' : 'ratings'})
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">By {item.author}</span>
                            </div>
                            
                            {/* User rating buttons */}
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                  <button 
                                    key={rating} 
                                    onClick={() => handleRating(item, rating)}
                                    className={`p-1 rounded-full hover:bg-gray-100 ${item.userRating === rating ? 'bg-gray-100' : ''}`}
                                    aria-label={`Rate ${rating} stars`}
                                    title={`Rate ${rating} stars`}
                                  >
                                    <Star 
                                      className={`h-5 w-5 ${item.userRating === rating ? 'fill-amber-400 text-amber-400' : 'text-gray-400'}`} 
                                    />
                                  </button>
                                ))}
                              </div>
                              <Button variant="ghost" size="sm" className="text-primary">Read More</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onOpenChange={setIsJoinModalOpen}
      />
    </div>
  );
};

export default MumzGuideHer;
