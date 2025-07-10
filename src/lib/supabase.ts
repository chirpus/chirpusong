import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  signInWithGoogle: async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}`
      }
    });
  },
  
  signUp: async (email: string, password: string, userData: any) => {
    // Keep for fallback, but primarily use Google
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: `${window.location.origin}`
      }
    });
  },
  
  signIn: async (email: string, password: string) => {
    // Keep for fallback, but primarily use Google
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  },
  
  signOut: async () => {
    return await supabase.auth.signOut();
  },
  
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  createProfileFromAuth: async (user: any) => {
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (!existingProfile) {
      // Extract info from Google OAuth
      const username = user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`;
      const displayName = user.user_metadata?.full_name || user.user_metadata?.name || username;
      const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;

      return await supabase
        .from('profiles')
        .insert({
          id: user.id,
          username: username,
          display_name: displayName,
          avatar_url: avatarUrl,
          email: user.email
        })
        .select()
        .single();
    }
    
    return { data: existingProfile };
  }
};

// Database helpers
export const db = {
  // Posts
  getPosts: async (limit = 20, offset = 0) => {
    return await supabase
      .from('posts')
      .select(`
        *,
        profiles:user_id (
          id,
          username,
          display_name,
          avatar_url,
          verified,
          level
        ),
        likes:likes!post_id (count),
        comments:comments!post_id (count),
        user_liked:likes!post_id (
          user_id
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
  },

  createPost: async (content: string, mood: string, dimension: string, mediaUrls?: string[]) => {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    return await supabase
      .from('posts')
      .insert({
        user_id: user.id,
        content,
        mood,
        dimension,
        media_urls: mediaUrls || []
      })
      .select()
      .single();
  },

  // Likes
  toggleLike: async (postId: string) => {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', user.id)
      .eq('post_id', postId)
      .single();

    if (existingLike) {
      return await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);
    } else {
      return await supabase
        .from('likes')
        .insert({
          user_id: user.id,
          post_id: postId
        });
    }
  },

  // Comments
  getComments: async (postId: string) => {
    return await supabase
      .from('comments')
      .select(`
        *,
        profiles:user_id (
          id,
          username,
          display_name,
          avatar_url,
          verified,
          level
        ),
        likes:likes!comment_id (count)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
  },

  createComment: async (postId: string, content: string, parentId?: string) => {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    return await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content,
        parent_id: parentId
      })
      .select()
      .single();
  },

  // Follows
  toggleFollow: async (userId: string) => {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    const { data: existingFollow } = await supabase
      .from('follows')
      .select('id')
      .eq('follower_id', user.id)
      .eq('following_id', userId)
      .single();

    if (existingFollow) {
      return await supabase
        .from('follows')
        .delete()
        .eq('id', existingFollow.id);
    } else {
      return await supabase
        .from('follows')
        .insert({
          follower_id: user.id,
          following_id: userId
        });
    }
  },

  // Messages
  getConversations: async () => {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    return await supabase
      .from('conversations')
      .select(`
        *,
        participant_1_profile:profiles!participant_1 (*),
        participant_2_profile:profiles!participant_2 (*),
        messages (
          content,
          created_at,
          sender_id
        )
      `)
      .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
      .order('last_message_at', { ascending: false });
  },

  getMessages: async (conversationId: string) => {
    return await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id (
          id,
          username,
          display_name,
          avatar_url
        )
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
  },

  sendMessage: async (conversationId: string, content: string) => {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    return await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content
      })
      .select()
      .single();
  },

  createConversation: async (participantId: string) => {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    return await supabase
      .from('conversations')
      .insert({
        participant_1: user.id,
        participant_2: participantId
      })
      .select()
      .single();
  },

  // Profile
  getProfile: async (userId?: string) => {
    const user = userId || (await auth.getCurrentUser())?.id;
    if (!user) throw new Error('Not authenticated');

    return await supabase
      .from('profiles')
      .select('*')
      .eq('id', user)
      .single();
  },

  updateProfile: async (updates: any) => {
    const user = await auth.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    return await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
  }
};