import React, { useState } from 'react';
import { Image, Sparkles, Palette, Zap, Atom, Compass } from 'lucide-react';
import { currentUser } from '../data/mockData';

const PostForm: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<'spark' | 'flow' | 'storm' | 'calm' | 'burst'>('spark');
  const [selectedDimension, setSelectedDimension] = useState<'personal' | 'creative' | 'tech' | 'nature' | 'cosmic'>('personal');
  const maxLength = 500;

  const moods = [
    { type: 'spark' as const, icon: Zap, color: 'from-yellow-400 to-orange-500', label: 'Spark' },
    { type: 'flow' as const, icon: Compass, color: 'from-cyan-400 to-blue-500', label: 'Flow' },
    { type: 'storm' as const, icon: Atom, color: 'from-purple-500 to-pink-500', label: 'Storm' },
    { type: 'calm' as const, icon: Sparkles, color: 'from-green-400 to-teal-500', label: 'Calm' },
    { type: 'burst' as const, icon: Palette, color: 'from-rose-400 to-pink-500', label: 'Burst' }
  ];

  const dimensions = [
    { type: 'personal' as const, label: 'Personal', color: 'bg-purple-500' },
    { type: 'creative' as const, label: 'Creative', color: 'bg-pink-500' },
    { type: 'tech' as const, label: 'Tech', color: 'bg-cyan-500' },
    { type: 'nature' as const, label: 'Nature', color: 'bg-green-500' },
    { type: 'cosmic' as const, label: 'Cosmic', color: 'bg-indigo-500' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      console.log('New pulse:', { content, mood: selectedMood, dimension: selectedDimension });
      setContent('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 border-b border-white/10 p-6 backdrop-blur-sm">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.displayName}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-purple-400/50"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{currentUser.level}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your pulse with the nexus..."
              className="w-full text-lg placeholder-purple-300 bg-transparent border-none resize-none focus:outline-none text-white leading-relaxed"
              rows={4}
              maxLength={maxLength}
            />
            
            {/* Mood Selection */}
            <div className="mt-4">
              <p className="text-sm text-purple-300 mb-2">Pulse Mood</p>
              <div className="flex space-x-2">
                {moods.map((mood) => (
                  <button
                    key={mood.type}
                    type="button"
                    onClick={() => setSelectedMood(mood.type)}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      selectedMood === mood.type
                        ? `bg-gradient-to-r ${mood.color} shadow-lg scale-110`
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <mood.icon className="w-4 h-4 text-white" />
                  </button>
                ))}
              </div>
            </div>

            {/* Dimension Selection */}
            <div className="mt-4">
              <p className="text-sm text-purple-300 mb-2">Dimension</p>
              <div className="flex flex-wrap gap-2">
                {dimensions.map((dim) => (
                  <button
                    key={dim.type}
                    type="button"
                    onClick={() => setSelectedDimension(dim.type)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedDimension === dim.type
                        ? `${dim.color} text-white shadow-lg scale-105`
                        : 'bg-white/10 text-purple-300 hover:bg-white/20'
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
                  className="p-2 rounded-xl hover:bg-white/10 text-purple-300 hover:text-cyan-400 transition-all duration-200"
                >
                  <Image className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-xl hover:bg-white/10 text-purple-300 hover:text-pink-400 transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${content.length > maxLength * 0.8 ? 'bg-red-400' : 'bg-cyan-400'}`}></div>
                  <span className={`text-sm ${content.length > maxLength * 0.8 ? 'text-red-400' : 'text-purple-300'}`}>
                    {content.length}/{maxLength}
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={!content.trim() || content.length > maxLength}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white rounded-2xl font-medium hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                >
                  Send Pulse
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostForm;</parameter>