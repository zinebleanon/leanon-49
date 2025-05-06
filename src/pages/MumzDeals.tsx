import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import { ArrowLeft, Search, Star, StarHalf, ThumbsUp, Calendar, MapPin, Bookmark, Share2, BookOpen, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBrands } from '@/hooks/use-brands';
import { contentCategories as allContentCategories } from '@/components/mumzdeals/ContentCategories';
import { useToast } from '@/hooks/use-toast';
import { trackContentInteraction } from '@/utils/track-content-interaction';
import { useAuth } from '@/hooks/use-auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

// Extended content data structure with events and addresses
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
  // Updated content types
  contentType?: 'articles/video' | 'event' | 'curated list';
  eventDate?: string;
  address?: string;
  isSaved?: boolean;
}

const MumzGuideHer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<Record<string, string[]>>({});
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const { brands, isLoading: brandsLoading } = useBrands();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Mock content data with events and lists (formerly locations)
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
      totalRatings: 28,
      contentType: "articles/video"
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
      totalRatings: 45,
      contentType: "articles/video"
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
      totalRatings: 16,
      contentType: "articles/video"
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
      totalRatings: 32,
      contentType: "articles/video"
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
      totalRatings: 42,
      contentType: "articles/video"
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
      totalRatings: 24,
      contentType: "articles/video"
    },
    {
      id: 8,
      title: "Mommy & Me Yoga Class",
      description: "Join our weekly yoga class designed for moms and their little ones. Great for bonding and gentle exercise.",
      author: "Yoga Studio Dubai",
      category: "Emotional, Mental & Physical wellbeing",
      subcategory: "Workout",
      ageGroup: "0-3 Years",
      averageRating: 4.8,
      totalRatings: 15,
      contentType: "event",
      eventDate: "2025-05-20T10:00:00",
      address: "Wellness Center, Jumeirah Beach Road, Dubai"
    },
    {
      id: 9,
      title: "Pediatrician Meet & Greet",
      description: "Come meet our team of pediatricians and get your questions answered in a casual setting.",
      author: "Dubai Children's Medical Center",
      category: "Health Care & Professional support",
      subcategory: "Doctors/Therapist",
      ageGroup: "All Ages",
      averageRating: 4.6,
      totalRatings: 8,
      contentType: "event",
      eventDate: "2025-05-25T16:00:00",
      address: "Dubai Children's Medical Center, Healthcare City, Dubai"
    },
    {
      id: 10,
      title: "Sunshine Daycare Center",
      description: "A nurturing environment with qualified staff providing care for children aged 1-4 years.",
      author: "Sunshine Daycare",
      category: "Childcare & Schooling",
      subcategory: "Nursery",
      ageGroup: "1-4 Years",
      averageRating: 4.9,
      totalRatings: 22,
      contentType: "curated list",
      address: "Palm Jumeirah, Dubai"
    },
    {
      id: 11,
      title: "Tiny Steps Physical Therapy",
      description: "Specialized physical therapy services for infants and toddlers with developmental concerns.",
      author: "Dr. Aisha Ahmad",
      category: "Health Care & Professional support",
      subcategory: "Hospitals/Clinics",
      ageGroup: "0-5 Years",
      averageRating: 5.0,
      totalRatings: 17,
      contentType: "curated list",
      address: "Dubai Healthcare City, Dubai"
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
    // Filter content based on selected category, subcategories, content type, and search keyword
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

    // Filter by content type if selected
    if (selectedContentType) {
      filtered = filtered.filter(item => item.contentType === selectedContentType);
    }

    // Filter by search keyword if present
    if (searchKeyword.trim()) {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(keyword) || 
        item.description.toLowerCase().includes(keyword) || 
        item.author.toLowerCase().includes(keyword) ||
        item.ageGroup.toLowerCase().includes(keyword) ||
        (item.address && item.address.toLowerCase().includes(keyword))
      );
    }
    
    setFilteredContent(filtered);
  }, [selectedCategory, selectedSubcategories, searchKeyword, selectedContentType, allContent]);

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
    setSelectedContentType(null);
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

  // Handle save content
  const handleSaveContent = (contentItem: ContentItem) => {
    if (!user) {
      setIsJoinModalOpen(true);
      return;
    }

    // Update saved status
    setAllContent(prevContent => prevContent.map(item => {
      if (item.id === contentItem.id) {
        return { ...item, isSaved: !item.isSaved };
      }
      return item;
    }));

    // Track this interaction
    trackContentInteraction({
      contentId: contentItem.id,
      contentTitle: contentItem.title,
      interactionType: 'save'
    });

    toast({
      title: contentItem.isSaved ? "Removed from saved items" : "Saved successfully",
      description: contentItem.isSaved ? 
        `"${contentItem.title}" removed from your saved items.` : 
        `"${contentItem.title}" added to your saved items.`,
      duration: 3000,
    });
  };

  // Handle share content
  const handleShareContent = (contentItem: ContentItem) => {
    if (!user) {
      setIsJoinModalOpen(true);
      return;
    }

    // Track this interaction
    trackContentInteraction({
      contentId: contentItem.id,
      contentTitle: contentItem.title,
      interactionType: 'share'
    });

    // In a real app, you'd implement sharing functionality here
    // For now, just show a toast
    toast({
      title: "Sharing options",
      description: `Share "${contentItem.title}" with friends.`,
      duration: 3000,
    });
  };

  // Format date for display
  const formatEventDate = (dateString?: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Handle view details
  const handleViewDetails = (contentItem: ContentItem) => {
    setSelectedContent(contentItem);
    setDetailsDialogOpen(true);
    
    // Track view interaction
    trackContentInteraction({
      contentId: contentItem.id,
      contentTitle: contentItem.title,
      interactionType: 'view'
    });
  };

  // Content type filter buttons
  const contentTypeFilters = [
    { type: null, label: 'All Types' },
    { type: 'articles/video', label: 'Articles/Video' },
    { type: 'event', label: 'Events' },
    { type: 'curated list', label: 'Curated Lists' }
  ];
  
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

              {/* Content Type Filters */}
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Content Type</h3>
                <div className="flex flex-wrap gap-2">
                  {contentTypeFilters.map((filter) => (
                    <Button
                      key={filter.label}
                      variant={selectedContentType === filter.type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedContentType(filter.type)}
                      className="text-xs"
                    >
                      {filter.label}
                    </Button>
                  ))}
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
                    {selectedCategory || "Featured"} {selectedContentType ? `${selectedContentType.charAt(0).toUpperCase() + selectedContentType.slice(1)}` : "Expert Content"}
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
                        <div className="h-48 bg-accent/20 flex items-center justify-center relative">
                          {/* Content type indicator */}
                          <div className="absolute top-2 right-2">
                            {item.contentType === 'event' ? (
                              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">
                                <Calendar className="h-3 w-3 mr-1" />
                                Event
                              </Badge>
                            ) : item.contentType === 'curated list' ? (
                              <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                                <List className="h-3 w-3 mr-1" />
                                Curated List
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                                <BookOpen className="h-3 w-3 mr-1" />
                                Articles/Video
                              </Badge>
                            )}
                          </div>
                          
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
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                          
                          {/* Show event date if it's an event */}
                          {item.contentType === 'event' && item.eventDate && (
                            <div className="flex items-center text-sm text-primary mb-2">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatEventDate(item.eventDate)}</span>
                            </div>
                          )}
                          
                          {/* Show address if available */}
                          {item.address && (
                            <div className="flex items-center text-sm text-muted-foreground mb-2">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="truncate">{item.address}</span>
                            </div>
                          )}
                          
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
                            <div className="flex items-center justify-between mt-2">
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
                                      className={`h-4 w-4 ${item.userRating === rating ? 'fill-amber-400 text-amber-400' : 'text-gray-400'}`} 
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            
                            {/* Action buttons */}
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`text-xs ${item.isSaved ? 'text-primary' : 'text-gray-500'}`}
                                  onClick={() => handleSaveContent(item)}
                                >
                                  <Bookmark className={`h-4 w-4 mr-1 ${item.isSaved ? 'fill-primary text-primary' : ''}`} />
                                  {item.isSaved ? 'Saved' : 'Save'}
                                </Button>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs text-gray-500"
                                  onClick={() => handleShareContent(item)}
                                >
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                              </div>
                              
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary"
                                onClick={() => handleViewDetails(item)}
                              >
                                View Details
                              </Button>
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
      
      {/* Content Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedContent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedContent.title}</DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <Badge className="mb-3">
                  {selectedContent.category} • {selectedContent.subcategory}
                </Badge>
                
                <div className="aspect-video bg-accent/30 rounded-md mb-5 flex items-center justify-center">
                  {/* Placeholder for content image */}
                  <div className="text-primary/40">Content Image</div>
                </div>
                
                <p className="text-muted-foreground mb-4">{selectedContent.description}</p>
                
                {selectedContent.contentType === 'event' && selectedContent.eventDate && (
                  <div className="mb-4 p-3 bg-amber-50 rounded-md flex items-start">
                    <Calendar className="h-5 w-5 text-amber-700 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-amber-700">Event Date & Time</h4>
                      <p>{formatEventDate(selectedContent.eventDate)}</p>
                    </div>
                  </div>
                )}
                
                {selectedContent.address && (
                  <div className="mb-4 p-3 bg-emerald-50 rounded-md flex items-start">
                    <MapPin className="h-5 w-5 text-emerald-700 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-emerald-700">Address</h4>
                      <p>{selectedContent.address}</p>
                      <Button variant="link" className="text-emerald-700 p-0 h-auto text-sm mt-1">
                        Open in Maps
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
                  <div className="flex mr-2">
                    {renderStars(selectedContent.averageRating || 0)}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({selectedContent.totalRatings || 0} {selectedContent.totalRatings === 1 ? 'rating' : 'ratings'})
                  </span>
                  
                  <div className="ml-auto flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSaveContent(selectedContent)}
                      className={`${selectedContent.isSaved ? 'border-primary text-primary' : ''}`}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${selectedContent.isSaved ? 'fill-primary text-primary' : ''}`} />
                      {selectedContent.isSaved ? 'Saved' : 'Save'}
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => handleShareContent(selectedContent)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MumzGuideHer;
