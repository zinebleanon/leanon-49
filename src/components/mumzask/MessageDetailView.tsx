
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import CommentSection, { Comment, Reply } from '../mumzask/CommentSection';
import ReactionBar, { Reaction } from '../mumzask/ReactionBar';
import TopicSummary from './TopicSummary';

// Sample mock data for comments and reactions
const mockComments: Comment[] = [
  {
    id: 1,
    text: "I found it helpful to distract my toddler with a small toy or game when we're in public. Also, deep breaths!",
    user: {
      name: "Sarah J.",
      isExpert: true,
    },
    timestamp: "1 hour ago",
    likes: 3,
    userLiked: false,
    replies: [
      {
        id: 101,
        text: "That's a great tip! I carry a small book in my bag for this exact reason.",
        user: {
          name: "Jessica M.",
        },
        timestamp: "45 minutes ago",
        likes: 1,
        userLiked: false
      }
    ]
  },
  {
    id: 2,
    text: "What worked for us was avoiding shopping during naptime. It's a recipe for meltdowns!",
    user: {
      name: "Mike P.",
    },
    timestamp: "3 hours ago",
    likes: 2,
    userLiked: false,
    replies: []
  },
  {
    id: 3,
    text: "Try to involve them in the shopping process. My son loves when I ask him to help me find certain items.",
    user: {
      name: "Lisa M.",
    },
    timestamp: "5 hours ago",
    likes: 1,
    userLiked: false,
    replies: []
  }
];

const mockReactions: Reaction[] = [
  { type: 'like', count: 8, reacted: false },
  { type: 'love', count: 3, reacted: false },
  { type: 'helpful', count: 5, reacted: false },
  { type: 'thanks', count: 2, reacted: false }
];

interface MessageDetailViewProps {
  message: {
    id: number;
    title: string;
    content: string;
    replies: number;
    likes: number;
    timestamp: string;
    category: string;
    images?: string[];
  };
  onBack: () => void;
  aiSummaryContent?: string | null;
  aiSummaryTopic?: string | null;
}

const MessageDetailView = ({ message, onBack, aiSummaryContent, aiSummaryTopic }: MessageDetailViewProps) => {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [showComments, setShowComments] = useState(true);
  const [reactions, setReactions] = useState<Reaction[]>(mockReactions);

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: comments.length + 1,
      text,
      user: {
        name: "You",
      },
      timestamp: "Just now",
      likes: 0,
      userLiked: false,
      replies: []
    };
    
    setComments([...comments, newComment]);
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const userLiked = !comment.userLiked;
        const likesCount = userLiked ? comment.likes + 1 : Math.max(0, comment.likes - 1);
        return { ...comment, likes: likesCount, userLiked };
      }
      return comment;
    }));
  };

  const handleReaction = (type: string) => {
    setReactions(reactions.map(reaction => {
      if (reaction.type === type) {
        const reacted = !reaction.reacted;
        const count = reacted ? reaction.count + 1 : Math.max(0, reaction.count - 1);
        return { ...reaction, count, reacted };
      }
      return reaction;
    }));
  };

  const handleReplyToComment = (commentId: number, text: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const newReply: Reply = {
          id: (comment.replies?.length || 0) + 1,
          text,
          user: {
            name: "You"
          },
          timestamp: "Just now",
          likes: 0,
          userLiked: false
        };
        
        return { 
          ...comment, 
          replies: [...(comment.replies || []), newReply]
        };
      }
      return comment;
    }));
  };

  const handleLikeReply = (commentId: number, replyId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId && comment.replies) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            const userLiked = !reply.userLiked;
            const likesCount = userLiked ? reply.likes + 1 : Math.max(0, reply.likes - 1);
            return { ...reply, likes: likesCount, userLiked };
          }
          return reply;
        });
        
        return { ...comment, replies: updatedReplies };
      }
      return comment;
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow border border-[#B8CEC2]/20 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">{message.title}</h2>
          <Badge variant="outline" className="bg-[#FFD9A7]/60 text-foreground border-[#FFD9A7]">
            {message.category}
          </Badge>
        </div>
        
        <p className="text-muted-foreground mb-6">
          {message.content}
        </p>
        
        {aiSummaryContent && aiSummaryTopic ? (
          <TopicSummary content={aiSummaryContent} topic={aiSummaryTopic} />
        ) : (
          <TopicSummary content={message.content} topic={message.category} />
        )}
        
        {message.images && message.images.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-3">
            {message.images.map((img, index) => (
              <div key={index} className="rounded-md overflow-hidden aspect-square">
                <img 
                  src={img} 
                  alt={`Image for ${message.title}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-6">
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Posted {message.timestamp}
          </span>
        </div>
        
        <div className="border-t border-b border-[#B8CEC2]/20 py-4 mb-6">
          <ReactionBar 
            initialReactions={reactions}
            onReact={handleReaction}
            showComments={showComments}
            commentCount={comments.length}
            onToggleComments={() => setShowComments(!showComments)}
          />
        </div>
        
        {showComments && (
          <CommentSection 
            comments={comments} 
            onAddComment={handleAddComment} 
            onLike={handleLikeComment}
            onReply={handleReplyToComment}
            onLikeReply={handleLikeReply}
          />
        )}
      </div>
    </div>
  );
};

export default MessageDetailView;
