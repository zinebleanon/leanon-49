
import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import JoinCommunityModal from '@/components/JoinCommunityModal';
import LoadingSpinner from '@/components/mumzsave/LoadingSpinner';
import CategorySection from '@/components/mumzsave/CategorySection';
import { 
  ArrowLeft, Search, Star, StarHalf, ThumbsUp, Calendar, MapPin, 
  Bookmark, Share2, BookOpen, List, Filter, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBrands } from '@/hooks/use-brands';
import { contentCategories as allContentCategories } from '@/components/mumzdeals/ContentCategories';
import { useToast } from '@/hooks/use-toast';
import { trackContentInteraction } from '@/utils/track-content-interaction';
import { useAuth } from '@/hooks/use-auth';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectHero from '@/components/mumzdeals/SelectHero';
import DealsHero from '@/components/mumzdeals/DealsHero';

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
  contentType?: 'articles/video' | 'event' | 'list';
  eventDate?: string;
  address?: string;
  isSaved?: boolean;
  imageUrl?: string; // New property for images
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
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("featured");
  const { brands, isLoading: brandsLoading } = useBrands();
  const { toast } = useToast();
  const { user } = useAuth();
  const detailsDialogRef = useRef<HTMLDivElement>(null);
  
  // Mock content data with events and lists
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
      contentType: "articles/video",
      imageUrl: "/lovable-uploads/00a4dae1-217d-4bd7-ac01-2cd9c6427bb8.png"
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
      contentType: "articles/video",
      imageUrl: "/lovable-uploads/929eee58-aa94-492d-be02-03e86a1248e2.png"
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
      contentType: "articles/video",
      imageUrl: "/lovable-uploads/f13b9daf-130a-4b25-971f-a1ae0385f800.png"
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
      address: "Wellness Center, Jumeirah Beach Road, Dubai",
      imageUrl: "/lovable-uploads/db360cb5-1f27-448e-a198-570b6a599830.png"
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
      contentType: "list",
      address: "Palm Jumeirah, Dubai",
      imageUrl: "/lovable-uploads/3d91f1e7-6ad1-4ec9-abda-346a1a9dc39d.png"
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
      contentType: "list",
      address: "Dubai Healthcare City, Dubai"
    }
  ]);
  
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>(allContent);
  
  // Get top rated items
  const topRatedContent = [...allContent]
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 4);
  
  // Get saved items
  const savedContent = allContent.filter(item => item.isSaved);
  
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

  // Keyboard navigation for dialog
  const handleDialogKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!selectedContent) return;
    
    // Escape key to close dialog
    if (e.key === 'Escape') {
      setDetailsDialogOpen(false);
      return;
    }
    
    // Arrow left/right to navigate between items
    const currentIndex = allContent.findIndex(item => item.id === selectedContent.id);
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      setSelectedContent(allContent[currentIndex - 1]);
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && currentIndex < allContent.length - 1) {
      setSelectedContent(allContent[currentIndex + 1]);
      e.preventDefault();
    }
  };

  // Focus on dialog when opened
  useEffect(() => {
    if (detailsDialogOpen && detailsDialogRef.current) {
      detailsDialogRef.current.focus();
    }
  }, [detailsDialogOpen]);

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
    { type: 'list', label: 'Lists' }
  ];
  
  // Get content item type icon
  const getContentTypeIcon = (contentType: string = 'articles/video') => {
    switch(contentType) {
      case 'event':
        return <Calendar className="h-4 w-4 mr-1" />;
      case 'list':
        return <List className="h-4 w-4 mr-1" />;
      default:
        return <BookOpen className="h-4 w-4 mr-1" />;
    }
  };
  
  // Get content type badge style
  const getContentTypeBadgeStyle = (contentType: string = 'articles/video') => {
    switch(contentType) {
      case 'event':
        return "bg-amber-100 text-amber-700 border-amber-200";
      case 'list':
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  // Function to render content card
  const renderContentCard = (item: ContentItem) => (
    <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all bg-white/70">
      <div className="h-48 bg-accent/10 relative overflow-hidden group">
        {/* Content type indicator */}
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="outline" className={getContentTypeBadgeStyle(item.contentType)}>
            {getContentTypeIcon(item.contentType)}
            {item.contentType === 'articles/video' ? 'Article/Video' : 
             item.contentType === 'event' ? 'Event' : 'List'}
          </Badge>
        </div>
        
        {/* Content image */}
        <div className="h-full w-full">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="text-primary/40 flex flex-col items-center justify-center">
                {getContentTypeIcon(item.contentType)}
                <span className="text-lg font-medium">{item.contentType}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Quick action overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            variant="default" 
            size="sm" 
            className="transform translate-y-4 group-hover:translate-y-0 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(item);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
      
      <div 
        className="p-4 cursor-pointer" 
        onClick={() => handleViewDetails(item)}
      >
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="text-xs text-orange-500 font-medium">{item.category}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 font-medium">{item.subcategory}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500 font-medium">{item.ageGroup}</span>
        </div>
        <h3 className="text-lg font-medium my-2 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
        
        {/* Show event date if it's an event */}
        {item.contentType === 'event' && item.eventDate && (
          <div className="flex items-center text-sm text-primary mb-2">
            <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="truncate">{formatEventDate(item.eventDate)}</span>
          </div>
        )}
        
        {/* Show address if available */}
        {item.address && (
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
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
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRating(item, rating);
                  }}
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveContent(item);
                }}
              >
                <Bookmark className={`h-4 w-4 mr-1 ${item.isSaved ? 'fill-primary text-primary' : ''}`} />
                {item.isSaved ? 'Saved' : 'Save'}
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-500"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShareContent(item);
                }}
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile filter toggle
  const toggleMobileFilter = () => {
    setIsFilterMobileOpen(!isFilterMobileOpen);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Button variant="ghost" asChild className="mb-4 mt-6">
            <Link to="/save">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mumz Save
            </Link>
          </Button>
          
          {/* Hero Section */}
          <SelectHero />
          
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {/* Filters - Desktop */}
            <div className="md:col-span-1 hidden md:block">
              <div className="sticky top-24">
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
                
                {(selectedCategory || selectedContentType || searchKeyword || Object.keys(selectedSubcategories).length > 0) && (
                  <Button 
                    variant="outline" 
                    className="mt-4 w-full"
                    onClick={clearAllFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear all filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="md:col-span-2">
              {/* Mobile Search and Filter Controls */}
              <div className="md:hidden mb-4 flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="search"
                    placeholder="Search by keyword..."
                    className="pl-10"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                  />
                </div>
                <Button 
                  variant={isFilterMobileOpen ? "default" : "outline"} 
                  size="icon"
                  onClick={toggleMobileFilter}
                  className="flex-shrink-0"
                  aria-label="Toggle filters"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Mobile Filters Panel */}
              {isFilterMobileOpen && (
                <div className="md:hidden mb-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Filters</h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleMobileFilter}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Content Type Filters */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Content Type</h4>
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
                  
                  {/* Categories */}
                  <CategorySection 
                    activeTab="content"
                    contentCategories={contentCategoryNames}
                    onCategorySelect={handleCategorySelect}
                    onSubcategorySelect={handleSubcategorySelect}
                    selectedSubcategories={selectedSubcategories}
                  />
                  
                  {(selectedCategory || selectedContentType || searchKeyword || Object.keys(selectedSubcategories).length > 0) && (
                    <Button 
                      variant="outline" 
                      className="mt-3 w-full"
                      onClick={() => {
                        clearAllFilters();
                        toggleMobileFilter();
                      }}
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              )}
              
              {/* Content Tabs */}
              <div className="mt-0 bg-card rounded-lg shadow-sm p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <div className="flex items-center justify-between mb-6">
                    <TabsList>
                      <TabsTrigger value="featured">Featured</TabsTrigger>
                      <TabsTrigger value="all">All Content</TabsTrigger>
                      {savedContent.length > 0 && (
                        <TabsTrigger value="saved">Saved</TabsTrigger>
                      )}
                      <TabsTrigger value="top">Top Rated</TabsTrigger>
                    </TabsList>
                    
                    <span className="text-sm text-muted-foreground">
                      {activeTab === 'all' 
                        ? `${filteredContent.length} ${filteredContent.length === 1 ? 'item' : 'items'}`
                        : activeTab === 'saved'
                          ? `${savedContent.length} saved ${savedContent.length === 1 ? 'item' : 'items'}`
                          : activeTab === 'top'
                            ? 'Top 4 rated items'
                            : 'Featured content'
                      }
                    </span>
                  </div>
                  
                  <TabsContent value="featured">
                    {/* Featured content can be different from just filtered content */}
                    {allContent.slice(0, 6).length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No featured content available</p>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-6">
                        {allContent.slice(0, 6).map(renderContentCard)}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="all">
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
                        {filteredContent.map(renderContentCard)}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="saved">
                    {savedContent.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">You haven't saved any content yet</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => setActiveTab('all')}
                        >
                          Explore all content
                        </Button>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-6">
                        {savedContent.map(renderContentCard)}
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="top">
                    <div className="grid md:grid-cols-2 gap-6">
                      {topRatedContent.map(renderContentCard)}
                    </div>
                  </TabsContent>
                </Tabs>
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
        <DialogContent 
          className="max-w-3xl max-h-[90vh] overflow-y-auto"
          ref={detailsDialogRef}
          onKeyDown={handleDialogKeyDown}
          tabIndex={0}
        >
          {selectedContent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedContent.title}</DialogTitle>
                <DialogDescription>
                  <Badge className="mt-2">
                    {selectedContent.category} • {selectedContent.subcategory}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4">
                <div className="aspect-video bg-accent/10 rounded-md mb-5 relative overflow-hidden">
                  {selectedContent.imageUrl ? (
                    <img 
                      src={selectedContent.imageUrl} 
                      alt={selectedContent.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="text-primary/40 flex flex-col items-center justify-center">
                        {getContentTypeIcon(selectedContent.contentType)}
                        <span className="text-lg font-medium">{selectedContent.contentType}</span>
                      </div>
                    </div>
                  )}
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
              
              <DialogFooter className="flex sm:justify-between items-center border-t pt-4 mt-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentIndex = allContent.findIndex(item => item.id === selectedContent.id);
                      if (currentIndex > 0) {
                        setSelectedContent(allContent[currentIndex - 1]);
                      }
                    }}
                    disabled={allContent.findIndex(item => item.id === selectedContent.id) <= 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const currentIndex = allContent.findIndex(item => item.id === selectedContent.id);
                      if (currentIndex < allContent.length - 1) {
                        setSelectedContent(allContent[currentIndex + 1]);
                      }
                    }}
                    disabled={allContent.findIndex(item => item.id === selectedContent.id) >= allContent.length - 1}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                
                <span className="text-xs text-muted-foreground">
                  By {selectedContent.author} • {selectedContent.ageGroup}
                </span>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MumzGuideHer;
