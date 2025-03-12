
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { User, Clock, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export interface Comment {
  id: number;
  text: string;
  user: {
    name: string;
    isExpert?: boolean;
  };
  timestamp: string;
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  userDisliked?: boolean;
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (text: string) => void;
  onLike?: (commentId: number) => void;
  onDislike?: (commentId: number) => void;
}

const CommentSection = ({
  comments = [],
  onAddComment,
  onLike,
  onDislike
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const { toast } = useToast();

  const handleSubmitComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Cannot submit empty comment",
        description: "Please write something before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    if (onAddComment) {
      onAddComment(newComment);
    }
    
    toast({
      title: "Comment submitted",
      description: "Your comment has been submitted for review."
    });
    
    setNewComment('');
  };
  
  const handleLike = (commentId: number) => {
    if (onLike) onLike(commentId);
    toast({
      title: "Comment liked",
      description: "You liked this comment."
    });
  };
  
  const handleDislike = (commentId: number) => {
    if (onDislike) onDislike(commentId);
    toast({
      title: "Comment disliked",
      description: "You disliked this comment."
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-background p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-primary/10 rounded-full w-8 h-8 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.user.name}</span>
                  {comment.user.isExpert && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                      Expert
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{comment.timestamp}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm mb-3">{comment.text}</p>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-xs rounded-full flex items-center gap-1 px-3 hover:bg-primary/5",
                  comment.userLiked && "bg-primary/10 text-primary hover:bg-primary/15"
                )}
                onClick={() => handleLike(comment.id)}
              >
                <ThumbsUp className={cn("h-3 w-3", comment.userLiked && "text-primary")} />
                <span>{comment.likes}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "text-xs rounded-full flex items-center gap-1 px-3 hover:bg-destructive/5",
                  comment.userDisliked && "bg-destructive/10 text-destructive hover:bg-destructive/15"
                )}
                onClick={() => handleDislike(comment.id)}
              >
                <ThumbsDown className={cn("h-3 w-3", comment.userDisliked && "text-destructive")} />
                <span>{comment.dislikes}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3">
        <Textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="resize-none min-h-[100px]"
        />
        <Button onClick={handleSubmitComment} className="w-full sm:w-auto">
          Submit Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentSection;
