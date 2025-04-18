
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, Heart, Smile, Coffee, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export interface Reaction {
  type: 'like' | 'love' | 'helpful' | 'thanks';
  count: number;
  reacted?: boolean;
}

interface ReactionsState {
  like: number;
  love: number;
  helpful: number;
  thanks: number;
  userReactions: Record<string, boolean>;
}

interface ReactionBarProps {
  initialReactions?: Reaction[];
  onReact?: (type: string) => void;
  showComments?: boolean;
  commentCount?: number;
  onToggleComments?: () => void;
}

const ReactionBar = ({ 
  initialReactions = [], 
  onReact,
  showComments = false,
  commentCount = 0,
  onToggleComments
}: ReactionBarProps) => {
  const { toast } = useToast();
  const [reactions, setReactions] = useState<ReactionsState>({
    like: initialReactions.find(r => r.type === 'like')?.count || 0,
    love: initialReactions.find(r => r.type === 'love')?.count || 0,
    helpful: initialReactions.find(r => r.type === 'helpful')?.count || 0,
    thanks: initialReactions.find(r => r.type === 'thanks')?.count || 0,
    userReactions: {
      like: initialReactions.find(r => r.type === 'like')?.reacted || false,
      love: initialReactions.find(r => r.type === 'love')?.reacted || false,
      helpful: initialReactions.find(r => r.type === 'helpful')?.reacted || false,
      thanks: initialReactions.find(r => r.type === 'thanks')?.reacted || false
    }
  });

  const handleReaction = (type: 'like' | 'love' | 'helpful' | 'thanks') => {
    // Toggle reaction
    const newReactions = { ...reactions };
    
    if (newReactions.userReactions[type]) {
      // User is unreacting
      newReactions[type] = Math.max(0, newReactions[type] - 1);
      newReactions.userReactions[type] = false;
    } else {
      // User is reacting
      newReactions[type] = newReactions[type] + 1;
      newReactions.userReactions[type] = true;
    }
    
    setReactions(newReactions);
    
    if (onReact) {
      onReact(type);
    }
    
    toast({
      title: newReactions.userReactions[type] ? "Reaction added" : "Reaction removed",
      description: newReactions.userReactions[type] ? 
        `You ${type === 'like' ? 'liked' : type === 'love' ? 'loved' : type === 'helpful' ? 'found helpful' : 'thanked for'} this post.` : 
        `You removed your ${type} reaction.`,
    });
  };

  // Simplified reaction buttons with emojis instead of text for a more compact display
  const reactionButtons = [
    { type: 'like', icon: ThumbsUp, emoji: '👍', count: reactions.like, active: reactions.userReactions.like },
    { type: 'love', icon: Heart, emoji: '❤️', count: reactions.love, active: reactions.userReactions.love },
    { type: 'helpful', icon: Smile, emoji: '😊', count: reactions.helpful, active: reactions.userReactions.helpful },
    { type: 'thanks', icon: Coffee, emoji: '☕', count: reactions.thanks, active: reactions.userReactions.thanks }
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex bg-background rounded-full border border-input p-1 overflow-hidden">
        {reactionButtons.map((reaction) => (
          <Button
            key={reaction.type}
            variant="ghost"
            size="sm"
            onClick={() => handleReaction(reaction.type as any)}
            className={cn(
              "h-8 min-w-8 px-2 rounded-full flex items-center justify-center gap-1",
              reaction.active && "bg-primary/10 text-primary"
            )}
            title={reaction.type.charAt(0).toUpperCase() + reaction.type.slice(1)}
          >
            <span className="text-sm">{reaction.emoji}</span>
            {reaction.count > 0 && (
              <span className="text-xs">{reaction.count}</span>
            )}
          </Button>
        ))}
      </div>
      
      {onToggleComments && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleComments}
          className={cn(
            "h-8 px-3 rounded-full bg-background flex items-center gap-1 hover:bg-primary/5",
            showComments && "bg-primary/10 text-primary hover:bg-primary/15"
          )}
        >
          <MessageSquare className={cn("h-3.5 w-3.5", showComments && "text-primary")} />
          <span className="text-xs">Comments</span>
          {commentCount > 0 && (
            <Badge variant="secondary" className="ml-1 px-1.5 py-0 h-4 min-w-4 flex items-center justify-center">
              {commentCount}
            </Badge>
          )}
        </Button>
      )}
    </div>
  );
};

export default ReactionBar;
