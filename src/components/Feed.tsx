import React from 'react';
import PostForm from './PostForm';
import PostCard from './PostCard';
import { mockPulses } from '../data/mockData';

const Feed: React.FC = () => {
  return (
    <main className="flex-1 max-w-3xl border-r border-gray-200">
      {/* Header */}
      <div className="sticky top-16 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-900">
            Home
          </h2>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        <p className="text-gray-600 text-sm mt-2">Latest posts from your network</p>
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

export default Feed;