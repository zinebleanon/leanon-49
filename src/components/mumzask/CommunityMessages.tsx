
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Heart, MessageSquare, ThumbsUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CategoryProps {
  name: string;
  icon: JSX.Element;
}

interface CommunityMessagesProps {
  categories: CategoryProps[];
  neighborhoodCategories: CategoryProps[];
}

const CommunityMessages = ({ categories, neighborhoodCategories }: CommunityMessagesProps) => {
  const [activeTab, setActiveTab] = useState('community');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    // In a real implementation, this would fetch messages from the database
    setTimeout(() => {
      setMessages([]);
      setIsLoading(false);
    }, 800);
  }, []);

  const allCategories = [
    { name: 'All Categories', icon: null },
    ...categories,
  ];

  const allNeighborhoodCategories = [
    { name: 'All Categories', icon: null },
    ...neighborhoodCategories,
  ];

  const activeCategoryList = activeTab === 'community' ? allCategories : allNeighborhoodCategories;

  const filteredMessages = messages.filter(
    (msg) => selectedCategory === 'All Categories' || msg.category === selectedCategory
  );

  return (
    <div>
      <Tabs defaultValue="community" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="community" className="flex-1">Community</TabsTrigger>
          <TabsTrigger value="neighborhood" className="flex-1">My Neighborhood</TabsTrigger>
        </TabsList>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {activeTab === 'community' ? 'Community Questions' : 'Neighborhood Questions'}
          </h2>
          
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {activeCategoryList.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  <div className="flex items-center">
                    {category.icon && <span className="mr-2">{category.icon}</span>}
                    {category.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="community" className="m-0">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredMessages.length > 0 ? (
            <div className="space-y-4">
              {/* Messages would be rendered here */}
            </div>
          ) : (
            <div className="py-16 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No questions yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Be the first to start a conversation in the community! Ask a question or share your experience.
              </p>
              <Button 
                size="lg" 
                className="bg-pastel-yellow hover:bg-pastel-yellow/90 text-foreground"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Ask a Question
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="neighborhood" className="m-0">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredMessages.length > 0 ? (
            <div className="space-y-4">
              {/* Neighborhood messages would be rendered here */}
            </div>
          ) : (
            <div className="py-16 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No neighborhood questions yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Be the first to ask a question in your neighborhood and connect with moms around you!
              </p>
              <Button 
                size="lg" 
                variant="outline" 
                className="border border-[#FFD9A7] bg-[#FFD9A7] hover:bg-[#FFD9A7]/80 text-foreground"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Ask Your Neighborhood
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityMessages;
