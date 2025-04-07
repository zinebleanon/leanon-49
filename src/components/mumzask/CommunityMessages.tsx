import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, ThumbsUp, Clock, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for demonstration
const mockGeneralCommunityMessages = [
  {
    id: 1,
    title: 'How do I handle toddler tantrums in public?',
    content: 'My 2-year-old has started having major meltdowns whenever we\'re grocery shopping. I\'m at my wit\'s end!',
    replies: 12,
    likes: 8,
    timestamp: '2 hours ago',
    category: 'Parenting'
  },
  {
    id: 2,
    title: 'Best breastfeeding positions for newborns?',
    content: 'I\'m a first-time mom struggling with breastfeeding my 2-week-old. Which positions work best for newborns?',
    replies: 8,
    likes: 5,
    timestamp: '4 hours ago',
    category: 'Feeding & Breastfeeding'
  },
  {
    id: 3,
    title: 'Recommendations for baby food introduction?',
    content: 'My baby is turning 6 months next week. Looking for tips on starting solid foods and what to try first.',
    replies: 15,
    likes: 11,
    timestamp: '1 day ago',
    category: 'Diversification'
  },
  {
    id: 4,
    title: 'Signs of teething to look out for?',
    content: 'My 5-month-old seems irritable lately. Could it be teething? What are the common signs?',
    replies: 10,
    likes: 7,
    timestamp: '1 day ago',
    category: 'Health'
  },
  {
    id: 5,
    title: 'Choosing the right daycare',
    content: 'Going back to work soon and need advice on choosing a good daycare for my 10-month-old.',
    replies: 18,
    likes: 12,
    timestamp: '2 days ago',
    category: 'Schools & Nurseries'
  }
];

const mockNeighborhoodMessages = [
  {
    id: 1,
    title: 'Toddler playgroup starting in Central Park',
    content: 'Anyone interested in joining a weekly playgroup for 1-3 year olds at Central Park? Starting next Tuesday!',
    replies: 15,
    likes: 20,
    timestamp: '1 hour ago',
    category: 'Meetups'
  },
  {
    id: 2,
    title: 'Looking for babysitting support this weekend',
    content: 'Need some emergency childcare this Saturday. Can anyone recommend a trustworthy sitter in the downtown area?',
    replies: 7,
    likes: 3,
    timestamp: '3 hours ago',
    category: 'Help & Support'
  },
  {
    id: 3,
    title: 'Family-friendly summer festival next month',
    content: 'There\'s a family festival happening at the community center on July 15th. Lots of activities for kids!',
    replies: 10,
    likes: 22,
    timestamp: '1 day ago',
    category: 'Events'
  },
  {
    id: 4,
    title: 'STEM summer camp registration open now',
    content: 'The science center is running a STEM camp for 5-8 year olds. Just wanted to share since spaces fill quickly!',
    replies: 9,
    likes: 14,
    timestamp: '1 day ago',
    category: 'Kids Camps'
  },
  {
    id: 5,
    title: 'New swimming classes for babies',
    content: 'The community pool just announced new parent-baby swimming lessons starting next month. Our little one loved it!',
    replies: 6,
    likes: 11,
    timestamp: '2 days ago',
    category: 'Kids Activities'
  }
];

type MessageProps = {
  id: number;
  title: string;
  content: string;
  replies: number;
  likes: number;
  timestamp: string;
  category: string;
};

export type FilterType = 'recent' | 'popular' | 'category';

interface CommunityMessagesProps {
  categories: { name: string; icon: JSX.Element }[];
  neighborhoodCategories: { name: string; icon: JSX.Element }[];
}

const CommunityMessages = ({ categories, neighborhoodCategories }: CommunityMessagesProps) => {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [filterType, setFilterType] = useState<FilterType>('recent');
  const [filteredMessages, setFilteredMessages] = useState<MessageProps[]>(mockGeneralCommunityMessages);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Filter messages based on tab, filter type, and category
  useEffect(() => {
    let messages = activeTab === 'general' ? mockGeneralCommunityMessages : mockNeighborhoodMessages;
    
    // Apply category filter if selected
    if (categoryFilter) {
      messages = messages.filter(msg => msg.category === categoryFilter);
    }
    
    // Apply filter type
    if (filterType === 'recent') {
      // For demo, the mock data is already in time order
    } else if (filterType === 'popular') {
      messages = [...messages].sort((a, b) => b.likes - a.likes);
    }
    
    setFilteredMessages(messages);
  }, [activeTab, filterType, categoryFilter]);

  const handleCategoryClick = (category: string) => {
    setCategoryFilter(categoryFilter === category ? null : category);
  };
  
  const renderMessage = (message: MessageProps) => (
    <div 
      key={message.id} 
      className="p-5 bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20 hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{message.title}</h3>
        <Badge variant="outline" className="bg-[#FFD9A7]/60 text-foreground border-[#FFD9A7]">
          {message.category}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-3">
        {message.content}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full h-7 px-3 text-xs">
            <MessageCircle className="h-3 w-3 mr-1" /> {message.replies} replies
          </Button>
          <Button variant="outline" size="sm" className="rounded-full h-7 px-3 text-xs">
            <ThumbsUp className="h-3 w-3 mr-1" /> {message.likes}
          </Button>
        </div>
        <span className="text-xs text-muted-foreground flex items-center">
          <Clock className="h-3 w-3 mr-1 inline" /> {message.timestamp}
        </span>
      </div>
    </div>
  );
  
  const currentCategories = activeTab === 'general' ? categories : neighborhoodCategories;
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 bg-muted mb-4">
          <TabsTrigger value="general" className="data-[state=active]:bg-[#B8CEC2]/50">LeanOn Community</TabsTrigger>
          <TabsTrigger value="neighborhood" className="data-[state=active]:bg-[#B8CEC2]/50">Neighborhood</TabsTrigger>
        </TabsList>
        
        <div className="mb-4 flex justify-between items-center">
          <div className="flex gap-1">
            <Button 
              variant={filterType === 'recent' ? 'default' : 'outline'}
              size="sm" 
              onClick={() => setFilterType('recent')}
              className={`text-xs px-2 h-8 ${filterType === 'recent' ? 'bg-[#B8CEC2]' : ''}`}
            >
              <Clock className="h-3 w-3 mr-1" /> Recent
            </Button>
            <Button 
              variant={filterType === 'popular' ? 'default' : 'outline'}
              size="sm" 
              onClick={() => setFilterType('popular')}
              className={`text-xs px-2 h-8 ${filterType === 'popular' ? 'bg-[#B8CEC2]' : ''}`}
            >
              <ThumbsUp className="h-3 w-3 mr-1" /> Popular
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className={`text-xs px-2 h-8 ${categoryFilter ? "bg-[#FFD9A7] text-foreground border-[#FFD9A7]" : ""}`}
              >
                <Filter className="h-3 w-3 mr-1" /> 
                {categoryFilter ? `${categoryFilter}` : "Filter"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-white border border-[#B8CEC2]/20">
              <DropdownMenuLabel className="text-xs">Filter by Topic</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[250px] overflow-y-auto">
                <DropdownMenuGroup>
                  {currentCategories.map((category) => (
                    <DropdownMenuItem 
                      key={category.name}
                      className={`cursor-pointer text-xs ${categoryFilter === category.name ? 'bg-[#FFD9A7]/30' : ''}`}
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </div>
              {categoryFilter && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-500 hover:text-red-700 text-xs"
                    onClick={() => setCategoryFilter(null)}
                  >
                    Clear Filter
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <TabsContent value="general">
          <div className="space-y-3">
            {filteredMessages.length > 0 ? (
              filteredMessages.map(renderMessage)
            ) : (
              <div className="p-8 text-center text-muted-foreground bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20">
                No messages found for the selected filter.
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="neighborhood">
          <div className="space-y-3">
            {filteredMessages.length > 0 ? (
              filteredMessages.map(renderMessage)
            ) : (
              <div className="p-8 text-center text-muted-foreground bg-white rounded-lg shadow-sm border border-[#B8CEC2]/20">
                No messages found for the selected filter.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityMessages;
