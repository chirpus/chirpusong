import React from 'react';
import PostForm from './PostForm';
import PostCard from './PostCard';
import { mockPulses } from '../data/mockData';

const Feed: React.FC = () => {
  return (
    <main className="flex-1 max-w-3xl border-r border-white/10">
      {/* Header */}
      <div className="sticky top-16 bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-xl border-b border-white/10 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
            Nexus Stream
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent"></div>
        </div>
        <p className="text-purple-300 text-sm mt-2">Real-time pulses from your constellation</p>
      </div>

      {/* Post Form */}
      <PostForm />

      {/* Posts Feed */}
      <div>
        {mockPulses.map((pulse) => (
          <PostCard key={pulse.id} post={pulse} />
        ))}
      </div>
    </main>
  );
};

export default Feed;</parameter>