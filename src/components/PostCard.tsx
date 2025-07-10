import React, { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Zap, Sparkles } from 'lucide-react';
import { Pulse } from '../types';

interface PostCardProps {
  post: Pulse;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isResonating, setIsResonating] = useState(post.isResonating);
  const [isAmplified, setIsAmplified] = useState(post.isAmplified);
  const [resonance, setResonance] = useState(post.resonance);
  const [amplify, setAmplify] = useState(post.amplify);

  const handleResonance = () => {
    setIsResonating(!isResonating);
    setResonance(isResonating ? resonance - 1 : resonance + 1);
  };

  const handleAmplify = () => {
    setIsAmplified(!isAmplified);
    setAmplify(isAmplified ? amplify - 1 : amplify + 1);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
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
            src={post.user.avatar}
            alt={post.user.displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{post.user.level}</span>
          </div>
        </div>
        
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-gray-900">{post.user.displayName}</h3>
            {post.user.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            )}
            <span className="text-gray-500">@{post.user.username}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500 text-sm">{formatTimeAgo(post.timestamp)}</span>
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
            {post.media && post.media.length > 0 && (
              <div className="mt-4 rounded-xl overflow-hidden">
                <img
                  src={post.media[0]}
                  alt="Pulse media"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 group">
              <div className="p-2 rounded-full hover:bg-blue-50 group-hover:scale-110 transition-all duration-200">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm">{post.echoes}</span>
            </button>
            
            <button
              onClick={handleAmplify}
              className={`flex items-center space-x-2 transition-all duration-200 group ${
                isAmplified ? 'text-green-600' : 'text-gray-500 hover:text-green-600'
              }`}
            >
              <div className="p-2 rounded-full hover:bg-green-50 group-hover:scale-110 transition-all duration-200">
                <Repeat2 className="w-5 h-5" />
              </div>
              <span className="text-sm">{amplify}</span>
            </button>
            
            <button
              onClick={handleResonance}
              className={`flex items-center space-x-2 transition-all duration-200 group ${
                isResonating ? 'text-red-600' : 'text-gray-500 hover:text-red-600'
              }`}
            >
              <div className="p-2 rounded-full hover:bg-red-50 group-hover:scale-110 transition-all duration-200">
                <Heart className={`w-5 h-5 ${isResonating ? 'fill-current' : ''}`} />
              </div>
              <span className="text-sm">{resonance}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors duration-200 group">
              <div className="p-2 rounded-full hover:bg-blue-50 group-hover:scale-110 transition-all duration-200">
                <Zap className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;