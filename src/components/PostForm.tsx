import React, { useState } from 'react';
import { Image, Sparkles, Palette, Zap, Atom, Compass, Send, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';

interface PostFormProps {
  onPostCreated?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<'spark' | 'flow' | 'storm' | 'calm' | 'burst'>('calm');
  const [selectedDimension, setSelectedDimension] = useState<'personal' | 'creative' | 'tech' | 'nature' | 'cosmic'>('personal');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [loading, setLoading] = useState(false);
  const maxLength = 500;
  const { user, profile } = useAuth();

  const moods = [
    { type: 'spark' as const, icon: Zap, color: 'bg-yellow-500', label: 'Excited', emoji: '⚡' },
    { type: 'flow' as const, icon: Compass, color: 'bg-blue-500', label: 'Focused', emoji: '🌊' },
    { type: 'storm' as const, icon: Atom, color: 'bg-purple-500', label: 'Intense', emoji: '⛈️' },
    { type: 'calm' as const, icon: Sparkles, color: 'bg-green-500', label: 'Peaceful', emoji: '🌸' },
    { type: 'burst' as const, icon: Palette, color: 'bg-pink-500', label: 'Creative', emoji: '🎨' }
  ];

  const dimensions = [
    { type: 'personal' as const, label: 'Personal', color: 'bg-blue-500', icon: '👤' },
    { type: 'creative' as const, label: 'Creative', color: 'bg-pink-500', icon: '🎭' },
    { type: 'tech' as const, label: 'Tech', color: 'bg-indigo-500', icon: '💻' },
    { type: 'nature' as const, label: 'Nature', color: 'bg-green-500', icon: '🌿' },
    { type: 'cosmic' as const, label: 'Thoughts', color: 'bg-purple-500', icon: '🧠' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !user) return;

    setLoading(true);
    try {
      await db.createPost(content.trim(), selectedMood, selectedDimension);
      setContent('');
      setIsExpanded(false);
      onPostCreated?.();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedMoodData = moods.find(m => m.type === selectedMood);
  const selectedDimensionData = dimensions.find(d => d.type === selectedDimension);

  if (!user) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-blue-200 p-6">
      <form onSubmit={handleSubmit}>
        {/* Compact View */}
        {!isExpanded && (
          <div 
            onClick={() => setIsExpanded(true)}
            className="flex items-center space-x-4 p-4 bg-white rounded-2xl shadow-sm border border-blue-100 cursor-text hover:shadow-md transition-all duration-300"
          >
            <img
              src={profile?.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400`}
              alt={profile?.display_name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="text-gray-500 text-lg">Share your thoughts...</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{selectedMoodData?.emoji}</span>
              <span className="text-xl">{selectedDimensionData?.icon}</span>
              <Plus className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        )}

        {/* Expanded View */}
        {isExpanded && (
          <div className="bg-white rounded-3xl shadow-lg border border-blue-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={profile?.avatar_url || `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400`}
                    alt={profile?.display_name}
                    className="w-12 h-12 rounded-full object-cover ring-3 ring-white/30"
                  />
                  <div>
                    <h3 className="text-white font-semibold">{profile?.display_name}</h3>
                    <p className="text-blue-100 text-sm">Level {profile?.level} • {profile?.energy} Energy</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Share your story, idea, or moment..."
                className="w-full text-lg placeholder-gray-400 bg-transparent border-none resize-none focus:outline-none text-gray-900 leading-relaxed min-h-[120px]"
                maxLength={maxLength}
                autoFocus
              />

              {/* Mood & Dimension Display */}
              <div className="flex items-center space-x-4 mt-4 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Mood:</span>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-full shadow-sm">
                    <span className="text-lg">{selectedMoodData?.emoji}</span>
                    <span className="text-sm font-medium text-gray-700">{selectedMoodData?.label}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Topic:</span>
                  <div className="flex items-center space-x-2 px-3 py-1 bg-white rounded-full shadow-sm">
                    <span className="text-lg">{selectedDimensionData?.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{selectedDimensionData?.label}</span>
                  </div>
                </div>
              </div>

              {/* Mood Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-700">How are you feeling?</h4>
                  <button
                    type="button"
                    onClick={() => setShowMoodSelector(!showMoodSelector)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showMoodSelector ? 'Hide' : 'Change'}
                  </button>
                </div>
                
                {showMoodSelector && (
                  <div className="grid grid-cols-5 gap-3 p-4 bg-gray-50 rounded-xl">
                    {moods.map((mood) => (
                      <button
                        key={mood.type}
                        type="button"
                        onClick={() => {
                          setSelectedMood(mood.type);
                          setShowMoodSelector(false);
                        }}
                        className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 ${
                          selectedMood === mood.type
                            ? 'bg-white shadow-md scale-105 ring-2 ring-blue-300'
                            : 'hover:bg-white hover:shadow-sm'
                        }`}
                      >
                        <span className="text-2xl mb-1">{mood.emoji}</span>
                        <span className="text-xs font-medium text-gray-600">{mood.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dimension Selection */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Choose a topic</h4>
                <div className="flex flex-wrap gap-2">
                  {dimensions.map((dim) => (
                    <button
                      key={dim.type}
                      type="button"
                      onClick={() => setSelectedDimension(dim.type)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedDimension === dim.type
                          ? 'bg-blue-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span>{dim.icon}</span>
                      <span>{dim.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-white transition-all duration-200 text-gray-600 hover:text-blue-600"
                >
                  <Image className="w-4 h-4" />
                  <span className="text-sm">Photo</span>
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-white transition-all duration-200 text-gray-600 hover:text-pink-600"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">GIF</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        content.length > maxLength * 0.8 ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min((content.length / maxLength) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm ${content.length > maxLength * 0.8 ? 'text-red-500' : 'text-gray-500'}`}>
                    {maxLength - content.length}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!content.trim() || content.length > maxLength || loading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-medium hover:from-blue-600 hover:to-indigo-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sharing...' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PostForm;