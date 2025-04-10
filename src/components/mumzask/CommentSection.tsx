
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { User, Clock, ThumbsUp, MessageCircleReply } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export interface Reply {
  id: number;
  text: string;
  user: {
    name: string;
    isExpert?: boolean;
  };
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export interface Comment {
  id: number;
  text: string;
  user: {
    name: string;
    isExpert?: boolean;
  };
  timestamp: string;
  likes: number;
  dislikes?: number; // Kept for backward compatibility
  userLiked?: boolean;
  userDisliked?: boolean; // Kept for backward compatibility
  replies?: Reply[];
}

interface CommentSectionProps {
  comments: Comment[];
  onAddComment?: (text: string) => void;
  onLike?: (commentId: number) => void;
  onReply?: (commentId: number, text: string) => void;
  onLikeReply?: (commentId: number, replyId: number) => void;
}

const CommentSection = ({
  comments = [],
  onAddComment,
  onLike,
  onReply,
  onLikeReply
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
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

  const handleReplySubmit = (commentId: number) => {
    if (!replyText.trim()) {
      toast({
        title: "Cannot submit empty reply",
        description: "Please write something before submitting.",
        variant: "destructive"
      });
      return;
    }

    if (onReply) {
      onReply(commentId, replyText);
    }

    toast({
      title: "Reply submitted",
      description: "Your reply has been submitted."
    });

    setReplyText('');
    setReplyingToId(null);
  };

  const handleLikeReply = (commentId: number, replyId: number) => {
    if (onLikeReply) onLikeReply(commentId, replyId);
    toast({
      title: "Reply liked",
      description: "You liked this reply."
    });
  };

  return (
    <div className="space-y-6">
      {/* New comment input form - moved to the top for better visibility */}
      <div className="space-y-3 bg-secondary/10 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-2">Add your comment</h3>
        <Textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="resize-none min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmitComment} size="sm">
            Submit
          </Button>
        </div>
      </div>
      
      {/* Comments list */}
      {comments.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium">{comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="bg-background p-4 rounded-lg shadow-sm border border-input/40">
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
                  <span>{comment.likes} {comment.likes === 1 ? 'like' : 'likes'}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs rounded-full flex items-center gap-1 px-3 hover:bg-primary/5"
                  onClick={() => setReplyingToId(replyingToId === comment.id ? null : comment.id)}
                >
                  <MessageCircleReply className="h-3 w-3" />
                  <span>Reply</span>
                </Button>
              </div>

              {/* Reply input form */}
              {replyingToId === comment.id && (
                <div className="mt-3 ml-6 space-y-2">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="resize-none min-h-[60px] text-sm"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setReplyingToId(null);
                        setReplyText('');
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReplySubmit(comment.id)}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* Display replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-muted/30 p-3 rounded-lg border-l-2 border-muted">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-primary/10 rounded-full w-6 h-6 flex items-center justify-center">
                          <User className="h-3 w-3 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-xs">{reply.user.name}</span>
                            {reply.user.isExpert && (
                              <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                                Expert
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-2 w-2" />
                            <span>{reply.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs mb-2 ml-8">{reply.text}</p>
                      
                      <div className="ml-8">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "text-xs rounded-full flex items-center gap-1 px-2 py-1 hover:bg-primary/5 h-6",
                            reply.userLiked && "bg-primary/10 text-primary hover:bg-primary/15"
                          )}
                          onClick={() => handleLikeReply(comment.id, reply.id)}
                        >
                          <ThumbsUp className={cn("h-2 w-2", reply.userLiked && "text-primary")} />
                          <span>{reply.likes} {reply.likes === 1 ? 'like' : 'likes'}</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Empty state when no comments */}
      {comments.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <p className="text-sm">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
