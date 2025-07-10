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
      spark: 'from-yellow-400 to-orange-500',
      flow: 'from-cyan-400 to-blue-500',
      storm: 'from-purple-500 to-pink-500',
      calm: 'from-green-400 to-teal-500',
      burst: 'from-rose-400 to-pink-500'
    };
    return gradients[mood as keyof typeof gradients] || 'from-purple-400 to-pink-400';
  };

  const getDimensionColor = (dimension: string) => {
    const colors = {
      personal: 'bg-purple-500',
      creative: 'bg-pink-500',
      tech: 'bg-cyan-500',
      nature: 'bg-green-500',
      cosmic: 'bg-indigo-500'
    };
    return colors[dimension as keyof typeof colors] || 'bg-purple-500';
  };

  return (
    <article className="bg-gradient-to-br from-white/10 to-white/5 border-b border-white/10 p-6 hover:from-white/15 hover:to-white/10 transition-all duration-300 backdrop-blur-sm">
      <div className="flex space-x-4">
        <div className="relative">
          <img
            src={post.user.avatar}
            alt={post.user.displayName}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-400/30"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{post.user.level}</span>
          </div>
        </div>
        
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-semibold text-white">{post.user.displayName}</h3>
            {post.user.verified && (
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            )}
            <span className="text-purple-300">@{post.user.username}</span>
            <span className="text-purple-400">·</span>
            <span className="text-purple-300 text-sm">{formatTimeAgo(post.timestamp)}</span>
            <button className="ml-auto p-1 rounded-full hover:bg-white/10 transition-colors duration-200">
              <MoreHorizontal className="w-4 h-4 text-purple-300" />
            </button>
          </div>

          {/* Mood and Dimension Tags */}
          <div className="flex items-center space-x-2 mb-3">
            <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getMoodGradient(post.mood)} text-white text-xs font-medium`}>
              {post.mood}
            </div>
            <div className={`px-2 py-1 rounded-full ${getDimensionColor(post.dimension)} text-white text-xs font-medium`}>
              {post.dimension}
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-white leading-relaxed">{post.content}</p>
            
            {/* Media */}
            {post.media && post.media.length > 0 && (
              <div className="mt-4 rounded-2xl overflow-hidden">
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
            <button className="flex items-center space-x-2 text-purple-300 hover:text-cyan-400 transition-colors duration-200 group">
              <div className="p-2 rounded-xl hover:bg-cyan-400/10 group-hover:scale-110 transition-all duration-200">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-sm">{post.echoes}</span>
            </button>
            
            <button
              onClick={handleAmplify}
              className={`flex items-center space-x-2 transition-all duration-200 group ${
                isAmplified ? 'text-green-400' : 'text-purple-300 hover:text-green-400'
              }`}
            >
              <div className="p-2 rounded-xl hover:bg-green-400/10 group-hover:scale-110 transition-all duration-200">
                <Repeat2 className="w-5 h-5" />
              </div>
              <span className="text-sm">{amplify}</span>
            </button>
            
            <button
              onClick={handleResonance}
              className={`flex items-center space-x-2 transition-all duration-200 group ${
                isResonating ? 'text-pink-400' : 'text-purple-300 hover:text-pink-400'
              }`}
            >
              <div className="p-2 rounded-xl hover:bg-pink-400/10 group-hover:scale-110 transition-all duration-200">
                <Heart className={`w-5 h-5 ${isResonating ? 'fill-current' : ''}`} />
              </div>
              <span className="text-sm">{resonance}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-purple-300 hover:text-yellow-400 transition-colors duration-200 group">
              <div className="p-2 rounded-xl hover:bg-yellow-400/10 group-hover:scale-110 transition-all duration-200">
                <Zap className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;</parameter>