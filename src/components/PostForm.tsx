import React, { useState } from 'react';
import { Image, Sparkles, Palette, Zap, Atom, Compass } from 'lucide-react';
import { currentUser } from '../data/mockData';

const PostForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<'spark' | 'flow' | 'storm' | 'calm' | 'burst'>('calm');
  const [selectedDimension, setSelectedDimension] = useState<'personal' | 'creative' | 'tech' | 'nature' | 'cosmic'>('personal');
  const maxLength = 500;

  const moods = [
    { type: 'spark' as const, icon: Zap, color: 'bg-yellow-500', label: 'Excited' },
    { type: 'flow' as const, icon: Compass, color: 'bg-blue-500', label: 'Focused' },
    { type: 'storm' as const, icon: Atom, color: 'bg-purple-500', label: 'Intense' },
    { type: 'calm' as const, icon: Sparkles, color: 'bg-green-500', label: 'Peaceful' },
    { type: 'burst' as const, icon: Palette, color: 'bg-pink-500', label: 'Creative' }
  ];

  const dimensions = [
    { type: 'personal' as const, label: 'Personal', color: 'bg-blue-500' },
    { type: 'creative' as const, label: 'Creative', color: 'bg-pink-500' },
    { type: 'tech' as const, label: 'Tech', color: 'bg-indigo-500' },
    { type: 'nature' as const, label: 'Nature', color: 'bg-green-500' },
    { type: 'cosmic' as const, label: 'Thoughts', color: 'bg-purple-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      console.log('New pulse:', { content, mood: selectedMood, dimension: selectedDimension });
      setContent('');
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-200"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{currentUser.level}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's happening?"
              className="w-full text-lg placeholder-gray-500 bg-transparent border-none resize-none focus:outline-none text-gray-900 leading-relaxed"
              rows={4}
              maxLength={maxLength}
            />
            
            {/* Mood Selection */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Mood</p>
              <div className="flex space-x-2">
                {moods.map((mood) => (
                  <button
                    key={mood.type}
                    type="button"
                    onClick={() => setSelectedMood(mood.type)}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      selectedMood === mood.type
                        ? `${mood.color} shadow-lg scale-110`
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <mood.icon className="w-4 h-4 text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Selection */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                {dimensions.map((dim) => (
                  <button
                    key={dim.type}
                    type="button"
                    onClick={() => setSelectedDimension(dim.type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedDimension === dim.type
                        ? `${dim.color} text-white shadow-lg scale-105`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {dim.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Post Actions */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition-all duration-200"
                >
                  <Image className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-pink-600 transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${content.length > maxLength * 0.8 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                  <span className={`text-sm ${content.length > maxLength * 0.8 ? 'text-red-500' : 'text-gray-500'}`}>
                    {content.length}/{maxLength}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!content.trim() || content.length > maxLength}
                  className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;