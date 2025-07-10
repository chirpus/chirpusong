import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Zap, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import CommentsModal from './Comments/CommentsModal';

interface PostCardProps {
  post: any;
  onUpdate?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onUpdate }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user || loading) return;
    
    setLoading(true);
    try {
      await db.toggleLike(post.id);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      onUpdate?.();
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'now';
    }
  };

  const getMoodGradient = (mood: string) => {
    const gradients = {
      spark: 'bg-yellow-500',
      flow: 'bg-blue-500',
      storm: 'bg-purple-500',
      calm: 'bg-green-500',
      burst: 'bg-pink-500'
    };
    return gradients[mood as keyof typeof gradients] || 'bg-blue-500';
  };

  const getDimensionColor = (dimension: string) => {
    const colors = {
      personal: 'bg-blue-500',
      creative: 'bg-pink-500',
      tech: 'bg-indigo-500',
      nature: 'bg-green-500',
      cosmic: 'bg-purple-500'
    };
    return colors[dimension as keyof typeof colors] || 'bg-blue-500';
  };

  return (
    <article className="bg-white border-b border-gray-200 p-6 hover:bg-gray-50 transition-all duration-300">
      <div className="flex space-x-4">
        <div className="relative">
          <img
            src={post.profiles?.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400`}
            alt={post.profiles?.display_name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{post.profiles?.level || 1}</span>
          </div>
        </div>
        
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900">{post.profiles?.display_name}</h3>
            {post.profiles?.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            )}
            <span className="text-gray-500">@{post.profiles?.username}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500 text-sm">{formatTimeAgo(post.created_at)}</span>
            <button className="ml-auto p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Mood and Dimension Tags */}
          <div className="flex items-center space-x-2 mb-3">
            <div className={`px-2 py-1 rounded-full ${getMoodGradient(post.mood)} text-white text-xs font-medium`}>
              {post.mood}
            </div>
            <div className={`px-2 py-1 rounded-full ${getDimensionColor(post.dimension)} text-white text-xs font-medium`}>
              {post.dimension}
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-gray-900 leading-relaxed">{post.content}</p>
            
            {/* Media */}
            {post.media_urls && post.media_urls.length > 0 && (
              <div className="mt-4 rounded-xl overflow-hidden">
                <img
                  src={post.media_urls[0]}
                  alt="Pulse media"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md">
            <button 
              onClick={() => setShowComments(true)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 group"
            >
              <div className="p-2 rounded-full hover:bg-blue-50 group-hover:scale-110 transition-all duration-200">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm">{post.comments_count || 0}</span>
            </button>
            
            <button
              className="flex items-center space-x-2 text-gray-500 hover:text-green-600 transition-colors duration-200 group"
            >
              <div className="p-2 rounded-full hover:bg-green-50 group-hover:scale-110 transition-all duration-200">
                <Repeat2 className="w-5 h-5" />
              </div>
              <span className="text-sm">{post.reposts_count || 0}</span>
            </button>
            
            <button
              onClick={handleLike}
              disabled={!user || loading}
              className={`flex items-center space-x-2 transition-all duration-200 group ${
                isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <div className="p-2 rounded-full hover:bg-red-50 group-hover:scale-110 transition-all duration-200">
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-sm">{likesCount}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 group">
              <div className="p-2 rounded-full hover:bg-blue-50 group-hover:scale-110 transition-all duration-200">
                <Zap className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={post}
      />
    </article>
  );
};

export default PostCard;