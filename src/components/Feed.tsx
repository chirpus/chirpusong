import React from 'react';
import PostForm from './PostForm';
import PostCard from './PostCard';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const { data, error } = await db.getPosts();
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <PostForm onPostCreated={loadPosts} />

      {/* Posts Feed */}
      <div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No posts yet</p>
            <p className="text-sm">Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} onUpdate={loadPosts} />
          ))
        )}
      </div>
    </main>
  );
};

export default Feed;