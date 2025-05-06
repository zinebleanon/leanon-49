import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBrands } from '@/hooks/use-brands';
import { contentCategories as allContentCategories } from '@/components/mumzdeals/ContentCategories';

// Mock content data structure
interface ContentItem {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
  subcategory: string;
  ageGroup: string;
}

const MumzGuideHer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>({});
  const { brands, isLoading: brandsLoading } = useBrands();
  
  // Mock content data
  const [allContent] = useState<ContentItem[]>([
    {
      id: 1,
      title: "Understanding Your Toddler's Emotional Development",
      description: "Expert tips to help navigate the emotional rollercoaster of toddlerhood with patience and understanding.",
      author: "Dr. Sarah Johnson",
      category: "Parenting Guidance",
      subcategory: "Emotional & Social development",
      ageGroup: "2-3 Years"
    },
    {
      id: 2,
      title: "Sleep Training Methods for Infants",
      description: "Different approaches to help your baby sleep through the night, with pros and cons of each method.",
      author: "Dr. Michael Chen",
      category: "Health Care & Professional support",
      subcategory: "Sleep",
      ageGroup: "0-1 Year"
    },
    {
      id: 3,
      title: "Choosing the Right Preschool",
      description: "Key factors to consider when selecting a preschool that fits your child's personality and learning style.",
      author: "Emma Rodriguez",
      category: "Childcare & Schooling",
      subcategory: "School",
      ageGroup: "3-4 Years"
    },
    {
      id: 4,
      title: "Postpartum Recovery: Physical and Mental",
      description: "A holistic approach to bouncing back after childbirth, addressing both body and mind.",
      author: "Dr. Lisa Patel",
      category: "Emotional, Mental & Physical wellbeing",
      subcategory: "Postpartum",
      ageGroup: "New Moms"
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
    // Filter content based on selected category and subcategories
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
    
    setFilteredContent(filtered);
  }, [selectedCategory, selectedSubcategories, allContent]);

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
                      onClick={() => {
                        setSelectedCategory(null);
                        setSelectedSubcategories({});
                      }}
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
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">By {item.author}</span>
                            <Button variant="ghost" size="sm" className="text-primary">Read More</Button>
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
